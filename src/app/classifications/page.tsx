import type { Metadata } from "next";
import Link from "next/link";
import {
  classificationGroups,
  getSubstancesForGroup,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Classifications — Sacred Compounds",
  description:
    "Explore psychedelic compounds by classification: Classic Psychedelics, Entactogens, Dissociatives, and Atypical substances.",
};

const accentStyles: Record<string, { border: string; text: string; bg: string }> = {
  teal: { border: "border-teal-glow/30", text: "text-teal-glow", bg: "bg-teal-glow/5" },
  orange: { border: "border-neon-orange/30", text: "text-neon-orange", bg: "bg-neon-orange/5" },
  purple: { border: "border-purple-400/30", text: "text-purple-400", bg: "bg-purple-400/5" },
  white: { border: "border-white-flash/20", text: "text-white-flash", bg: "bg-white-flash/5" },
};

export default function ClassificationsPage() {
  return (
    <div className="mx-auto max-w-[1220px] px-6 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-black text-white-flash mb-2">
        Classifications
      </h1>
      <p className="text-muted text-sm mb-12">
        Psychedelic compounds organized by pharmacological classification and
        mechanism of action.
      </p>

      <div className="space-y-12">
        {classificationGroups.map((group) => {
          const substances = getSubstancesForGroup(group.name);
          const style = accentStyles[group.accent];

          return (
            <section
              key={group.slug}
              id={group.slug}
              className={`${style.bg} border ${style.border} rounded-lg p-6 md:p-8`}
            >
              <div className="mb-6">
                <h2 className={`font-display text-2xl font-bold ${style.text} mb-2`}>
                  {group.name}
                </h2>
                <p className="text-sm text-white-flash/70 leading-relaxed mb-3">
                  {group.description}
                </p>
                <div className="bg-void/30 rounded-lg p-3 mb-4">
                  <p className="text-xs text-muted uppercase tracking-wider font-display mb-1">
                    Mechanism of Action
                  </p>
                  <p className="text-sm text-white-flash/60">{group.mechanism}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.subgroups.map((sg) => (
                    <span
                      key={sg}
                      className={`text-xs font-display px-2.5 py-0.5 rounded-full border ${style.border} ${style.text}/70`}
                    >
                      {sg}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {substances.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/compounds/${s.slug}`}
                    className={`bg-void/30 border ${style.border}/50 hover:${style.border} rounded-lg p-4 transition-all card-glow`}
                  >
                    <p className="font-display text-sm font-bold text-white-flash mb-0.5">
                      {s.name}
                    </p>
                    <p className="text-xs text-muted italic mb-2">
                      {s.chemicalName}
                    </p>
                    <p className="text-xs text-muted">
                      {s.duration} · {s.origin}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
