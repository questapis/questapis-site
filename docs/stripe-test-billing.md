# Stripe sandbox billing plan

QuestAPIs uses Stripe-hosted Checkout for a test-mode Adventurer subscription. The configured recurring Price must be usage-based and attached to a Stripe Billing Meter. Checkout collects the payment method and the customer location data Stripe Tax needs, and Stripe Billing creates subscription invoices. QuestAPIs never accepts an amount or Price ID from the browser.

Stripe Billing Meters are intentionally used for this initial single-product, single-event sandbox. Re-evaluate Metronome before launch if QuestAPIs adds contract pricing, prepaid credits, commitments, multiple concurrent contracts, or more complex rating.

## Account setup still required

1. In the **Quest APIs sandbox** Stripe account, inspect Tax settings first. Confirm the sandbox business address and choose the product tax code with a tax professional. Automatic Tax only collects in jurisdictions with an active registration; never treat the toggle alone as proof tax is configured.
2. Create an Adventurer product, a Billing Meter whose event name matches `STRIPE_API_USAGE_METER_EVENT_NAME`, and an active recurring metered Price. Pricing is a business decision; do not switch to live mode until pricing and legal/tax review are complete.
3. Set the test-only server variables from `.env.example`. `STRIPE_SECRET_KEY` must begin with `sk_test_`. Set `STRIPE_ADVENTURER_PRICE_ID` to the sandbox metered Price. Never expose either value with a `NEXT_PUBLIC_` prefix.
4. Register `/api/stripe/webhook` as a test-mode webhook and subscribe to `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, and `customer.subscription.deleted`. Store its signing secret in `STRIPE_WEBHOOK_SECRET`.
5. Apply `202609290004_stripe_test_billing.sql` to the staging Supabase project. Configure the Stripe customer portal in sandbox mode and enable Stripe's one-active-subscription redirect for the shared Customer.
6. Invoke `POST /api/internal/billing/usage` on a schedule with `Authorization: Bearer $CRON_SECRET`. The request outbox keeps API usage pending if Stripe is temporarily unavailable; Stripe receives a stable identifier so retries do not double-count.

## Security and entitlement rules

- The server refuses non-test Stripe secret keys, live-mode Prices, Customers, Checkout Sessions, subscriptions, and webhook events.
- Checkout requires an authenticated user, an allowlisted plan key, a same-origin request, and a server-configured Price.
- Webhooks use the unmodified request body for signature verification. The handler re-reads current subscription state to tolerate out-of-order delivery, and a database RPC records each Stripe event and updates the subscription atomically, making retries safe.
- Browser redirects never grant paid access. Entitlements must read the persisted subscription status after the signed webhook is processed.
- Only `active` and `trialing` subscriptions emit billable meter events. Local usage is recorded transactionally before delivery to Stripe.

## Sandbox verification

Run `npm run check`, then complete Checkout with a Stripe test card. Verify that the webhook creates one subscription row, replaying the same event changes nothing, an API request creates and delivers one usage event, the upcoming sandbox invoice shows that usage and automatic tax, and the portal can display invoices and cancel the test subscription. Also verify forged signatures, cross-origin checkout, live credentials, duplicate events, and unauthenticated requests are rejected.

The official Stripe plugin is installed and OAuth-authorized, but this Codex chat did not expose its `stripe_implementation_planner` call after a reload. The official Stripe integration skills were installed as the required fallback and used to review this implementation. Run the account-specific planner when the tool becomes available and compare its recommendations before live launch.
