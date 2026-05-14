import type { Metadata } from "next";

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
    </div>
  );
}
