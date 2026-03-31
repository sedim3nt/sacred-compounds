import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/ui/Disclaimer";

export const metadata: Metadata = {
  title: "Safety Hub — Sacred Compounds",
  description:
    "Comprehensive harm reduction guide. Golden rules, dangerous combinations, emergency resources, and substance testing information.",
};

const goldenRules = [
  {
    title: "Set & Setting",
    description:
      "Your mindset and environment are the most important factors. Choose a safe, comfortable space. Be in a stable emotional state. Have a trusted, sober person present.",
  },
  {
    title: "Start Low, Go Slow",
    description:
      "Always begin with a threshold or low amount, especially with a new substance or batch. You can always take more — you can never take less. Wait for full onset before considering any additional amount.",
  },
  {
    title: "Never Alone",
    description:
      "Always have a sober, trusted person present who knows what you have taken and can help if things go wrong. Brief them on what to expect and when to call for help.",
  },
  {
    title: "Test Your Substances",
    description:
      "Use reagent testing kits to verify substance identity. Adulterants and misrepresentation are common. Fentanyl test strips are recommended for any substance. What you think you have may not be what you actually have.",
  },
  {
    title: "Know the Risks",
    description:
      "Research contraindications, drug interactions, and dangerous combinations BEFORE use. Check your medications. Some combinations are life-threatening. Read the full safety profile on this site.",
  },
];

const combinations = [
  { a: "Psychedelics", b: "Lithium", risk: "FATAL", note: "Seizures — never combine" },
  { a: "Psychedelics", b: "Tramadol", risk: "FATAL", note: "Seizure risk — never combine" },
  { a: "MDMA", b: "MAOIs", risk: "FATAL", note: "Serotonin syndrome — potentially lethal" },
  { a: "MDMA", b: "SSRIs", risk: "DANGER", note: "Serotonin syndrome risk — do not combine" },
  { a: "Ayahuasca", b: "SSRIs", risk: "FATAL", note: "Contains MAOIs — serotonin syndrome" },
  { a: "Ayahuasca", b: "Tyramine foods", risk: "DANGER", note: "Hypertensive crisis risk" },
  { a: "Stimulants", b: "MDMA", risk: "DANGER", note: "Cardiac strain — hyperthermia risk" },
  { a: "Opioids", b: "Alcohol", risk: "FATAL", note: "Respiratory depression" },
  { a: "Dissociatives", b: "Alcohol", risk: "DANGER", note: "Loss of consciousness — aspiration risk" },
  { a: "PCP", b: "Stimulants", risk: "DANGER", note: "Severe cardiovascular stress" },
  { a: "5-MeO-DMT", b: "MAOIs", risk: "FATAL", note: "Extremely dangerous — potentially lethal" },
  { a: "NBOMe", b: "Any psychedelic", risk: "FATAL", note: "Unpredictable — seizure and cardiac risk" },
];

const difficultExperienceSteps = [
  {
    step: "1. Stay Calm",
    description:
      "Remind the person (or yourself) that the experience is temporary. It will end. Say: 'You took a substance, and it is causing these feelings. They will pass.'",
  },
  {
    step: "2. Change the Setting",
    description:
      "Move to a quieter, more comfortable space. Dim lights. Put on calm music. Reduce sensory input. Sometimes a change of room is all that is needed.",
  },
  {
    step: "3. Ground and Breathe",
    description:
      "Use slow, deep breathing (4 counts in, 4 counts hold, 4 counts out). Touch something physical — a blanket, the ground. Name 5 things you can see, 4 you can hear, 3 you can touch.",
  },
  {
    step: "4. Do Not Resist",
    description:
      "Fighting the experience often makes it worse. Encourage surrender and acceptance. 'Let the wave pass through you.' This is a temporary altered state, not reality.",
  },
  {
    step: "5. When to Call 911",
    description:
      "Call emergency services immediately if: chest pain, difficulty breathing, seizures, loss of consciousness, extreme hyperthermia, or any sign of a medical emergency. Never hesitate — you will not get in trouble for seeking help.",
  },
];

