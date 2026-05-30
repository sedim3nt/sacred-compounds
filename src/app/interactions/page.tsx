import type { Metadata } from "next";
import { InteractionChecker } from "@/components/InteractionChecker";
import { Disclaimer } from "@/components/ui/Disclaimer";

export const metadata: Metadata = {
  title: "Psychedelic Drug Interaction Checker — Sacred Compounds",
  description:
    "Free psychedelic drug interaction checker. Select a substance and your current medications to see known dangerous interactions — SSRI, MAOI, lithium serotonin syndrome risk and more. Harm reduction, not medical advice.",
  alternates: { canonical: "/interactions" },
  openGraph: {
    title: "Psychedelic Drug Interaction Checker — Sacred Compounds",
    description:
      "Check known dangerous interactions between psychedelics and common medications. SSRIs, MAOIs, lithium, tramadol and more.",
    type: "website",
  },
};

export default function InteractionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-black text-white-flash mb-3">
          Interaction Checker
        </h1>
        <p className="text-muted text-sm leading-relaxed">
          Many of the most dangerous psychedelic experiences come from mixing a
          substance with a medication you already take. Select a compound and
          your current medications below to see known interaction risks —
          including the serotonin-syndrome risk of combining serotonergic
          psychedelics with SSRIs, MAOIs, lithium, or tramadol.
        </p>
      </header>

      <InteractionChecker />

      <div className="mt-10">
        <Disclaimer />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Psychedelic Drug Interaction Checker",
            applicationCategory: "HealthApplication",
            description:
              "Check known dangerous interactions between psychedelic substances and common medications such as SSRIs, MAOIs, lithium, and tramadol.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </div>
  );
}
