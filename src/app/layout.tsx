import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sacred Compounds — Psychedelic Medicine Education",
  description:
    "Evidence-based psychedelic education and harm reduction. 31 compounds documented with safety data, contraindications, and dangerous combinations.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚗️</text></svg>",
  },
  openGraph: {
    title: "Sacred Compounds — Psychedelic Medicine Education",
    description:
      "Evidence-based psychedelic education and harm reduction. 31 compounds documented with safety data, contraindications, and dangerous combinations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-white-flash antialiased">
        <div className="relative z-10 flex min-h-dvh flex-col">
          <nav className="border-b border-deep-purple/50 bg-void/80 backdrop-blur-md sticky top-0 z-50">
            <div className="mx-auto max-w-[1220px] px-6 flex items-center justify-between h-16">
              <Link
                href="/"
                className="font-display text-xl font-bold text-teal-glow teal-glow tracking-tight"
              >
                Sacred Compounds
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link href="/compounds" className="text-sm text-muted hover:text-white-flash transition-colors">
                  Compounds
                </Link>
                <Link href="/classifications" className="text-sm text-muted hover:text-white-flash transition-colors">
                  Classifications
                </Link>
                <Link href="/safety" className="text-sm text-muted hover:text-white-flash transition-colors">
                  Safety
                </Link>
                <Link href="/about" className="text-sm text-muted hover:text-white-flash transition-colors">
                  About
                </Link>
              </div>
              <MobileMenu />
            </div>
          </nav>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-deep-purple/50 bg-void">
            <div className="mx-auto max-w-[1220px] px-6 py-10">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-display text-sm font-bold text-teal-glow mb-3">
                    Sacred Compounds
                  </h3>
                  <p className="text-sm text-muted">
                    Evidence-based psychedelic education. Because the most
                    dangerous thing is misinformation.
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-white-flash mb-3 uppercase tracking-wider">
                    Navigation
                  </h4>
                  <div className="flex flex-col gap-2">
                    <Link href="/compounds" className="text-sm text-muted hover:text-teal-glow transition-colors">Compounds</Link>
                    <Link href="/classifications" className="text-sm text-muted hover:text-teal-glow transition-colors">Classifications</Link>
                    <Link href="/safety" className="text-sm text-muted hover:text-teal-glow transition-colors">Safety Hub</Link>
                    <Link href="/about" className="text-sm text-muted hover:text-teal-glow transition-colors">About</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-warning-red mb-3 uppercase tracking-wider">
                    Crisis Resources
                  </h4>
                  <div className="flex flex-col gap-2 text-sm text-muted">
                    <p>988 Suicide & Crisis Lifeline: <span className="text-white-flash">988</span></p>
                    <p>Poison Control: <span className="text-white-flash">1-800-222-1222</span></p>
                    <p>Fireside Project: <span className="text-white-flash">62-FIRESIDE</span></p>
                  </div>
                </div>
              </div>
            </div>
          </footer>

          <div className="bg-warning-red/10 border-t border-warning-red/30 py-3 text-center">
            <p className="text-xs text-warning-red/80 max-w-[1220px] mx-auto px-6">
              Education and harm reduction only. This is not medical advice.
              Always consult a healthcare professional. Never use illegal
              substances.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}

function MobileMenu() {
  return (
    <div className="md:hidden">
      <details className="group">
        <summary className="list-none cursor-pointer text-muted hover:text-white-flash p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" className="group-open:hidden" />
            <line x1="3" y1="12" x2="21" y2="12" className="group-open:hidden" />
            <line x1="3" y1="18" x2="21" y2="18" className="group-open:hidden" />
            <line x1="6" y1="6" x2="18" y2="18" className="hidden group-open:block" />
            <line x1="6" y1="18" x2="18" y2="6" className="hidden group-open:block" />
          </svg>
        </summary>
        <div className="absolute right-4 top-14 bg-deep-purple border border-muted/20 rounded-lg p-4 flex flex-col gap-3 min-w-[160px] shadow-xl">
          <Link href="/compounds" className="text-sm text-muted hover:text-white-flash transition-colors">Compounds</Link>
          <Link href="/classifications" className="text-sm text-muted hover:text-white-flash transition-colors">Classifications</Link>
          <Link href="/safety" className="text-sm text-muted hover:text-white-flash transition-colors">Safety</Link>
          <Link href="/about" className="text-sm text-muted hover:text-white-flash transition-colors">About</Link>
        </div>
      </details>
    </div>
  );
}
