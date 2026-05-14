"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/data/products";

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function HomeClient({ featured }: { featured: Product[] }) {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-blue-50/80 via-page to-page">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_0%,rgba(220,38,38,0.12),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_10%_20%,rgba(37,99,235,0.18),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.08 }}
            className="max-w-2xl"
          >
            <motion.p
              variants={fade}
              className="text-sm font-medium uppercase tracking-[0.2em] text-accent"
            >
              India · D2C Streetwear
            </motion.p>
            <motion.h1
              variants={fade}
              className="mt-4 font-[family-name:var(--font-poppins)] text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              Factory-direct.
              <span className="block text-brand-red">Street-ready.</span>
            </motion.h1>
            <motion.p
              variants={fade}
              className="mt-6 text-base leading-relaxed text-muted sm:text-lg"
            >
              Oversized tees and jerseys built for 16–35 — premium finish,
              honest pricing, no marketplace noise.
            </motion.p>
            <motion.div
              variants={fade}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-accent-hover"
              >
                Shop drop
              </Link>
              <Link
                href="/wholesale"
                className="inline-flex items-center justify-center rounded-full border-2 border-brand-red/80 bg-page px-8 py-3 text-sm font-semibold text-brand-red transition hover:bg-red-50"
              >
                Wholesale enquiry
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted">
              Curated picks from oversized tees and jerseys — same quality as
              premium retail, priced like direct.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-accent hover:underline"
          >
            View all products
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-3 sm:px-6 sm:py-20">
          {[
            {
              title: "Affordable",
              body: "Factory-direct cuts the middle — you get better materials for the rupee.",
            },
            {
              title: "Premium feel",
              body: "Minimal branding, clean construction, pieces that live in your weekly rotation.",
            },
            {
              title: "India-first",
              body: "COD and Razorpay at checkout. Built for how young India actually shops.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground sm:text-3xl">
          Need volume for your store?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          Syncloth supports wholesale enquiries — tell us what you need and our
          team will get back within 1–2 business days.
        </p>
        <Link
          href="/wholesale"
          className="mt-8 inline-flex rounded-full border border-border bg-page px-8 py-3 text-sm font-semibold text-accent shadow-sm transition hover:border-accent hover:bg-blue-50"
        >
          Open wholesale form
        </Link>
      </section>
    </div>
  );
}
