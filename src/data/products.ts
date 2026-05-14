export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Oversized Tees" | "Jerseys";
  priceINR: number;
  description: string;
  highlights: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "void-oversized-tee",
    name: "Void Oversized Tee",
    category: "Oversized Tees",
    priceINR: 899,
    description:
      "Heavyweight cotton, dropped shoulder, factory-finished seams. A clean black base with minimal Syncloth branding — built for daily rotation.",
    highlights: [
      "240 GSM cotton",
      "Relaxed drop shoulder",
      "Pre-shrunk",
    ],
    rating: 4.8,
    reviewCount: 124,
    badge: "Bestseller",
  },
  {
    id: "2",
    slug: "signal-jersey",
    name: "Signal Mesh Jersey",
    category: "Jerseys",
    priceINR: 1299,
    description:
      "Breathable mesh with contrast panels. Inspired by court and street — unisex fit, premium stitch density.",
    highlights: ["Mesh body", "Contrast binding", "Unisex cut"],
    rating: 4.7,
    reviewCount: 89,
    badge: "New",
  },
  {
    id: "3",
    slug: "midnight-stripe-tee",
    name: "Midnight Stripe Tee",
    category: "Oversized Tees",
    priceINR: 949,
    description:
      "Subtle vertical stripe texture on oversized silhouette. Night-out or day-in — pairs with everything.",
    highlights: ["Jacquard stripe", "Oversized fit", "Soft hand-feel"],
    rating: 4.6,
    reviewCount: 56,
  },
  {
    id: "4",
    slug: "velocity-jersey",
    name: "Velocity Number Jersey",
    category: "Jerseys",
    priceINR: 1199,
    description:
      "Classic number jersey layout with Syncloth wordmark. Lightweight, game-day energy.",
    highlights: ["Lightweight poly", "Heat-seal numbers", "Side vents"],
    rating: 4.9,
    reviewCount: 203,
    badge: "Bestseller",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
