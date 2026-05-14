import "server-only";

import type { User } from "@supabase/supabase-js";
import { tryCreateServerSupabaseClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/auth/types";

export type SessionUser = {
  user: User;
  profile: Profile | null;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const supabase = await tryCreateServerSupabaseClient();
    if (!supabase) return null;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) return null;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, created_at")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      return { user, profile: null };
    }

    return {
      user,
      profile: profile as Profile | null,
    };
  } catch {
    return null;
  }
}

export async function getUserIsAdmin(): Promise<boolean> {
  const session = await getSessionUser();
  return session?.profile?.role === "admin";
}
