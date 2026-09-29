import Link from "next/link";
import { plans } from "@/lib/platform-data";
export const metadata = { title: "Pricing | QuestAPIs" };
export default function PricingPage() { return <main id="main-content" className="shell standard-page"><p className="eyebrow">Plans</p><h1>Start free. Grow when you’re ready.</h1><p className="page-lede">Final premium pricing has not been set. Entitlements are designed independently from prices so plans can evolve safely.</p><div className="pricing-grid">{plans.map((plan) => <article className="quest-card plan-card" key={plan.name}><span className="status">{plan.name}</span><h2>{plan.price}</h2><p className="muted">{plan.description}</p><ul>{plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul><Link className="button" href={plan.href}>{plan.cta}</Link></article>)}</div></main>; }

