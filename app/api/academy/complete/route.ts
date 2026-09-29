import { z } from "zod";
import { logServerEvent } from "@/lib/server/logger";
import { apiError, requireUser } from "@/lib/server/responses";

const bodySchema = z.object({
  lesson: z.string().trim().min(1).max(80),
  answers: z.record(z.string(), z.unknown()),
  idempotencyKey: z.string().uuid(),
});

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return apiError("INVALID_REQUEST", "Provide a lesson, answers, and idempotency key.", 400);

  const { data, error } = await auth.supabase.rpc("complete_lesson", {
    p_lesson_slug: parsed.data.lesson,
    p_answers: parsed.data.answers,
    p_request_key: parsed.data.idempotencyKey,
  });
  if (error) {
    logServerEvent("warn", "academy.completion_failed", { userId: auth.user.id, code: error.code });
    return apiError("COMPLETION_REJECTED", error.message, error.code === "P0001" ? 409 : 500);
  }
  logServerEvent("info", "academy.completion_recorded", { userId: auth.user.id, lesson: parsed.data.lesson });
  return Response.json({ data });
}

