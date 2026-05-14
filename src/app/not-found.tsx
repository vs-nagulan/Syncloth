import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center bg-page px-4 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-brand-red">
        404
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        This drop does not exist (yet). Head back to the shop or home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/shop"
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-accent-hover"
        >
          Shop
        </Link>
        <Link
          href="/"
          className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:border-accent"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
