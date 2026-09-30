import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { authFailureReason } from "@/lib/auth-errors";
import { logServerEvent } from "@/lib/server/logger";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const suppliedError = url.searchParams.get("error_description") ?? url.searchParams.get("error");
  const requestedNext = url.searchParams.get("next");
  const next = requestedNext?.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : null;
  const supabase = await createClient();

  let authError = suppliedError;
  if (!authError && !supabase) authError = "Authentication is temporarily unavailable.";
  if (!authError && supabase && code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    authError = error?.message ?? null;
  } else if (!authError && supabase && tokenHash && isEmailOtpType(type)) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    authError = error?.message ?? null;
  } else if (!authError && !code && !tokenHash) {
    authError = "The email link is missing its verification token.";
  }

  if (authError) {
    const reason = authFailureReason(authError);
    logServerEvent("warn", "auth.callback_failed", { reason, message: authError });
    const destination = new URL("/login", url.origin);
    destination.searchParams.set("reason", reason);
    return NextResponse.redirect(destination);
  }

  const destination = type === "recovery" ? "/account/reset" : next ?? "/onboarding";
  return NextResponse.redirect(new URL(destination, url.origin));
}

function isEmailOtpType(value: string | null): value is EmailOtpType {
  return value !== null && ["signup", "invite", "magiclink", "recovery", "email_change", "email"].includes(value);
}
