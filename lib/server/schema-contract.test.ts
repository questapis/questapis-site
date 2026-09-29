import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const foundation = readFileSync(resolve("supabase/migrations/202609280001_v2_foundation.sql"), "utf8");
const hardening = readFileSync(resolve("supabase/migrations/202609280002_phase_1_5_transactions.sql"), "utf8");

describe("Phase 1.5 database contract", () => {
  it("pins idempotency and ownership in database constraints", () => {
    expect(foundation).toContain("unique(user_id, lesson_id, reward_version)");
    expect(foundation).toContain("idempotency_key text unique not null");
    expect(foundation).toContain("primary key(user_id, item_id)");
    expect(hardening).toContain("for update");
    expect(hardening).toContain("'purchase:' || v_user || ':' || v_item.id");
  });

  it("keeps authority-bearing RPCs scoped to authenticated or service roles", () => {
    expect(hardening).toContain("revoke all on function public.complete_lesson");
    expect(hardening).toContain("grant execute on function public.complete_lesson(text, jsonb, uuid) to authenticated");
    expect(hardening).toContain("grant execute on function public.meter_api_request(text, text, integer, integer) to service_role");
  });

  it("rejects revoked keys and meters quota atomically", () => {
    expect(hardening).toContain("where key_hash = p_key_hash and revoked_at is null for update");
    expect(hardening).toContain("do update set used = public.api_quota_windows.used + 1");
    expect(hardening).toContain("if v_used > v_key.quota_limit then raise exception 'API quota exceeded'");
  });
});

