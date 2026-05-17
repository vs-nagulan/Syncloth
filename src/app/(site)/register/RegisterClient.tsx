"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { safeInternalPath } from "@/lib/auth/safe-redirect";
import { signInWithGoogle } from "@/lib/auth/client";

export default function RegisterClient() {
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
      <h1 className="text-3xl font-bold">Create account</h1>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      <button
        onClick={handleGoogleSignUp}
        disabled={loading}
        className="mt-6 w-full rounded-xl border px-4 py-3"
      >
        {loading ? "Redirecting..." : "Sign up with Google"}
      </button>

      <p className="mt-6 text-center text-sm">
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}