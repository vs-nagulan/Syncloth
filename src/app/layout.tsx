import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Syncloth — Indian D2C Streetwear",
    template: "%s | Syncloth",
  },
  description:
    "Affordable factory-direct oversized tees and jerseys. Premium streetwear for India — fast, minimal, built for youth culture.",
  keywords: [
    "streetwear",
    "India",
    "oversized tees",
    "jerseys",
    "D2C fashion",
    "Syncloth",
  ],
  openGraph: {
    title: "Syncloth — Streetwear, Direct",
    description: "Factory-direct oversized tees & jerseys. Unisex. India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <CartProvider>
          <WishlistProvider>
            <div className="flex min-h-dvh flex-1 flex-col">{children}</div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
