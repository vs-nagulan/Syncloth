"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { safeInternalPath } from "@/lib/auth/safe-redirect";
import { signInWithGoogle } from "@/lib/auth/client";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const errParam = searchParams.get("error");
  const redirect = safeInternalPath(searchParams.get("redirect"), "/profile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    errParam === "supabase_config"
      ? "Server missing Supabase config."
      : errParam === "auth_callback"
      ? "Authentication failed."
      : null,
  );

  async function handleGoogleSignIn() {
    setLoading(true);
    setError(null);

    const { error } = await signInWithGoogle(redirect);
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-muted">
        Sign in with Google to access your account, orders, wishlist, and profile.
      </p>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full rounded-xl border border-border bg-page py-3 text-sm font-medium text-foreground shadow-sm disabled:opacity-50"
        >
          {loading ? "Loading..." : "Continue with Google"}
        </button>
        <button
          type="button"
          className="w-full rounded-xl border border-accent bg-accent py-3 text-sm font-semibold text-white shadow hover:bg-accent-hover disabled:opacity-50"
          disabled
        >
          Continue with email (soon)
        </button>
      </div>
      <p className="mt-8 text-center text-sm text-muted">
        New here?{" "}
        <Link href="/register" className="text-accent hover:underline">
          Create an account
        </Link>
      </p>
      <p className="mt-6 text-center text-xs text-muted">
        Store operators: use{" "}
        <Link href="/admin/login" className="text-brand-red hover:underline">
          Admin sign-in
        </Link>{" "}
        (not the same as customer login).
      </p>
    </div>
  );
}
