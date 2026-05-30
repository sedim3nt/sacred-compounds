"use client";

import { useState } from "react";
import {
  jurisdictions,
  getJurisdiction,
  tierMeta,
  type StatusTier,
} from "@/lib/legal";

const accentClasses: Record<string, string> = {
  teal: "border-teal-glow/50 bg-teal-glow/5 text-teal-glow",
  orange: "border-neon-orange/50 bg-neon-orange/5 text-neon-orange",
  purple: "border-purple-400/50 bg-purple-400/5 text-purple-400",
  red: "border-warning-red/50 bg-warning-red/5 text-warning-red",
};

const badgeClasses: Record<string, string> = {
  teal: "bg-teal-glow/15 text-teal-glow",
  orange: "bg-neon-orange/15 text-neon-orange",
  purple: "bg-purple-400/15 text-purple-400",
  red: "bg-warning-red/15 text-warning-red",
};

function tierAccent(tier: StatusTier) {
  return tierMeta[tier].accent;
}

export function LegalSelector() {
  const [code, setCode] = useState("");
  const selected = code ? getJurisdiction(code) : undefined;

  return (
    <div className="space-y-8">
      <div className="bg-deep-purple/60 border border-muted/15 rounded-lg p-6">
        <label className="block font-display text-xs font-bold text-teal-glow uppercase tracking-wider mb-3">
          Select your jurisdiction
        </label>
        <select
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-void border border-muted/30 focus:border-teal-glow/60 rounded-lg px-4 py-3 text-white-flash outline-none text-sm appearance-none"
        >
          <option value="">— Choose a state —</option>
          {jurisdictions.map((j) => (
            <option key={j.code} value={j.code}>
              {j.name}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted mt-3">
          Don&apos;t see your state? Choose &ldquo;Everywhere else&rdquo; for the
          default status. Reform is changing constantly — always verify with a
          local, qualified source.
        </p>
      </div>

      {selected &&
        (() => {
          const accent = tierAccent(selected.tier);
          return (
            <div
              className={`border-2 rounded-lg p-6 ${accentClasses[accent]}`}
              aria-live="polite"
            >
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <h2 className="font-display text-xl font-black text-white-flash">
                  {selected.name}
                </h2>
                <span
                  className={`font-display text-xs font-bold px-3 py-1 rounded ${badgeClasses[accent]}`}
                >
                  {tierMeta[selected.tier].label}
                </span>
              </div>
              <p className="text-sm text-white-flash/90 leading-relaxed mb-4 font-bold">
                {selected.headline}
              </p>
              <p className="text-xs text-muted italic mb-5">
                {tierMeta[selected.tier].description}
              </p>
              <ul className="space-y-2.5">
                {selected.details.map((d, i) => (
                  <li
                    key={i}
                    className="text-sm text-white-flash/80 flex items-start gap-2"
                  >
                    <span className="text-muted mt-1 shrink-0">&#8226;</span>
                    {d}
                  </li>
                ))}
              </ul>
              {selected.officialLink && (
                <a
                  href={selected.officialLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-5 text-sm text-teal-glow hover:underline"
                >
                  {selected.officialLink.label} &rarr;
                </a>
              )}
            </div>
          );
        })()}
    </div>
  );
}
