"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const inWishlist = has(product.id);

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <label htmlFor="qty" className="sr-only">
          Quantity
        </label>
        <select
          id="qty"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onAdd}
          className="flex-1 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover sm:flex-none"
        >
          {added ? "Added to cart" : "Add to cart"}
        </button>
      </div>
      <button
        type="button"
        onClick={() => toggle(product)}
        className={`rounded-full border px-6 py-3 text-sm font-medium transition sm:shrink-0 ${
          inWishlist
            ? "border-brand-red bg-red-50 text-brand-red"
            : "border-border text-muted hover:border-brand-red hover:text-brand-red"
        }`}
      >
        {inWishlist ? "Saved" : "Wishlist"}
      </button>
    </div>
  );
}
