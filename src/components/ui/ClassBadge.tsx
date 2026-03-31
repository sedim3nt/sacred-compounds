import { getClassificationGroup } from "@/lib/data";

const groupColors: Record<string, string> = {
  "Classic Psychedelics": "bg-teal-glow/10 text-teal-glow border-teal-glow/30",
  Entactogens: "bg-neon-orange/10 text-neon-orange border-neon-orange/30",
  Dissociatives: "bg-purple-400/10 text-purple-400 border-purple-400/30",
  Atypical: "bg-white-flash/10 text-white-flash border-white-flash/30",
};

export function ClassBadge({ classification }: { classification: string }) {
  const group = getClassificationGroup(classification);
  const colors = groupColors[group] || groupColors["Classic Psychedelics"];

  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-display font-bold rounded-full border ${colors}`}
    >
      {group}
    </span>
  );
}

export function OriginBadge({ origin }: { origin: string }) {
  const isNatural = origin.toLowerCase().includes("natural");
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-display rounded-full border ${
        isNatural
          ? "bg-green-500/10 text-green-400 border-green-500/30"
          : "bg-muted/10 text-muted border-muted/30"
      }`}
    >
      {isNatural ? "Natural" : "Synthetic"}
    </span>
  );
}
