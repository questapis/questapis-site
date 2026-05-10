const features = [
  ["Quest Engine API", "Create quests, objectives, and completion logic."],
  ["Player API", "Track users, levels, XP, and progress."],
  ["Reward API", "Manage XP, coins, unlocks, and reward history."],
  ["Inventory API", "Store items, collectibles, and game assets."],
  ["Developer Docs", "Beginner-friendly guides and examples."],
  ["Future Games", "Interactive projects powered by QuestAPIs."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_40%)]" />

        <div className="relative mx-auto max-w-5xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-blue-400">
            Welcome to QuestAPIs
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Developer APIs for apps, games, and digital adventures.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            QuestAPIs helps developers add quests, players, rewards,
            inventories, and progression systems into apps, games, dashboards,
            and future digital products.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/apis"
              className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Explore APIs
            </a>

            <a
              href="/beta"
              className="rounded-xl border border-slate-600 px-6 py-3 font-semibold transition hover:bg-slate-800"
            >
              Join Beta
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
              Platform
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Build progression systems faster.
            </h2>

            <p className="mt-4 max-w-2xl text-slate-300">
              Start with simple APIs today, then grow into more advanced tools,
              docs, demos, and future QuestAPIs products.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg transition hover:border-blue-500/50 hover:bg-slate-900"
              >
                <h3 className="text-xl font-bold text-blue-300">{title}</h3>
                <p className="mt-3 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8 md:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">
            Current Status
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            QuestAPIs is preparing for public beta.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Early testers can explore the platform, test API systems, and help
            shape the next version before public release.
          </p>

          <a
            href="/beta"
            className="mt-8 inline-block rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Request Beta Access
          </a>
        </div>
      </section>
    </main>
  );
}