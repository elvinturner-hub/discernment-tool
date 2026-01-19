'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Section = 'welcome' | 'strengths' | 'gifts' | 'vocational' | 'report' | 'faq'

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState<Section>('welcome')
  const [expandedStrength, setExpandedStrength] = useState<number | null>(null)
  const [expandedGift, setExpandedGift] = useState<number | null>(null)
  const [expandedVocational, setExpandedVocational] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-lg border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="text-stone-400 hover:text-stone-600 text-sm font-medium">
            ← Back to Dashboard
          </Link>
          <span className="text-stone-400 text-sm">Understanding Your Results</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-50 via-violet-50 to-sky-50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🌿</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-3 tracking-tight">
            Your Discernment Journey
          </h1>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            A complete guide to understanding your assessment results
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-[53px] z-10 bg-white border-b border-stone-200 overflow-x-auto">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex gap-1 py-2 min-w-max">
            {[
              { id: 'welcome', label: '👋 Welcome', short: 'Welcome' },
              { id: 'strengths', label: '🌱 Strengths', short: 'Strengths' },
              { id: 'gifts', label: '✨ Gifts', short: 'Gifts' },
              { id: 'vocational', label: '🧭 Vocational', short: 'Vocational' },
              { id: 'report', label: '📊 Report', short: 'Report' },
              { id: 'faq', label: '❓ FAQ', short: 'FAQ' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as Section)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeSection === tab.id
                    ? 'bg-stone-800 text-white'
                    : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.short}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection === 'welcome' && <WelcomeSection />}
            {activeSection === 'strengths' && (
              <StrengthsSection 
                expanded={expandedStrength} 
                setExpanded={setExpandedStrength} 
              />
            )}
            {activeSection === 'gifts' && (
              <GiftsSection 
                expanded={expandedGift} 
                setExpanded={setExpandedGift} 
              />
            )}
            {activeSection === 'vocational' && (
              <VocationalSection 
                expanded={expandedVocational} 
                setExpanded={setExpandedVocational} 
              />
            )}
            {activeSection === 'report' && <ReportSection />}
            {activeSection === 'faq' && <FAQSection />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t border-stone-200 bg-stone-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <blockquote className="text-lg italic text-stone-600 mb-2">
            "For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them."
          </blockquote>
          <cite className="text-stone-400">— Ephesians 2:10</cite>
        </div>
      </div>
    </div>
  )
}

// Welcome Section
function WelcomeSection() {
  return (
    <div className="space-y-8">
      <Card>
        <p className="text-stone-600 mb-4">
          This guide will help you make sense of your discernment assessment results. We've designed this tool specifically for people aged 18-25 who are exploring questions like:
        </p>
        <ul className="list-disc list-inside text-stone-600 space-y-2 mb-4">
          <li>What am I naturally good at?</li>
          <li>How might God be gifting me?</li>
          <li>What kind of work or calling might fit who I am?</li>
        </ul>
      </Card>

      <Callout type="warning">
        <strong>Important:</strong> This assessment doesn't tell you what to do with your life. It's a mirror — helping you see patterns you might not have noticed. Your results are a starting point for reflection and conversation, not a final answer.
      </Callout>

      <Card>
        <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
          <span>📏</span> How Scores Work
        </h3>
        <p className="text-stone-600 mb-4">
          Throughout this assessment, you'll see scores on a <strong>1-5 scale</strong>:
        </p>
        
        <div className="space-y-3">
          <ScoreRow score="4.5 - 5.0" color="emerald" description="Very high — this is clearly a strength or gift area" />
          <ScoreRow score="3.5 - 4.4" color="emerald" description="High — this energises you or shows real evidence" />
          <ScoreRow score="2.5 - 3.4" color="sky" description="Moderate — present but not dominant" />
          <ScoreRow score="1.5 - 2.4" color="stone" description="Lower — this may cost you energy or feel less natural" />
          <ScoreRow score="1.0 - 1.4" color="stone" description="Very low — this likely drains you or isn't your thing" />
        </div>
      </Card>

      <Callout type="tip">
        <strong>Remember:</strong> Low scores aren't bad. They just mean that area isn't where you naturally thrive — and that's useful information. You can't be strong in everything, and knowing what drains you is just as valuable as knowing what energises you.
      </Callout>
    </div>
  )
}

