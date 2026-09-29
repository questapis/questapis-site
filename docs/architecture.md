# QuestAPIs v2 architecture

V2 uses one Next.js 16 application on Vercel for the public site, authenticated product, route handlers, and server orchestration. Supabase supplies managed PostgreSQL and authentication. Stripe is isolated behind subscriptions and entitlements; access changes only after a signature-verified event is persisted and processed. This minimizes Phase 1 infrastructure while preserving boundaries that can split under load.

The Academy and developer platform share identity and entitlements, but not visual language or authorization assumptions. Academy rewards are written only by a database transaction initiated from trusted server code. API keys are displayed once, then stored as a prefix plus one-way hash. Playground destinations are server-owned allowlist entries rather than user-supplied URLs.

- Public pages are static/server rendered and cacheable.
- Supabase Auth owns passwords, email verification, reset, and sessions.
- PostgreSQL is authoritative for content, progress, ledger, inventory, plans, grants, keys, quotas, and usage.
- Browsers never submit XP, gold, plan state, or authoritative completion.
- Stripe remains optional in development; no UI fakes payment success.
- `event_outbox` supports reliable analytics/notification consumers without putting secrets or answer keys in events.

Deploy to a separate Vercel project such as `questapis-v2-staging` and a separate Supabase staging project. Production DNS and legacy Render services remain unchanged until launch approval.

