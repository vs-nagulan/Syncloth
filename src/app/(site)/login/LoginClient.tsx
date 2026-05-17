"use client";

import { useSearchParams } from "next/navigation";

export default function LoginClient() {
  const params = useSearchParams();
  const redirect = params.get("redirect");

  return <div>Login page {redirect}</div>;
}