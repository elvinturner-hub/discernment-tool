import { StrengthsResult, GiftsResult, VocationalResult, FreetextResult } from '@/lib/types'
import { strengthDomains } from './strengths'
import { spiritualGifts } from './gifts'
import { vocationalDomains } from './vocational'

export const SYSTEM_PROMPT = `You are a pastoral discernment assistant helping young adults understand their created wiring, notice patterns of spiritual gifting, and consider vocational direction. 

Your tone is:
- Calm, not urgent
- Pastoral, not promotional
- Encouraging, not flattering
- Honest, not hedging
- Invitational, not prescriptive

THEOLOGICAL GUARDRAILS (strictly observe these):

1. Scripture interprets experience, not the reverse. Never use a person's experience to "prove" something biblical. Instead, use biblical categories to help them see their experience more clearly.

2. Spiritual gifts are:
   - Given by the Spirit as He determines (1 Cor 12:11)
   - Irrevocable (Romans 11:29) — they remain even in seasons of unfaithfulness
   - For building up the body, not personal status (1 Cor 12:7)
   - Not indicators of spiritual maturity

3. Never say:
   - "God is telling you to..."
   - "You are called to become..."
   - "This confirms your destiny..."
   - "Your perfect career is..."
   - Any language that removes the need for prayer, testing, and wise counsel

4. Always include:
   - Testing language ("This may indicate... which could be worth testing...")
   - Counsel language ("This might be worth exploring with a mentor or pastor...")
   - Time language ("Over time, you might notice...")
   - Freedom language ("This does not determine anything — you are free to explore...")

5. When discussing gifts:
   - Always cite Scripture explicitly
   - Include the irrevocability statement when relevant
   - Warn that gifts do not equal maturity
   - Emphasize that gifts are for service, not status

6. When discussing calling/vocation:
   - No job titles
   - No prescriptions
   - Describe kinds of futures, not specific paths
   - Emphasize sequencing and testing
   - Name both attraction and cost

7. Report structure (follow this exactly):
   a. Created Strengths Summary
   b. Spirit-Given Gifts (with Scripture)
   c. Synthesis: Alignment, Tension, Shadow
   d. Vocational Gravity & Future Directions
   e. Additional Signals (from free-text)
   f. What This Suggests for Next Faithful Steps
   g. Final Discernment Question (always a question, never an instruction)

WRITING STYLE:
- Write in second person ("You seem to...")
- Use paragraphs, not bullet points
- Be specific but not diagnostic
- Vary sentence structure
- End each section with an invitation, not a conclusion`

export function buildSynthesisPrompt(
  strengths: StrengthsResult,
  gifts: GiftsResult,
  vocational: VocationalResult,
  freetext: FreetextResult,
  userName: string
): string {
  const topStrengths = strengths.topStrengths.map(s => {
    const meta = strengthDomains.find(d => d.id === s.domain)
    return `${meta?.name}: ${s.score}/5 (${s.energy} energy) — ${meta?.description}`
  }).join('\n')

  const costlyZones = strengths.costlyZones.map(s => {
    const meta = strengthDomains.find(d => d.id === s.domain)
    return `${meta?.name}: ${s.score}/5 — ${meta?.lowEnergyDesc}`
  }).join('\n')

  const primaryGifts = gifts.primaryGifts.map(g => {
    const meta = spiritualGifts.find(gm => gm.id === g.gift)
    return `${meta?.name} (${g.evidenceStrength} evidence) — ${meta?.description}\n  Scripture: "${meta?.scripture}" (${meta?.scriptureRef})`
  }).join('\n\n')

  const emergingGifts = gifts.emergingGifts.map(g => {
    const meta = spiritualGifts.find(gm => gm.id === g.gift)
    return `${meta?.name} (emerging) — ${meta?.description}`
  }).join('\n')

  const primaryVocational = (() => {
    const meta = vocationalDomains.find(v => v.id === vocational.primaryGravity.domain)
    return `${meta?.name} (${vocational.primaryGravity.pull} pull, ${vocational.primaryGravity.costTolerance} cost tolerance)\n  ${meta?.description}\n  Typical costs: ${meta?.typicalCosts.join('; ')}`
  })()

  const secondaryVocational = vocational.secondaryDirections.map(v => {
    const meta = vocationalDomains.find(vm => vm.id === v.domain)
    return `${meta?.name} (${v.pull} pull)`
  }).join(', ')

  return `Generate a discernment report for ${userName}.

ASSESSMENT DATA:

== CREATED STRENGTHS ==
Top Strengths:
${topStrengths}

Costly Zones (low energy):
${costlyZones}

== SPIRIT-GIVEN GIFTS ==
Primary Gifts (stronger evidence):
${primaryGifts}

Emerging Gifts (patterns worth watching):
${emergingGifts}

== VOCATIONAL GRAVITY ==
Primary Direction:
${primaryVocational}

Secondary Directions:
${secondaryVocational}

== FREE-TEXT THEMES ==
Passions & Burdens: ${freetext.passions || '[not provided]'}

Feedback from Others: ${freetext.feedback || '[not provided]'}

Dreams & Imagination: ${freetext.dreams || '[not provided]'}

Unfinished Threads: ${freetext.threads || '[not provided]'}

Extracted Themes: ${freetext.extractedThemes?.join(', ') || '[none extracted]'}

---

Generate a complete discernment report following the structure and guardrails specified. The report should be approximately 1500-2000 words. 

Remember:
- This is a discernment aid, not a prophecy
- The person will need prayer, testing, and wise counsel
- Name both alignment and tension honestly
- Include shadow/stewardship warnings where warranted
- End with a question, not an instruction`
}

export function buildThemeExtractionPrompt(freetext: FreetextResult): string {
  return `Extract key themes from these free-text reflections. Identify recurring patterns, significant images, and threads worth noting.

PASSIONS & BURDENS:
${freetext.passions || '[not provided]'}

FEEDBACK FROM OTHERS:
${freetext.feedback || '[not provided]'}

DREAMS & IMAGINATION:
${freetext.dreams || '[not provided]'}

UNFINISHED THREADS:
${freetext.threads || '[not provided]'}

ANYTHING ELSE:
${(freetext as any).anything || '[not provided]'}

---

Return a JSON array of 3-7 theme strings, each a brief phrase capturing a pattern you notice. Focus on:
- Recurring concerns or passions
- Self-perception vs others' feedback (alignment or tension)
- Images of fruitfulness
- Unresolved questions or directions

Return ONLY the JSON array, no other text. Example:
["drawn to young people in transition", "tension between creative desires and practical pressures", "repeated feedback about bringing calm to chaos"]`
}
