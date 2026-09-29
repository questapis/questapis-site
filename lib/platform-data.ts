export type Availability = "sandbox" | "planned" | "legacy-beta";

export const apiProducts = [
  {
    slug: "grove",
    name: "Grove API",
    icon: "✦",
    availability: "sandbox" as Availability,
    version: "v1",
    description: "A safe read-only teaching API for making a first real request.",
    rateLimit: "30 requests / minute in development",
    endpoint: "/api/v1/demo/grove?place=starter-grove",
  },
  {
    slug: "quest-engine",
    name: "Quest Engine API",
    icon: "⌘",
    availability: "legacy-beta" as Availability,
    version: "Legacy beta",
    description: "Quest and objective concepts retained for a future, audited v2 product.",
    rateLimit: "Not yet defined for v2",
    endpoint: "Not available in v2 staging",
  },
  {
    slug: "player",
    name: "Player API",
    icon: "♧",
    availability: "planned" as Availability,
    version: "Planned",
    description: "Profiles and progression for apps that need player-facing state.",
    rateLimit: "Not yet defined",
    endpoint: "Not available in Phase 1",
  },
  {
    slug: "rewards",
    name: "Rewards API",
    icon: "◇",
    availability: "planned" as Availability,
    version: "Planned",
    description: "Server-authoritative reward events and immutable balance history.",
    rateLimit: "Not yet defined",
    endpoint: "Not available in Phase 1",
  },
] as const;

export const plans = [
  {
    name: "Explorer",
    price: "Free",
    description: "Begin learning and test the Grove sandbox.",
    features: ["Starter lessons", "Basic quests", "Limited sandbox requests", "Core cosmetics"],
    cta: "Start learning",
    href: "/signup",
  },
  {
    name: "Adventurer",
    price: "Price to be announced",
    description: "The planned plan for deeper learning and higher API limits.",
    features: ["Advanced paths", "Projects and assessments", "Higher quotas", "Premium cosmetics"],
    cta: "Join the beta list",
    href: "/beta",
  },
] as const;

export const achievements = [
  { icon: "✦", name: "First Quest", description: "Complete your first verified lesson." },
  { icon: "↗", name: "First API Request", description: "Receive a successful response from the playground." },
  { icon: "{}", name: "JSON Explorer", description: "Complete the JSON fundamentals quest." },
  { icon: "200", name: "Request Runner", description: "Complete the Forest of Requests path." },
] as const;

export const shopItems = [
  { slug: "mosswood-frame", name: "Mosswood Frame", type: "Profile frame", rarity: "Common", price: 100, icon: "❈" },
  { slug: "firefly-companion", name: "Firefly Companion", type: "Companion", rarity: "Rare", price: 140, icon: "◇" },
  { slug: "cyan-trail", name: "Cyan Trail", type: "Profile effect", rarity: "Uncommon", price: 260, icon: "⌁" },
  { slug: "api-scout", name: "API Scout", type: "Nameplate", rarity: "Common", price: 160, icon: "⌘" },
] as const;
