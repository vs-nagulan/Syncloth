import Link from "next/link";
import type { Product } from "@/data/products";
import { formatINR } from "@/lib/format";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-page shadow-sm transition hover:border-accent/50 hover:shadow-md">
      <Link
        href={`/product/${product.slug}`}
        className="block aspect-[4/5] bg-gradient-to-br from-blue-50 via-surface to-red-50/30"
      >
        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
          {product.badge && (
            <span className="mb-3 rounded-full bg-brand-red px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
              {product.badge}
            </span>
          )}
          <span className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-foreground transition group-hover:text-accent sm:text-xl">
            {product.name}
          </span>
          <span className="mt-2 text-xs uppercase tracking-widest text-muted">
            {product.category}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 border-t border-border p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-lg font-semibold tabular-nums text-accent">
            {formatINR(product.priceINR)}
          </p>
          <p className="text-xs text-muted">
            ★ {product.rating}{" "}
            <span className="text-muted/70">({product.reviewCount})</span>
          </p>
        </div>
        <Link
          href={`/product/${product.slug}`}
          className="text-center text-sm font-medium text-brand-red transition hover:text-red-700"
        >
          View product →
        </Link>
      </div>
    </article>
  );
}
