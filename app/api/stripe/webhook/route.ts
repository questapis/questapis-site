import { logServerEvent } from "@/lib/server/logger";
import { processStripeEvent } from "@/lib/server/billing";
import { getStripe, StripeConfigurationError } from "@/lib/server/stripe";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) return new Response("Webhook is not configured.", { status: 503 });

  let event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch (error) {
    const configurationError = error instanceof StripeConfigurationError;
    logServerEvent("warn", configurationError ? "stripe.webhook_not_configured" : "stripe.webhook_signature_invalid");
    return new Response(configurationError ? error.message : "Invalid signature.", { status: configurationError ? 503 : 400 });
  }

  try {
    await processStripeEvent(event);
    return Response.json({ received: true });
  } catch (error) {
    logServerEvent("error", "stripe.webhook_processing_failed", {
      stripeEventId: event.id,
      eventType: event.type,
      message: error instanceof Error ? error.message : "Unknown processing failure",
    });
    return new Response("Webhook processing failed.", { status: 500 });
  }
}
