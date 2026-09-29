"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const paths = ["I have never coded before", "I know a little coding", "I want to learn APIs", "I want to use APIs", "I am building a project"];

export function OnboardingForm() {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function save() {
    if (!selected) return setMessage("Choose the path that sounds closest to you.");
    setBusy(true);
    const response = await fetch("/api/onboarding", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: selected }) });
    const result = await response.json();
    if (!response.ok) { setMessage(result.error?.message ?? "Could not save your starting point."); setBusy(false); return; }
    router.push("/dashboard");
    router.refresh();
  }
  return <>
    <div className="choice-list">{paths.map((path) => <button key={path} aria-pressed={selected === path} onClick={() => setSelected(path)}>{path}<span>→</span></button>)}</div>
    <button className="button" disabled={busy} onClick={() => void save()}>{busy ? "Saving…" : "Continue to dashboard"}</button>
    <p className="form-message" aria-live="polite">{message}</p>
  </>;
}
