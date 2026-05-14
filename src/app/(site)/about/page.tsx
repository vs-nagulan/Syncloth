import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Syncloth — factory-direct Indian streetwear brand story.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="font-[family-name:var(--font-poppins)] text-4xl font-bold tracking-tight text-foreground">
        About Syncloth
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Syncloth is a modern Indian D2C streetwear label focused on oversized tees
        and jerseys — designed for ages 16–35 who care about culture, fit, and
        value.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        We skip traditional retail markups by going factory-direct. That means
        better fabrics and construction for the same budget you would spend on
        fast marketplaces — with a clean, premium aesthetic.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        Unisex drops, India-first logistics,{" "}
        <span className="font-medium text-brand-red">COD</span> and{" "}
        <span className="font-medium text-accent">Razorpay</span> at checkout, and
        a roadmap toward AI-powered recommendations and chat support as we scale.
      </p>
    </div>
  );
}
