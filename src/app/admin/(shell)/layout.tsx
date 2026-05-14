import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin-logout-button";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col border-border bg-surface md:flex-row md:border-t-0">
      <aside className="border-b border-border bg-page px-4 py-6 shadow-sm md:w-56 md:border-b-0 md:border-r md:py-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-poppins)] text-lg font-bold text-foreground"
        >
          Syncloth
        </Link>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
          Admin
        </p>
        <nav className="mt-8 flex flex-wrap gap-2 md:flex-col md:gap-1">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6">
          <AdminLogoutButton />
          <Link
            href="/"
            className="text-xs text-muted hover:text-accent"
          >
            ← Back to store
          </Link>
        </div>
      </aside>
      <div className="flex-1 overflow-auto bg-page p-4 sm:p-8">{children}</div>
    </div>
  );
}
