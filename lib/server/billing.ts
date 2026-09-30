import "server-only";

import type Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { logServerEvent } from "@/lib/server/logger";
import { getStripe, stripeObjectId, subscriptionPeriodEnd } from "@/lib/server/stripe";

const subscriptionEvents = new Set([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function processStripeEvent(event: Stripe.Event) {
  if (event.livemode) throw new Error("Live-mode Stripe events are disabled for this integration.");

  let subscription: Stripe.Subscription | null = null;
  if (subscriptionEvents.has(event.type)) {
    const eventSubscription = event.data.object as Stripe.Subscription;
    // Stripe does not guarantee webhook ordering. Re-read the canonical object so
    // a delayed older event cannot overwrite newer subscription state.
    subscription = await getStripe().subscriptions.retrieve(eventSubscription.id);
  } else if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const subscriptionId = stripeObjectId(session.subscription);
    if (subscriptionId) subscription = await getStripe().subscriptions.retrieve(subscriptionId);
  }

  const admin = createAdminClient();
  if (!admin) throw new Error("Supabase administration is not configured.");

  if (!subscription) {
    const { error } = await admin.from("stripe_webhook_events").insert({
      event_id: event.id,
      event_type: event.type,
      livemode: false,
      processed_at: new Date().toISOString(),
    });
    if (error && error.code !== "23505") throw error;
    return;
  }

  if (subscription.livemode) throw new Error("Live-mode subscriptions are disabled for this integration.");
  const userId = subscription.metadata.user_id;
  const planKey = subscription.metadata.plan_key;
  if (!userId || !planKey) throw new Error("Stripe subscription metadata is incomplete.");

  const customerId = stripeObjectId(subscription.customer);
  if (!customerId) throw new Error("Stripe subscription has no customer.");

  const { data, error } = await admin.rpc("apply_stripe_subscription_event", {
    p_event_id: event.id,
    p_event_type: event.type,
    p_user_id: userId,
    p_plan_key: planKey,
    p_customer_id: customerId,
    p_subscription_id: subscription.id,
    p_status: subscription.status,
    p_period_end: subscriptionPeriodEnd(subscription),
  });
  if (error) throw error;
  logServerEvent("info", "stripe.subscription_event_processed", {
    stripeEventId: event.id,
    eventType: event.type,
    userId,
    duplicate: data === false,
  });
}

export async function recordStripeUsage(input: { userId: string; requestId: string; units: number }) {
  const eventName = process.env.STRIPE_API_USAGE_METER_EVENT_NAME;
  if (!eventName) return { delivered: false, reason: "not_configured" } as const;
  const admin = createAdminClient();
  if (!admin) return { delivered: false, reason: "not_configured" } as const;

  const { data: subscription } = await admin
    .from("subscriptions")
    .select("provider_customer_id,status")
    .eq("user_id", input.userId)
    .in("status", ["active", "trialing"])
    .maybeSingle();
  if (!subscription?.provider_customer_id) return { delivered: false, reason: "not_subscribed" } as const;

  const meterEvent = await getStripe().billing.meterEvents.create({
    event_name: eventName,
    identifier: `questapis_${input.requestId}`,
    payload: {
      stripe_customer_id: subscription.provider_customer_id,
      value: String(input.units),
    },
  });
  if (meterEvent.livemode) throw new Error("Live-mode usage events are disabled for this integration.");
  return { delivered: true } as const;
}

export async function flushPendingStripeUsage(limit = 25) {
  const admin = createAdminClient();
  if (!admin) throw new Error("Supabase administration is not configured.");
  const { data: events, error } = await admin
    .from("stripe_usage_events")
    .select("request_id,user_id,units")
    .is("delivered_at", null)
    .order("created_at", { ascending: true })
    .limit(limit);
  if (error) throw error;

  let delivered = 0;
  for (const event of events ?? []) {
    try {
      const result = await recordStripeUsage({ userId: event.user_id, requestId: event.request_id, units: event.units });
      if (!result.delivered) continue;
      const { error: updateError } = await admin
        .from("stripe_usage_events")
        .update({ delivered_at: new Date().toISOString() })
        .eq("request_id", event.request_id)
        .is("delivered_at", null);
      if (updateError) throw updateError;
      delivered += 1;
    } catch (error) {
      logServerEvent("warn", "stripe.usage_delivery_failed", {
        requestId: event.request_id,
        message: error instanceof Error ? error.message : "Unknown usage delivery failure",
      });
    }
  }
  return { scanned: events?.length ?? 0, delivered };
}
