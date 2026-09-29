import Link from "next/link";
import { faqGroups } from "@/lib/help-content";

export function HelpCenter() {
  return <>
    <section className="help-hero">
      <p className="eyebrow">QuestAPIs support</p><h1>How can we help?</h1>
      <p className="page-lede">Start with the common questions below, follow the developer documentation, or send structured feedback when something is wrong.</p>
      <div className="help-actions"><Link className="button" href="/docs">Read developer docs →</Link><Link className="button secondary" href="/feedback">Report a problem</Link></div>
    </section>
    <section className="support-grid" aria-label="Support paths">
      <article className="quest-card"><span aria-hidden="true">✦</span><h2>Learning help</h2><p>Review the first quest, learning regions, and beginner explanations.</p><Link href="/learn">Visit the Academy →</Link></article>
      <article className="quest-card"><span aria-hidden="true">{`{ }`}</span><h2>API help</h2><p>Find authentication, request, response, error, and rate-limit guidance.</p><Link href="/docs">Open documentation →</Link></article>
      <article className="quest-card"><span aria-hidden="true">⌁</span><h2>Service health</h2><p>Check which services are available without invented uptime claims.</p><Link href="/status">View service status →</Link></article>
    </section>
    <section id="faq" className="faq-section" aria-labelledby="faq-heading"><p className="eyebrow">Frequently asked questions</p><h2 id="faq-heading">Answers for the road ahead.</h2>
      <div className="faq-groups">{faqGroups.map((group) => <section key={group.title}><h3>{group.title}</h3>{group.questions.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</section>)}</div>
    </section>
    <section className="notice"><strong>Still stuck?</strong><p>Use the <Link href="/feedback">feedback form</Link> to categorize a bug, lesson problem, documentation issue, or feature suggestion. Submission storage becomes active with the staging database.</p></section>
  </>;
}

