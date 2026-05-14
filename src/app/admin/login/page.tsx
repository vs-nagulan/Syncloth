"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { signInWithGoogle } from "@/lib/auth/client";

function AdminLoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin/dashboard";
  const errParam = searchParams.get("error");
  const [error, setError] = useState<string | null>(
    errParam === "supabase_config"
      ? "Server missing Supabase config."
      : errParam === "auth_callback"
      ? "Authentication failed."
      : errParam === "not_admin"
      ? "Access denied. Admin role required."
      : null,
  );
  const [loading, setLoading] = useState(false);

  async function handleAdminSignIn() {
    setLoading(true);
    setError(null);

    const { error } = await signInWithGoogle(from, true);
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground">
        Admin sign-in
      </h1>
      <p className="mt-2 text-sm text-muted">
        Google OAuth required. Admin role needed for access.
      </p>
      {error && (
        <p className="mt-4 rounded-lg border border-brand-red/30 bg-brand-red/10 px-3 py-2 text-sm text-brand-red">
          {error}
        </p>
      )}
      <div className="mt-8 space-y-4">
        <button
          type="button"
          onClick={handleAdminSignIn}
          disabled={loading}
          className="w-full rounded-xl border border-border bg-page py-3 text-sm font-medium text-foreground shadow-sm disabled:opacity-50"
        >
          {loading ? "Redirecting…" : "Continue with Google"}
        </button>
      </div>
      <p className="mt-8 text-center text-xs text-muted">
        <a href="/" className="text-accent hover:underline">
          ← Back to store
        </a>
      </p>
    </div>
  );
}

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
