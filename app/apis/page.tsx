import Link from "next/link";
import { apiProducts } from "@/lib/platform-data";
export const metadata = { title: "API catalog | QuestAPIs", description: "Explore the QuestAPIs development sandbox and planned API products." };
const label = { sandbox: "Development sandbox", planned: "Phase 2 planned", "legacy-beta": "Legacy reference" };
export default function APIsPage() {
  return <main id="main-content" className="shell standard-page">
    <p className="eyebrow">Developer platform</p><h1>API catalog</h1>
    <p className="page-lede">One working teaching sandbox proves the v2 request path. The broader catalog is intentionally not presented as production-ready during Phase 1.</p>
    <div className="catalog-grid">{apiProducts.map((api) => <article className="quest-card api-card" key={api.slug}>
      <div className="api-title"><span aria-hidden="true">{api.icon}</span><div><small className="status">{label[api.availability]}</small><h2>{api.name}</h2></div></div>
      <p className="muted">{api.description}</p><dl><div><dt>Version</dt><dd>{api.version}</dd></div><div><dt>Rate limit</dt><dd>{api.rateLimit}</dd></div><div><dt>Endpoint</dt><dd><code>{api.endpoint}</code></dd></div></dl>
      {api.availability === "sandbox" ? <div className="actions"><Link className="button" href="/playground">Try it →</Link><Link className="button secondary" href="/docs">Read docs</Link></div> : <span className="muted small">No v2 API key can activate this product yet.</span>}
    </article>)}</div>
  </main>;
}
