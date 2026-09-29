import Link from "next/link";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { PwaRegistration } from "@/components/pwa-registration";
export const metadata = {
  metadataBase: new URL("https://questapis.dev"),
  title: "QuestAPIs | Learn APIs. Build your adventure.",
  description:
    "Learn APIs from zero, with no coding experience required. Explore QuestAPIs developer APIs for quests, players, rewards, and inventory.",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  applicationName: "QuestAPIs Academy",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "QuestAPIs" },
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: { title: "QuestAPIs | Learn APIs. Build your adventure.", description: "Learn APIs from zero through real requests, quests, and projects.", url: "https://questapis.dev", siteName: "QuestAPIs", type: "website" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <PwaRegistration />
        {children}
        <footer className="site-footer">
          <div className="shell footer-inner">
            <div>
              <Link href="/" className="footer-brand">
                QUEST<span>APIS</span>
              </Link>
              <p>Code. Build. Conquer.</p>
              <p className="small">© 2026 QuestAPIs</p>
            </div>
            <nav aria-label="Footer navigation">
              {[
                ["Learn", "/learn"],
                ["APIs", "/apis"],
                ["Docs", "/docs"],
                ["Pricing", "/pricing"],
                ["Playground", "/playground"],
                ["Dashboard", "/dashboard"],
                ["Shop", "/shop"],
                ["Projects", "/projects"],
                ["About", "/about"],
                ["Status", "/status"],
                ["Help & FAQ", "/help"],
                ["Changelog", "/changelog"],
                ["Feedback", "/feedback"],
              ].map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
