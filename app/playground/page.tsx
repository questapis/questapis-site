import { ApiPlayground } from "@/components/api-playground";
export const metadata = { title: "API Playground | QuestAPIs" };
export default function PlaygroundPage() { return <main id="main-content" className="shell standard-page"><p className="eyebrow">Developer tool</p><h1>API Playground</h1><p className="page-lede">Make a real request to the read-only Grove development API. In local development, a key is optional; production staging requires a configured key.</p><ApiPlayground /><aside className="notice"><strong>Safe sandbox</strong><p>This runner only calls a server-owned, allowlisted QuestAPIs endpoint. It cannot send requests to arbitrary URLs.</p></aside></main>; }

