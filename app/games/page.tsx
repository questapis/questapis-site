const games = [
  {
    title: "QuestAPIs Game Lab",
    status: "Planned",
    description:
      "A future space for testing small games and interactive demos powered by QuestAPIs systems.",
    tags: ["Game Lab", "Experiments", "Future"],
  },
  {
    title: "RPG Progression Demo",
    status: "Concept",
    description:
      "A small demo showing quests, XP, rewards, inventories, and player progress working together.",
    tags: ["Quests", "XP", "Inventory"],
  },
  {
    title: "Developer Demo Worlds",
    status: "Planned",
    description:
      "Interactive examples that show how developers can use QuestAPIs inside games and apps.",
    tags: ["Examples", "Developers", "Demos"],
  },
];

export default function GamesPage() {
  return (
    <main className="min-h-screen px-6 py-20 text-white">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
          Future Games
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Games Powered by QuestAPIs
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          QuestAPIs is designed for apps, games, and interactive worlds. This
          page will showcase future games, demos, and experiments connected to
          the QuestAPIs ecosystem.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {games.map((game) => (
            <div
              key={game.title}
              className="quest-card rounded-2xl p-6"
            >
              <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                {game.status}
              </span>

              <h2 className="mt-6 text-2xl font-bold text-blue-300">
                {game.title}
              </h2>

              <p className="mt-4 text-slate-300">
                {game.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
          <h2 className="text-2xl font-bold text-blue-200">
            Game Showcase Coming Later
          </h2>

          <p className="mt-4 text-slate-300">
            Future QuestAPIs games and demos will appear here as the ecosystem
            grows.
          </p>
        </div>
      </section>
    </main>
  );
}