import type { Metadata } from "next";
import Link from "next/link";
import { AddProductForm } from "@/components/add-product-form";
import { getProducts } from "@/lib/products-service";
import { formatINR } from "@/lib/format";

export const metadata: Metadata = {
  title: "Admin — Products",
};

export const revalidate = 30;

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground">
            Products
          </h1>
          <p className="mt-2 text-sm text-muted">
            Add rows to Supabase <code className="text-foreground">products</code>{" "}
            table (see <code className="text-foreground">supabase-schema.sql</code>) so
            new items appear on the storefront.
          </p>
        </div>
        <AddProductForm />
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-page shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border bg-surface text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">
                  {p.name}
                </td>
                <td className="px-4 py-3 text-muted">{p.category}</td>
                <td className="px-4 py-3 tabular-nums text-foreground">
                  {formatINR(p.priceINR)}
                </td>
                <td className="px-4 py-3 text-muted">—</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/product/${p.slug}`}
                    className="text-accent hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
