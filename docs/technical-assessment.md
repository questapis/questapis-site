# QuestAPIs assessment — 2026-09-28

## Evidence and limits

Inspected `questapis/questapis-site` at `0e96502`. The initial local folder was an empty Git repository; fetched the existing source and created `codex/academy-foundation`. No production changes have been made.

* Architecture: Next.js 16.2.6 App Router, React 19.2.4, TypeScript, Tailwind 4, Vercel Analytics. Seven public informational pages plus sitemap and robots. No route handlers, middleware, API calls, auth SDK, database migrations, or environment-variable references in tracked source. No local environment files.
* Services: questapis.dev redirects to www.questapis.dev; the latter returned HTTP 200 with Vercel headers. DNS nameservers are Porkbun. Beta links to https://landing-page-three-pi-87.vercel.app/ (HTTP 200). This proves reachability, not signup success or the deployed Git revision.
* Repositories: GitHub discovery found questapis/questapis-site and an unrelated Windows-Health-Check repository. No business backend was identified. Private repositories under other accounts may exist.
* Working source: marketing pages, product catalog, placeholder docs, beta outbound link, shared branding, SEO discovery files, analytics integration. Backend products marked “Beta Ready” cannot be verified from this repository.
* Database/authentication: unknown externally; absent in this repository. Supabase, Render, billing, API keys, rate limits, existing users, deployment environment names and values remain unverified. No secrets were requested or printed.
* Debt: boilerplate README; no tests or CI; docs entries are labels rather than working guides; desktop navigation disappears on mobile; no account, pricing, or billing implementation. Do not invent production pricing.

## Preservation boundaries

Preserve all existing public URLs, branding, API catalog, beta destination, analytics and domain configuration. Do not migrate existing users, replace authentication, deploy database changes, rotate keys or modify billing until their actual implementation is inspected. No production database access is available in this checkout.

## Implementation sequence

1. Add public `/learn` discovery and beginner preview lessons, keeping educational content separate from presentation. Preview exercises must explicitly avoid claiming saved progress or awarded currency.
2. Locate and audit the existing API/auth/database projects, environment variable **names**, schema/RLS policies, deployments and backups. Verify login, account ownership, key management, API metering and billing in staging.
3. Integrate the established identity into authenticated `/academy`; add additive migrations and transaction-based progression services. Test cross-user access, replay/concurrency, rollback and reward correctness before rollout.
4. Add player dashboard, quests, achievements, streaks and cosmetic inventory/shop using configurable records and an immutable reward ledger.
5. Integrate server-enforced entitlements and introductory promotions with the actual API meter, then an allowlisted API playground. Preserve existing free/paid tiers.
6. Expand curriculum, projects and cosmetics; staged rollout, accessibility/mobile checks, monitoring and rollback rehearsal.

Phase 1 can proceed independently. Authenticated implementation is blocked on identifying the existing services; a replacement backend would violate the preservation requirement.

## Infrastructure discovery follow-up

The deployed dashboard at https://questapis-dashboard.vercel.app is a plain HTML/JavaScript developer testing interface. Its publicly served `app.js` references these existing services:

| Purpose | Referenced origin |
| --- | --- |
| Players | https://questapis-player-api.onrender.com |
| Quest engine | https://questapis-quest-engine-api.onrender.com |
| Inventory | https://inventory-api-ic0v.onrender.com |
| Shop | https://shop-api-8lot.onrender.com |
| Key manager / beta application | https://questapis-key-manager-api.onrender.com |

The key manager reference comes from the beta landing page's deployed JavaScript, which calls `/keys/beta/apply`. The dashboard references `/players`, `/quests`, `/inventories`, `/shop`, quest completion and shop purchasing endpoints. It holds a manually entered API key in a JavaScript variable and sends `x-api-key` headers. This establishes the client contract only; backend validation and ownership enforcement remain unverified. Do not reuse developer management operations as learner reward authorization.

HEAD requests to each Render origin timed out after eight seconds (curl status `000`). This does **not** establish that the services are deleted or offline; cold starts and network issues remain possible. No application submissions, player reads or mutations were attempted. Neither inspected frontend bundle exposed a Supabase project URL in the extracted URL references.

The GitHub affiliation listing (owner, collaborator and organization member) returned only `questapis-site` and `Windows-Health-Check`. Installation-based listing returned no repositories; public/account search independently found the site. Inspected the site's full tracked file list and commit-history reference changes; no backend, Supabase, Render, auth configuration or environment-variable names were found.

### Exact details still needed

* **Render:** For each matching origin above, copy the service dashboard URL (`.../srv-...`), current status, connected repository URL, deployed branch and root directory. Supply environment-variable **names only**. Include any separate reward service found in the same workspace. Hostname prefixes are discovered references, not confirmed current dashboard display names.
* **Supabase:** Existing project name, project reference ID or project dashboard URL (`.../project/<ref>`), and status (active/paused). A schema-only export and RLS policy definitions will be needed for the integration audit; no row data or credentials.
* **Vercel:** Project settings links for questapis.dev, questapis-dashboard.vercel.app and landing-page-three-pi-87.vercel.app, plus each connected Git repository, production branch, root directory and environment-variable **names only**. Include the owning team if projects are under different teams.

Do not share API keys, service-role keys, database passwords, connection strings or environment-variable values. Existing infrastructure must be identified before integration work proceeds.

## Baseline validation

`npm ci` succeeded and `npm run build` passed, including TypeScript and static generation of existing routes. `npm audit` reported nine affected packages (one critical, six high, one moderate, one low); Next.js 16.2.6 is among them. This is a dependency report, not proof that every advisory is exploitable in this deployment. Security remediation should precede enabling authenticated features, with a tested compatible upgrade and deployment review. No dependency versions changed during discovery.

Only audit/design documents have been added so far; the proposed `/learn` preview and authenticated academy are not implemented or deployed.

`npm run lint` found one pre-existing error at `app/layout.tsx:32`: the home navigation uses an HTML anchor instead of Next.js `Link`. `git diff --check` passed. An unrelated untracked `DESIGN-DIRECTION.md` appeared during the audit and was left untouched.
