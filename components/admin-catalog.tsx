"use client";

import { FormEvent, useState } from "react";

export function AdminCatalog() {
  const [kind, setKind] = useState("lesson");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const payload: Record<string, string> = { kind, status: String(form.get("status")) };
    if (kind === "announcement") {
      payload.title = String(form.get("name"));
      payload.body = String(form.get("description"));
    } else {
      payload.slug = String(form.get("slug"));
      if (kind !== "lesson") {
        payload.name = String(form.get("name"));
        payload.description = String(form.get("description"));
      }
    }
    const response = await fetch("/api/admin/catalog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    setMessage(response.ok ? `${kind} saved.` : result.error?.message ?? "The update failed.");
    setBusy(false);
  }
  return <form className="auth-form quest-card" onSubmit={submit}>
    <label>Content type<select value={kind} onChange={(event) => setKind(event.target.value)}><option value="lesson">Academy lesson status</option><option value="apiProduct">API product</option><option value="achievement">Achievement</option><option value="announcement">Announcement</option></select></label>
    {kind !== "announcement" && <label>Slug<input name="slug" required maxLength={80} placeholder={kind === "lesson" ? "what-is-an-api" : "stable-identifier"} /></label>}
    {kind !== "lesson" && <><label>{kind === "announcement" ? "Title" : "Name"}<input name="name" required maxLength={120} /></label><label>{kind === "announcement" ? "Body" : "Description"}<textarea name="description" required maxLength={kind === "announcement" ? 2000 : 1000} /></label></>}
    <label>Status<select name="status">{kind === "apiProduct" ? <><option>draft</option><option>active</option><option>archived</option></> : <><option>draft</option><option>published</option><option>archived</option></>}</select></label>
    <button className="button" disabled={busy}>{busy ? "Saving…" : "Save catalog change"}</button>
    <p className="form-message" aria-live="polite">{message}</p>
  </form>;
}
