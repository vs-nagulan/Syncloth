import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
        Create account
      </h1>
      <p className="mt-2 text-sm text-muted">
        Sign up to save addresses, track orders, and sync wishlist across
        devices.
      </p>
      <div className="mt-8 space-y-3">
        <button
          type="button"
          className="w-full rounded-xl border border-border py-3 text-sm font-medium text-foreground shadow-sm"
        >
          Sign up with Google
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
