// Drug interaction matrix for the Interaction Checker.
// Sources: published pharmacology (Tripsitter combination charts, DanceSafe,
// PsychonautWiki interaction data) + clinical SSRI/MAOI/lithium guidance.
//
// This is harm-reduction education, NOT medical advice. Risk tiers:
//  - "fatal":   Documented life-threatening / potentially lethal interaction.
//  - "danger":  Serious risk — strongly avoid.
//  - "caution": Increased risk or reduced/unpredictable effect — be careful.
//  - "low":     No major known dangerous interaction (still not "safe").

export type RiskLevel = "fatal" | "danger" | "caution" | "low";

export interface MedicationClass {
  id: string;
  label: string;
  examples: string;
}

// Common medication / substance classes a user might already be taking.
export const medicationClasses: MedicationClass[] = [
  { id: "ssri", label: "SSRIs", examples: "Prozac, Zoloft, Lexapro, Sertraline, Citalopram" },
  { id: "snri", label: "SNRIs", examples: "Effexor, Cymbalta, Venlafaxine, Duloxetine" },
  { id: "maoi", label: "MAOIs", examples: "Nardil, Parnate, Phenelzine, Selegiline, Moclobemide" },
  { id: "tricyclic", label: "Tricyclic Antidepressants", examples: "Amitriptyline, Nortriptyline, Imipramine" },
  { id: "lithium", label: "Lithium", examples: "Lithium carbonate (mood stabilizer)" },
  { id: "lamotrigine", label: "Lamotrigine / Anticonvulsants", examples: "Lamictal, Carbamazepine" },
  { id: "tramadol", label: "Tramadol", examples: "Ultram (atypical opioid)" },
  { id: "opioid", label: "Opioids", examples: "Oxycodone, Codeine, Morphine, Fentanyl, Heroin" },
  { id: "benzo", label: "Benzodiazepines", examples: "Xanax, Valium, Klonopin, Ativan" },
  { id: "stimulant", label: "Stimulants / ADHD meds", examples: "Adderall, Vyvanse, Ritalin, Cocaine" },
  { id: "dxm", label: "DXM", examples: "Dextromethorphan (cough medicine)" },
  { id: "antipsychotic", label: "Antipsychotics", examples: "Risperidone, Quetiapine, Olanzapine" },
  { id: "bp_med", label: "Blood Pressure / Heart Meds", examples: "Beta blockers, Nitrates" },
  { id: "alcohol", label: "Alcohol", examples: "Beer, wine, spirits" },
  { id: "cannabis_med", label: "Cannabis", examples: "THC products" },
  { id: "5htp", label: "5-HTP / L-Tryptophan", examples: "Serotonin precursor supplements" },
  { id: "st_johns", label: "St. John's Wort", examples: "Herbal antidepressant" },
];

// Pharmacological category a substance belongs to, for interaction lookup.
type SubstanceCategory =
  | "serotonergic_psychedelic" // LSD, psilocybin, DMT, mescaline, 2C-x, etc.
  | "maoi_psychedelic" // ayahuasca, changa, harmaline, pharmahuasca
  | "entactogen" // MDMA, MDA
  | "dissociative" // ketamine, PCP, DXM, 3-MeO-PCP
  | "deliriant" // datura
  | "cannabinoid" // cannabis
  | "kappa_opioid" // salvia
  | "ibogaine" // iboga / ibogaine (cardiac)
  | "gaba" // muscimol / amanita
  | "nbome"; // 25x-NBOMe (high risk)

// Map each substance slug -> pharmacological category.
const substanceCategory: Record<string, SubstanceCategory> = {
  psilocybin: "serotonergic_psychedelic",
  lsd: "serotonergic_psychedelic",
  "1p-lsd": "serotonergic_psychedelic",
  "al-lad": "serotonergic_psychedelic",
  lsa: "serotonergic_psychedelic",
  dmt: "serotonergic_psychedelic",
  "5-meo-dmt": "serotonergic_psychedelic",
  dpt: "serotonergic_psychedelic",
  "4-aco-dmt": "serotonergic_psychedelic",
  "4-ho-met": "serotonergic_psychedelic",
  mescaline: "serotonergic_psychedelic",
  peyote: "serotonergic_psychedelic",
  "san-pedro": "serotonergic_psychedelic",
  "2c-b": "serotonergic_psychedelic",
  doc: "serotonergic_psychedelic",
  ayahuasca: "maoi_psychedelic",
  changa: "maoi_psychedelic",
  harmaline: "maoi_psychedelic",
  mdma: "entactogen",
  mda: "entactogen",
  ketamine: "dissociative",
  pcp: "dissociative",
  "3-meo-pcp": "dissociative",
  "nitrous-oxide": "dissociative",
  "salvia-divinorum": "kappa_opioid",
  datura: "deliriant",
  cannabis: "cannabinoid",
  iboga: "ibogaine",
  ibogaine: "ibogaine",
  muscimol: "gaba",
  "25i-nbome": "nbome",
};

