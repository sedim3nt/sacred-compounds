"use client";

import { useState } from "react";
import {
  getAllSubstances,
  getClassificationGroup,
  classificationGroups,
} from "@/lib/data";
import { CompoundCard } from "@/components/ui/CompoundCard";

const allSubstances = getAllSubstances();

export default function CompoundsPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = activeFilter
    ? allSubstances.filter(
        (s) => getClassificationGroup(s.classification) === activeFilter
      )
    : allSubstances;

  return (
    <div className="mx-auto max-w-[1220px] px-6 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-black text-white-flash mb-2">
        All Compounds
      </h1>
      <p className="text-muted text-sm mb-8">
        {allSubstances.length} substances documented with safety data and
        evidence-based information.
      </p>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveFilter(null)}
          className={`px-3 py-1.5 text-xs font-display font-bold rounded-full border transition-all ${
            activeFilter === null
              ? "bg-teal-glow/10 text-teal-glow border-teal-glow/40"
              : "text-muted border-muted/20 hover:border-muted/40"
          }`}
        >
          All ({allSubstances.length})
        </button>
        {classificationGroups.map((group) => {
          const count = allSubstances.filter(
            (s) => getClassificationGroup(s.classification) === group.name
          ).length;
          return (
            <button
              key={group.slug}
              onClick={() =>
                setActiveFilter(
                  activeFilter === group.name ? null : group.name
                )
              }
              className={`px-3 py-1.5 text-xs font-display font-bold rounded-full border transition-all ${
                activeFilter === group.name
                  ? "bg-teal-glow/10 text-teal-glow border-teal-glow/40"
                  : "text-muted border-muted/20 hover:border-muted/40"
              }`}
            >
              {group.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((substance) => (
          <CompoundCard key={substance.slug} substance={substance} />
        ))}
      </div>
    </div>
  );
}
