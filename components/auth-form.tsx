"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AuthForm({ mode }: { mode: "login" | "signup" | "reset" }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    try {
      const supabase = createClient();
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/dashboard");
        router.refresh();
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/auth/callback` } });
        if (error) throw error;
        if (data.session) {
          router.push("/onboarding");
          router.refresh();
        } else {
          setMessage("Check your email to verify your account, then return to sign in.");
        }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/account/reset` });
        if (error) throw error;
        setMessage("If an account exists, a reset link is on its way.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to continue. Try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="auth-form quest-card" onSubmit={submit}>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      {mode !== "reset" && <label>Password<input name="password" type="password" minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} required /></label>}
      <button className="button" disabled={busy}>{busy ? "Opening the gate…" : mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}</button>
      <p className="form-message" aria-live="polite">{message}</p>
      <p className="small muted">{mode === "login" ? <>New here? <Link href="/signup">Create an account</Link>. <Link href="/forgot-password">Forgot password?</Link></> : <>Already exploring? <Link href="/login">Sign in</Link>.</>}</p>
    </form>
  );
}
