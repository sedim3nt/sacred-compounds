"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { type Substance, getAllSubstances } from "@/lib/data";

const allSubstances = getAllSubstances();
const fuse = new Fuse(allSubstances, {
  keys: ["name", "chemicalName", "commonNames", "classification"],
  threshold: 0.35,
});

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Substance[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(value: string) {
    setQuery(value);
    if (value.trim().length === 0) {
      setResults([]);
      setOpen(false);
      return;
    }
    const found = fuse.search(value).map((r) => r.item);
    setResults(found.slice(0, 8));
    setOpen(true);
  }

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto">
      <input
        type="search"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search 31 compounds..."
        className="w-full bg-deep-purple/80 border border-muted/30 focus:border-teal-glow/60 focus:ring-1 focus:ring-teal-glow/30 rounded-lg px-4 py-3 text-white-flash placeholder:text-muted/60 outline-none transition-all font-body text-sm"
      />
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-deep-purple border border-muted/20 rounded-lg shadow-2xl overflow-hidden z-50">
          {results.map((s) => (
            <Link
              key={s.slug}
              href={`/compounds/${s.slug}`}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 hover:bg-teal-glow/5 border-b border-deep-purple/50 last:border-0 transition-colors"
            >
              <span className="text-sm font-bold text-white-flash">{s.name}</span>
              <span className="text-xs text-muted ml-2">{s.classification}</span>
            </Link>
          ))}
        </div>
      )}
      {open && results.length === 0 && query.trim().length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-deep-purple border border-muted/20 rounded-lg p-4 text-sm text-muted z-50">
          No compounds found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
