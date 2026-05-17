"use client";


import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { safeInternalPath } from "@/lib/auth/safe-redirect";
import { signInWithGoogle } from "@/lib/auth/client";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const redirect = safeInternalPath(searchParams.get("redirect"), "/profile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleSignUp() {
    setLoading(true);
    setError(null);

    const { error } = await signInWithGoogle(redirect);
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
        Create account
      </h1>
      <p className="mt-2 text-sm text-muted">
        Sign up with Google to manage your profile, wishlist, and order history.
      </p>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full rounded-xl border border-border bg-page py-3 text-sm font-medium text-foreground shadow-sm disabled:opacity-50"
        >
          {loading ? "Redirecting…" : "Sign up with Google"}
        </button>
      </div>
      <p className="mt-8 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
