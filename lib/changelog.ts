export type ChangeKind = "Added" | "Changed" | "Security" | "Known limitation";

export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  summary: string;
  groups: Array<{ kind: ChangeKind; items: string[] }>;
};

export const changelog: ChangelogEntry[] = [
  {
    version: "0.5.0",
    date: "2026-09-29",
    title: "The complete interactive Academy",
    summary: "Every Academy region is now a three-quest course, wrapped in a more personal, cinematic learning experience.",
    groups: [
      { kind: "Added", items: ["Sixteen new interactive lessons for a total of 24 published quests", "A personal explorer-name welcome stored privately on the learner's device", "Course-level quest selection with clear duration and reward details", "Original cinematic 3D Academy world artwork with responsive, accessible presentation", "Celebratory motion and feedback after correct answers"] },
      { kind: "Changed", items: ["Dashboard progress now tracks all 24 Academy quests", "Each of the eight map regions now opens a complete three-lesson course", "Homepage and Academy messaging now reflect the full published program"] },
      { kind: "Security", items: ["New lessons continue to use server-authoritative answer validation and one-time reward transactions", "Personal explorer names stay in local browser storage and are not transmitted"] },
      { kind: "Known limitation", items: ["The current program is a compact foundations course, not yet a professional certification", "Saved rewards require a verified QuestAPIs account and network connection"] },
    ],
  },
  {
    version: "0.4.0",
    date: "2026-09-29",
    title: "Eight-quest Academy and reliable account return",
    summary: "The complete beginner route is now represented in the app and database, with clearer saved progress and a hardened email-verification return flow.",
    groups: [
      { kind: "Added", items: ["Seven new playable beginner quests covering HTTP, JSON, endpoints, API-key safety, webhooks, status codes, and project planning", "Published curriculum records, answer validation, and one-time XP/gold reward rules for all eight Academy regions", "Dashboard progress based on completed lessons rather than an XP estimate"] },
      { kind: "Changed", items: ["Every map region now opens its own interactive lesson instead of showing a coming-later notice", "Successful password sign-in now performs a full navigation so the server immediately receives the new session cookie", "Verification callbacks now surface expired or malformed link errors and safely support both authorization codes and email token hashes", "Expanded Help and FAQ guidance for available quests, cross-browser verification, and the planned branded support sender"] },
      { kind: "Security", items: ["Callback destinations are restricted to local paths to prevent external redirect abuse", "Lesson rewards remain server-validated, idempotent, and available only to authenticated users"] },
      { kind: "Known limitation", items: ["A custom support@questapis.dev sender still requires a hosted mailbox plus verified SMTP configuration", "Opening a verification link on a different device cannot transfer that browser session; the verified user can sign in normally"] },
    ],
  },
  {
    version: "0.3.1",
    date: "2026-09-29",
    title: "Public launch foundation",
    summary: "The rebuilt QuestAPIs experience is live on the primary domain with production accounts and saved Academy progress, while the Journal and closed-beta notice run as separate deployments.",
    groups: [
      { kind: "Added", items: ["Installable Academy experience with web-app metadata, branded icons, standalone display, and a conservative offline learning shell", "Production profiles, onboarding, saved lesson completion, XP/gold rewards, cosmetics, and developer-key storage", "QuestAPIs Journal with three launch articles, RSS, sitemap, robots policy, and security headers", "Home-screen installation guidance for iPhone, iPad, Android, and supported desktop browsers"] },
      { kind: "Changed", items: ["Published the rebuilt v2 website to questapis.dev", "Connected questapis.blog and verified HTTPS delivery", "Replaced the beta application page with a clear applications-closed notice", "Improved signup routing so immediately confirmed accounts continue into onboarding"] },
      { kind: "Security", items: ["Activated 27 row-security policies and server-authoritative Academy transactions", "Preserved incompatible legacy API-key and shop tables by giving the v2 models distinct names", "Kept the legacy production branch untouched while publishing the rebuild from the isolated v2-staging branch", "The offline worker excludes authentication and API routes from its cache"] },
      { kind: "Known limitation", items: ["Some offline lesson actions still require a network connection to validate answers and save rewards", "Email confirmation is required before a new account can sign in", "Paid plans remain unavailable until verified Stripe test-mode work is complete"] },
    ],
  },
  {
    version: "0.3.0",
    date: "2026-09-28",
    title: "Phase 1.5 authority and transaction hardening",
    summary: "The v2 codebase now has atomic server-authoritative paths for its first persistent Academy, economy, and developer-key flows, ready for isolated staging verification.",
    groups: [
      { kind: "Added", items: ["Atomic lesson validation, idempotent XP/gold awards, and persistent dashboard balances", "Atomic cosmetic purchase and equipment transactions using server-owned prices and locked balances", "One-time API-key reveal, hash-only storage, owner-scoped revocation, hourly quota accounting, and usage records", "Default-deny RLS coverage, profile provisioning, supporting indexes, staging seeds, structured redacted logs, and admin catalog operations", "Backup, rollback, monitoring, and validation runbooks", "A redesigned, application-free beta landing page and matching closed-beta state"] },
      { kind: "Changed", items: ["Starter Grove completion now calls the authoritative server flow when staging auth is available", "Dashboard values now come from the authenticated profile and API-key records", "The header uses a 33 KB WebP logo derivative instead of requesting the 2.4 MB source PNG"] },
      { kind: "Security", items: ["Client sessions cannot directly mutate currency, rewards, inventory, roles, entitlements, subscriptions, or metering", "Repeated completions and purchases use unique database constraints inside transactions; shop prices never come from the browser"] },
      { kind: "Known limitation", items: ["Live auth, email, cross-user, load, backup/restore, and rollback rehearsals require the isolated staging services", "No production or legacy infrastructure has been changed"] },
    ],
  },
  {
    version: "0.2.0",
    date: "2026-09-28",
    title: "Phase 1 platform foundation",
    summary: "The isolated QuestAPIs v2 foundation now supports both the beginner Academy experience and the developer platform surface.",
    groups: [
      { kind: "Added", items: ["Responsive public website and dual-path homepage", "Eight-region Academy atlas with a mobile quest trail", "Introductory lesson, quiz, dashboard, achievements, streak, and cosmetic-shop foundations", "Grove development API, documentation, catalog, and interactive playground", "Supabase account, email verification callback, and password-recovery integration", "PostgreSQL migration for curriculum, rewards, entitlements, API keys, metering, billing, notifications, and RLS", "Pricing, onboarding, status, feedback, admin, Help Center, FAQ, and changelog surfaces"] },
      { kind: "Changed", items: ["Upgraded Next.js to 16.3.6 and the test runner to a patched release", "Replaced unverified legacy API readiness claims with explicit development or planned states", "Added security headers, canonical metadata, sitemap entries, and reduced-motion handling"] },
      { kind: "Security", items: ["API-key comparison uses a configured SHA-256 digest and timing-safe equality", "Authority-bearing database tables expose self-read policies but no browser mutation policies", "Production dependency audit reports zero known vulnerabilities"] },
      { kind: "Known limitation", items: ["Staging deployment requires a valid Vercel login", "Persistent accounts and progress require a new Supabase staging project", "Stripe remains test-ready architecture only"] },
    ],
  },
  {
    version: "0.1.0",
    date: "2026-09-28",
    title: "Discovery and visual direction",
    summary: "Established preservation boundaries, audited the public legacy reference, and defined the Adventure Atlas visual system.",
    groups: [
      { kind: "Added", items: ["Legacy technical assessment", "Academy persistence and authorization contract", "Dark evergreen, navy, cyan, ivory, and gold visual foundation", "Starter Grove public learning preview"] },
    ],
  },
];
