"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/data/products";
import { useWishlist } from "@/lib/wishlist-context";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const [catalog, setCatalog] = useState<Product[] | null>(null);

  useEffect(() => {
    void fetch("/api/products")
      .then((r) => r.json())
      .then((d: { products?: Product[] }) => setCatalog(d.products ?? []))
      .catch(() => setCatalog([]));
  }, []);

  const saved =
    catalog?.filter((p) => ids.has(p.id)) ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
        Wishlist
      </h1>
      <p className="mt-2 text-sm text-muted">
        Saved on this device — sign in to sync across devices (coming with auth).
      </p>

      {catalog === null ? (
        <p className="mt-10 text-sm text-muted">Loading…</p>
      ) : saved.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-border bg-surface p-10 text-center shadow-sm">
          <p className="text-muted">No saved items yet.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-full bg-brand-red px-8 py-3 text-sm font-semibold text-white shadow hover:bg-red-700"
          >
            Explore shop
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
