"use client";
import Link from "next/link";
import { useEffect } from "react";
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main id="main-content" className="shell state-page"><span className="state-code">!</span><p className="eyebrow">Unexpected detour</p><h1>Something interrupted the journey.</h1><p className="muted">Try loading this view again. If the problem continues, check service status or report the issue.</p><div className="actions"><button className="button" onClick={() => reset()}>Try again</button><Link className="button secondary" href="/status">View status</Link><Link className="text-link" href="/feedback">Report this problem →</Link></div></main>;
}

