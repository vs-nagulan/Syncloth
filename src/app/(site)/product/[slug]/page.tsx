import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductActions } from "@/components/product-actions";
import { getProductBySlug, getProductSlugs } from "@/lib/products-service";
import { formatINR } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;
export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Product" };

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="text-sm text-muted">
        <Link href="/shop" className="text-accent hover:underline">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-blue-50 via-surface to-red-50/40 shadow-sm">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover object-center"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <p className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground sm:text-3xl">
                {product.name}
              </p>
              <p className="mt-2 text-sm uppercase tracking-widest text-muted">
                {product.category}
              </p>
            </div>
          )}
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-brand-red px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
              {product.badge}
            </span>
          )}
        </div>

        <div>
          <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-muted">
            ★ {product.rating}{" "}
            <span className="text-muted/80">({product.reviewCount} reviews)</span>
          </p>
          <p className="mt-6 text-3xl font-semibold tabular-nums text-accent">
            {formatINR(product.priceINR)}
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted">
            {product.description}
          </p>
          <ul className="mt-6 space-y-2 text-sm text-foreground/80">
            {product.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-accent">✓</span>
                {h}
              </li>
            ))}
          </ul>

          <ProductActions product={product} />

          <section className="mt-14 border-t border-border pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Reviews & ratings
            </h2>
            <p className="mt-3 text-sm text-muted">
              Verified buyer reviews and AI recommendations will connect here
              in production. Average rating is shown from catalog data.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
