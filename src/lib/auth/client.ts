import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { safeInternalPath } from "./safe-redirect";

export async function signInWithGoogle(
  redirectPath = "/profile",
  admin = false,
) {
  const supabase = createBrowserSupabaseClient();
  if (!supabase) {
    return { error: new Error("Supabase not configured") };
  }

  const safePath = safeInternalPath(redirectPath, admin ? "/admin/dashboard" : "/profile");
  const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
    safePath,
  )}${admin ? "&admin=true" : ""}`;

  return await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      queryParams: {
        prompt: "select_account",
      },
    },
  });
}

export async function signOut() {
  await fetch("/auth/signout", { method: "POST" });
}
