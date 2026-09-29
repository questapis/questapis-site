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
