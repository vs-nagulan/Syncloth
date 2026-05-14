import Link from "next/link";

const footerLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/wholesale", label: "Wholesale enquiry" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground">
              Syn<span className="text-accent">cloth</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Factory-direct streetwear for India. Oversized tees and jerseys —
              premium feel, honest pricing.
            </p>
          </div>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Explore
              </p>
              <ul className="mt-3 space-y-2">
                {footerLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Account
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/login"
                    className="text-sm text-muted transition hover:text-accent"
                  >
                    Login / Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/orders"
                    className="text-sm text-muted transition hover:text-accent"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="text-sm text-muted transition hover:text-brand-red"
                  >
                    Store admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Syncloth. All rights reserved.</p>
          <p>
            <span className="text-brand-red font-medium">COD</span> &{" "}
            <span className="text-accent font-medium">Razorpay</span> — India
            shipping.
          </p>
        </div>
      </div>
    </footer>
  );
}
