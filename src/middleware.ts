import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareSupabaseClient } from "@/lib/supabase/middleware";

const USER_PROTECTED_PREFIXES = ["/profile", "/orders"];

function isUserProtectedPath(pathname: string): boolean {
  return USER_PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

function isAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const client = createMiddlewareSupabaseClient(request);
  if (!client) {
    if (isAdminPath(pathname)) {
      const u = new URL("/login", request.url);
      u.searchParams.set("error", "supabase_config");
      u.searchParams.set("redirect", pathname);
      return NextResponse.redirect(u);
    }
    if (isUserProtectedPath(pathname)) {
      const u = new URL("/login", request.url);
      u.searchParams.set("redirect", pathname);
      return NextResponse.redirect(u);
    }
    return NextResponse.next();
  }

  const { supabase, response } = client;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminPath(pathname)) {
    if (!user) {
      const u = new URL("/login", request.url);
      u.searchParams.set("redirect", pathname);
      return appendCookies(NextResponse.redirect(u), response);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.role !== "admin") {
      const home = new URL("/", request.url);
      home.searchParams.set("error", "forbidden_admin");
      return appendCookies(NextResponse.redirect(home), response);
    }

    return response;
  }

  if (isUserProtectedPath(pathname)) {
    if (!user) {
      const u = new URL("/login", request.url);
      u.searchParams.set("redirect", pathname);
      return appendCookies(NextResponse.redirect(u), response);
    }
    return response;
  }

  if (pathname === "/login" || pathname === "/register") {
    if (user) {
      const redirect = request.nextUrl.searchParams.get("redirect");
      if (redirect?.startsWith("/") && !redirect.startsWith("//")) {
        if (redirect.startsWith("/admin")) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .maybeSingle();
          if (profile?.role === "admin") {
            const target =
              redirect === "/admin" ? "/admin/dashboard" : redirect;
            return appendCookies(
              NextResponse.redirect(new URL(target, request.url)),
              response,
            );
          }
          const home = new URL("/", request.url);
          home.searchParams.set("error", "forbidden_admin");
          return appendCookies(NextResponse.redirect(home), response);
        }
        return appendCookies(
          NextResponse.redirect(new URL(redirect, request.url)),
          response,
        );
      }
      const dest = new URL("/profile", request.url);
      return appendCookies(NextResponse.redirect(dest), response);
    }
  }

  return response;
}

function appendCookies(from: NextResponse, sessionResponse: NextResponse) {
  sessionResponse.cookies.getAll().forEach((c) => {
    from.cookies.set(c.name, c.value, c);
  });
  return from;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
