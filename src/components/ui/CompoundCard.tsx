import Link from "next/link";
import { type Substance } from "@/lib/data";
import { ClassBadge, OriginBadge } from "./ClassBadge";

export function CompoundCard({ substance }: { substance: Substance }) {
  return (
    <Link
      href={`/compounds/${substance.slug}`}
      className="block bg-deep-purple/60 border border-deep-purple hover:border-teal-glow/30 rounded-lg p-5 transition-all card-glow group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-display text-base font-bold text-white-flash group-hover:text-teal-glow transition-colors">
          {substance.name}
        </h3>
        <OriginBadge origin={substance.origin} />
      </div>
      <p className="text-xs text-muted italic mb-3">{substance.chemicalName}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        <ClassBadge classification={substance.classification} />
      </div>
      <p className="text-xs text-muted">
        Duration: <span className="text-white-flash/70">{substance.duration}</span>
      </p>
    </Link>
  );
}