export default function SafetyPage() {
  return (
    <div className="mx-auto max-w-[1220px] px-6 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-black text-white-flash mb-2">
        Safety Hub
      </h1>
      <p className="text-muted text-sm mb-12">
        Know Before You Go — Comprehensive harm reduction information.
      </p>

      {/* Golden Rules */}
      <section className="mb-16">
        <h2 className="font-display text-xl font-bold text-neon-orange mb-6">
          The Golden Rules
        </h2>
        <div className="space-y-4">
          {goldenRules.map((rule, i) => (
            <div
              key={rule.title}
              className="bg-deep-purple/60 border border-neon-orange/10 rounded-lg p-6 flex gap-5"
            >
              <div className="font-display text-2xl font-black text-neon-orange/30 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-neon-orange mb-2">
                  {rule.title}
                </h3>
                <p className="text-sm text-white-flash/70 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dangerous Combinations Matrix */}
      <section className="mb-16">
        <h2 className="font-display text-xl font-bold text-warning-red mb-6 flex items-center gap-2">
          <span>&#9888;&#65039;</span> Dangerous Combinations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-deep-purple">
                <th className="text-left text-xs text-muted font-display uppercase tracking-wider py-3 pr-4">
                  Substance A
                </th>
                <th className="text-left text-xs text-muted font-display uppercase tracking-wider py-3 pr-4">
                  Substance B
                </th>
                <th className="text-left text-xs text-muted font-display uppercase tracking-wider py-3 pr-4">
                  Risk
                </th>
                <th className="text-left text-xs text-muted font-display uppercase tracking-wider py-3">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {combinations.map((combo, i) => (
                <tr key={i} className="border-b border-deep-purple/30">
                  <td className="py-3 pr-4 text-white-flash/80">
                    {combo.a}
                  </td>
                  <td className="py-3 pr-4 text-white-flash/80">
                    {combo.b}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`font-display text-xs font-bold px-2 py-0.5 rounded ${
                        combo.risk === "FATAL"
                          ? "bg-warning-red/20 text-warning-red"
                          : "bg-neon-orange/20 text-neon-orange"
                      }`}
                    >
                      {combo.risk}
                    </span>
                  </td>
                  <td className="py-3 text-muted">{combo.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* If Things Go Wrong */}
      <section className="mb-16">
        <h2 className="font-display text-xl font-bold text-white-flash mb-6">
          If Things Go Wrong
        </h2>
        <div className="space-y-4">
          {difficultExperienceSteps.map((step) => (
            <div
              key={step.step}
              className="bg-deep-purple/40 border border-deep-purple rounded-lg p-5"
            >
              <h3 className="font-display text-sm font-bold text-teal-glow mb-2">
                {step.step}
              </h3>
              <p className="text-sm text-white-flash/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="mb-16">
        <h2 className="font-display text-xl font-bold text-warning-red mb-6">
          Emergency Resources
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-warning-red/5 border-2 border-warning-red/30 rounded-lg p-5 text-center danger-glow">
            <p className="font-display text-sm font-bold text-warning-red mb-1">
              988 Suicide & Crisis Lifeline
            </p>
            <p className="font-display text-2xl font-black text-white-flash">
              988
            </p>
            <p className="text-xs text-muted mt-1">Call or text, 24/7</p>
          </div>
          <div className="bg-warning-red/5 border-2 border-warning-red/30 rounded-lg p-5 text-center danger-glow">
            <p className="font-display text-sm font-bold text-warning-red mb-1">
              Poison Control
            </p>
            <p className="font-display text-2xl font-black text-white-flash">
              1-800-222-1222
            </p>
            <p className="text-xs text-muted mt-1">24/7 free & confidential</p>
          </div>
          <div className="bg-warning-red/5 border-2 border-warning-red/30 rounded-lg p-5 text-center danger-glow">
            <p className="font-display text-sm font-bold text-warning-red mb-1">
              Fireside Project
            </p>
            <p className="font-display text-2xl font-black text-white-flash">
              62-FIRESIDE
            </p>
            <p className="text-xs text-muted mt-1">
              Psychedelic peer support
            </p>
          </div>
        </div>
      </section>

      {/* Testing */}
      <section className="mb-12">
        <h2 className="font-display text-xl font-bold text-white-flash mb-6">
          Testing Your Substances
        </h2>
        <div className="bg-deep-purple/60 border border-teal-glow/10 rounded-lg p-6">
          <p className="text-sm text-white-flash/80 leading-relaxed mb-4">
            Reagent testing kits allow you to verify the identity of a
            substance. They cannot confirm purity or exact composition, but they
            can help identify dangerous adulterants and misrepresented
            substances.
          </p>
          <ul className="space-y-2 text-sm text-white-flash/70">
            <li className="flex items-start gap-2">
              <span className="text-teal-glow mt-0.5 shrink-0">&#10003;</span>
              <span>
                <strong className="text-white-flash">Marquis Reagent</strong> — Tests
                for MDMA, amphetamines, and their analogues
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-glow mt-0.5 shrink-0">&#10003;</span>
              <span>
                <strong className="text-white-flash">Ehrlich Reagent</strong> — Tests
                for LSD, psilocybin, and other indole psychedelics
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-glow mt-0.5 shrink-0">&#10003;</span>
              <span>
                <strong className="text-white-flash">Mandelin Reagent</strong> — Tests
                for ketamine and PMA/PMMA
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-glow mt-0.5 shrink-0">&#10003;</span>
              <span>
                <strong className="text-white-flash">Fentanyl Test Strips</strong> —
                Strongly recommended for any substance. Fentanyl contamination
                is widespread and lethal.
              </span>
            </li>
          </ul>
          <p className="text-xs text-muted mt-4">
            DanceSafe (dancesafe.org) provides reagent testing kits, fentanyl
            test strips, and drug checking services at events.
          </p>
        </div>
      </section>

      <Disclaimer />
    </div>
  );
}