// Strengths Section
function StrengthsSection({ expanded, setExpanded }: { expanded: number | null, setExpanded: (n: number | null) => void }) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
        <h3 className="text-xl font-bold text-stone-800 mb-3">What This Section Measures</h3>
        <p className="text-stone-600 mb-4">
          This section looks at <strong>how God has wired you</strong> — the patterns of thinking, relating, and working that come naturally to you. These aren't skills you've learned; they're the way you're built.
        </p>
        <p className="text-stone-600">
          We measure <strong>14 strength areas</strong>. For each one, we're looking at: Does this energise you or drain you? Do you naturally gravitate toward this or avoid it?
        </p>
      </Card>

      <p className="text-stone-500 text-sm">Tap any strength to expand details:</p>

      <div className="space-y-3">
        {strengths.map((strength, index) => (
          <ExpandableCard
            key={index}
            number={index + 1}
            title={strength.name}
            color="emerald"
            isExpanded={expanded === index}
            onToggle={() => setExpanded(expanded === index ? null : index)}
          >
            <div className="space-y-4">
              <div className="bg-stone-50 rounded-xl p-4 italic text-stone-600">
                {strength.definition}
              </div>

              <div>
                <SubsectionTitle color="emerald">High scorers often:</SubsectionTitle>
                <ul className="list-disc list-inside text-stone-600 space-y-1">
                  {strength.highScorers.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              <div>
                <SubsectionTitle color="sky">In real life, this looks like:</SubsectionTitle>
                <ul className="list-disc list-inside text-stone-600 space-y-1">
                  {strength.realLife.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              <div>
                <SubsectionTitle color="amber">The shadow side:</SubsectionTitle>
                <p className="text-stone-600">{strength.shadow}</p>
              </div>

              <div>
                <SubsectionTitle color="stone">Low scorers:</SubsectionTitle>
                <p className="text-stone-600">{strength.lowScorers}</p>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>
    </div>
  )
}

// Gifts Section
function GiftsSection({ expanded, setExpanded }: { expanded: number | null, setExpanded: (n: number | null) => void }) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-violet-50 to-white border-violet-100">
        <h3 className="text-xl font-bold text-stone-800 mb-3">What This Section Measures</h3>
        <p className="text-stone-600 mb-4">
          This section explores <strong>evidence of how the Holy Spirit may be gifting you</strong> to serve others and build up the church. Unlike strengths (which are about how you're wired), gifts are about what God is doing <em>through</em> you.
        </p>
        <div className="bg-violet-100/50 rounded-xl p-4 text-sm text-violet-800">
          <strong>Theological notes:</strong> Gifts are given by the Spirit as he determines (1 Cor 12:11). They are irrevocable (Romans 11:29). Every believer has at least one gift (1 Cor 12:7).
        </div>
      </Card>

      <p className="text-stone-500 text-sm">Tap any gift to expand details:</p>

      <div className="space-y-3">
        {gifts.map((gift, index) => (
          <ExpandableCard
            key={index}
            number={index + 1}
            title={gift.name}
            subtitle={gift.scripture}
            color="violet"
            isExpanded={expanded === index}
            onToggle={() => setExpanded(expanded === index ? null : index)}
          >
            <div className="space-y-4">
              <div className="bg-stone-50 rounded-xl p-4 italic text-stone-600">
                {gift.definition}
              </div>

              {gift.clarification && (
                <p className="text-stone-600">
                  <strong>{gift.clarification.split('.')[0]}.</strong>
                  {gift.clarification.split('.').slice(1).join('.')}
                </p>
              )}

              <div>
                <SubsectionTitle color="violet">Evidence of this gift:</SubsectionTitle>
                <ul className="list-disc list-inside text-stone-600 space-y-1">
                  {gift.evidence.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              {gift.note && (
                <p className="text-stone-500 text-sm italic">{gift.note}</p>
              )}
            </div>
          </ExpandableCard>
        ))}
      </div>
    </div>
  )
}

// Vocational Section
function VocationalSection({ expanded, setExpanded }: { expanded: number | null, setExpanded: (n: number | null) => void }) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-sky-50 to-white border-sky-100">
        <h3 className="text-xl font-bold text-stone-800 mb-3">What This Section Measures</h3>
        <p className="text-stone-600 mb-4">
          This section explores <strong>what kinds of work and calling stir something in you</strong>. It's not about choosing a career — it's about noticing where you feel drawn.
        </p>
        <p className="text-stone-600">
          We look at 5 broad vocational directions. Most people feel pull toward 1-2 primary directions, with others being less compelling.
        </p>
      </Card>

      <Callout type="warning">
        <strong>Important:</strong> This section also measures your <strong>cost tolerance</strong> — your willingness to bear the difficulties that come with each direction. A high pull but low cost tolerance is important information.
      </Callout>

      <div className="space-y-3">
        {vocationalDirections.map((direction, index) => (
          <ExpandableCard
            key={index}
            number={index + 1}
            title={direction.name}
            color="sky"
            isExpanded={expanded === index}
            onToggle={() => setExpanded(expanded === index ? null : index)}
          >
            <div className="space-y-4">
              <div className="bg-stone-50 rounded-xl p-4 italic text-stone-600">
                {direction.definition}
              </div>

              <div>
                <SubsectionTitle color="sky">Example roles:</SubsectionTitle>
                <p className="text-stone-600">{direction.examples}</p>
              </div>

              <div>
                <SubsectionTitle color="violet">What draws people here:</SubsectionTitle>
                <ul className="list-disc list-inside text-stone-600 space-y-1">
                  {direction.draws.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              <div>
                <SubsectionTitle color="amber">The costs you'd need to bear:</SubsectionTitle>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {direction.costs.map((cost, i) => (
                    <div key={i} className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                      <div className="font-semibold text-amber-700 text-sm">{cost.title}</div>
                      <div className="text-stone-600 text-sm">{cost.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </div>
    </div>
  )
}

// Report Section
function ReportSection() {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-bold text-stone-800 mb-4">How to Read Your Report</h3>
        <p className="text-stone-600 mb-6">Your report has several sections. Here's what each one means:</p>

        <div className="space-y-6">
          <ReportSectionExplainer 
            emoji="📊" 
            title="Your Scores at a Glance"
            description="Visual summary of your rankings across all three assessments. Shows you at a glance where you scored highest and lowest."
          />
          <ReportSectionExplainer 
            emoji="🌱" 
            title="Your Created Wiring"
            description="Commentary on your strengths — what energises you, what costs you, and the shadow side of your top strengths."
          />
          <ReportSectionExplainer 
            emoji="✨" 
            title="Spiritual Gifts"
            description="Analysis of what gifts show evidence in your life, grounded in Scripture. Also notes emerging gifts that may develop."
          />
          <ReportSectionExplainer 
            emoji="🔗" 
            title="Surprising Connections"
            description="Non-obvious patterns — connections between your strengths, gifts, and vocational pull that you might not have noticed. This is often the most valuable section."
          />
          <ReportSectionExplainer 
            emoji="⚡" 
            title="Tensions to Navigate"
            description="Where your wiring creates internal tension. For example, being drawn to pioneering work while also valuing stability. These aren't problems to solve — they're realities to manage."
          />
          <ReportSectionExplainer 
            emoji="🧭" 
            title="Vocational Gravity"
            description="Commentary on where you seem drawn vocationally, with honest acknowledgment of the costs."
          />
          <ReportSectionExplainer 
            emoji="💬" 
            title="From Your Own Words"
            description="Themes from your free-text responses, woven into the bigger picture."
          />
          <ReportSectionExplainer 
            emoji="👣" 
            title="Questions to Sit With"
            description="Thoughtful questions for continued reflection. Not instructions — just things to consider."
          />
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
        <h3 className="text-xl font-bold text-stone-800 mb-4">What To Do Next</h3>
        
        <div className="space-y-4">
          <NextStep number={1} title="Sit with it">
            Don't rush to conclusions. Let the results percolate. Notice what resonates and what doesn't.
          </NextStep>
          <NextStep number={2} title="Share it with someone who knows you">
            Ask them: "What here surprises you? What seems accurate? What seems off?"
          </NextStep>
          <NextStep number={3} title="Notice disagreements">
            If something in your report doesn't feel true, trust your own sense. This assessment isn't infallible.
          </NextStep>
          <NextStep number={4} title="Look for the tensions">
            The most useful insights are often in the tensions — where you're wired one way but drawn another.
          </NextStep>
          <NextStep number={5} title="Don't make major decisions yet">
            This report is for reflection, not action. Major life decisions should involve community, prayer, time, and wisdom.
          </NextStep>
          <NextStep number={6} title="Return to it">
            Come back to this report in 6 months. See what has proven true and what has changed.
          </NextStep>
        </div>
      </Card>
    </div>
  )
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      q: "Can my scores change over time?",
      a: "Yes. Strengths tend to be fairly stable, but gifts can emerge and develop. Your vocational interests might also shift as you gain new experiences."
    },
    {
      q: "What if I scored low in everything?",
      a: "This is rare but possible if you answered very conservatively. Consider whether you were being hard on yourself. You might also retake it when you're in a different headspace."
    },
    {
      q: "What if my results don't match what I thought?",
      a: "That's interesting data. Either the assessment is picking up something you haven't noticed, or there are aspects it's missing. Talk to people who know you well."
    },
    {
      q: "Should I only pursue things I scored high in?",
      a: "No. Low scores don't mean \"never do this.\" They mean it might cost you more energy or come less naturally. Sometimes we're called to hard things."
    },
    {
      q: "Is this assessment scientifically validated?",
      a: "This assessment is based on established frameworks (StrengthsFinder concepts, biblical spiritual gifts, vocational theology) but has not been through formal psychometric validation. Treat it as a reflective tool, not a definitive test."
    },
    {
      q: "Can I share my report with others?",
      a: "Absolutely. In fact, sharing it with mentors, friends, or spiritual directors will make it more useful."
    }
  ]

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Card key={index}>
          <h4 className="font-bold text-stone-800 mb-2">{faq.q}</h4>
          <p className="text-stone-600">{faq.a}</p>
        </Card>
      ))}
    </div>
  )
}

