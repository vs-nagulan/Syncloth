"use client";

import { signOut } from "@/lib/auth/client";

export function AdminLogoutButton() {
  async function logout() {
    await signOut();
    window.location.href = "/admin/login";
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      className="w-full rounded-lg border border-border py-2 text-left text-sm text-muted transition hover:border-brand-red hover:bg-brand-red/5 hover:text-brand-red"
    >
      Sign out
    </button>
  );
}
