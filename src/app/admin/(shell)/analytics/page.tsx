import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Analytics",
};

export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-foreground">
        Analytics
      </h1>
      <p className="mt-2 text-sm text-muted">
        Funnels, cohorts, and product affinity — export to Sheets or connect
        PostHog / Mixpanel.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border bg-surface text-sm text-muted">
          Traffic chart placeholder
        </div>
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border bg-surface text-sm text-muted">
          Conversion funnel placeholder
        </div>
      </div>
    </div>
  );
}
