"use client";

import { useState } from "react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <div className="mb-3 w-[min(100vw-2rem,20rem)] rounded-2xl border border-border bg-page p-4 shadow-xl ring-1 ring-border">
          <p className="text-sm font-semibold text-foreground">Syncloth assistant</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            AI chatbot for sizing, order status, and recommendations will plug in
            here (PRD). For now, email{" "}
            <a href="mailto:hello@syncloth.in" className="text-accent">
              hello@syncloth.in
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 text-xs text-muted hover:text-foreground"
          >
            Close
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white shadow-lg shadow-red-500/30 transition hover:bg-red-700"
        aria-label="Open chat"
      >
        AI
      </button>
    </div>
  );
}
