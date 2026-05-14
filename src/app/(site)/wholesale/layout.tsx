import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale",
  description: "Wholesale enquiries for Syncloth streetwear.",
};

export default function WholesaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
