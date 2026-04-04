# Sacred Compounds

Evidence-based psychedelic education. Because the most dangerous thing is misinformation.

**Live:** [sacredcompounds.spirittree.dev](https://sacredcompounds.spirittree.dev)
**Stack:** Next.js, TailwindCSS, OpenRouter
**Status:** Active

## What This Is

Sacred Compounds is a harm reduction reference for psychoactive substances. It covers 30+ compounds organized by classification (classical psychedelics, empathogens, dissociatives, novel compounds), with detailed profiles including pharmacology, dosage ranges, duration, contraindications, and drug interactions.

The site prioritizes safety information over everything else. It's educational, not promotional — designed for people who are going to make their own choices and deserve accurate information to do so safely. The AI pharmacologist provides personalized safety guidance grounded in the substance database.

## Features

- 💊 **Substance Profiles** — detailed entries for 30+ psychoactive compounds
- 🔬 **Classification Browse** — organized by pharmacological class
- 🔍 **Search** — fuzzy search across all substances
- ⚠️ **Safety First** — contraindications and interactions prominently featured
- 🤖 **The Pharmacologist** — AI-powered harm reduction Q&A
- 🌑 **Dark UI** — neon-on-dark design with teal/orange accents

## AI Integration

**The Pharmacologist** — an AI harm reduction advisor powered by OpenRouter. Always leads with safety and contraindications, mentions dangerous interactions, includes professional guidance disclaimers, and references clinical research. Never provides sourcing information.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** TailwindCSS
- **Database:** None (static JSON data)
- **AI:** OpenRouter (via Vercel AI SDK)
- **Hosting:** Vercel

## Local Development

```bash
npm install
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `AI_API_KEY` / `OPENROUTER_API_KEY` | OpenRouter API key for The Pharmacologist |
| `AI_BASE_URL` | AI provider base URL (defaults to OpenRouter) |

## Part of SpiritTree

This project is part of the [SpiritTree](https://spirittree.dev) ecosystem — an autonomous AI operation building tools for the agent economy and displaced workers.

## License

MIT
