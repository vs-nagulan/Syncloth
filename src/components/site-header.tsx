"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/contact", label: "Contact" },
];

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function SiteHeader() {
  const { itemCount } = useCart();
  const { ids: wishlistIds } = useWishlist();
  const [open, setOpen] = useState(false);
  const wishCount = wishlistIds.size;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-page/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-poppins)] text-xl font-bold tracking-tight text-foreground"
        >
          Syn<span className="text-accent">cloth</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/wishlist"
            className="relative hidden text-sm text-muted transition hover:text-brand-red sm:inline"
          >
            Wishlist
            {wishCount > 0 && (
              <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-semibold text-white">
                {wishCount}
              </span>
            )}
          </Link>
          <Link
            href="/login"
            className="hidden text-sm text-muted transition hover:text-accent sm:inline"
          >
            Account
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:border-accent hover:bg-blue-50"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1">
              <span
                className={cn(
                  "h-0.5 w-5 bg-foreground transition",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn("h-0.5 w-5 bg-foreground", open && "opacity-0")}
              />
              <span
                className={cn(
                  "h-0.5 w-5 bg-foreground transition",
                  open && "-translate-y-1.5 -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-page px-4 py-4 shadow-inner md:hidden">
          <nav className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="text-base text-muted"
            >
              Wishlist
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-base text-muted"
            >
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
