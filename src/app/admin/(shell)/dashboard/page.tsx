import type { Metadata } from "next";
import { demoOrders } from "@/data/demo-orders";

export const metadata: Metadata = {
  title: "Admin — Dashboard",
};

const kpis = [
  { label: "Revenue (30d)", value: "₹12.4L", hint: "Demo data" },
  { label: "Orders", value: "428", hint: "Demo data" },
  { label: "AOV", value: "₹1,089", hint: "Demo data" },
  { label: "Return rate", value: "2.1%", hint: "Demo data" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-muted">
        Analytics and live metrics connect to Supabase + warehouse in
        production.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
          >
            <p className="text-xs uppercase tracking-wider text-muted">
              {k.label}
            </p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
              {k.value}
            </p>
            <p className="mt-1 text-xs text-muted">{k.hint}</p>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-surface">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {demoOrders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3 text-sm text-foreground">
                    #{order.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {order.customer}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {order.total}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        order.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : order.status === "COD"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
