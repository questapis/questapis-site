import Link from "next/link";
import { achievements } from "@/lib/platform-data";
import { createClient } from "@/lib/supabase/server";
import { ApiKeyManager } from "@/components/api-key-manager";
import { LogoutButton } from "@/components/logout-button";
export const metadata = { title: "Dashboard | QuestAPIs" };
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const { data: profile } = data.user && supabase ? await supabase.from("profiles").select("display_name,xp,gold,current_streak").single() : { data: null };
  const { data: keys } = data.user && supabase ? await supabase.from("api_keys").select("id,name,key_prefix,created_at,last_used_at").is("revoked_at", null).order("created_at", { ascending: false }) : { data: [] };
  const { count: usageCount } = data.user && supabase ? await supabase.from("api_usage").select("id", { count: "exact", head: true }) : { count: 0 };
  const xp = profile?.xp ?? 0;
  return <main id="main-content" className="shell dashboard-page">
    <div className="dashboard-head"><div><p className="eyebrow">Command camp</p><h1>{data.user ? `Welcome back, ${profile?.display_name || data.user.email?.split("@")[0]}` : "Your QuestAPIs dashboard"}</h1><p className="muted">Academy progress and developer tools, together without mixing their jobs.</p>{data.user && <LogoutButton />}</div><div className="player-chip"><span className="avatar">LF</span><div><b>New Adventurer</b><small>{xp} XP earned</small></div><span className="gold">◈ {profile?.gold ?? 0}</span></div></div>
    {!data.user && <div className="notice"><strong>Connect an account to save progress.</strong><p>The dashboard is showing its empty foundation because authentication is not active for this session. <Link href="/login">Sign in</Link> or <Link href="/signup">create an account</Link>.</p></div>}
    <div className="dashboard-grid">
      <section className="quest-card dashboard-card wide"><span className="card-index">NEXT QUEST</span><h2>What is an API?</h2><p className="muted">Starter Grove · 5 minute introduction</p><div className="progress"><span style={{ width: `${Math.min(100, xp)}%` }} /></div><Link className="button" href="/learn#first-quest">{xp >= 100 ? "Review quest →" : "Start quest →"}</Link></section>
      <section className="quest-card dashboard-card"><span className="card-index">STREAK</span><h2>{profile?.current_streak ?? 0} learning days</h2><p className="muted">No guilt. Your streak starts after your first verified lesson day.</p></section>
      <section className="quest-card dashboard-card"><span className="card-index">GROVE USAGE</span><h2>{usageCount ?? 0} requests</h2><p className="muted">Successful and rejected Grove calls are metered against the key&apos;s hourly quota.</p><Link className="text-link" href="/playground">Open playground →</Link></section>
      {data.user && <ApiKeyManager initialKeys={(keys ?? []) as Array<{ id: string; name: string; key_prefix: string; created_at: string; last_used_at: string | null }>} usageCount={usageCount ?? 0} />}
      <section className="quest-card dashboard-card wide"><span className="card-index">ACHIEVEMENTS</span><div className="achievement-row">{achievements.map((a) => <div key={a.name} title={a.description}><span>{a.icon}</span><small>{a.name}</small></div>)}</div></section>
    </div>
  </main>;
}
