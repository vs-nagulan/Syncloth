import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-muted">
        Google auth and email login ship with Auth.js + Supabase — this is a UI
        shell.
      </p>
      <div className="mt-8 space-y-3">
        <button
          type="button"
          className="w-full rounded-xl border border-border bg-page py-3 text-sm font-medium text-foreground shadow-sm"
        >
          Continue with Google
        </button>
        <button
          type="button"
          className="w-full rounded-xl border border-accent bg-accent py-3 text-sm font-semibold text-white shadow hover:bg-accent-hover"
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
