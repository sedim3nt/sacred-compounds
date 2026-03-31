import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/ui/Disclaimer";

export const metadata: Metadata = {
  title: "About — Sacred Compounds",
  description:
    "Learn about Sacred Compounds: our mission, methodology, and commitment to evidence-based psychedelic education and harm reduction.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1220px] px-6 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-black text-white-flash mb-12">
        About Sacred Compounds
      </h1>

      <div className="max-w-3xl space-y-12">
        {/* Mission */}
        <section>
          <h2 className="font-display text-xl font-bold text-neon-orange mb-4">
            Our Mission
          </h2>
          <p className="text-white-flash/80 leading-relaxed mb-4">
            Education and harm reduction, not advocacy or sales. Sacred
            Compounds exists to provide accurate, evidence-based information
            about psychedelic substances — because the most dangerous thing is
            misinformation.
          </p>
          <p className="text-white-flash/80 leading-relaxed">
            We believe that people who choose to use these substances deserve
            access to reliable safety data, contraindication information, and
            harm reduction resources. Prohibition has not eliminated use — but
            ignorance makes it more dangerous.
          </p>
        </section>

        {/* What This Is / Is Not */}
        <section>
          <h2 className="font-display text-xl font-bold text-teal-glow mb-4">
            What This Is
          </h2>
          <ul className="space-y-2 text-sm text-white-flash/70 mb-8">
            <li className="flex items-start gap-2">
              <span className="text-teal-glow mt-0.5 shrink-0">&#10003;</span>
              An evidence-based educational resource
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-glow mt-0.5 shrink-0">&#10003;</span>
              A harm reduction tool with safety data for 31 compounds
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-glow mt-0.5 shrink-0">&#10003;</span>
              A reference for contraindications, drug interactions, and
              dangerous combinations
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-glow mt-0.5 shrink-0">&#10003;</span>
              Free and always will be
            </li>
          </ul>

          <h2 className="font-display text-xl font-bold text-warning-red mb-4">
            What This Is NOT
          </h2>
          <ul className="space-y-2 text-sm text-white-flash/70">
            <li className="flex items-start gap-2">
              <span className="text-warning-red mt-0.5 shrink-0">&#10007;</span>
              Medical advice — always consult a healthcare professional
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning-red mt-0.5 shrink-0">&#10007;</span>
              An endorsement or encouragement to use any substance
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning-red mt-0.5 shrink-0">&#10007;</span>
              A source for dosing recommendations or procurement information
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning-red mt-0.5 shrink-0">&#10007;</span>
              A substitute for professional medical care or therapy
            </li>
          </ul>
        </section>

        {/* Data Sources */}
        <section>
          <h2 className="font-display text-xl font-bold text-white-flash mb-4">
            Data Sources & Methodology
          </h2>
          <p className="text-white-flash/80 leading-relaxed mb-4">
            Information on Sacred Compounds is compiled from peer-reviewed
            research, clinical trial data, pharmacological databases, and
            established harm reduction organizations. Every substance profile
            includes safety information as the primary focus.
          </p>
          <p className="text-white-flash/80 leading-relaxed">
            We prioritize safety over comprehensiveness. If safety data is
            limited for a substance, we state that clearly rather than
            speculating. Contraindications, drug interactions, and dangerous
            combinations are prominently featured on every substance page —
            before effects or therapeutic potential.
          </p>
        </section>

        {/* Cultural Acknowledgment */}
        <section>
          <h2 className="font-display text-xl font-bold text-white-flash mb-4">
            Cultural Acknowledgment
          </h2>
          <p className="text-white-flash/80 leading-relaxed mb-4">
            Many of the substances documented here have been used for centuries
            or millennia by indigenous cultures in sacred, ceremonial, and
            healing contexts. We acknowledge and respect these traditions.
          </p>
          <p className="text-white-flash/80 leading-relaxed mb-4">
            The Mazatec people of Mexico with psilocybin mushrooms. The
            indigenous peoples of the Amazon with ayahuasca. The Bwiti tradition
            of Gabon with iboga. The Native American Church with peyote. The
            Huichol people with peyote and San Pedro.
          </p>
          <p className="text-white-flash/80 leading-relaxed">
            Western science is only beginning to understand what these cultures
            have known for generations. We present this information with
            humility and gratitude.
          </p>
        </section>

        {/* SpiritTree */}
        <section>
          <div className="bg-deep-purple/60 border border-teal-glow/10 rounded-lg p-6">
            <p className="text-sm text-muted mb-2">
              Sacred Compounds is a{" "}
              <Link
                href="https://spirittree.me"
                className="text-teal-glow hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                SpiritTree
              </Link>{" "}
              project.
            </p>
            <p className="text-xs text-muted/60">
              Built with care. Always free. Always open.
            </p>
          </div>
        </section>

        <Disclaimer />
      </div>
    </div>
  );
}
