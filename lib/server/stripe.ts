import "server-only";

import Stripe from "stripe";

export const BILLING_PLAN_KEYS = ["adventurer"] as const;
export type BillingPlanKey = (typeof BILLING_PLAN_KEYS)[number];

const priceEnvironmentNames: Record<BillingPlanKey, string> = {
  adventurer: "STRIPE_ADVENTURER_PRICE_ID",
};

export class StripeConfigurationError extends Error {}

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new StripeConfigurationError("Stripe test mode is not configured.");
  if (!secretKey.startsWith("sk_test_")) {
    throw new StripeConfigurationError("QuestAPIs billing only accepts a Stripe test-mode secret key.");
  }
  return new Stripe(secretKey, { appInfo: { name: "QuestAPIs", version: "0.1.0" } });
}

export function getPlanPriceId(planKey: BillingPlanKey) {
  const environmentName = priceEnvironmentNames[planKey];
  const priceId = process.env[environmentName];
  if (!priceId) throw new StripeConfigurationError(`${environmentName} is not configured.`);
  if (!priceId.startsWith("price_")) throw new StripeConfigurationError(`${environmentName} is invalid.`);
  return priceId;
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configured) throw new StripeConfigurationError("NEXT_PUBLIC_SITE_URL is not configured.");
  const url = new URL(configured);
  if (url.protocol !== "https:" && url.hostname !== "localhost") {
    throw new StripeConfigurationError("NEXT_PUBLIC_SITE_URL must use HTTPS outside localhost.");
  }
  return url.origin;
}

export function assertTrustedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === getSiteUrl();
  } catch {
    return false;
  }
}

export function stripeObjectId(value: string | { id: string } | null) {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

export function subscriptionPeriodEnd(subscription: Stripe.Subscription) {
  const periodEnds = subscription.items.data.map((item) => item.current_period_end);
  return periodEnds.length ? new Date(Math.max(...periodEnds) * 1000).toISOString() : null;
}
