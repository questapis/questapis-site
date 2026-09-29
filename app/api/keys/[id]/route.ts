import { apiError, requireUser } from "@/lib/server/responses";

export async function DELETE(_request: Request, context: RouteContext<"/api/keys/[id]">) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const { id } = await context.params;
  const { data, error } = await auth.supabase.rpc("revoke_api_key", { p_key_id: id });
  if (error) return apiError("KEY_REVOKE_FAILED", "Could not revoke the API key.", 500);
  if (!data) return apiError("NOT_FOUND", "API key not found.", 404);
  return Response.json({ data: { revoked: true } });
}

