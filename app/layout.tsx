import Image from "next/image";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";


export const metadata = {
  title: "QuestAPIs | Developer APIs & Digital Adventures",
  description:
    "Developer-friendly APIs, tools, docs, beta access, and future digital experiences.",
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
      <body>
        <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-black/70 px-6 py-4 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
            <a href="/" className="flex items-center gap-4">
              <Image
  src="/questapis-logo.png"
  alt="QuestAPIs Logo"
  width={120}
  height={120}
  className="h-20 w-20 object-contain"
/>

              <div>
                <p className="text-2xl font-bold tracking-widest text-white">
                  QUEST<span className="text-blue-500">APIS</span>
                </p>
                <p className="text-xs tracking-[0.35em] text-slate-400">
                  CODE • BUILD • CONQUER
                </p>
              </div>
            </a>

            <div className="hidden gap-8 text-base font-medium text-slate-200 md:flex">
              {navLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="transition hover:text-blue-400"
                >
                  {label}
                </a>
              ))}
            </div>

            <a
              href="/beta"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 quest-glow"
            >
              Join Beta
            </a>
          </div>
        </nav>

        {children}

        <footer className="border-t border-slate-800/80 bg-black/50 px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>© 2026 QuestAPIs. Code • Build • Conquer.</p>

            <div className="flex gap-5">
              <a href="/apis" className="hover:text-blue-400">APIs</a>
              <a href="/docs" className="hover:text-blue-400">Docs</a>
              <a href="/beta" className="hover:text-blue-400">Beta</a>
            </div>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}