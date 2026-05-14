import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/products-service";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse oversized tees and jerseys — Syncloth streetwear.",
};

export const revalidate = 30;

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Shop
        </h1>
        <p className="mt-3 text-muted">
          Search and filters ship in Phase 2 — for now, explore every drop in
          one grid.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
