const pillars = [
  {
    title: "Developer Friendly",
    description:
      "QuestAPIs is built to be approachable for beginners while remaining powerful enough to grow with larger projects.",
  },
  {
    title: "Modular by Design",
    description:
      "Each API is designed to work independently or together, allowing developers to build exactly what they need.",
  },
  {
    title: "Built for Growth",
    description:
      "QuestAPIs is expanding beyond APIs into tools, demos, developer resources, and future digital experiences.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
          About QuestAPIs
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Building developer tools with progression in mind.
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          QuestAPIs is a growing ecosystem of developer-friendly APIs, tools,
          and future interactive experiences designed to make building apps,
          games, and digital products easier, faster, and more engaging.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h2 className="text-2xl font-bold text-blue-300">
                {pillar.title}
              </h2>

              <p className="mt-4 text-slate-300">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-8">
          <h2 className="text-3xl font-bold text-blue-200">
            The Vision
          </h2>

          <p className="mt-4 text-lg text-slate-300">
            QuestAPIs aims to become a flexible ecosystem where developers can
            plug in progression systems, player management, rewards, inventories,
            and future tools without rebuilding the same backend systems from
            scratch.
          </p>

          <p className="mt-4 text-slate-300">
            Today that starts with APIs. Tomorrow it grows into tools, demos,
            SDKs, and future interactive products.
          </p>
        </div>
      </section>
    </main>
  );
}