import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminDebugPage() {
  const enabled =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_ENABLE_ADMIN_DEBUG === "true";

  if (!enabled) {
    return new Response("Not found", { status: 404 });
  }

  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  let profile = null;
  let profileErr = null;
  if (user?.id) {
    const res = await supabase.from("profiles").select("*").eq("id", user.id).single();
    profile = res.data ?? null;
    profileErr = res.error ?? null;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Admin debug</h1>
      <p className="mt-2 text-sm text-muted">Visible in development or when debug enabled.</p>
      <section className="mt-4">
        <h2 className="font-semibold">Supabase user</h2>
        <pre className="mt-2 overflow-auto rounded border bg-page p-3 text-sm">{JSON.stringify({ user, userErr }, null, 2)}</pre>
      </section>
      <section className="mt-4">
        <h2 className="font-semibold">Profile row</h2>
        <pre className="mt-2 overflow-auto rounded border bg-page p-3 text-sm">{JSON.stringify({ profile, profileErr }, null, 2)}</pre>
      </section>
    </div>
  );
}
