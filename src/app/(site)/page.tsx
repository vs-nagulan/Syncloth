import { HomeClient } from "./home-client";
import { getProducts } from "@/lib/products-service";

export const revalidate = 30;

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 4);
  return <HomeClient featured={featured} />;
}
