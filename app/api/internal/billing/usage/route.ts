import { timingSafeEqual } from "node:crypto";
import { flushPendingStripeUsage } from "@/lib/server/billing";
import { logServerEvent } from "@/lib/server/logger";

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");
  if (!secret || !authorization?.startsWith("Bearer ")) return false;
  const supplied = Buffer.from(authorization.slice(7));
  const expected = Buffer.from(secret);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export async function POST(request: Request) {
  if (!authorized(request)) return new Response("Unauthorized", { status: 401 });
  try {
    return Response.json(await flushPendingStripeUsage());
  } catch (error) {
    logServerEvent("error", "stripe.usage_flush_failed", {
      message: error instanceof Error ? error.message : "Unknown usage flush failure",
    });
    return new Response("Usage delivery failed.", { status: 500 });
  }
}
