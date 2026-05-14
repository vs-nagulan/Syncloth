import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
        Profile
      </h1>
      <p className="mt-3 text-sm text-muted">
        Signed-out preview — connect Supabase user row for name, phone, and saved
        addresses.
      </p>
      <div className="mt-10 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <p className="text-sm text-muted">
          You are browsing as a guest.{" "}
          <Link href="/login" className="text-accent hover:underline">
            Log in
          </Link>{" "}
          to manage your profile.
        </p>
      </div>
    </div>
  );
}