interface InteractionResult {
  level: RiskLevel;
  summary: string;
}

const SAFE: InteractionResult = {
  level: "low",
  summary: "No major dangerous interaction is well-documented. This does not mean the combination is safe — start low, never mix multiple unknowns, and consult a professional.",
};

// Core interaction logic: substance category x medication class.
function lookup(category: SubstanceCategory, med: string): InteractionResult {
  // Serotonin-syndrome cluster (serotonergic drugs).
  const serotonergicMed =
    med === "ssri" || med === "snri" || med === "maoi" || med === "tricyclic" ||
    med === "tramadol" || med === "5htp" || med === "st_johns" || med === "dxm";

  switch (category) {
    case "serotonergic_psychedelic": {
      if (med === "lithium") return { level: "fatal", summary: "Lithium + psychedelics is one of the most dangerous documented combinations — strongly associated with seizures and life-threatening reactions. Never combine." };
      if (med === "tramadol") return { level: "fatal", summary: "Tramadol lowers the seizure threshold and is serotonergic. Combined with a psychedelic the seizure and serotonin-syndrome risk is severe. Never combine." };
      if (med === "maoi") return { level: "danger", summary: "MAOIs dramatically potentiate and prolong serotonergic psychedelics and raise serotonin-syndrome risk. Avoid unless under expert supervision." };
      if (med === "ssri" || med === "snri") return { level: "caution", summary: "SSRIs/SNRIs usually blunt the psychedelic effect, which can lead people to redose dangerously. Serotonin-syndrome risk is generally low for classic psychedelics but real. Do not increase dose to 'break through.'" };
      if (med === "tricyclic" || med === "lithium" || med === "lamotrigine") return { level: "danger", summary: "Tricyclics and some mood stabilizers can unpredictably potentiate effects and raise seizure/cardiac risk. Avoid." };
      if (med === "5htp" || med === "st_johns") return { level: "caution", summary: "Adds serotonergic load. Increases theoretical serotonin-syndrome risk. Avoid stacking serotonergic agents." };
      if (med === "stimulant") return { level: "danger", summary: "Stimulants add cardiovascular strain, anxiety, and overheating to an already activating experience. Raises risk of a difficult/panic experience." };
      if (med === "antipsychotic") return { level: "caution", summary: "Antipsychotics typically block the psychedelic effect (5-HT2A antagonism) — sometimes used as a 'trip stopper' — but can cause their own complications. Not a safe enhancer." };
      if (med === "alcohol") return { level: "caution", summary: "Alcohol can increase nausea, dehydration, and poor decision-making. It dulls the experience and adds risk." };
      return SAFE;
    }

    case "maoi_psychedelic": {
      // Ayahuasca / harmala already contain MAOIs.
      if (serotonergicMed) return { level: "fatal", summary: "This substance ALREADY contains MAOIs (harmala alkaloids). Combining with SSRIs, SNRIs, MAOIs, tramadol, DXM, or other serotonergic drugs can cause life-threatening serotonin syndrome. SSRIs must be tapered and cleared (often 2–6 weeks) under medical guidance first." };
      if (med === "lithium") return { level: "fatal", summary: "Lithium with MAOI-containing psychedelics carries a severe seizure and toxicity risk. Never combine." };
      if (med === "stimulant") return { level: "fatal", summary: "MAOIs + stimulants (incl. amphetamines, cocaine) can cause a hypertensive crisis — dangerously high blood pressure, stroke, death. Never combine." };
      if (med === "bp_med") return { level: "danger", summary: "MAOIs interact with many blood-pressure medications and can cause dangerous swings. Avoid without medical supervision." };
      if (med === "opioid") return { level: "fatal", summary: "MAOIs with many opioids (especially tramadol, meperidine) can be fatal. Never combine." };
      if (med === "alcohol") return { level: "danger", summary: "Tyramine in some alcohol + MAOI activity can cause a hypertensive reaction; also worsens nausea. Avoid." };
      return { level: "caution", summary: "Because this contains MAOIs, it interacts with many drugs and tyramine-rich foods. Review MAOI dietary and drug restrictions carefully before use." };
    }

    case "entactogen": {
      if (med === "maoi") return { level: "fatal", summary: "MDMA/MDA + MAOIs is a classic lethal combination — massive serotonin release with no breakdown causes serotonin syndrome. Never combine." };
      if (med === "tramadol") return { level: "fatal", summary: "Both are strongly serotonergic and lower the seizure threshold. High risk of seizures and serotonin syndrome. Never combine." };
      if (med === "5htp" || med === "st_johns") return { level: "danger", summary: "Adds large serotonergic load on top of MDMA's massive serotonin release. Raises serotonin-syndrome risk. Avoid (5-HTP is only safe well AFTER, not before/during)." };
      if (med === "ssri" || med === "snri" || med === "tricyclic") return { level: "caution", summary: "SSRIs/SNRIs largely block MDMA's effects (and reduce neurotoxicity risk), which tempts dangerous redosing. Serotonin-syndrome risk exists. Do not redose to compensate." };
      if (med === "lithium") return { level: "danger", summary: "Increased seizure and serotonin-toxicity risk. Avoid." };
      if (med === "stimulant") return { level: "danger", summary: "Stacking stimulants with MDMA sharply raises blood pressure, heart strain, and hyperthermia (overheating) risk. Avoid." };
      if (med === "bp_med") return { level: "danger", summary: "MDMA raises blood pressure and heart rate; combining with cardiac meds is unpredictable and risky. Medical clearance needed." };
      if (med === "dxm") return { level: "fatal", summary: "MDMA + DXM blocks serotonin reuptake and impairs heat regulation — high serotonin-syndrome and hyperthermia risk. Never combine." };
      if (med === "alcohol") return { level: "caution", summary: "Alcohol worsens dehydration and the comedown, and masks intoxication. Adds cardiovascular and judgment risk." };
      return SAFE;
    }

    case "dissociative": {
      if (med === "opioid") return { level: "danger", summary: "Dissociatives + opioids both depress breathing and consciousness — risk of respiratory depression and aspiration. Avoid." };
      if (med === "benzo") return { level: "danger", summary: "Combined sedation can cause loss of consciousness, vomiting, and aspiration. Avoid." };
      if (med === "alcohol") return { level: "danger", summary: "Alcohol + dissociatives sharply raises risk of unconsciousness, vomiting, and choking. Avoid." };
      if (med === "stimulant") return { level: "caution", summary: "Stimulants mask sedation and raise blood pressure/heart rate; can lead to overexertion and cardiac strain." };
      if (med === "bp_med") return { level: "caution", summary: "Ketamine raises blood pressure; interactions with cardiac meds are possible. Caution with pre-existing heart conditions." };
      return SAFE;
    }

    case "ibogaine": {
      if (med === "bp_med") return { level: "fatal", summary: "Ibogaine prolongs the cardiac QT interval and has caused fatal arrhythmias. Combined with heart/BP medications the risk is severe. Cardiac screening (ECG) is mandatory." };
      if (med === "ssri" || med === "snri" || med === "maoi" || med === "tramadol" || med === "stimulant" || med === "opioid")
        return { level: "fatal", summary: "Ibogaine has dangerous cardiac and serotonergic interactions; it has caused deaths when combined with many drugs (including the very opioids people use it to detox from). Only ever in a medically supervised setting with cardiac monitoring. Never combine casually." };
      return { level: "danger", summary: "Ibogaine can cause life-threatening heart-rhythm problems (QT prolongation). It requires medical screening and supervision regardless of other drugs." };
    }

    case "nbome": {
      return { level: "danger", summary: "NBOMe compounds are extremely potent, have a narrow safety margin, and cause vasoconstriction, seizures, and deaths even alone. Any combination is unpredictable and dangerous. These are frequently sold misrepresented as LSD — always test." };
    }

    case "deliriant": {
      if (med === "antipsychotic") return { level: "danger", summary: "Deliriants (datura) are anticholinergic; some psychiatric meds compound anticholinergic toxicity (delirium, dangerous heart rate). Avoid." };
      return { level: "danger", summary: "Datura is a deliriant with a very narrow margin between an active and a toxic/lethal dose, plus strong anticholinergic effects. Any additional drug raises unpredictability. Extreme caution — this substance causes hospitalizations and deaths." };
    }

    case "kappa_opioid":
    case "cannabinoid":
    case "gaba": {
      if (med === "alcohol") return { level: "caution", summary: "Combined sedation/intoxication increases impairment, nausea, and accident risk. Avoid heavy combination." };
      if (med === "benzo" || med === "opioid") return { level: "caution", summary: "Additive sedation. Can increase drowsiness and impairment. Use caution." };
      return SAFE;
    }

    default:
      return SAFE;
  }
}

export function checkInteraction(substanceSlug: string, medId: string): InteractionResult {
  const category = substanceCategory[substanceSlug];
  if (!category) return SAFE;
  return lookup(category, medId);
}

export function hasInteractionData(substanceSlug: string): boolean {
  return substanceSlug in substanceCategory;
}

export const riskMeta: Record<RiskLevel, { label: string; order: number }> = {
  fatal: { label: "Potentially Fatal", order: 0 },
  danger: { label: "Dangerous", order: 1 },
  caution: { label: "Use Caution", order: 2 },
  low: { label: "No Major Known Interaction", order: 3 },
};
