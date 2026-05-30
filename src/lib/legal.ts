// "What's Legal Here" data — US jurisdiction-level status for psychedelics.
// MANUALLY MAINTAINED. The legal landscape changes frequently; update LAST_UPDATED
// whenever this file changes. This is general information, NOT legal advice.

export const LAST_UPDATED = "2026-05-29";

export type StatusTier = "therapeutic" | "decriminalized" | "illegal" | "mixed";

export interface Jurisdiction {
  code: string;
  name: string;
  tier: StatusTier;
  headline: string;
  details: string[];
  officialLink?: { label: string; url: string };
}

export const tierMeta: Record<
  StatusTier,
  { label: string; accent: string; description: string }
> = {
  therapeutic: {
    label: "Legal Therapeutic Access",
    accent: "teal",
    description: "A state-regulated program allows supervised therapeutic use.",
  },
  decriminalized: {
    label: "Decriminalized",
    accent: "orange",
    description:
      "Not legal, but possession is the lowest law-enforcement priority or carries reduced penalties. Sale/distribution remains illegal.",
  },
  mixed: {
    label: "Mixed / City-Level Reform",
    accent: "purple",
    description:
      "No statewide reform, but specific cities have deprioritized enforcement.",
  },
  illegal: {
    label: "Illegal",
    accent: "red",
    description:
      "No state-level reform. Most psychedelics remain Schedule I under state and federal law.",
  },
};

// Federal baseline applies everywhere.
export const FEDERAL_NOTE =
  "Under U.S. federal law, most classic psychedelics (psilocybin, LSD, DMT, mescaline, MDMA) remain Schedule I controlled substances. State reforms do not change federal illegality, and ketamine and esketamine are the only psychedelics with FDA-approved medical uses. Crossing state lines with controlled substances is a federal offense.";

export const jurisdictions: Jurisdiction[] = [
  {
    code: "CO",
    name: "Colorado",
    tier: "therapeutic",
    headline:
      "Natural Medicine (Prop 122): personal use decriminalized; regulated healing centers launching.",
    details: [
      "Proposition 122 (2022) decriminalized personal possession, use, growing, and sharing of psilocybin, psilocin, DMT, ibogaine, and mescaline (excluding peyote) for adults 21+.",
      "A regulated Natural Medicine Program allows supervised psilocybin services at licensed healing centers — facilitator licensing and the first healing centers are rolling out in 2025–2026.",
      "Selling these substances for profit outside the regulated program remains illegal.",
      "Peyote is specifically excluded out of respect for Indigenous use and conservation.",
    ],
    officialLink: {
      label: "Colorado Natural Medicine Program (CDPHE / DORA)",
      url: "https://dpo.colorado.gov/NaturalMedicine",
    },
  },
  {
    code: "OR",
    name: "Oregon",
    tier: "therapeutic",
    headline:
      "Measure 109: licensed psilocybin service centers operating statewide.",
    details: [
      "Measure 109 (2020) created the nation's first regulated psilocybin services program; licensed service centers have been operating since 2023.",
      "Access is through supervised sessions with a licensed facilitator at a licensed service center — no prescription or medical diagnosis required, but it is not take-home/personal-use legal.",
      "Measure 110 separately decriminalized personal possession of small amounts of many drugs, though Oregon recriminalized some possession in 2024 — check current local rules.",
      "Counties and cities could opt out of hosting service centers; availability varies by location.",
    ],
    officialLink: {
      label: "Oregon Psilocybin Services (Oregon Health Authority)",
      url: "https://www.oregon.gov/oha/ph/preventionwellness/pages/oregon-psilocybin-services.aspx",
    },
  },
  {
    code: "NM",
    name: "New Mexico",
    tier: "therapeutic",
    headline:
      "Medical Psilocybin Act (2025): state-regulated medical psilocybin program in development.",
    details: [
      "New Mexico enacted a Medical Psilocybin Act in 2025 directing the Department of Health to create a regulated medical psilocybin treatment program for qualifying conditions.",
      "The program is in the rulemaking/implementation phase; treatment access is not yet broadly available.",
      "Outside the future medical program, psilocybin remains illegal.",
    ],
  },
  {
    code: "CA",
    name: "California",
    tier: "mixed",
    headline: "No statewide reform, but several cities have decriminalized.",
    details: [
      "Statewide decriminalization bills have not become law; possession of most psychedelics remains illegal under California law.",
      "Oakland, Santa Cruz, San Francisco, Berkeley, and Arcata have passed measures deprioritizing enforcement against entheogenic plants and fungi.",
      "City-level deprioritization is not legalization — state and federal law still apply.",
    ],
  },
  {
    code: "MA",
    name: "Massachusetts",
    tier: "mixed",
    headline:
      "Statewide legalization ballot measure failed (2024); some cities decriminalized.",
    details: [
      "A 2024 statewide ballot measure to legalize and regulate certain natural psychedelics did not pass.",
      "Somerville, Cambridge, Northampton, Easthampton, Salem, and other cities have deprioritized enforcement against entheogenic plants and fungi.",
      "Psychedelics remain illegal under state law outside these local enforcement priorities.",
    ],
  },
  {
    code: "WA",
    name: "Washington",
    tier: "mixed",
    headline:
      "No statewide program yet; Seattle deprioritized; state-funded research underway.",
    details: [
      "Seattle deprioritized enforcement against non-commercial entheogen activity (2021).",
      "Washington has funded a psilocybin task force / pilot work exploring supervised access, but no statewide legal program is operating yet.",
      "Possession of psychedelics otherwise remains illegal statewide.",
    ],
  },
  {
    code: "MI",
    name: "Michigan",
    tier: "mixed",
    headline: "Several cities deprioritized; no statewide reform.",
    details: [
      "Ann Arbor, Detroit, Hazel Park, Ferndale, and Washtenaw County have deprioritized enforcement against entheogenic plants and fungi.",
      "No statewide decriminalization or therapeutic program; possession remains illegal under state law.",
    ],
  },
  {
    code: "OTHER",
    name: "Everywhere else (default)",
    tier: "illegal",
    headline:
      "In most U.S. states there is no reform — psychedelics remain illegal.",
    details: [
      "Most states have no decriminalization or therapeutic-access law; classic psychedelics are Schedule I controlled substances.",
      "Ketamine is a legal, FDA-approved anesthetic and is used off-label and as FDA-approved esketamine (Spravato) for treatment-resistant depression in clinics nationwide.",
      "Some individual cities not listed here may have passed local resolutions — check your specific city and county.",
    ],
  },
];

export function getJurisdiction(code: string): Jurisdiction | undefined {
  return jurisdictions.find((j) => j.code === code);
}