// Reusable Components
function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-stone-200 p-6 ${className}`}>
      {children}
    </div>
  )
}

function Callout({ type, children }: { type: 'tip' | 'warning' | 'info', children: React.ReactNode }) {
  const styles = {
    tip: 'bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800',
    warning: 'bg-amber-50 border-l-4 border-amber-500 text-amber-800',
    info: 'bg-sky-50 border-l-4 border-sky-500 text-sky-800',
  }
  return (
    <div className={`rounded-r-xl p-4 ${styles[type]}`}>
      <p>{children}</p>
    </div>
  )
}

function ScoreRow({ score, color, description }: { score: string, color: 'emerald' | 'sky' | 'stone', description: string }) {
  const badgeStyles = {
    emerald: 'bg-emerald-100 text-emerald-700',
    sky: 'bg-sky-100 text-sky-700',
    stone: 'bg-stone-100 text-stone-600',
  }
  return (
    <div className="flex items-center gap-4">
      <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${badgeStyles[color]}`}>
        {score}
      </span>
      <span className="text-stone-600 text-sm">{description}</span>
    </div>
  )
}

function ExpandableCard({ 
  number, 
  title, 
  subtitle,
  color, 
  isExpanded, 
  onToggle, 
  children 
}: { 
  number: number
  title: string
  subtitle?: string
  color: 'emerald' | 'violet' | 'sky'
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  const numberStyles = {
    emerald: 'bg-emerald-500',
    violet: 'bg-violet-500',
    sky: 'bg-sky-500',
  }
  
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-3 text-left hover:bg-stone-50 transition-colors"
      >
        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${numberStyles[color]}`}>
          {number}
        </span>
        <div className="flex-1">
          <span className="font-bold text-stone-800">{title}</span>
          {subtitle && <span className="text-violet-600 text-sm ml-2">{subtitle}</span>}
        </div>
        <span className="text-stone-400 text-xl">{isExpanded ? '−' : '+'}</span>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-stone-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SubsectionTitle({ color, children }: { color: 'emerald' | 'violet' | 'sky' | 'amber' | 'stone', children: React.ReactNode }) {
  const styles = {
    emerald: 'text-emerald-600',
    violet: 'text-violet-600',
    sky: 'text-sky-600',
    amber: 'text-amber-600',
    stone: 'text-stone-500',
  }
  return (
    <div className={`text-sm font-bold uppercase tracking-wide mb-2 ${styles[color]}`}>
      {children}
    </div>
  )
}

function ReportSectionExplainer({ emoji, title, description }: { emoji: string, title: string, description: string }) {
  return (
    <div className="flex gap-4">
      <span className="text-2xl">{emoji}</span>
      <div>
        <h4 className="font-bold text-stone-800">{title}</h4>
        <p className="text-stone-600 text-sm">{description}</p>
      </div>
    </div>
  )
}

function NextStep({ number, title, children }: { number: number, title: string, children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
        {number}
      </span>
      <div>
        <h4 className="font-bold text-stone-800">{title}</h4>
        <p className="text-stone-600 text-sm">{children}</p>
      </div>
    </div>
  )
}

// Data
const strengths = [
  {
    name: "Strategic Patterning",
    definition: "The ability to see connections across time and complexity — recognising how different pieces fit together toward future outcomes.",
    highScorers: [
      "See where things are heading before others do",
      "Naturally think several steps ahead",
      "Connect dots that others miss",
      "Get frustrated when people can't see the \"obvious\" path forward"
    ],
    realLife: [
      "Being the friend who maps out how a situation might unfold",
      "Naturally creating plans with contingencies",
      "Seeing patterns in seemingly unrelated events",
      "Thinking \"if we do X, then Y will happen, so we should also do Z\""
    ],
    shadow: "You might get impatient with people who can't see what's obvious to you. You might also over-plan and struggle to stay present.",
    lowScorers: "You prefer to stay in the moment rather than constantly thinking ahead. You might find long-term planning exhausting or abstract. This isn't wrong — it means you're probably more present-focused, which has its own gifts."
  },
  {
    name: "Analytical Discernment",
    definition: "The ability to break down complexity, weigh evidence, and distinguish what's true or important from what isn't.",
    highScorers: [
      "Question claims and check sources",
      "Enjoy understanding how things really work",
      "Feel uncomfortable accepting things at face value",
      "Are good at spotting flawed logic or missing information"
    ],
    realLife: [
      "Being the one who asks \"but is that actually true?\"",
      "Enjoying debates and discussions where you can test ideas",
      "Researching before making decisions",
      "Noticing when an argument doesn't quite hold together"
    ],
    shadow: "You might come across as overly critical or negative. You might struggle to commit when you can't be 100% certain. Analysis paralysis is real for you.",
    lowScorers: "You tend to trust your gut and move forward without needing to analyse everything. You're comfortable with intuition. This means you might make decisions faster, but you may also miss important details sometimes."
  },
  {
    name: "Vision & Imagination",
    definition: "The ability to see possibilities that don't yet exist and inspire others with pictures of what could be.",
    highScorers: [
      "Daydream about future possibilities",
      "Get excited talking about \"what if...\"",
      "Can describe a future vision in a way that excites others",
      "See potential where others see problems"
    ],
    realLife: [
      "Being the friend who dreams up ambitious plans",
      "Naturally painting pictures of what could happen",
      "Helping discouraged people see that things could be different",
      "Getting bored with \"what is\" because you're focused on \"what could be\""
    ],
    shadow: "You might struggle with follow-through because the dreaming is more exciting than the doing. You might also frustrate practical people who want concrete plans.",
    lowScorers: "You prefer dealing with what's real and concrete rather than imagining possibilities. You're grounded and practical. This means you're probably good at executing, even if generating new visions isn't your thing."
  },
  {
    name: "Execution Drive",
    definition: "The ability to move from idea to action — pushing through obstacles and completing what was started.",
    highScorers: [
      "Feel restless when there's lots of talk but no action",
      "Get deep satisfaction from finishing things",
      "Push through when others give up",
      "Have a bias toward doing rather than discussing"
    ],
    realLife: [
      "Being the one who actually makes things happen",
      "Feeling frustrated in meetings that don't lead to action",
      "Having a to-do list and genuinely enjoying crossing things off",
      "Starting things and driving them to completion"
    ],
    shadow: "You might rush to action before thinking things through. You might also steamroll others who want to process more slowly.",
    lowScorers: "You might enjoy the ideation and relationship side of things more than the execution. Getting things done might feel like a grind rather than a joy. Partner with high-execution people to complement your strengths."
  },
  {
    name: "Responsibility Orientation",
    definition: "Taking ownership, following through on commitments, and being someone others can depend on.",
    highScorers: [
      "Feel physically uncomfortable when they haven't kept a promise",
      "Take on responsibility even when it's not officially theirs",
      "Are described as \"reliable\" or \"someone you can count on\"",
      "Struggle to let go of commitments, even when circumstances change"
    ],
    realLife: [
      "Always showing up when you said you would",
      "Feeling guilty if you have to cancel plans",
      "Being the person others trust with important tasks",
      "Taking ownership of problems even when they're not your fault"
    ],
    shadow: "You might take on too much and burn out. You might also struggle to say no or to let others carry responsibility.",
    lowScorers: "You value flexibility over commitment. You adapt easily when plans change. This means you're probably less stressed by shifting circumstances, but others might sometimes find you unreliable."
  },
  {
    name: "Stability & Reliability",
    definition: "Creating consistency, maintaining structures, and providing a steady presence that grounds others.",
    highScorers: [
      "Like routines and find them comforting",
      "Are described as \"calming\" or \"grounding\" to be around",
      "Create stability for others in chaotic situations",
      "Feel unsettled when everything is constantly changing"
    ],
    realLife: [
      "Having regular rhythms and rituals that anchor your days",
      "Being the steady presence when others are panicking",
      "Creating systems and structures that help things run smoothly",
      "Preferring predictability over constant novelty"
    ],
    shadow: "You might resist necessary change. You might also find it hard to cope when your routines are disrupted.",
    lowScorers: "You thrive on novelty and change. Routine might bore you. This means you're probably adaptable and energised by new situations, but you might struggle to maintain consistency over time."
  },
  {
    name: "Adaptability",
    definition: "Responding flexibly to change, staying present rather than rigidly planning, and going with the flow.",
    highScorers: [
      "Roll with last-minute changes easily",
      "Feel comfortable with uncertainty",
      "Stay present rather than needing to know what's next",
      "Actually enjoy surprise and spontaneity"
    ],
    realLife: [
      "Being fine when plans fall through",
      "Adjusting quickly to new circumstances",
      "Not getting stressed when you don't know what's happening",
      "Thriving in unpredictable environments"
    ],
    shadow: "You might lack follow-through on long-term plans. Others might find you unreliable or hard to pin down.",
    lowScorers: "You prefer to know what's coming. Uncertainty stresses you out. This means you're probably good at planning and preparation, but sudden changes might really throw you off."
  },
  {
    name: "Learning Velocity",
    definition: "Quickly absorbing new information and enjoying the process of becoming competent at new things.",
    highScorers: [
      "Pick up new skills faster than most people",
      "Love the early stages of learning something new",
      "Get bored once they've mastered something",
      "Have lots of interests they've explored at various depths"
    ],
    realLife: [
      "Being a quick study with new apps, games, or concepts",
      "Getting excited about learning something you know nothing about",
      "Having a history of diving into new hobbies enthusiastically",
      "Feeling most alive when everything is new and challenging"
    ],
    shadow: "You might be a \"jack of all trades, master of none.\" You might abandon things once the initial learning curve flattens.",
    lowScorers: "You prefer to go deep in familiar areas rather than constantly learning new things. The early stages of incompetence might feel frustrating rather than exciting. This means you probably develop real expertise over time."
  },
  {
    name: "Relational Attunement",
    definition: "Sensing what others feel, building genuine connection, and making people feel truly known.",
    highScorers: [
      "Walk into a room and immediately sense the emotional atmosphere",
      "Know what someone is feeling before they say anything",
      "Naturally create spaces where people feel safe to open up",
      "Absorb others' emotions (which can be exhausting)"
    ],
    realLife: [
      "Being the friend people come to when they need to process",
      "Noticing when someone is \"off\" even when they say they're fine",
      "Remembering details about people's lives and asking about them",
      "Feeling drained after being around people who are struggling"
    ],
    shadow: "You might take on others' emotions to an unhealthy degree. You might also struggle to maintain boundaries or prioritise your own needs.",
    lowScorers: "You're more task-focused than relationally focused. You might miss emotional cues that others pick up on. This doesn't mean you're cold — you just process the world differently."
  },
  {
    name: "Influence & Persuasion",
    definition: "Moving others toward action or belief — communicating compellingly and bringing people along with you.",
    highScorers: [
      "Naturally advocate for things they care about",
      "See people change their minds or take action after talking with them",
      "Enjoy making a case and winning people over",
      "Feel drawn to rally people around causes or ideas"
    ],
    realLife: [
      "Being the friend who convinces the group to try something",
      "Getting excited about sharing things you've discovered",
      "Being described as \"persuasive\" or \"compelling\"",
      "Feeling energised when you see someone come around to your perspective"
    ],
    shadow: "You might manipulate without realising it. You might also struggle when people don't come around despite your best efforts.",
    lowScorers: "You're not driven to convince others. You'd rather do your own thing than spend energy persuading people. This might mean you're less controlling, but you may also struggle to advocate for yourself or your ideas."
  },
  {
    name: "Courage & Initiative",
    definition: "Moving first into uncertain spaces, taking risks, and speaking hard truths when needed.",
    highScorers: [
      "Step into the unknown when others hesitate",
      "Speak up about difficult things that need to be said",
      "Feel drawn to risky opportunities rather than avoiding them",
      "Go first when no one else will"
    ],
    realLife: [
      "Being the one who breaks the awkward silence",
      "Taking action when everyone else is frozen",
      "Calling out things that are wrong, even when it's uncomfortable",
      "Feeling alive when facing uncertainty rather than paralysed"
    ],
    shadow: "You might take unnecessary risks. You might also come across as reckless or insensitive when speaking hard truths.",
    lowScorers: "You prefer safety and certainty. Speaking up in tense situations might feel really costly to you. This doesn't mean you're a coward — it means you weigh risks more carefully."
  },
  {
    name: "Harmony & Mediation",
    definition: "Finding common ground, reducing conflict, and helping opposing sides understand each other.",
    highScorers: [
      "Feel physically uncomfortable with ongoing conflict",
      "Naturally see validity in multiple perspectives",
      "Step into disputes to help people find peace",
      "Are skilled at helping divided people find unity"
    ],
    realLife: [
      "Being the friend who helps patch things up after a fight",
      "Seeing \"both sides\" even in heated disagreements",
      "Feeling compelled to resolve tension rather than let it sit",
      "Being described as a peacemaker or mediator"
    ],
    shadow: "You might avoid necessary conflict. You might also sacrifice truth for the sake of peace, or struggle to take a clear stand.",
    lowScorers: "You're comfortable with conflict and don't feel compelled to resolve it. You might have strong convictions you're willing to fight for. This means you probably won't compromise on important things, but you might also create unnecessary tension."
  },
  {
    name: "Precision & Excellence",
    definition: "Getting things right, attending to quality, and refusing to settle for \"good enough.\"",
    highScorers: [
      "Notice errors and inconsistencies others miss",
      "Feel bothered by work that doesn't meet a high standard",
      "Take longer to complete things because they want them right",
      "Are described as \"detail-oriented\" or \"perfectionist\""
    ],
    realLife: [
      "Spotting typos and mistakes automatically",
      "Redoing work until it meets your standards",
      "Feeling physically uncomfortable with sloppy output",
      "Being the person others trust to catch errors"
    ],
    shadow: "Perfectionism can paralyse you. You might also be overly critical of yourself and others, and struggle to finish things because they're \"not ready.\"",
    lowScorers: "You're more interested in progress than perfection. \"Done is better than perfect\" resonates with you. This means you probably ship faster than perfectionists, but you might miss important details."
  },
  {
    name: "Systems & Stewardship",
    definition: "Seeing how parts connect, designing for sustainability, and thinking about long-term health rather than quick fixes.",
    highScorers: [
      "Think about how everything fits together",
      "Ask \"what will this lead to in 5 years?\"",
      "Notice when a \"solution\" will create new problems",
      "Design systems rather than just solving immediate issues"
    ],
    realLife: [
      "Thinking about second and third-order effects",
      "Being frustrated by short-term thinking",
      "Naturally creating processes that work without you",
      "Caring about sustainability and long-term health"
    ],
    shadow: "You might over-complicate things. You might also struggle to take action because you're still mapping the system.",
    lowScorers: "You prefer to focus on immediate, tangible problems rather than abstract systems. This means you're probably good at getting things done in the short term, but might not anticipate downstream consequences."
  }
]

const gifts = [
  {
    name: "Wisdom",
    scripture: "1 Corinthians 12:8",
    definition: "The Spirit-given ability to apply truth to life situations with insight that goes beyond natural understanding.",
    clarification: "This is different from intelligence. Wisdom is about knowing what to do in complex situations — seeing the wise path forward when others are stuck.",
    evidence: [
      "People seek you out for advice on difficult decisions",
      "You often sense a way through that others can't see",
      "Your counsel tends to prove wise over time",
      "You can see how biblical principles apply to specific situations"
    ]
  },
  {
    name: "Knowledge",
    scripture: "1 Corinthians 12:8",
    definition: "The Spirit-given ability to understand deep truths or receive specific insight that serves the body.",
    clarification: "This isn't about being smart or well-read. This gift involves receiving understanding or information that comes from the Spirit rather than natural study.",
    evidence: [
      "You sometimes \"know\" things you couldn't know naturally",
      "Deep spiritual truths become clear to you as you pray or study",
      "When you share insight, it often proves accurate and helpful",
      "You sense things about situations or people that prove true"
    ]
  },
  {
    name: "Faith",
    scripture: "1 Corinthians 12:9",
    definition: "The Spirit-given ability to trust God with extraordinary confidence, even when circumstances seem impossible.",
    clarification: "This is different from \"saving faith\" (which all Christians have). The gift of faith is a special capacity to believe God for the impossible when others have given up.",
    evidence: [
      "You carry unusual peace and confidence in difficult situations",
      "You've seen God come through in situations others thought were hopeless",
      "You're often the one encouraging others to keep trusting when they want to quit",
      "Your faith seems to make room for God to act"
    ]
  },
  {
    name: "Healing",
    scripture: "1 Corinthians 12:9",
    definition: "The Spirit-given ability to be a channel for God's healing work in others — physically, emotionally, or spiritually.",
    clarification: "This doesn't mean you can heal on demand. The gift of healing means God regularly uses you as an instrument of his healing work.",
    evidence: [
      "You've prayed for people's healing and seen results beyond coincidence",
      "You feel prompted to pray specifically for healing in certain situations",
      "There's a pattern of people experiencing breakthrough when you pray for them",
      "This includes emotional and spiritual healing, not just physical"
    ]
  },
  {
    name: "Miracles",
    scripture: "1 Corinthians 12:10",
    definition: "The Spirit-given ability to participate in supernatural acts that display God's power.",
    evidence: [
      "You've been involved in situations where supernatural things happened",
      "You have faith to ask God for the impossible in specific situations",
      "There's a pattern of inexplicable events when you're involved"
    ],
    note: "This gift is less common and often emerges later. A low score doesn't mean much — most people haven't been in contexts where this gift would be evident."
  },
  {
    name: "Prophecy",
    scripture: "1 Corinthians 12:10",
    definition: "The Spirit-given ability to receive and speak words from God that strengthen, encourage, and comfort.",
    clarification: "New Testament prophecy is about building up, not primarily prediction. It's receiving a word from God for a specific person or situation.",
    evidence: [
      "You receive impressions, words, or pictures that seem to be from God",
      "When you share these, people often confirm they're accurate and timely",
      "Your words bring encouragement, challenge, or comfort",
      "You've learned to discern when something is from God versus your own thoughts"
    ]
  },
  {
    name: "Discernment of Spirits",
    scripture: "1 Corinthians 12:10",
    definition: "The Spirit-given ability to distinguish between what is from God, what is human, and what is demonic.",
    clarification: "This isn't suspicion or cynicism. It's a spiritual sensitivity to the source and nature of things.",
    evidence: [
      "You sense when something is \"off\" spiritually, even when you can't explain why",
      "You can tell the difference between genuine spiritual experience and counterfeit",
      "You're often uncomfortable before others recognise a problem",
      "Your discernment has proven accurate over time"
    ]
  },
  {
    name: "Tongues",
    scripture: "1 Corinthians 12:10",
    definition: "The Spirit-given ability to speak in languages unknown to the speaker, whether for personal prayer or public proclamation.",
    evidence: [
      "You've experienced speaking or praying in a language you haven't learned",
      "This happens in prayer or worship, either regularly or occasionally",
      "It helps you connect with God beyond the limits of your own words"
    ],
    note: "This gift is normal in some church traditions and unfamiliar in others. If you haven't been in contexts where this is practiced, you may not have had opportunity to discover this gift."
  },
  {
    name: "Interpretation of Tongues",
    scripture: "1 Corinthians 12:10",
    definition: "The Spirit-given ability to understand and communicate the meaning of messages given in tongues.",
    evidence: [
      "When someone speaks in tongues publicly, you receive a sense of what it means",
      "Your interpretations have been confirmed by others as accurate and edifying",
      "You've experienced a supernatural understanding of unknown languages"
    ],
    note: "This gift requires contexts where tongues are practiced publicly. If that's not your church experience, you may not have discovered whether you have this gift."
  },
  {
    name: "Teaching",
    scripture: "Romans 12:7",
    definition: "The Spirit-given ability to explain truth clearly so that others understand and can apply it.",
    clarification: "This is more than being knowledgeable. The gift of teaching involves communicating in a way that produces understanding and transformation.",
    evidence: [
      "When you explain things, people \"get it\" — light bulbs go on",
      "You can take complex ideas and make them accessible",
      "Others often say your explanations helped them understand",
      "You think about how to communicate truth effectively"
    ]
  },
  {
    name: "Shepherding",
    scripture: "Ephesians 4:11",
    definition: "The Spirit-given ability to guide, protect, and care for others in their spiritual journey over time.",
    clarification: "This is different from general caring. Shepherding involves long-term, committed investment in people's spiritual growth.",
    evidence: [
      "People naturally come to you for ongoing guidance",
      "You feel drawn to walk with people over time, not just have one-off conversations",
      "You notice when people are spiritually struggling or wandering",
      "You have a protective instinct for people's spiritual wellbeing"
    ]
  },
  {
    name: "Apostolic/Sending",
    scripture: "Ephesians 4:11",
    definition: "The Spirit-given ability to start new things, pioneer into new territory, and establish foundations.",
    evidence: [
      "You're drawn to starting things rather than maintaining them",
      "You thrive in situations where nothing exists yet",
      "You've started groups, initiatives, or ministries that continued after you moved on",
      "You're energised by new ground, even when it's uncertain"
    ]
  },
  {
    name: "Evangelism",
    scripture: "Ephesians 4:11",
    definition: "The Spirit-given ability to share the gospel in ways that lead others to faith in Jesus.",
    clarification: "This isn't about being pushy or having all the answers. The gift of evangelism involves a special effectiveness in helping people take steps toward Jesus.",
    evidence: [
      "You've seen people come to faith through conversations with you",
      "Spiritual conversations with non-Christians feel natural to you",
      "You have a burden for people who don't know Jesus",
      "You're often the one friends bring their non-Christian friends to"
    ]
  },
  {
    name: "Service",
    scripture: "Romans 12:7",
    definition: "The Spirit-given ability to identify and meet practical needs in ways that free others to serve.",
    clarification: "This is more than just helping out. The gift of service involves seeing needs others miss and finding joy in meeting them.",
    evidence: [
      "You notice practical needs before others do",
      "You find deep satisfaction in behind-the-scenes work",
      "You're happiest when your serving frees others to do their thing",
      "Tasks that others find tedious feel meaningful to you"
    ]
  },
  {
    name: "Encouragement",
    scripture: "Romans 12:8",
    definition: "The Spirit-given ability to come alongside others with words that comfort, challenge, and strengthen.",
    evidence: [
      "People regularly tell you that your words lifted them or gave them strength",
      "You know what to say in difficult moments",
      "Your encouragement seems to have unusual impact",
      "You're drawn to people who are struggling or discouraged"
    ]
  },
  {
    name: "Giving",
    scripture: "Romans 12:8",
    definition: "The Spirit-given ability to give resources generously and joyfully for God's purposes.",
    clarification: "This isn't about being wealthy. It's about a joyful, generous orientation toward giving, regardless of your income level.",
    evidence: [
      "You find genuine joy in giving — it doesn't feel like sacrifice",
      "You actively look for opportunities to give",
      "You tend to give beyond what seems reasonable or expected",
      "Generosity feels like a natural expression of who you are"
    ]
  }
]

const vocationalDirections = [
  {
    name: "Formation & Discipleship",
    definition: "Helping people grow in faith — through teaching, mentoring, small groups, spiritual direction, or pastoral care.",
    examples: "Youth worker, Small group leader, Campus minister, Spiritual director, Discipleship pastor, Mentor",
    draws: [
      "A burden for people's spiritual growth",
      "Joy in walking with people through questions and struggles",
      "Patience for slow, long-term investment",
      "Desire to see people transformed from the inside out"
    ],
    costs: [
      { title: "Slow fruit", desc: "Transformation takes years, not weeks" },
      { title: "Carrying burdens", desc: "People's struggles become yours" },
      { title: "Hidden work", desc: "Most of what you do won't be seen" },
      { title: "Vulnerability", desc: "You'll need to share your own journey" }
    ]
  },
  {
    name: "Leadership & Stewardship",
    definition: "Building and leading organisations, teams, or systems for greater effectiveness and health — whether churches, businesses, nonprofits, or ministries.",
    examples: "Church elder or pastor, Nonprofit director, Team manager, Entrepreneur, Organisational consultant, Ministry leader",
    draws: [
      "Desire to build something that works well",
      "Burden for organisations that aren't reaching their potential",
      "Ability to see how things could be better",
      "Willingness to take responsibility for outcomes"
    ],
    costs: [
      { title: "Criticism", desc: "Leaders always face pushback" },
      { title: "Loneliness", desc: "Leadership can be isolating" },
      { title: "Hard decisions", desc: "Choices that affect others negatively" },
      { title: "Slow change", desc: "Organisations move slowly" }
    ]
  },
  {
    name: "Justice, Mercy & the Poor",
    definition: "Standing with the marginalised, advocating for justice, serving those in need — whether locally or globally.",
    examples: "Social worker, Human rights advocate, Relief worker, Community organiser, Public defender, Charity founder",
    draws: [
      "Deep burden for injustice, poverty, and marginalisation",
      "Inability to ignore suffering",
      "Desire to be present with people in crisis",
      "Conviction that the gospel demands action for the poor"
    ],
    costs: [
      { title: "Proximity to pain", desc: "You'll be close to suffering daily" },
      { title: "Burnout risk", desc: "The needs are endless" },
      { title: "Systemic frustration", desc: "Systems are broken; change is slow" },
      { title: "Misunderstanding", desc: "Comfortable people may not get it" }
    ]
  },
  {
    name: "Cultural Creation & Influence",
    definition: "Shaping culture through creativity, media, arts, business, education, or public life — bringing a Christian presence into spaces that aren't explicitly \"ministry.\"",
    examples: "Artist or musician, Writer or filmmaker, Entrepreneur, Teacher or professor, Journalist, Creative professional, Business leader",
    draws: [
      "Desire to create beautiful or influential things",
      "Burden to bring Christian thinking into secular spaces",
      "Ability to communicate through art, story, or culture",
      "Willingness to be a minority voice in non-Christian environments"
    ],
    costs: [
      { title: "Secular spaces", desc: "Often the only Christian in the room" },
      { title: "Minority voice", desc: "Your values may be dismissed" },
      { title: "Slow influence", desc: "Culture changes gradually" },
      { title: "Criticism", desc: "Creative work always faces critique" }
    ]
  },
  {
    name: "Pioneering, Mission & the Margins",
    definition: "Going to new places — geographically or culturally — where the gospel or the church isn't yet established.",
    examples: "Church planter, Missionary, Campus pioneer, Marketplace missionary, Cross-cultural worker",
    draws: [
      "Restlessness with the familiar and established",
      "Burden for places and peoples without the gospel",
      "Willingness to start from nothing",
      "Ability to thrive in uncertain, risky environments"
    ],
    costs: [
      { title: "Loneliness", desc: "Far from community and support" },
      { title: "Displacement", desc: "Everything familiar stripped away" },
      { title: "Invisible fruit", desc: "Little immediate result" },
      { title: "Starting over", desc: "Build, hand off, repeat" }
    ]
  }
]
