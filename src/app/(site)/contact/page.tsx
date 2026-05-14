"use client";

import { useState } from "react";

const field =
  "mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none ring-accent/30 focus:ring-2";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-foreground">
        Contact
      </h1>
      <p className="mt-3 text-sm text-muted">
        Customer support and press — we reply within 1–2 business days.
      </p>

      {sent ? (
        <p className="mt-10 rounded-xl border border-accent/30 bg-blue-50 p-6 text-sm text-foreground">
          Thanks — this demo does not send email. Connect a form backend or Resend
          in production.
        </p>
      ) : (
        <form
          className="mt-10 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label className="block">
            <span className="text-xs text-muted">Name</span>
            <input required className={field} />
          </label>
          <label className="block">
            <span className="text-xs text-muted">Email</span>
            <input required type="email" className={field} />
          </label>
          <label className="block">
            <span className="text-xs text-muted">Message</span>
            <textarea required rows={5} className={field} />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
