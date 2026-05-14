import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDemoOrder } from "@/data/demo-orders";
import { formatINR } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const o = getDemoOrder(id);
  return { title: o ? `Order ${o.id}` : "Order" };
}

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = getDemoOrder(id);
  if (!order) notFound();

  return (
    <div>
      <nav className="text-sm text-muted">
        <Link href="/admin/orders" className="text-accent hover:underline">
          Orders
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{order.id}</span>
      </nav>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground">
            {order.id}
          </h1>
          <p className="mt-1 text-sm text-muted">
            Placed {new Date(order.placedAt).toLocaleString("en-IN")}
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground ring-1 ring-border">
          {order.status}
        </span>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Customer
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-muted">Name</dt>
              <dd className="font-medium text-foreground">{order.customer}</dd>
            </div>
            <div>
              <dt className="text-muted">Email</dt>
              <dd className="text-foreground">{order.email}</dd>
            </div>
            <div>
              <dt className="text-muted">Phone</dt>
              <dd className="text-foreground">{order.phone}</dd>
            </div>
            <div>
              <dt className="text-muted">Ship to</dt>
              <dd className="text-foreground">{order.address}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Payment
          </h2>
          <p className="mt-4 text-sm text-foreground">{order.payment}</p>
          <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-muted">
            Line items
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {order.lines.map((line) => (
              <li
                key={line.name}
                className="flex justify-between gap-4 border-b border-border pb-3 last:border-0"
              >
                <span className="text-foreground">
                  {line.name}{" "}
                  <span className="text-muted">×{line.qty}</span>
                </span>
                <span className="shrink-0 tabular-nums text-foreground">
                  {formatINR(line.unitPriceINR * line.qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between border-t border-border pt-4 text-base font-semibold text-foreground">
            <span>Total</span>
            <span className="tabular-nums">{formatINR(order.totalINR)}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
