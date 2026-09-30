"use client";

import { useState } from "react";

export function BillingAction({ action, children, disabled = false }: { action: "checkout" | "portal"; children: React.ReactNode; disabled?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/billing/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: action === "checkout" ? JSON.stringify({ plan: "adventurer", attemptId: crypto.randomUUID() }) : undefined,
      });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error?.message ?? "Billing is temporarily unavailable.");
      window.location.assign(result.url);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Billing is temporarily unavailable.");
      setBusy(false);
    }
  }

  return <>
    <button className="button" type="button" disabled={disabled || busy} onClick={() => void submit()}>
      {busy ? "Opening secure checkout…" : children}
    </button>
    {message && <p className="form-message" role="alert">{message}</p>}
  </>;
}
