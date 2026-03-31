import substancesData from "@/data/substances.json";
import categoriesData from "@/data/categories.json";

export interface Substance {
  slug: string;
  name: string;
  chemicalName: string;
  sourceFile: string;
  classification: string;
  duration: string;
  onset: string;
  peak: string;
  origin: string;
  legalStatus: string;
  commonNames: string;
  overview: string;
  physicalEffects: string[];
  psychologicalEffects: string[];
  visualEffects: string[];
  benefits: string[];
  contraindications: string[];
  drugInteractions: string[];
  dangerousCombinations: string[];
}

export interface Category {
  name: string;
  slug: string;
  refs: string[];
}

export const substances: Substance[] = substancesData as Substance[];
export const categories: Category[] = categoriesData as Category[];

export function getAllSubstances(): Substance[] {
  return [...substances].sort((a, b) => a.name.localeCompare(b.name));
}

export function getBySlug(slug: string): Substance | undefined {
  return substances.find((s) => s.slug === slug);
}

export function getByClassification(classification: string): Substance[] {
  return substances
    .filter((s) => s.classification.toLowerCase().includes(classification.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getRelated(substance: Substance): Substance[] {
  const classBase = getClassificationGroup(substance.classification);
  return substances
    .filter((s) => s.slug !== substance.slug && getClassificationGroup(s.classification) === classBase)
    .slice(0, 4);
}

export function getClassificationGroup(classification: string): string {
  const cl = classification.toLowerCase();
  if (cl.includes("tryptamine")) return "Classic Psychedelics";
  if (cl.includes("lysergamide")) return "Classic Psychedelics";
  if (cl.includes("phenethylamine") && !cl.includes("entactogen")) return "Classic Psychedelics";
  if (cl.includes("entactogen") || cl.includes("empathogen")) return "Entactogens";
  if (cl.includes("dissociative")) return "Dissociatives";
  if (cl.includes("cannabinoid") || cl.includes("cannabis")) return "Atypical";
  if (cl.includes("deliriant") || cl.includes("anticholinergic")) return "Atypical";
  if (cl.includes("gabaergic") || cl.includes("gaba")) return "Atypical";
  if (cl.includes("kappa opioid") || cl.includes("salvinorin")) return "Atypical";
  if (cl.includes("atypical")) return "Atypical";
  return "Classic Psychedelics";
}

export const classificationGroups = [
  {
    name: "Classic Psychedelics",
    slug: "classic-psychedelics",
    description: "Tryptamines, Lysergamides, and Phenethylamines that primarily act on serotonin 5-HT2A receptors to produce profound alterations in perception, cognition, and emotion.",
    mechanism: "Primarily agonize serotonin 5-HT2A receptors in the prefrontal cortex, disrupting the default mode network and increasing neural connectivity.",
    accent: "teal",
    subgroups: ["Tryptamines", "Lysergamides", "Phenethylamines"],
  },
  {
    name: "Entactogens",
    slug: "entactogens",
    description: "Substances that produce feelings of emotional openness, empathy, and connectedness. The MDMA class primarily enhances serotonin, dopamine, and norepinephrine release.",
    mechanism: "Trigger massive release of serotonin, dopamine, and norepinephrine while inhibiting their reuptake, producing intense emotional warmth and empathy.",
    accent: "orange",
    subgroups: ["MDMA Class"],
  },
  {
    name: "Dissociatives",
    slug: "dissociatives",
    description: "Compounds that produce feelings of detachment from the body and environment. Includes arylcyclohexylamines (ketamine, PCP) and other NMDA receptor antagonists.",
    mechanism: "Block NMDA glutamate receptors, disrupting normal sensory processing and producing dissociation between mind and body.",
    accent: "purple",
    subgroups: ["Arylcyclohexylamines", "Others"],
  },
  {
    name: "Atypical",
    slug: "atypical",
    description: "Psychoactive substances with unique mechanisms that don't fit neatly into other categories. Includes cannabinoids, deliriants, GABAergics, and kappa opioid agonists.",
    mechanism: "Various mechanisms including CB1 receptor agonism (cannabis), muscarinic antagonism (datura), GABA-A modulation (muscimol), and kappa opioid agonism (salvia).",
    accent: "white",
    subgroups: ["Cannabinoids", "Deliriants", "GABAergics", "Kappa Opioid Agonists"],
  },
] as const;

export function getGroupForSubstance(substance: Substance) {
  const groupName = getClassificationGroup(substance.classification);
  return classificationGroups.find((g) => g.name === groupName);
}

export function getSubstancesForGroup(groupName: string): Substance[] {
  return substances
    .filter((s) => getClassificationGroup(s.classification) === groupName)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function searchCompounds(query: string): Substance[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return substances.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.chemicalName.toLowerCase().includes(q) ||
      s.commonNames.toLowerCase().includes(q) ||
      s.classification.toLowerCase().includes(q)
  );
}
