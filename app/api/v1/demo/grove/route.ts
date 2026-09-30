import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hashApiKey, hashesMatch } from "@/lib/server/api-keys";
import { recordStripeUsage } from "@/lib/server/billing";
import { logServerEvent } from "@/lib/server/logger";
import { createAdminClient } from "@/lib/supabase/admin";

const querySchema = z.string().trim().min(1).max(40).regex(/^[a-zA-Z0-9 -]+$/);
function validKey(value: string | null) {
  const expectedHash = process.env.DEMO_API_KEY_SHA256;
  if (!expectedHash) return process.env.NODE_ENV !== "production";
  if (!value) return false;
  return hashesMatch(hashApiKey(value), expectedHash);
}

export async function GET(request: NextRequest) {
  const rawKey = request.headers.get("x-api-key");
  const admin = createAdminClient();
  const parsed = querySchema.safeParse(request.nextUrl.searchParams.get("place") ?? "starter-grove");
  if (admin && rawKey) {
    const started = performance.now();
    const { data, error } = await admin.rpc("meter_api_request", {
      p_key_hash: hashApiKey(rawKey),
      p_product_slug: "grove",
      p_status_code: parsed.success ? 200 : 400,
      p_latency_ms: Math.round(performance.now() - started),
    });
    if (error) {
      logServerEvent("warn", "api.authentication_failed", { route: "grove", code: error.code });
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "The API key is invalid, revoked, or over quota." } }, { status: 401 });
    }
    logServerEvent("info", "api.request_metered", { route: "grove", keyId: data?.keyId, used: data?.used });
    if (data?.userId && data?.requestId) {
      try {
        const usage = await recordStripeUsage({ userId: data.userId, requestId: data.requestId, units: 1 });
        if (usage.delivered) {
          await admin.from("stripe_usage_events").update({ delivered_at: new Date().toISOString() }).eq("request_id", data.requestId);
        }
      } catch (error) {
        logServerEvent("warn", "stripe.usage_delivery_deferred", {
          requestId: data.requestId,
          message: error instanceof Error ? error.message : "Unknown usage delivery failure",
        });
      }
    }
  } else if (!validKey(rawKey)) {
    return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Provide a valid API key in the x-api-key header." } }, { status: 401 });
  }
  if (!parsed.success) {
    return NextResponse.json({ error: { code: "INVALID_PARAMETER", message: "place must be 1–40 letters, numbers, spaces, or hyphens." } }, { status: 400 });
  }
  const response = NextResponse.json({ data: { place: parsed.data.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()), weather: "Clear skies", temperatureC: 18 }, meta: { api: "grove", version: "v1", sample: true } });
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-RateLimit-Limit", "30");
  return response;
}
