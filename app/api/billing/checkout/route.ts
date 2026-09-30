import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiError, requireUser } from "@/lib/server/responses";
import {
  assertTrustedOrigin,
  BILLING_PLAN_KEYS,
  getPlanPriceId,
  getSiteUrl,
  getStripe,
  StripeConfigurationError,
} from "@/lib/server/stripe";

const bodySchema = z.object({
  plan: z.enum(BILLING_PLAN_KEYS),
  attemptId: z.uuid(),
});

const existingSubscriptionStatuses = ["active", "trialing", "past_due", "unpaid", "paused"];

export async function POST(request: Request) {
  if (!assertTrustedOrigin(request)) return apiError("FORBIDDEN", "The checkout request origin is not allowed.", 403);
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return apiError("INVALID_REQUEST", "Choose a valid billing plan.", 400);

  try {
    const admin = createAdminClient();
    if (!admin) return apiError("SERVICE_UNAVAILABLE", "Billing persistence is not configured.", 503);
    const { data: existing } = await admin
      .from("subscriptions")
      .select("provider_customer_id,status")
      .eq("user_id", auth.user.id)
      .maybeSingle();
    if (existing && existingSubscriptionStatuses.includes(existing.status)) {
      return apiError("SUBSCRIPTION_EXISTS", "Manage your existing subscription from the billing portal.", 409);
    }

    const stripe = getStripe();
    const priceId = getPlanPriceId(parsed.data.plan);
    const price = await stripe.prices.retrieve(priceId);
    if (price.livemode || !price.active || !price.recurring || price.recurring.usage_type !== "metered") {
      return apiError("BILLING_CONFIGURATION_INVALID", "The selected sandbox price is not an active usage-based recurring price.", 503);
    }

    const siteUrl = getSiteUrl();
    const customerId = existing?.provider_customer_id ?? undefined;
    const session = await stripe.checkout.sessions.create({
      integration_identifier: "questapis_web",
      mode: "subscription",
      line_items: [{ price: price.id }],
      success_url: `${siteUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing?checkout=cancelled`,
      client_reference_id: auth.user.id,
      automatic_tax: { enabled: true },
      tax_id_collection: { enabled: true },
      ...(customerId
        ? {
            customer: customerId,
            billing_address_collection: "required" as const,
            customer_update: { address: "auto", name: "auto" } as const,
          }
        : { customer_email: auth.user.email }),
      metadata: { user_id: auth.user.id, plan_key: parsed.data.plan },
      subscription_data: { metadata: { user_id: auth.user.id, plan_key: parsed.data.plan } },
    }, { idempotencyKey: `checkout_${auth.user.id}_${parsed.data.attemptId}` });
    if (!session.url || session.livemode) {
      return apiError("CHECKOUT_UNAVAILABLE", "Stripe did not return a sandbox checkout URL.", 502);
    }
    return Response.json({ url: session.url });
  } catch (error) {
    if (error instanceof StripeConfigurationError) return apiError("BILLING_NOT_CONFIGURED", error.message, 503);
    return apiError("CHECKOUT_FAILED", "Checkout could not be started. Please try again.", 502);
  }
}
