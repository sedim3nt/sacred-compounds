"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getAllSubstances } from "@/lib/data";
import {
  medicationClasses,
  checkInteraction,
  hasInteractionData,
  riskMeta,
  type RiskLevel,
} from "@/lib/interactions";

const allSubstances = getAllSubstances();

const riskStyles: Record<RiskLevel, string> = {
  fatal: "border-warning-red/60 bg-warning-red/10 text-warning-red danger-glow",
  danger: "border-warning-red/40 bg-warning-red/5 text-warning-red",
  caution: "border-neon-orange/40 bg-neon-orange/5 text-neon-orange",
  low: "border-teal-glow/30 bg-teal-glow/5 text-teal-glow",
};

const riskBadge: Record<RiskLevel, string> = {
  fatal: "bg-warning-red/20 text-warning-red",
  danger: "bg-warning-red/15 text-warning-red",
  caution: "bg-neon-orange/15 text-neon-orange",
  low: "bg-teal-glow/15 text-teal-glow",
};

export function InteractionChecker() {
  const [substanceSlug, setSubstanceSlug] = useState("");
  const [selectedMeds, setSelectedMeds] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  function toggleMed(id: string) {
    setChecked(false);
    setSelectedMeds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  const results = useMemo(() => {
    if (!substanceSlug || selectedMeds.length === 0) return [];
    return selectedMeds
      .map((medId) => {
        const med = medicationClasses.find((m) => m.id === medId)!;
        const result = checkInteraction(substanceSlug, medId);
        return { med, ...result };
      })
      .sort((a, b) => riskMeta[a.level].order - riskMeta[b.level].order);
  }, [substanceSlug, selectedMeds]);

  const substance = allSubstances.find((s) => s.slug === substanceSlug);
  const noData = substanceSlug && !hasInteractionData(substanceSlug);
  const worst = results[0]?.level;

  return (
    <div className="space-y-8">
      {/* Step 1: substance */}
      <div className="bg-deep-purple/60 border border-muted/15 rounded-lg p-6">
        <label className="block font-display text-xs font-bold text-teal-glow uppercase tracking-wider mb-3">
          1. Select a substance
        </label>
        <select
          value={substanceSlug}
          onChange={(e) => {
            setSubstanceSlug(e.target.value);
            setChecked(false);
          }}
          className="w-full bg-void border border-muted/30 focus:border-teal-glow/60 rounded-lg px-4 py-3 text-white-flash outline-none text-sm appearance-none"
        >
          <option value="">— Choose a compound —</option>
          {allSubstances.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Step 2: meds */}
      <div className="bg-deep-purple/60 border border-muted/15 rounded-lg p-6">
        <label className="block font-display text-xs font-bold text-teal-glow uppercase tracking-wider mb-1">
          2. Select your current medications / substances
        </label>
        <p className="text-xs text-muted mb-4">
          Choose everything you currently take. Not sure which class your
          medication is? Look it up or ask your prescriber.
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          {medicationClasses.map((med) => {
            const active = selectedMeds.includes(med.id);
            return (
              <button
                key={med.id}
                type="button"
                onClick={() => toggleMed(med.id)}
                className={`text-left rounded-lg px-4 py-3 border transition-all ${
                  active
                    ? "border-teal-glow/60 bg-teal-glow/10"
                    : "border-muted/15 bg-void hover:border-muted/40"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                      active
                        ? "border-teal-glow bg-teal-glow text-void"
                        : "border-muted/40 text-transparent"
                    }`}
                  >
                    &#10003;
                  </span>
                  <span className="text-sm font-bold text-white-flash">
                    {med.label}
                  </span>
                </span>
                <span className="block text-xs text-muted mt-1 pl-6">
                  {med.examples}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Check button */}
      <button
        type="button"
        disabled={!substanceSlug || selectedMeds.length === 0}
        onClick={() => setChecked(true)}
        className="w-full bg-neon-orange disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neon-orange/90 text-void font-display text-sm font-bold px-6 py-3.5 rounded-lg transition-colors"
      >
        Check Interactions
      </button>

      {/* Results */}
      {checked && substance && (
        <div className="space-y-4" aria-live="polite">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <h2 className="font-display text-lg font-bold text-white-flash">
              {substance.name} — {selectedMeds.length} interaction
              {selectedMeds.length > 1 ? "s" : ""} checked
            </h2>
            {worst && (
              <span
                className={`font-display text-xs font-bold px-3 py-1 rounded ${riskBadge[worst]}`}
              >
                Highest risk: {riskMeta[worst].label}
              </span>
            )}
          </div>

          {noData && (
            <div className="border border-muted/20 bg-deep-purple/40 rounded-lg p-5 text-sm text-muted">
              Detailed interaction data for {substance.name} is limited. Treat
              any combination as potentially dangerous and consult a healthcare
              professional. Review the substance&apos;s contraindications on its{" "}
              <Link
                href={`/compounds/${substance.slug}`}
                className="text-teal-glow hover:underline"
              >
                profile page
              </Link>
              .
            </div>
          )}

          {results.map(({ med, level, summary }) => (
            <div
              key={med.id}
              className={`border-2 rounded-lg p-5 ${riskStyles[level]}`}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="font-display text-sm font-bold">
                  {substance.name} + {med.label}
                </h3>
                <span
                  className={`font-display text-[11px] font-bold px-2.5 py-0.5 rounded shrink-0 ${riskBadge[level]}`}
                >
                  {riskMeta[level].label}
                </span>
              </div>
              <p className="text-sm text-white-flash/80 leading-relaxed">
                {summary}
              </p>
            </div>
          ))}

          <div className="border border-warning-red/30 bg-warning-red/5 rounded-lg p-5">
            <p className="text-xs text-warning-red/90 leading-relaxed">
              <strong>This tool does not replace medical advice.</strong> It
              covers common, well-documented interaction patterns by drug class —
              it cannot account for your specific medication, dose, health
              conditions, or every possible interaction. &ldquo;No major known
              interaction&rdquo; does not mean safe. When in doubt, do not
              combine, and consult a doctor or pharmacist. In an emergency call
              911 or Poison Control at 1-800-222-1222.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
