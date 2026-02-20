import Link from "next/link";

const QUICK_LINKS = [
  { href: "/subjects", label: "Subjects" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
];

export function Footer() {
  return (
    <footer className="bg-[oklch(0.20_0.03_50)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Three column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {/* Brand column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg tracking-tight">
              <span className="font-extrabold text-[oklch(0.76_0.08_65)]">Neha</span>
              <span className="font-light text-[oklch(0.55_0.04_60)]">Notes</span>
            </h3>
            <p className="text-sm text-[oklch(0.55_0.02_60)]">
              Free resources for MAKAUT engineering students.
            </p>
            <p className="text-xs text-[oklch(0.55_0.02_60)]">
              Made with love by Neha Tanti · JISCE
            </p>
          </div>

          {/* Quick Links column */}
          <div className="flex flex-col">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.55_0.02_60)] mb-3">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {QUICK_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-[oklch(0.50_0.02_60)] hover:text-[oklch(0.85_0.02_70)] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal column */}
          <div className="flex flex-col">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.55_0.02_60)] mb-3">
              Legal
            </h4>
            <nav className="flex flex-col gap-2">
              {LEGAL_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-[oklch(0.50_0.02_60)] hover:text-[oklch(0.85_0.02_70)] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[oklch(0.30_0.03_50)] text-center">
          <p className="text-xs text-[oklch(0.40_0.02_60)]">
            © 2026 NehaNotes
          </p>
        </div>
      </div>
    </footer>
  );
}
