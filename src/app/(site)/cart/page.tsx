"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatINR } from "@/lib/format";

export default function CartPage() {
  const { lines, setQuantity, removeItem, subtotalINR, itemCount } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
        Cart
      </h1>
      <p className="mt-2 text-sm text-muted">
        {itemCount === 0
          ? "Your cart is empty."
          : `${itemCount} item${itemCount === 1 ? "" : "s"} in your cart.`}
      </p>

      {lines.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-border bg-surface p-10 text-center shadow-sm">
          <p className="text-muted">Browse the shop to add pieces.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow hover:bg-accent-hover"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <ul className="space-y-4 lg:col-span-2">
            {lines.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-page p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div>
                  <Link
                    href={`/product/${product.slug}`}
                    className="font-medium text-foreground hover:text-accent"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted">{product.category}</p>
                  <p className="mt-2 font-semibold tabular-nums text-accent">
                    {formatINR(product.priceINR)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(product.id, Number(e.target.value))
                    }
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground"
                    aria-label={`Quantity for ${product.name}`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="text-sm text-brand-red hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Summary
            </p>
            <p className="mt-4 flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-semibold tabular-nums text-foreground">
                {formatINR(subtotalINR)}
              </span>
            </p>
            <p className="mt-2 text-xs text-muted">
              Shipping & taxes calculated at checkout.
            </p>
            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-accent py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
            >
              Checkout
            </Link>
            <Link
              href="/shop"
              className="mt-3 block text-center text-sm text-muted hover:text-accent"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
