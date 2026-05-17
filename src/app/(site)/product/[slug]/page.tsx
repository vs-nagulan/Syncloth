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
              <p className="font-[