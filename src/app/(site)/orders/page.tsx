import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
        Order history
      </h1>
      <p className="mt-3 text-sm text-muted">
        Orders appear here after checkout when wired to your database.
      </p>
      <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="text-sm text-muted">No orders yet.</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Start shopping
        </Link>
      </div>
    </div>
  );
}
