"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton({ className = "text-link" }: { className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return <button className={className} disabled={busy} onClick={async () => {
    setBusy(true);
    await createClient().auth.signOut();
    router.replace("/login");
    router.refresh();
  }}>{busy ? "Signing out…" : "Sign out"}</button>;
}
