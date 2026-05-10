import "./globals.css";

export const metadata = {
  title: "QuestAPIs | Developer APIs & Digital Adventures",
  description:
    "Developer-friendly APIs, tools, docs, beta access, and future digital experiences for builders, creators, and game developers.",
};

const navLinks = [
  ["Home", "/"],
  ["APIs", "/apis"],
  ["Docs", "/docs"],
  ["Projects", "/projects"],
  ["Games", "/games"],
  ["Beta", "/beta"],
  ["About", "/about"],
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 px-6 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/10 text-lg font-black text-blue-300">
                Q
              </div>

              <div>
                <p className="text-lg font-bold text-white">QuestAPIs</p>
                <p className="text-xs text-slate-400">Developer API Platform</p>
              </div>
            </a>

            <div className="hidden gap-5 text-sm text-slate-300 md:flex">
              {navLinks.map(([label, href]) => (
                <a key={label} href={href} className="transition hover:text-blue-300">
                  {label}
                </a>
              ))}
            </div>

            <a
              href="/beta"
              className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Join Beta
            </a>
          </div>
        </nav>

        {children}

        <footer className="border-t border-slate-800 px-6 py-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>© 2026 QuestAPIs. All rights reserved.</p>

            <div className="flex gap-4">
              <a href="/apis" className="hover:text-blue-300">APIs</a>
              <a href="/docs" className="hover:text-blue-300">Docs</a>
              <a href="/beta" className="hover:text-blue-300">Beta</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}