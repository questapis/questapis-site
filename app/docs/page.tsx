const docSections = [
  {
    title: "Getting Started",
    description: "Learn what QuestAPIs is, how it works, and how to start testing.",
    links: ["What is QuestAPIs?", "How APIs work", "Beta setup checklist"],
  },
  {
    title: "API Guides",
    description: "Step-by-step guides for using each QuestAPIs product.",
    links: ["Quest Engine API", "Player API", "Reward API", "Inventory API"],
  },
  {
    title: "Code Examples",
    description: "Simple examples for beginners using curl, JavaScript, and future SDKs.",
    links: ["curl examples", "JavaScript fetch", "Example project ideas"],
  },
  {
    title: "Account & Access",
    description: "Information about beta keys, usage limits, and future paid plans.",
    links: ["Beta keys", "Free tier limits", "Upgrade path"],
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
          Developer Docs
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Build with QuestAPIs
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          Beginner-friendly documentation for using QuestAPIs in apps, games,
          dashboards, and future digital projects.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {docSections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h2 className="text-2xl font-bold text-blue-300">
                {section.title}
              </h2>

              <p className="mt-3 text-slate-300">
                {section.description}
              </p>

              <ul className="mt-6 space-y-3">
                {section.links.map((link) => (
                  <li
                    key={link}
                    className="rounded-xl bg-slate-800 px-4 py-3 text-slate-300"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
          <h2 className="text-2xl font-bold text-blue-200">
            Full Documentation Coming Soon
          </h2>

          <p className="mt-4 text-slate-300">
            QuestAPIs docs are being built alongside the beta. For now, this
            page gives users a clear preview of what documentation will include.
          </p>
        </div>
      </section>
    </main>
  );
}