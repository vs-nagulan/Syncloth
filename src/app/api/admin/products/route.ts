import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-service";

type Body = {
  name: string;
  slug: string;
  category: string;
  priceINR: number;
  description?: string;
  highlights?: string[];
  badge?: string;
};

export async function POST(request: Request) {
  const sb = getServiceSupabase();
  if (!sb) {
    return NextResponse.json(
      {
        error:
          "Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name?.trim() || !body.slug?.trim()) {
    return NextResponse.json(
      { error: "name and slug are required" },
      { status: 400 },
    );
  }
  if (body.category !== "Oversized Tees" && body.category !== "Jerseys") {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }
  const price = Number(body.priceINR);
  if (!Number.isFinite(price) || price < 1) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  const highlights = Array.isArray(body.highlights) ? body.highlights : [];

  const { error } = await sb.from("products").insert({
    slug: body.slug.trim().toLowerCase().replace(/\s+/g, "-"),
    name: body.name.trim(),
    category: body.category,
    price_inr: Math.round(price),
    description: body.description?.trim() || "",
    highlights,
    rating: 4.5,
    review_count: 0,
    badge: body.badge?.trim() || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
