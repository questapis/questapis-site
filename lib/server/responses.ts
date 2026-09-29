import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export function apiError(code: string, message: string, status: number) {
  return NextResponse.json({ error: { code, message } }, { status });
}

export async function requireUser() {
  const supabase = await createClient();
  if (!supabase) return { error: apiError("SERVICE_UNAVAILABLE", "Account services are not configured.", 503) } as const;
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return { error: apiError("UNAUTHORIZED", "Sign in to continue.", 401) } as const;
  return { supabase, user: data.user } as const;
}

export async function requireAdmin() {
  const auth = await requireUser();
  if ("error" in auth) return auth;
  const { data: profile } = await auth.supabase.from("profiles").select("role").eq("id", auth.user.id).single();
  if (profile?.role !== "admin") return { error: apiError("FORBIDDEN", "Administrator access is required.", 403) } as const;
  const admin = createAdminClient();
  if (!admin) return { error: apiError("SERVICE_UNAVAILABLE", "Administrative services are not configured.", 503) } as const;
  return { supabase: auth.supabase, user: auth.user, admin } as const;
}
