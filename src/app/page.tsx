import Link from "next/link";
import { SearchBar } from "@/components/ui/SearchBar";
import { classificationGroups, substances } from "@/lib/data";

const groupAccentClasses: Record<string, string> = {
  teal: "border-teal-glow/20 hover:border-teal-glow/50 text-teal-glow",
  orange: "border-neon-orange/20 hover:border-neon-orange/50 text-neon-orange",
  purple: "border-purple-400/20 hover:border-purple-400/50 text-purple-400",
  white: "border-white-flash/20 hover:border-white-flash/50 text-white-flash",
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1220px] px-6">
      {/* Hero */}
      <section className="py-20 md:py-32 text-center">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-neon-orange neon-orange-glow mb-6">
          Sacred Compounds
        </h1>
        <p className="typewriter text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 font-body">
          Evidence-based psychedelic education. Because the most dangerous thing is misinformation.
        </p>
        <SearchBar />
      </section>

      {/* Classification Cards */}
      <section className="pb-16">
        <h2 className="font-display text-xl font-bold text-white-flash mb-8 text-center">
          Explore by Classification
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {classificationGroups.map((group) => (
            <Link
              key={group.slug}
              href={`/classifications#${group.slug}`}
              className={`block bg-deep-purple/60 border rounded-lg p-5 transition-all card-glow ${
                groupAccentClasses[group.accent]
              }`}
            >
              <h3 className="font-display text-sm font-bold mb-2">
                {group.name}
              </h3>
              <p className="text-xs text-muted line-clamp-2">
                {group.subgroups.join(" · ")}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="pb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-deep-purple/40 border border-teal-glow/10 rounded-lg p-6 text-center">
            <p className="font-display text-3xl font-black text-teal-glow mb-1">
              {substances.length}
            </p>
            <p className="text-xs text-muted uppercase tracking-wider">
              Compounds Documented
            </p>
          </div>
          <div className="bg-deep-purple/40 border border-teal-glow/10 rounded-lg p-6 text-center">
            <p className="font-display text-3xl font-black text-teal-glow mb-1">
              {classificationGroups.length}
            </p>
            <p className="text-xs text-muted uppercase tracking-wider">
              Classification Groups
            </p>
          </div>
          <div className="bg-deep-purple/40 border border-teal-glow/10 rounded-lg p-6 text-center">
            <p className="font-display text-3xl font-black text-teal-glow mb-1">
              100%
            </p>
            <p className="text-xs text-muted uppercase tracking-wider">
              Evidence-Based Safety Data
            </p>
          </div>
        </div>
      </section>

      {/* Harm Reduction Banner */}
      <section className="pb-20">
        <div className="bg-deep-purple/60 border border-neon-orange/20 rounded-lg p-8 text-center">
          <h2 className="font-display text-lg font-bold text-neon-orange mb-3">
            Harm Reduction First
          </h2>
          <p className="text-sm text-muted max-w-2xl mx-auto mb-5">
            Every substance page includes safety data, contraindications, and
            dangerous combinations. Free. Always.
          </p>
          <Link
            href="/safety"
            className="inline-block bg-neon-orange hover:bg-neon-orange/90 text-void font-display text-sm font-bold px-6 py-2.5 rounded-lg transition-colors"
          >
            Visit Safety Hub
          </Link>
        </div>
      </section>
    </div>
  );
}
