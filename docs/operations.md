# Operations guide

## Local setup

1. Install Node.js 20 or newer and run `npm ci`.
2. Copy `.env.example` to `.env.local`; add staging values only.
3. Run `npm run dev`, then open `http://localhost:3000`.
4. Without Supabase variables, public pages and the demo API work locally; account persistence stays explicitly unavailable.

## Content and products

Review then apply `supabase/migrations/202609280001_v2_foundation.sql` to a new staging project. Add courses through regions, courses, lessons, and immutable lesson versions; keep answer keys out of client payloads. Add achievements through `achievement_definitions`, cosmetics through `academy_shop_items`, and APIs through `api_products` plus `api_versions`. Reward-bearing changes require a versioned rule and server transaction with a unique idempotency key.

For each user-visible release, update both `lib/changelog.ts` (the public page) and `CHANGELOG.md` (the repository record). Keep newest entries first and list incomplete work under known limitations rather than shipped features. Update `lib/help-content.ts` whenever an account, plan, API, or Academy behavior changes.

## Deployment and launch

Create a new Vercel project, use a staging-only domain, configure variables, and apply migrations only to staging. Configure Supabase redirect URLs for `/auth/callback`. Add Stripe only in test mode. Run `npm run check` before every deployment.

Before production: verify backup/restore, email and reset delivery, RLS and cross-user denial, API-key hashing/rotation, atomic quotas, signed webhook replay handling, monitoring, incident ownership, accessibility, mobile behavior, and load tests. Inventory legacy users/services and write a migration plan. Add `questapis.dev` only in an approved window while retaining the old deployment for rollback. Do not delete legacy data during cutover.

## Monitoring and incident signals

Server routes emit one-line JSON events with an ISO timestamp, severity, stable event name, and non-secret identifiers. The logger recursively redacts fields whose names resemble passwords, authorization values, cookies, tokens, secrets, or API keys. Route failures use stable public error codes while detailed provider errors remain in protected platform logs. Configure staging alerts for elevated 5xx responses, repeated authentication failures, API authentication/quota failures, database RPC failures, and failed Stripe webhooks before billing work begins. Never add request headers or raw request bodies to logs.

## Backup, recovery, and rollback

- Enable the staging database provider's scheduled backups before test data matters. Before every migration, take a provider snapshot or logical schema/data backup and record the migration version.
- Test restore into a disposable project, compare migration history and row counts, then run the critical auth, reward, shop, and API-key tests. A backup is not considered verified until a restore succeeds.
- Database migrations are forward-only. For a bad migration, stop writes, restore the pre-migration snapshot into a new staging project, repoint only the staging environment variables, and redeploy the last known-good app. Do not attempt an improvised destructive down migration.
- Vercel deployments are immutable. For an application regression, promote the prior healthy staging deployment or redeploy the known-good Git revision, then run smoke tests before reopening access.
- For a failed deployment, leave the current healthy deployment assigned to the staging alias, inspect build/runtime logs, fix on the staging branch, and promote only after `npm run check` passes.

## Phase 1.5 staging gate

The staging gate requires a separate Vercel project and separate Supabase project, both named clearly as staging. Apply migrations in timestamp order to a clean database, configure only test/development credentials, add the exact staging callback and reset URLs, and never attach `questapis.dev`. Record test-user IDs without email addresses in the validation report. Delete test users only after the report and restore rehearsal are complete.
