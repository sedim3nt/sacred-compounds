import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllSubstances,
  getBySlug,
  getRelated,
  getClassificationGroup,
} from "@/lib/data";
import { ClassBadge, OriginBadge } from "@/components/ui/ClassBadge";
import { QuickFact } from "@/components/ui/QuickFact";
import { SafetyWarning } from "@/components/ui/SafetyWarning";
import { Disclaimer } from "@/components/ui/Disclaimer";

export function generateStaticParams() {
  return getAllSubstances().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const substance = getBySlug(slug);
  if (!substance) return { title: "Not Found" };

  return {
    title: `${substance.name} — Sacred Compounds`,
    description: substance.overview.slice(0, 160),
    openGraph: {
      title: `${substance.name} — Sacred Compounds`,
      description: substance.overview.slice(0, 160),
      type: "article",
    },
  };
}

export default async function CompoundDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const substance = getBySlug(slug);
  if (!substance) notFound();

  const related = getRelated(substance);

  return (
    <div className="mx-auto max-w-[1220px] px-6 py-12">
      {/* Breadcrumb */}
      <div className="text-xs text-muted mb-8">
        <Link href="/compounds" className="hover:text-teal-glow transition-colors">
          Compounds
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white-flash">{substance.name}</span>
      </div>

      {/* Hero */}
      <header className="mb-10">
        <h1 className="font-display text-3xl md:text-5xl font-black text-white-flash mb-2">
          {substance.name}
        </h1>
        <p className="text-muted italic text-sm mb-4">{substance.chemicalName}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          <ClassBadge classification={substance.classification} />
          <OriginBadge origin={substance.origin} />
          <span className="inline-block px-2.5 py-0.5 text-xs font-display rounded-full border border-muted/20 text-muted">
            {substance.classification}
          </span>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-3 gap-3">
          <QuickFact label="Duration" value={substance.duration} />
          <QuickFact label="Onset" value={substance.onset} />
          <QuickFact label="Peak" value={substance.peak} />
        </div>
      </header>

      {/* Overview */}
      <section className="mb-10">
        <p className="text-white-flash/80 leading-relaxed">{substance.overview}</p>
      </section>

      {/* SAFETY FIRST */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-bold text-warning-red mb-5 flex items-center gap-2">
          <span>&#9888;&#65039;</span> Safety Information
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <SafetyWarning
            title="Contraindications"
            items={substance.contraindications}
            note="Do not use if any of the following apply to you."
          />
          <SafetyWarning
            title="Drug Interactions"
            items={substance.drugInteractions}
            note="If you are on SSRIs, MAOIs, or lithium — read this section carefully."
          />
        </div>
        {substance.dangerousCombinations.length > 0 && (
          <div className="mt-4">
            <SafetyWarning
              title="Dangerous Combinations"
              items={substance.dangerousCombinations}
              note="These combinations can be life-threatening."
            />
          </div>
        )}
      </section>

      {/* Effects */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-bold text-white-flash mb-5">
          Effects
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <EffectColumn title="Physical" items={substance.physicalEffects} />
          <EffectColumn
            title="Psychological"
            items={substance.psychologicalEffects}
          />
          <EffectColumn title="Visual" items={substance.visualEffects} />
        </div>
      </section>

      {/* Therapeutic Potential */}
      {substance.benefits.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-bold text-white-flash mb-5">
            Therapeutic Potential
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {substance.benefits.map((benefit) => (
              <div
                key={benefit}
                className="bg-deep-purple/40 border border-teal-glow/10 rounded-lg px-4 py-3 flex items-start gap-2"
              >
                <span className="text-teal-glow text-sm mt-0.5 shrink-0">&#10003;</span>
                <span className="text-sm text-white-flash/80">{benefit}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Legal Status */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-bold text-white-flash mb-4">
          Legal Status
        </h2>
        <div className="bg-deep-purple/40 border border-muted/10 rounded-lg p-5">
          <p className="text-sm text-white-flash/80">{substance.legalStatus}</p>
        </div>
      </section>

      {/* Related Compounds */}
      {related.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-bold text-white-flash mb-5">
            Related Compounds
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/compounds/${r.slug}`}
                className="bg-deep-purple/60 border border-deep-purple hover:border-teal-glow/30 rounded-lg p-4 transition-all card-glow"
              >
                <p className="font-display text-sm font-bold text-white-flash mb-1">
                  {r.name}
                </p>
                <p className="text-xs text-muted">{r.duration}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <Disclaimer />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${substance.name} — Sacred Compounds`,
            description: substance.overview.slice(0, 160),
            about: {
              "@type": "Drug",
              name: substance.name,
              alternateName: substance.commonNames,
            },
            disclaimer:
              "This content is for educational purposes only. It is not medical advice and should not be used to diagnose, treat, or prevent any condition.",
          }),
        }}
      />
    </div>
  );
}

function EffectColumn({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="bg-deep-purple/40 border border-deep-purple rounded-lg p-5">
      <h3 className="font-display text-xs font-bold text-teal-glow uppercase tracking-wider mb-3">
        {title}
      </h3>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-white-flash/70 flex items-start gap-2">
            <span className="text-teal-glow/50 mt-1 shrink-0">&#8226;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
