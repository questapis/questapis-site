"use client";

import { FormEvent, useState } from "react";

type KeyRecord = { id: string; name: string; key_prefix: string; created_at: string; last_used_at: string | null };

export function ApiKeyManager({ initialKeys, usageCount }: { initialKeys: KeyRecord[]; usageCount: number }) {
  const [keys, setKeys] = useState(initialKeys);
  const [rawKey, setRawKey] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setRawKey("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/keys", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: String(form.get("name") ?? "") }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error?.message ?? "Could not create the key.");
      setRawKey(result.data.key);
      setKeys((current) => [{ id: result.data.id, name: result.data.name, key_prefix: result.data.prefix, created_at: new Date().toISOString(), last_used_at: null }, ...current]);
      setMessage("Key created. Copy it now; the raw value cannot be recovered later.");
      event.currentTarget.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not create the key.");
    } finally { setBusy(false); }
  }

  async function revoke(id: string) {
    setBusy(true);
    try {
      const response = await fetch(`/api/keys/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error?.message ?? "Could not revoke the key.");
      setKeys((current) => current.filter((key) => key.id !== id));
      setMessage("Key revoked. Requests using it will now fail.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not revoke the key.");
    } finally { setBusy(false); }
  }

  return <section className="quest-card dashboard-card wide">
    <span className="card-index">DEVELOPER KEYS · {usageCount} METERED REQUESTS</span>
    <h2>API keys</h2>
    <p className="muted">Create a replacement before revoking an old key. Only prefixes and one-way hashes are retained.</p>
    <form className="inline-form" onSubmit={create}>
      <label>Key name<input name="name" maxLength={60} required placeholder="Local development" /></label>
      <button className="button" disabled={busy}>Create key</button>
    </form>
    {rawKey && <div className="notice"><strong>Copy this key now</strong><p><code>{rawKey}</code></p><button className="text-link" onClick={() => navigator.clipboard?.writeText(rawKey)}>Copy key</button></div>}
    <p className="form-message" aria-live="polite">{message}</p>
    <div className="key-list">{keys.length ? keys.map((key) => <div key={key.id}><span><strong>{key.name}</strong><small>{key.key_prefix}… · {key.last_used_at ? "Used" : "Never used"}</small></span><button className="text-link" disabled={busy} onClick={() => void revoke(key.id)}>Revoke</button></div>) : <p className="muted">No active keys yet.</p>}</div>
  </section>;
}
