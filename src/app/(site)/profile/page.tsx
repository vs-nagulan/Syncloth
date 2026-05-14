import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await getSessionUser();
  if (!session?.user) {
    redirect("/login?redirect=/profile");
  }

  const profile = session.profile;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
        Profile
      </h1>
      <p className="mt-3 text-sm text-muted">
        Manage your account, orders, and saved addresses.
      </p>
      <div className="mt-10 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <div className="space-y-4 text-sm text-foreground">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted">
              Email
            </div>
            <div className="mt-2 font-medium">{session.user.email}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted">
              Name
            </div>
            <div className="mt-2 font-medium">
              {profile?.full_name || "—"}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted">
              Phone
            </div>
            <div className="mt-2 font-medium">{profile?.phone || "Not set"}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted">
              Addresses
            </div>
            <div className="mt-2 space-y-2">
              {profile?.addresses?.length ? (
                profile.addresses.map((address, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-border bg-page p-3 text-sm"
                  >
                    {address}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-border bg-page p-3 text-sm text-muted">
                  No saved addresses yet.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/auth/signout"
            className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-page px-4 py-3 text-sm font-semibold text-foreground transition hover:border-accent sm:w-auto"
          >
            Sign out
          </Link>
          <Link
            href="/orders"
            className="inline-flex w-full items-center justify-center rounded-xl border border-accent bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover sm:w-auto"
          >
            View orders
          </Link>
        </div>
      </div>
    </div>
  );
}
