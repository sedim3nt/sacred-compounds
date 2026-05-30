import type { Metadata } from "next";
import { LegalSelector } from "@/components/LegalSelector";
import { LAST_UPDATED, FEDERAL_NOTE } from "@/lib/legal";
import { Disclaimer } from "@/components/ui/Disclaimer";

export const metadata: Metadata = {
  title: "What's Legal Here — Psychedelic Legal Status by State | Sacred Compounds",
  description:
    "Check the legal status of psychedelics in your state. Colorado and Oregon therapeutic programs, decriminalization, and federal status — updated regularly. Not legal advice.",
  alternates: { canonical: "/legal" },
  openGraph: {
    title: "What's Legal Here — Psychedelic Legal Status by State",
    description:
      "Where psychedelics are legal, decriminalized, or therapeutically available across the U.S.",
    type: "website",
  },
};

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-black text-white-flash mb-3">
          What&apos;s Legal Here
        </h1>
        <p className="text-muted text-sm leading-relaxed mb-2">
          The legal landscape for psychedelics is changing fast and varies
          dramatically by jurisdiction. Select your state to see what is legal,
          decriminalized, or therapeutically available — and where to find
          official program information.
        </p>
        <p className="text-xs text-muted/70">
          Legal status last reviewed:{" "}
          <span className="text-teal-glow">{LAST_UPDATED}</span>
        </p>
      </header>

      <LegalSelector />

      {/* Federal baseline */}
      <section className="mt-10 border border-warning-red/30 bg-warning-red/5 rounded-lg p-6">
        <h2 className="font-display text-sm font-bold text-warning-red mb-3 uppercase tracking-wider">
          Federal Status (applies everywhere)
        </h2>
        <p className="text-sm text-white-flash/80 leading-relaxed">
          {FEDERAL_NOTE}
        </p>
      </section>

      <section className="mt-6 border border-muted/15 bg-deep-purple/40 rounded-lg p-6">
        <p className="text-xs text-muted leading-relaxed">
          This page is general educational information, <strong>not legal
          advice</strong>. Laws change frequently and local ordinances vary even
          within a state. Decriminalization is not legalization — it does not
          make a substance legal to buy, sell, or possess in all circumstances.
          Verify the current law for your specific city and county before making
          any decision, and consult a qualified attorney for legal questions.
        </p>
      </section>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  );
}
