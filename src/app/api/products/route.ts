import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products-service";

export const revalidate = 30;

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products });
}
