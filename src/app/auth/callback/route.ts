import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { safeInternalPath } from "@/lib/auth/safe-redirect";

export async function GET(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.redirect(new URL("/login?error=supabase_config", request.url));
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const nextRaw = searchParams.get("next");
  const admin = searchParams.get("admin") === "true";
  const next = safeInternalPath(nextRaw, admin ? "/admin/dashboard" : "/profile");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=auth_callback", request.url));
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.session) {
    return NextResponse.redirect(new URL("/login?error=auth_callback", request.url));
  }

  const user = data.user;
  if (!user) {
    return NextResponse.redirect(new URL("/login?error=auth_callback", request.url));
  }

  await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      full_name:
        (user.user_metadata as { full_name?: string })?.full_name ||
        user.email ||
        "",
    },
    { onConflict: "id", ignoreDuplicates: false },
  );

  if (admin) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login?error=not_admin", request.url));
    }
  }

  return NextResponse.redirect(new URL(next, request.url));
}
