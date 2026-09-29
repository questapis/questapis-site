import Link from "next/link";
export default function NotFound() { return <main id="main-content" className="shell state-page"><span className="state-code">404</span><p className="eyebrow">Trail not found</p><h1>This path isn’t on the map.</h1><p className="muted">The page may have moved, or the address may be incomplete. Your account and progress have not been changed.</p><div className="actions"><Link className="button" href="/">Return home</Link><Link className="button secondary" href="/help">Visit Help Center</Link></div></main>; }

