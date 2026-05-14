"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, Suspense } from "react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin/dashboard";
  const errParam = searchParams.get("error");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    errParam === "config"
      ? "Server missing ADMIN_SESSION_SECRET / ADMIN_PASSWORD (.env.local)."
      : null,
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || "Login failed");
      return;
    }
    router.replace(from.startsWith("/admin") ? from : "/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground">
        Admin sign-in
      </h1>
      <p className="mt-2 text-sm text-muted">
        Use the password from <code className="text-foreground">ADMIN_PASSWORD</code> in{" "}
        <code className="text-foreground">.env.local</code>. This is separate from
        customer Supabase auth.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="text-xs font-medium text-muted">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none ring-accent/30 focus:ring-2"
            required
          />
        </label>
        {error && (
          <p className="rounded-lg border border-brand-red/30 bg-brand-red/10 px-3 py-2 text-sm text-brand-red">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white transition hover:bg-accent-hover disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in to dashboard"}
        </button>
      </form>
      <p className="mt-8 text-center text-xs text-muted">
        <a href="/" className="text-accent hover:underline">
          ← Back to store
        </a>
      </p>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-page" />}>
      <AdminLoginForm />
    </Suspense>
  );
}
