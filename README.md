# Discernment Tool

A Scripture-anchored vocational discernment assessment for young adults (16-25), helping them understand their created wiring, recognise Spirit-given gifts, and move forward faithfully.

## What This Is

This is a **discernment aid**, not a personality test, career matcher, or destiny finder. It helps users:

- Notice patterns in how they are wired
- Discern evidence of spiritual gifts
- Consider vocational directions worth exploring
- Generate a synthesis report for prayerful reflection

## Theological Guardrails

The tool is designed with strict theological guardrails:

- **Scripture interprets experience** — never the reverse
- **Gifts are Spirit-given** (1 Cor 12:11) and **irrevocable** (Romans 11:29)
- **No prescriptive language** — phrases like "God is telling you to..." or "Your destiny is..." are forbidden
- **Discernment requires testing** — all reports encourage prayer, counsel, and time

## Architecture

### Assessment Modules

1. **Created Strengths** (56 questions)
   - 14 domains: Strategic Patterning, Analytical Discernment, Vision & Imagination, Execution Drive, Responsibility Orientation, Stability & Reliability, Adaptability, Learning Velocity, Relational Attunement, Influence & Persuasion, Courage & Initiative, Harmony & Mediation, Precision & Excellence, Systems & Stewardship

2. **Spirit-Given Gifts** (32 questions)
   - 16 gifts with Scripture references: Wisdom, Knowledge, Faith, Healing, Miracles, Prophecy, Discernment of Spirits, Tongues, Interpretation of Tongues, Teaching, Shepherding, Apostolic/Sending, Evangelism, Service, Encouragement, Giving

3. **Vocational Gravity** (20 questions)
   - 5 domains: Formation & Discipleship, Leadership & Stewardship in Systems, Justice/Mercy/the Poor, Cultural Creation & Influence, Pioneering/Mission/the Margins

4. **Free-Text Reflections** (5 prompts)
   - Passions & burdens, feedback from others, dreams & imagination, unfinished threads, anything else

### Synthesis Engine

Uses Claude API with tight theological prompting to generate personalized reports that:
- Summarise created strengths and costly zones
- Present spiritual gifts with Scripture citations
- Explore vocational gravity with cost awareness
- Synthesise alignment, tension, and shadow
- Suggest faithful next steps (always as questions, never instructions)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB Atlas
- **Authentication**: NextAuth.js
- **AI Synthesis**: Claude API (Anthropic)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Anthropic API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` from the template:
   ```bash
   cp .env.example .env.local
   ```

4. Fill in your environment variables:
   - `MONGODB_URI` — Your MongoDB connection string
   - `NEXTAUTH_SECRET` — Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` — Your deployment URL (http://localhost:3000 for dev)
   - `ANTHROPIC_API_KEY` — Your Claude API key

5. Run the development server:
   ```bash
   npm run dev
   ```

### Deployment to Vercel

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Project Structure

```
├── app/
│   ├── (auth)/           # Login & register pages
│   ├── (main)/           # Authenticated pages
│   │   ├── dashboard/    # Progress overview
│   │   ├── assessment/   # Question flow
│   │   └── report/       # Generated report
│   └── api/              # API routes
├── components/           # React components
├── data/                 # Assessment questions & prompts
├── lib/                  # Utilities & types
└── public/               # Static assets
```

## Key Features

- **Auto-save**: Progress saved at each question
- **Resume anywhere**: Users can complete across multiple sessions
- **Print-friendly reports**: Reports render well for PDF export
- **Mobile-responsive**: Works on all devices
- **Contemplative design**: Warm, unhurried aesthetic appropriate for discernment

## Report Structure

Each generated report follows this structure:

1. Created Strengths Summary
2. Spirit-Given Gifts (with Scripture)
3. Synthesis: Alignment, Tension, Shadow
4. Vocational Gravity & Future Directions
5. Additional Signals (from free-text)
6. What This Suggests for Next Faithful Steps
7. Final Discernment Question (always a question, never an instruction)

## License

Private — not for redistribution without permission.

## Acknowledgments

Built with theological care for the formation of the next generation.

---

*"Now there are varieties of gifts, but the same Spirit; and there are varieties of service, but the same Lord; and there are varieties of activities, but it is the same God who empowers them all in everyone."* — 1 Corinthians 12:4-6
