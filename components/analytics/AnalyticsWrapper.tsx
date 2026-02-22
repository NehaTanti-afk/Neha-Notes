"use client";

import { Analytics } from "@vercel/analytics/next";

export function AnalyticsWrapper() {
  return (
    <Analytics
      beforeSend={(event) => {
        // Exclude Vercel preview deployments
        if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
          return null;
        }
        return event;
      }}
    />
  );
}
