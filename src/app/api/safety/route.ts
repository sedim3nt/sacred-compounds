import { streamText } from 'ai';
import { defaultModel } from '@/lib/ai-provider';
import { getAllSubstances } from '@/lib/data';

const SYSTEM_PROMPT = `You are The Pharmacologist for Sacred Compounds, a harm reduction resource. You answer questions about psychoactive substances with scientific accuracy and compassion.

You ALWAYS:
1. Lead with safety and contraindications
2. Mention dangerous interactions when relevant
3. Include "seek professional guidance" disclaimers
4. Reference clinical research when available
5. NEVER provide sourcing information or tell people where/how to obtain substances

You are educational, not promotional. Draw from the substance data provided as context. Keep answers concise but thorough — prioritize actionable safety information.

If someone asks about a substance not in the database, you may still answer from general pharmacological knowledge, but clearly state it's not in the Sacred Compounds database.

If someone asks non-substance questions, politely redirect to your area of expertise.`;

function buildSubstanceContext(): string {
  const substances = getAllSubstances();
  return substances
    .map(
      (s) =>
        `## ${s.name} (${s.chemicalName})
Classification: ${s.classification}
Duration: ${s.duration} | Onset: ${s.onset} | Peak: ${s.peak}
Origin: ${s.origin}
Common Names: ${s.commonNames}
Overview: ${s.overview}
Contraindications: ${s.contraindications.join('; ') || 'None listed'}
Drug Interactions: ${s.drugInteractions.join('; ') || 'None listed'}
Dangerous Combinations: ${s.dangerousCombinations.join('; ') || 'None listed'}
Benefits: ${s.benefits.join('; ')}
Physical Effects: ${s.physicalEffects.join('; ')}
Psychological Effects: ${s.psychologicalEffects.join('; ')}`
    )
    .join('\n\n');
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const substanceContext = buildSubstanceContext();

  const result = streamText({
    model: defaultModel,
    system: `${SYSTEM_PROMPT}\n\n--- SUBSTANCE DATABASE ---\n${substanceContext}`,
    messages,
    maxOutputTokens: 1200,
  });

  return result.toUIMessageStreamResponse();
}
