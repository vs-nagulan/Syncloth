import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  signAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-token";

export async function POST(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || !password) {
    return NextResponse.json(
      {
        error:
          "Missing ADMIN_PASSWORD or ADMIN_SESSION_SECRET. Copy .env.example to .env.local.",
      },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const input = typeof body.password === "string" ? body.password : "";
  if (!verifyAdminPassword(input, password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await signAdminSession(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return res;
}
