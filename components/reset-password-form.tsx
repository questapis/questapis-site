"use client";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
export function ResetPasswordForm() {
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); const password = String(form.get("password") ?? "");
    try { const { error } = await createClient().auth.updateUser({ password }); if (error) throw error; setMessage("Password updated. You can now sign in."); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Unable to update the password."); }
  }
  return <form className="auth-form quest-card" onSubmit={submit}><label>New password<input name="password" type="password" minLength={8} autoComplete="new-password" required /></label><button className="button">Update password</button><p className="form-message" aria-live="polite">{message}</p></form>;
}
