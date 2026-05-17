import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Product } from "@/data/products";
import { products as seedProducts } from "@/data/products";

const CATEGORIES = ["Oversized Tees", "Jerseys"] as const;

function isCategory(s: string): s is Product["category"] {
  return (CATEGORIES as readonly string[]).includes(s);
}

export function mapDbRow(row: Record<string, unknown>): Product | null {
  const slug = row.slug;
  const name = row.name;
  const category = row.category;
  const price = row.price_inr ?? row.priceINR;
  if (typeof slug !== "string" || typeof name !== "string") return null;
  if (typeof category !== "string" || !isCategory(category)) return null;
  const priceINR = typeof price === "number" ? price : Number(price);
  if (!Number.isFinite(priceINR)) return null;

  const highlightsRaw = row.highlights;
  const highlights = Array.isArray(highlightsRaw)
    ? highlightsRaw.filter((x): x is string => typeof x === "string")
    : typeof highlightsRaw === "string"
      ? (() => {
          try {
            const p = JSON.parse(highlightsRaw) as unknown;
            return Array.isArray(p)
              ? p.filter((x): x is string => typeof x === "string")
              : [];
          } catch {
            return [];
          }
        })()
      : [];

  const rating = Number(row.rating ?? 4.5);
  const reviewCount = Number(row.review_count ?? row.reviewCount ?? 0);
  const badge =
    typeof row.badge === "string" && row.badge.length > 0
      ? row.badge
      : undefined;
  const imageUrl =
    typeof row.image_url === "string" && row.image_url.length > 0
      ? row.image_url
      : typeof row.imageUrl === "string" && row.imageUrl.length > 0
      ? row.imageUrl
      : undefined;
  const description =
    typeof row.description === "string"
      ? row.description
      : "No description yet.";
  const id = String(row.id ?? slug);

  return {
    id,
    slug,
    name,
    category,
    priceINR,
    description,
    highlights,
    rating: Number.isFinite(rating) ? rating : 4.5,
    reviewCount: Number.isFinite(reviewCount) ? reviewCount : 0,
    badge,
    imageUrl,
  };
}

function getAnonClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getProducts(): Promise<Product[]> {
  const sb = getAnonClient();
  if (!sb) return seedProducts;

  const { data, error } = await sb
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) return seedProducts;

  const mapped = data
    .map((row) => mapDbRow(row as Record<string, unknown>))
    .filter((p): p is Product => p !== null);

  return mapped.length ? mapped : seedProducts;
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}

export async function getProductSlugs(): Promise<string[]> {
  const all = await getProducts();
  return all.map((p) => p.slug);
}
