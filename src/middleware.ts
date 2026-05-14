import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareSupabaseClient } from "@/lib/supabase/middleware";
import { safeInternalPath } from "@/lib/auth/safe-redirect";

const USER_PROTECTED_PREFIXES = ["/profile", "/orders", "/checkout"];

function isUserProtectedPath(pathname: string): boolean {
  return USER_PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function isAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isAuthPage(pathname: string): boolean {
  return pathname === "/login" || pathname === "/register";
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (isAdminPath(pathname) && pathname !== "/admin/login") {
    const client = createMiddlewareSupabaseClient(request);
    if (!client) {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }

    const { supabase, response } = client;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("from", pathname);
      return appendCookies(NextResponse.redirect(url), response);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("error", "not_admin");
      return appendCookies(NextResponse.redirect(url), response);
    }

    return response;
  }

  if (isUserProtectedPath(pathname)) {
    const client = createMiddlewareSupabaseClient(request);
    if (!client) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    const { supabase, response } = client;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return appendCookies(NextResponse.redirect(url), response);
    }

    return response;
  }

  if (isAuthPage(pathname)) {
    const client = createMiddlewareSupabaseClient(request);
    if (!client) return NextResponse.next();

    const { supabase, response } = client;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return response;

    const redirectParam = searchParams.get("redirect");
    const safeRedirect = safeInternalPath(redirectParam, "/profile");

    if (safeRedirect.startsWith("/admin")) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === "admin") {
        const target = safeRedirect === "/admin" ? "/admin/dashboard" : safeRedirect;
        return appendCookies(NextResponse.redirect(new URL(target, request.url)), response);
      }

      const denied = new URL("/admin/login", request.url);
      denied.searchParams.set("error", "not_admin");
      return appendCookies(NextResponse.redirect(denied), response);
    }

    return appendCookies(NextResponse.redirect(new URL(safeRedirect, request.url)), response);
  }

  return NextResponse.next();
}

function appendCookies(from: NextResponse, sessionResponse: NextResponse) {
  sessionResponse.cookies.getAll().forEach((cookie) => {
    from.cookies.set(cookie.name, cookie.value, cookie);
  });
  return from;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
