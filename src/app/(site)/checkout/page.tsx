"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatINR } from "@/lib/format";

const input =
  "mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none ring-accent/30 focus:ring-2";

export default function CheckoutPage() {
  const { lines, subtotalINR, itemCount, clear } = useCart();
  const [method, setMethod] = useState<"cod" | "razorpay">("razorpay");
  const [placed, setPlaced] = useState(false);

  if (lines.length === 0 && !placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-foreground">Nothing to checkout</h1>
        <p className="mt-2 text-muted">Add items to your cart first.</p>
        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Go to shop
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground">
          Order placed (demo)
        </h1>
        <p className="mt-3 text-sm text-muted">
          In production this screen confirms payment (Razorpay) or COD and sends
          order email. Cart has been cleared for the demo.
        </p>
        <Link
          href="/orders"
          className="mt-8 inline-flex rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground hover:border-accent"
        >
          View orders (placeholder)
        </Link>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clear();
    setPlaced(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
        Checkout
      </h1>
      <p className="mt-2 text-sm text-muted">
        Guest checkout supported — connect Auth.js + Supabase for saved addresses
        in production.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-12"
      >
        <div className="space-y-8 lg:col-span-3">
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wider text-muted">
              Contact & shipping
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-xs text-muted">Full name</span>
                <input
                  required
                  name="name"
                  className={input}
                  placeholder="Aarav Sharma"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs text-muted">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className={input}
                  placeholder="you@example.com"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs text-muted">Phone</span>
                <input
                  required
                  name="phone"
                  className={input}
                  placeholder="+91 …"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs text-muted">Address</span>
                <textarea
                  required
                  name="address"
                  rows={3}
                  className={input}
                  placeholder="Flat, street, landmark, city, PIN"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wider text-muted">
              Payment
            </legend>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-page px-4 py-3 has-[:checked]:border-accent has-[:checked]:bg-blue-50">
                <input
                  type="radio"
                  name="pay"
                  checked={method === "razorpay"}
                  onChange={() => setMethod("razorpay")}
                  className="accent-accent"
                />
                <span className="text-sm text-foreground">
                  Razorpay (UPI, cards, netbanking)
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-page px-4 py-3 has-[:checked]:border-brand-red has-[:checked]:bg-red-50">
                <input
                  type="radio"
                  name="pay"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                  className="accent-accent"
                />
                <span className="text-sm text-foreground">Cash on delivery</span>
              </label>
            </div>
            <p className="text-xs text-muted">
              Razorpay: wire your key server-side and open Checkout from an API
              route. This UI is a front-end shell only.
            </p>
          </fieldset>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6 shadow-sm lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Order summary ({itemCount})
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {lines.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between gap-4">
                <span className="text-foreground/80">
                  {product.name}{" "}
                  <span className="text-muted">×{quantity}</span>
                </span>
                <span className="shrink-0 tabular-nums text-foreground">
                  {formatINR(product.priceINR * quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-border pt-4 text-sm">
            <div className="flex justify-between font-semibold text-foreground">
              <span>Total</span>
              <span className="tabular-nums">{formatINR(subtotalINR)}</span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-accent py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            {method === "cod" ? "Place order (COD)" : "Pay with Razorpay (demo)"}
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            Demo: submits without calling Razorpay.
          </p>
        </aside>
      </form>
    </div>
  );
}
