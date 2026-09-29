"use client";
import { useState } from "react";

export function ApiPlayground() {
  const [place, setPlace] = useState("starter-grove");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("Run the request to see formatted JSON here.");
  const [status, setStatus] = useState("Ready");
  const [busy, setBusy] = useState(false);
  async function run() {
    setBusy(true);
    setStatus("Sending…");
    try {
      const response = await fetch(`/api/v1/demo/grove?place=${encodeURIComponent(place)}`, { headers: key ? { "x-api-key": key } : {} });
      const json = await response.json();
      setStatus(`${response.status} ${response.statusText}`);
      setResult(JSON.stringify(json, null, 2));
    } catch {
      setStatus("Network error");
      setResult(JSON.stringify({ error: { code: "NETWORK_ERROR", message: "The request could not reach the server." } }, null, 2));
    } finally { setBusy(false); }
  }
  return (
    <div className="playground-console">
      <div className="request-builder">
        <label>Method<select aria-label="HTTP method" disabled><option>GET</option></select></label>
        <label>Endpoint<input value="/api/v1/demo/grove" readOnly /></label>
        <label>place query parameter<input value={place} onChange={(e) => setPlace(e.target.value)} maxLength={40} /></label>
        <label>API key <span className="muted">(required when configured)</span><input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="qapi_dev_…" autoComplete="off" /></label>
        <button className="button" onClick={run} disabled={busy}>{busy ? "Running…" : "Run request →"}</button>
      </div>
      <div className="response-panel">
        <div><span>Response</span><strong>{status}</strong></div>
        <pre tabIndex={0}>{result}</pre>
        <button className="text-link" onClick={() => navigator.clipboard?.writeText(result)}>Copy response</button>
      </div>
    </div>
  );
}

