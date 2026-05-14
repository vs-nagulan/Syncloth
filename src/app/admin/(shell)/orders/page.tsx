import type { Metadata } from "next";
import Link from "next/link";
import { demoOrders } from "@/data/demo-orders";

export const metadata: Metadata = {
  title: "Admin — Orders",
};

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground">
        Orders
      </h1>
      <p className="mt-2 text-sm text-muted">
        Click an order to open detail (demo). Wire this list to Supabase{" "}
        <code className="text-foreground">orders</code> in production.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-page shadow-sm">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-border bg-surface text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {demoOrders.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-mono">
                  <Link
                    href={`/admin/orders/${encodeURIComponent(o.id)}`}
                    className="text-accent hover:underline"
                  >
                    #{o.id}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted">{o.customer}</td>
                <td className="px-4 py-3 tabular-nums text-foreground">
                  {o.total}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-foreground ring-1 ring-border">
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
