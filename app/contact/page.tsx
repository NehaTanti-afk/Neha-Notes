import type { Metadata } from "next";
import { Mail, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us — NehaNotes",
  description:
    "Get in touch with the NehaNotes team. We're here to help MAKAUT engineering students.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="mb-12 space-y-4 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 mx-auto">
          <Mail className="size-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Have a question, found an issue, or need help with your account?
          We&apos;re here to help.
        </p>
      </div>

      <div className="space-y-5">
        {/* Primary CTA — Support Ticket */}
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <MessageSquare className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">Raise a Support Ticket</p>
              <p className="text-xs text-muted-foreground">
                For access problems, content queries, or account issues
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The fastest way to get help. Describe your issue and we&apos;ll get
            back to you as soon as possible.
          </p>
          <Button asChild size="sm">
            <Link href="/support">Open Support Ticket</Link>
          </Button>
        </div>

        {/* Email */}
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <Mail className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">Email Us</p>
              <p className="text-xs text-muted-foreground">
                For general inquiries and feedback
              </p>
            </div>
          </div>
          <a
            href="mailto:nehatanti59@gmail.com"
            className="block text-sm font-medium underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            nehatanti59@gmail.com
          </a>
        </div>

        {/* Response time */}
        <div className="rounded-xl border bg-secondary/50 p-5 flex items-start gap-3">
          <Clock className="size-4 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            We typically respond within{" "}
            <span className="font-medium text-foreground">24–48 hours</span> on
            business days.
          </p>
        </div>

        {/* Quick links */}
        <div className="pt-2 space-y-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            Quick Links
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/terms"
              className="rounded-xl border px-4 py-3 text-center hover:bg-accent/40 text-sm transition-colors text-muted-foreground hover:text-foreground"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy"
              className="rounded-xl border px-4 py-3 text-center hover:bg-accent/40 text-sm transition-colors text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
