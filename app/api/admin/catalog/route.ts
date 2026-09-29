import { z } from "zod";
import { logServerEvent } from "@/lib/server/logger";
import { apiError, requireAdmin } from "@/lib/server/responses";

const schema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("lesson"), slug: z.string().min(1).max(80), status: z.enum(["draft", "published", "archived"]) }),
  z.object({ kind: z.literal("apiProduct"), slug: z.string().min(1).max(80), name: z.string().min(1).max(120), description: z.string().min(1).max(1000), status: z.enum(["draft", "active", "archived"]) }),
  z.object({ kind: z.literal("achievement"), slug: z.string().min(1).max(80), name: z.string().min(1).max(120), description: z.string().min(1).max(1000), status: z.enum(["draft", "published", "archived"]) }),
  z.object({ kind: z.literal("announcement"), id: z.string().uuid().optional(), title: z.string().min(1).max(120), body: z.string().min(1).max(2000), status: z.enum(["draft", "published", "archived"]) }),
]);

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!("admin" in auth)) return auth.error;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return apiError("INVALID_REQUEST", "Catalog update is invalid.", 400);
  const entry = parsed.data;
  let query;
  if (entry.kind === "lesson") {
    query = auth.admin.from("lessons").update({ status: entry.status }).eq("slug", entry.slug).select("id,slug,status").single();
  } else if (entry.kind === "apiProduct") {
    query = auth.admin.from("api_products").upsert({ slug: entry.slug, name: entry.name, description: entry.description, status: entry.status }, { onConflict: "slug" }).select("id,slug,status").single();
  } else if (entry.kind === "achievement") {
    query = auth.admin.from("achievement_definitions").upsert({ slug: entry.slug, name: entry.name, description: entry.description, criteria: {}, status: entry.status }, { onConflict: "slug" }).select("id,slug,status").single();
  } else {
    query = auth.admin.from("announcements").upsert({ ...(entry.id ? { id: entry.id } : {}), title: entry.title, body: entry.body, status: entry.status, published_at: entry.status === "published" ? new Date().toISOString() : null }).select("id,title,status").single();
  }
  const { data, error } = await query;
  if (error) {
    logServerEvent("error", "admin.catalog_update_failed", { userId: auth.user.id, kind: entry.kind, code: error.code });
    return apiError("CATALOG_UPDATE_FAILED", "The catalog update could not be saved.", 500);
  }
  logServerEvent("info", "admin.catalog_updated", { userId: auth.user.id, kind: entry.kind });
  return Response.json({ data });
}
