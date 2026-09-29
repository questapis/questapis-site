import { shopItems } from "@/lib/platform-data";
import { ShopMarket } from "@/components/shop-market";
import { createClient } from "@/lib/supabase/server";
export const metadata = { title: "Cosmetic shop | QuestAPIs" };
export default async function ShopPage() {
  const supabase = await createClient();
  const { data: auth } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const owned: string[] = [];
  const equipped: string[] = [];
  if (supabase && auth.user) {
    const { data: inventory } = await supabase.from("player_inventory").select("shop_items(slug)");
    const { data: equipment } = await supabase.from("player_equipment").select("shop_items(slug)");
    for (const row of inventory ?? []) {
      const item = row.shop_items as unknown as { slug?: string } | null;
      if (item?.slug) owned.push(item.slug);
    }
    for (const row of equipment ?? []) {
      const item = row.shop_items as unknown as { slug?: string } | null;
      if (item?.slug) equipped.push(item.slug);
    }
  }
  return <main id="main-content" className="shell standard-page"><p className="eyebrow">The Wayfarer’s Market</p><h1>Make the journey yours.</h1><p className="page-lede">Cosmetic rewards use only earned virtual gold. Price, ownership, balance, purchase, and equipment are validated in one server-authoritative path.</p><ShopMarket items={shopItems} initialOwned={owned} initialEquipped={equipped} /></main>;
}
