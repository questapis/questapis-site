import Image from "next/image";

const features = [
  {
    icon: "</>",
    title: "Powerful APIs",
    text: "Robust, scalable, and easy to integrate APIs for your applications.",
    color: "bg-blue-600/25 text-blue-300",
  },
  {
    icon: "▣",
    title: "Developer Docs",
    text: "Clear, comprehensive documentation and code examples.",
    color: "bg-purple-600/25 text-purple-300",
  },
  {
    icon: "↗",
    title: "Developer Tools",
    text: "Tools and SDKs to simplify integration and speed up development.",
    color: "bg-emerald-600/25 text-emerald-300",
  },
  {
    icon: "◇",
    title: "Secure & Reliable",
    text: "Built with access control, API keys, and growth-ready systems in mind.",
    color: "bg-yellow-600/25 text-yellow-300",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020711] text-white">
      <section className="relative border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(37,99,235,0.30),transparent_32%),radial-gradient(circle_at_30%_20%,rgba(15,23,42,0.9),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,7,17,0.2),#020711)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Power Your Ideas.
              <br />
              <span className="text-blue-500">Build</span> the Future.
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-300">
              QuestAPIs provides developer-friendly APIs, tools, and resources
              to help you build, integrate, and scale digital experiences.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href="/apis"
                className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-[0_0_35px_rgba(37,99,235,0.45)] transition hover:bg-blue-500"
              >
                Explore APIs →
              </a>

              <a
                href="/docs"
                className="rounded-xl border border-slate-700 bg-black/30 px-8 py-4 text-lg font-bold text-white transition hover:border-blue-500 hover:bg-slate-900"
              >
                Read Docs
              </a>
            </div>
          </div>

          <div className="relative hidden items-center justify-center md:flex">
            <div className="absolute h-[520px] w-[520px] rounded-full border border-blue-500/10" />
            <div className="absolute h-[430px] w-[430px] rounded-full border border-blue-500/10" />
            <div className="absolute h-[340px] w-[340px] rounded-full bg-blue-600/20 blur-3xl" />

            <Image
              src="/questapis-logo.png"
              alt="QuestAPIs Logo"
              width={560}
              height={560}
              priority
              className="relative drop-shadow-[0_0_40px_rgba(37,99,235,0.35)]"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-500">
            Built for Developers
          </p>

          <h2 className="mt-4 text-4xl font-black">
            Everything You Need to Build
          </h2>

          <p className="mt-4 text-lg text-slate-300">
            APIs, tools, documentation, and support to accelerate your next
            project.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 text-left shadow-2xl transition hover:border-blue-500/50 hover:bg-slate-900/80"
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-black ${feature.color}`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold">{feature.title}</h3>

                <p className="mt-4 leading-7 text-slate-300">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}