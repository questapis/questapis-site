import { z } from "zod";
import { apiError, requireUser } from "@/lib/server/responses";

const bodySchema = z.object({ item: z.string().trim().min(1).max(80) });

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return apiError("INVALID_REQUEST", "Choose an owned cosmetic.", 400);
  const { data, error } = await auth.supabase.rpc("equip_cosmetic", { p_item_slug: parsed.data.item });
  if (error) return apiError("EQUIP_REJECTED", error.message, error.code === "P0001" ? 409 : 500);
  return Response.json({ data });
}

