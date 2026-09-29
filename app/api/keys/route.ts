import { z } from "zod";
import { createApiKey } from "@/lib/server/api-keys";
import { apiError, requireUser } from "@/lib/server/responses";

const createSchema = z.object({ name: z.string().trim().min(1).max(60) });

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const { data, error } = await auth.supabase
    .from("developer_api_keys")
    .select("id,name,key_prefix,last_used_at,revoked_at,created_at")
    .order("created_at", { ascending: false });
  if (error) return apiError("KEY_LIST_FAILED", "Could not load API keys.", 500);
  return Response.json({ data });
}

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const parsed = createSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return apiError("INVALID_REQUEST", "Name the API key.", 400);
  const generated = createApiKey();
  const { data, error } = await auth.supabase.rpc("create_api_key", {
    p_name: parsed.data.name,
    p_prefix: generated.prefix,
    p_hash: generated.hash,
  });
  if (error) return apiError("KEY_CREATE_FAILED", "Could not create the API key.", 500);
  return Response.json({ data: { ...data, key: generated.rawKey } }, { status: 201 });
}
