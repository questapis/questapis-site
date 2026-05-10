const benefits = [
  "Early access to QuestAPIs APIs",
  "Free beta testing API keys",
  "Beginner-friendly setup guidance",
  "Example projects and implementation ideas",
  "Priority feedback during testing",
  "Access before public release",
];

export default function BetaPage() {
  return (
    <main className="min-h-screen px-6 py-20 text-white">
  <section className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
          QuestAPIs Beta Access
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Join the QuestAPIs Beta Program
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          Get early access to QuestAPIs and help shape the future of our
          RPG-inspired developer ecosystem. Beta testers can explore APIs,
          provide feedback, and gain access before public launch.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="quest-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-blue-300">
              Beta Benefits
            </h2>

            <ul className="mt-6 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-slate-300">
                  <span className="text-blue-400">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
            <h2 className="text-2xl font-bold text-blue-200">
              Request Beta Access
            </h2>

            <p className="mt-4 text-slate-300">
              Spots are limited for the current QuestAPIs beta. Join now to
              request access and become one of our early testers.
            </p>

            <a
              href="https://landing-page-three-pi-87.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600 transition"
            >
              Join Beta Now
            </a>

            <p className="mt-4 text-sm text-slate-400">
              Limited early access • Active beta testing in progress
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}