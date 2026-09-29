"use client";

import { useState } from "react";

type Item = { slug: string; name: string; type: string; rarity: string; price: number; icon: string };

export function ShopMarket({ items, initialOwned = [], initialEquipped = [] }: { items: readonly Item[]; initialOwned?: string[]; initialEquipped?: string[] }) {
  const [owned, setOwned] = useState(new Set(initialOwned));
  const [equipped, setEquipped] = useState(new Set(initialEquipped));
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("Sign in, earn gold in Starter Grove, then purchase a cosmetic.");

  async function act(item: Item, action: "purchase" | "equip") {
    setBusy(item.slug);
    setMessage("");
    try {
      const response = await fetch(`/api/shop/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: item.slug }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error?.message ?? "The transaction could not be completed.");
      if (action === "purchase") {
        setOwned((current) => new Set(current).add(item.slug));
        setMessage(result.data.alreadyOwned ? `${item.name} was already in your inventory.` : `${item.name} purchased. ${result.data.gold} gold remains.`);
      } else {
        setEquipped((current) => {
          const next = new Set(current);
          for (const candidate of items) if (candidate.type === item.type) next.delete(candidate.slug);
          next.add(item.slug);
          return next;
        });
        setMessage(`${item.name} is now equipped.`);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The transaction could not be completed.");
    } finally {
      setBusy("");
    }
  }

  return <>
    <p className="form-message" aria-live="polite">{message}</p>
    <div className="shop-grid">{items.map((item) => {
      const isOwned = owned.has(item.slug);
      const isEquipped = equipped.has(item.slug);
      return <article className="quest-card shop-card" key={item.slug}>
        <div className="shop-art" aria-hidden="true">{item.icon}</div>
        <span className="card-index">{item.rarity} · {item.type}</span>
        <h2>{item.name}</h2>
        <p className="gold">◈ {item.price} earned gold</p>
        <button className="button" disabled={busy === item.slug || isEquipped} onClick={() => void act(item, isOwned ? "equip" : "purchase")}>
          {busy === item.slug ? "Saving…" : isEquipped ? "Equipped" : isOwned ? "Equip" : "Purchase"}
        </button>
      </article>;
    })}</div>
  </>;
}
