import Link from "next/link";

export const metadata = {
  title: "Beta applications closed | QuestAPIs",
  description: "The QuestAPIs private beta application window is closed while the v2 platform foundation is validated.",
  robots: { index: false, follow: true },
};

export default function BetaPage() {
  return (
    <main id="main-content" tabIndex={-1} className="shell standard-page state-page">
      <p className="eyebrow">Beta window closed</p>
      <h1>The first expedition has reached camp.</h1>
      <p className="page-lede">
        Applications are closed while we validate authentication, persistent learning,
        earned rewards, developer keys, and the Grove API in an isolated staging environment.
      </p>
      <div className="notice">
        <strong>Already applied?</strong>
        <p>Your application does not need to be resubmitted. Future access details will appear here only after the platform foundation passes its readiness checks.</p>
      </div>
      <div className="actions">
        <Link className="button" href="/learn">Explore Starter Grove →</Link>
        <Link className="text-link" href="/changelog">Read the changelog →</Link>
      </div>
    </main>
  );
}
