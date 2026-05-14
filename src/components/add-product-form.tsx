"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddProductForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<"Oversized Tees" | "Jerseys">(
    "Oversized Tees",
  );
  const [priceINR, setPriceINR] = useState("");
  const [description, setDescription] = useState("");
  const [highlights, setHighlights] = useState("");
  const [badge, setBadge] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const price = Number(priceINR);
    const hl = highlights
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug,
        category,
        priceINR: price,
        description,
        highlights: hl,
        badge: badge || undefined,
      }),
    });
    setLoading(false);
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      setError(data.error || "Could not create product");
      return;
    }
    setOpen(false);
    setName("");
    setSlug("");
    setPriceINR("");
    setDescription("");
    setHighlights("");
    setBadge("");
    router.refresh();
  }

  return (
    <div className="sm:shrink-0">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 sm:w-auto"
      >
        Add product
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-product-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-page p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="add-product-title"
              className="font-[family-name:var(--font-poppins)] text-lg font-bold text-foreground"
            >
              Add product
            </h2>
            <p className="mt-1 text-xs text-muted">
              Requires Supabase env vars. Highlights: comma-separated.
            </p>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="block text-sm">
                <span className="text-muted">Name</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-foreground outline-none ring-accent/30 focus:ring-2"
                />
              </label>
              <label className="block text-sm">
                <span className="text-muted">Slug (URL)</span>
                <input
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. crimson-tee"
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-foreground outline-none ring-accent/30 focus:ring-2"
                />
              </label>
              <label className="block text-sm">
                <span className="text-muted">Category</span>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as typeof category)
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-foreground"
                >
                  <option>Oversized Tees</option>
                  <option>Jerseys</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="text-muted">Price (INR)</span>
                <input
                  required
                  type="number"
                  min={1}
                  value={priceINR}
                  onChange={(e) => setPriceINR(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-foreground outline-none ring-accent/30 focus:ring-2"
                />
              </label>
              <label className="block text-sm">
                <span className="text-muted">Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-foreground outline-none ring-accent/30 focus:ring-2"
                />
              </label>
              <label className="block text-sm">
                <span className="text-muted">Highlights (comma-separated)</span>
                <input
                  value={highlights}
                  onChange={(e) => setHighlights(e.target.value)}
                  placeholder="Cotton, Relaxed fit"
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-foreground outline-none ring-accent/30 focus:ring-2"
                />
              </label>
              <label className="block text-sm">
                <span className="text-muted">Badge (optional)</span>
                <input
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="New, Sale…"
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2 text-foreground outline-none ring-accent/30 focus:ring-2"
                />
              </label>
              {error && (
                <p className="rounded-lg border border-brand-red/30 bg-brand-red/10 px-3 py-2 text-sm text-brand-red">
                  {error}
                </p>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-border py-2.5 text-sm font-medium text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-full bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
                >
                  {loading ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
