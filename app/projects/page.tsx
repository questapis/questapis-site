const projects = [
  {
    title: "QuestAPIs Platform",
    status: "In Beta",
    description:
      "The main API ecosystem for quests, players, rewards, inventories, and future developer tools.",
    tags: ["APIs", "Backend", "Developer Tools"],
  },
  {
    title: "Quest Engine API",
    status: "Beta Ready",
    description:
      "A modular API for creating quests, objectives, completion tracking, and progression loops.",
    tags: ["Quests", "Progression", "Games"],
  },
  {
    title: "Reward System",
    status: "Beta Ready",
    description:
      "A reward layer for XP, coins, unlocks, logs, and gamified app experiences.",
    tags: ["Rewards", "XP", "Coins"],
  },
  {
    title: "Future Game Projects",
    status: "Planned",
    description:
      "Games and interactive experiences that may use QuestAPIs as part of their backend systems.",
    tags: ["Games", "Experiments", "Coming Soon"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-6 py-20 text-white">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
          QuestAPIs Portfolio
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Projects & Experiments
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          A growing collection of APIs, tools, game systems, and digital
          products connected to the QuestAPIs ecosystem.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="quest-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-blue-300">
                  {project.title}
                </h2>

                <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                  {project.status}
                </span>
              </div>

              <p className="mt-4 text-slate-300">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
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
      </section>
    </main>
  );
}