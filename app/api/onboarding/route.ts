import { z } from "zod";
import { apiError, requireUser } from "@/lib/server/responses";

const schema = z.object({ path: z.enum(["I have never coded before", "I know a little coding", "I want to learn APIs", "I want to use APIs", "I am building a project"]) });

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return apiError("INVALID_REQUEST", "Choose a valid starting path.", 400);
  const { data, error } = await auth.supabase.rpc("complete_onboarding", { p_path: parsed.data.path });
  if (error) return apiError("ONBOARDING_FAILED", "Could not save your starting point.", 500);
  return Response.json({ data });
}
