const apis = [
  {
    name: "Quest Engine API",
    status: "Beta Ready",
    description:
      "Create quests, objectives, completion rules, and player progression loops.",
    features: ["Quest creation", "Quest tracking", "Completion status"],
  },
  {
    name: "Player API",
    status: "Beta Ready",
    description:
      "Manage player profiles, XP, levels, stats, and account progress.",
    features: ["Player profiles", "XP and levels", "Progress tracking"],
  },
  {
    name: "Reward API",
    status: "Beta Ready",
    description:
      "Handle XP rewards, coins, unlocks, bonuses, and reward history.",
    features: ["XP rewards", "Coin rewards", "Reward logs"],
  },
  {
    name: "Inventory API",
    status: "Beta Ready",
    description:
      "Store items, collectibles, equipment, and future game assets.",
    features: ["Items", "Collectibles", "Inventory tracking"],
  },
  {
    name: "Key Manager API",
    status: "Coming Later",
    description:
      "Manage API keys, user limits, access tiers, and usage protection.",
    features: ["API keys", "Rate limits", "Access tiers"],
  },
];

export default function APIsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
          QuestAPIs Products
        </p>

        <h1 className="mt-4 text-5xl font-bold">API Library</h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          QuestAPIs provides modular APIs designed for apps, games, dashboards,
          and digital experiences that need progression systems.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {apis.map((api) => (
            <div
              key={api.name}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-blue-300">
                  {api.name}
                </h2>

                <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                  {api.status}
                </span>
              </div>

              <p className="mt-4 text-slate-300">{api.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {api.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}