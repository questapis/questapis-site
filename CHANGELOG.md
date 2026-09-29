# Changelog

All notable QuestAPIs v2 changes are recorded here. Planned work is not listed as shipped.

## [0.3.1] — 2026-09-29

### Added

- A standalone QuestAPIs Journal with a responsive editorial homepage, three launch articles, RSS feed, sitemap, robots policy, and security headers.
- A deterministic static build for the closed-beta landing page so it can deploy through the existing Vercel project and from GitHub.

### Changed

- Replaced the live beta application page with the redesigned closed-beta notice at the existing beta URL.
- Connected the beta Vercel project to the private `questapis/QuestAPIs` repository while keeping the v2 rebuild isolated on `v2-staging`.

### Operations

- Verified `questapis.dev` and `www.questapis.dev` already resolve successfully through the existing production Vercel project; no production DNS or domain assignment was changed.
- Confirmed `questapis.blog` is owned in Porkbun and prepared a separate deployment path so the blog does not depend on the unfinished application backend.

## [0.3.0] — 2026-09-28

### Added

- Atomic, server-authoritative lesson completion, reward, cosmetic purchase/equip, API-key, quota, and usage-metering transactions.
- One-time API-key reveal with SHA-256-only storage, owner-scoped revocation, and revoked-key rejection.
- Default-deny RLS coverage for every new v2 table, cross-user read isolation, supporting indexes, profile provisioning, and staging seed data.
- Structured server logging with recursive credential redaction and a role-verified administrator catalog endpoint.
- Backup, rollback, migration recovery, monitoring, and Phase 1.5 validation runbooks.
- A redesigned, application-free beta landing page and matching in-app closed-beta state.

### Changed

- Starter Grove now submits answers for server validation and displays persisted XP/gold results when staging authentication is configured.
- The dashboard reads persisted XP, gold, streak, and active-key counts instead of presenting fixed placeholder values.
- The header now serves a 33 KB responsive WebP logo derivative instead of requesting the 2.4 MB source PNG.

### Security

- Browser clients still have no mutation policies for XP, gold, rewards, inventory, entitlements, subscriptions, API usage, or roles.
- Shop price and wallet balance are loaded and locked in PostgreSQL; duplicate and concurrent purchases cannot double-charge or duplicate inventory.

### Known limitations

- The code is ready for an isolated staging deployment, but live database, email, authentication, performance, and recovery checks remain pending staging credentials and deployment authorization.
- No production domain, database, or legacy service has been changed.

## [0.2.0] — 2026-09-28

### Added

- Responsive public website, dual-path homepage, Academy atlas, mobile quest trail, introductory lesson, and quiz.
- Dashboard, achievements, streak, shop, pricing, onboarding, status, feedback, admin, Help Center, FAQ, and changelog foundations.
- Grove development API, interactive playground, API catalog, and developer documentation.
- Supabase authentication and password-recovery integration points.
- PostgreSQL/RLS migration for learning, rewards, cosmetics, entitlements, billing, API keys, quotas, usage, notifications, and feedback.
- Intentional 404 and application-error recovery pages.

### Changed

- Upgraded Next.js and Vitest to patched releases.
- Replaced unverified API-readiness claims with explicit development, planned, or legacy states.
- Added metadata, sitemap coverage, security headers, mobile layouts, focus states, and reduced-motion support.

### Security

- Added timing-safe hashed development-key verification.
- Kept authority-bearing tables free of browser mutation policies.
- Reached zero known production dependency vulnerabilities at audit time.

### Known limitations

- Vercel staging deployment requires valid account authentication.
- Supabase persistence, atomic rewards/quotas, Stripe test billing, monitoring, and outbound email require staging services.

## [0.1.0] — 2026-09-28

- Audited the public legacy reference and documented preservation boundaries.
- Established the Adventure Atlas visual direction and Academy authorization contract.
- Added the Starter Grove public preview.
