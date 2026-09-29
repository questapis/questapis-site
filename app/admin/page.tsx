import { AdminCatalog } from "@/components/admin-catalog";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Admin | QuestAPIs", robots: { index: false, follow: false } };
export default async function AdminPage() {
  const supabase = await createClient();
  const { data: auth } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const { data: profile } = auth.user && supabase ? await supabase.from("profiles").select("role").eq("id", auth.user.id).single() : { data: null };
  const isAdmin = profile?.role === "admin";
  return <main id="main-content" className="shell standard-page"><p className="eyebrow">Role-protected control plane</p><h1>Administration</h1>{isAdmin ? <><div className="notice"><strong>Staging administrator session verified.</strong><p>All writes are re-authorized on the server. UI visibility does not grant access.</p></div><AdminCatalog /></> : <div className="notice"><strong>Access denied by default.</strong><p>Sign in with an explicitly assigned administrator role to manage Academy lesson status, API products, achievements, and announcements.</p></div>}<div className="admin-grid">{["Academy content", "API products", "Achievements & rewards", "Announcements"].map((item) => <article className="quest-card" key={item}><h2>{item}</h2><p className="muted">{isAdmin ? "Managed through the reviewed catalog endpoint" : "Administrator role required"}</p></article>)}</div></main>;
}
