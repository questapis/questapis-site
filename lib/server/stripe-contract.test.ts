import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const checkout = readFileSync(resolve("app/api/billing/checkout/route.ts"), "utf8");
const webhook = readFileSync(resolve("app/api/stripe/webhook/route.ts"), "utf8");
const stripe = readFileSync(resolve("lib/server/stripe.ts"), "utf8");
const migration = readFileSync(resolve("supabase/migrations/202609290004_stripe_test_billing.sql"), "utf8");

describe("Stripe sandbox billing contract", () => {
  it("keeps pricing server-owned and refuses non-test credentials", () => {
    expect(checkout).toContain('plan: z.enum(BILLING_PLAN_KEYS)');
    expect(checkout).not.toMatch(/bodySchema[\s\S]{0,200}price/i);
    expect(stripe).toContain('secretKey.startsWith("sk_test_")');
    expect(checkout).toContain("price.livemode");
    expect(checkout).toContain('price.recurring.usage_type !== "metered"');
  });

  it("verifies raw webhook payloads before atomically changing subscription state", () => {
    expect(webhook).toContain("constructEvent(await request.text(), signature, webhookSecret)");
    expect(migration).toContain("event_id text primary key");
    expect(migration).toContain("on conflict do nothing");
    expect(migration).toContain("apply_stripe_subscription_event");
  });

  it("records local usage before retryable Stripe meter delivery", () => {
    expect(migration).toContain("insert into public.api_usage");
    expect(migration).toContain("insert into public.stripe_usage_events");
    expect(migration).toContain("request_id uuid primary key");
  });
});
