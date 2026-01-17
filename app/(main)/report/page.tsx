'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Report } from '@/lib/types'
import { strengthDomains } from '@/data/strengths'
import { spiritualGifts } from '@/data/gifts'
import { vocationalDomains } from '@/data/vocational'

export default function ReportPage() {
  const router = useRouter()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadReport()
  }, [])

  async function loadReport() {
    try {
      const response = await fetch('/api/report')
      const data = await response.json()
      setReport(data.report)
    } catch (error) {
      console.error('Error loading report:', error)
    } finally {
      setLoading(false)
    }
  }

  async function generateReport() {
    setGenerating(true)
    setError('')
    
    try {
      const response = await fetch('/api/report', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setError(data.error || 'Failed to generate report')
        return
      }
      
      setReport(data.report)
    } catch (error) {
      console.error('Error generating report:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="container-wide py-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-sage-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-stone-500">Loading your report...</p>
          </div>
        </div>
      </div>
    )
  }

  // No report yet - generate prompt
  if (!report) {
    return (
      <div className="container-narrow py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card text-center"
        >
          <div className="text-5xl mb-6">📜</div>
          <h1 className="font-serif text-heading text-stone-800 mb-4">
            Generate Your Report
          </h1>
          <p className="text-body text-stone-600 mb-8 max-w-md mx-auto">
            Your assessment responses will be synthesised into a personalized 
            discernment report, integrating your strengths, gifts, and vocational 
            directions with theological reflection.
          </p>

          {error && (
            <div className="bg-clay-50 border border-clay-200 text-clay-700 px-4 py-3 rounded-soft mb-6 text-small">
              {error}
            </div>
          )}

          <button
            onClick={generateReport}
            disabled={generating}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating (this may take a minute)...
              </span>
            ) : (
              'Generate My Report'
            )}
          </button>

          <p className="text-small text-stone-400 mt-6">
            The report takes about 30-60 seconds to generate.
          </p>
        </motion.div>
      </div>
    )
  }

  // Render the report
  return (
    <div className="py-12">
      {/* Header */}
      <div className="container-wide mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="font-serif text-heading text-stone-800 mb-1">
              Your Discernment Report
            </h1>
            <p className="text-small text-stone-500">
              Generated {new Date(report.generatedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          
          <div className="flex gap-3 no-print">
            <button
              onClick={() => window.print()}
              className="btn-secondary"
            >
              Print / Save PDF
            </button>
            <button
              onClick={generateReport}
              disabled={generating}
              className="btn-ghost"
            >
              {generating ? 'Regenerating...' : 'Regenerate'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Important notice */}
      <div className="container-wide mb-8 no-print">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-wheat-50 border border-wheat-200 rounded-gentle p-6"
        >
          <p className="text-body text-stone-700">
            <strong className="text-wheat-800">A note on reading this report:</strong>{' '}
            What follows is a discernment aid, not a prophecy. It reflects patterns 
            in your responses interpreted through a theological lens — but it cannot 
            see your whole life, your context, or what God is doing in places you 
            have not yet noticed. Hold this report prayerfully. Test it in community. 
            Let wise counsel weigh in before you act.
          </p>
        </motion.div>
      </div>

      {/* Quick summary cards */}
      <div className="container-wide mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Top Strengths */}
          <div className="card">
            <h3 className="font-serif text-lg text-stone-800 mb-4 flex items-center gap-2">
              <span>🌱</span> Top Strengths
            </h3>
            <ul className="space-y-2">
              {report.moduleData.strengths.topStrengths.slice(0, 5).map((s, i) => {
                const meta = strengthDomains.find(d => d.id === s.domain)
                return (
                  <li key={s.domain} className="text-body text-stone-600">
                    <span className="text-sage-600 font-medium">{i + 1}.</span>{' '}
                    {meta?.name}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Primary Gifts */}
          <div className="card">
            <h3 className="font-serif text-lg text-stone-800 mb-4 flex items-center gap-2">
              <span>✨</span> Primary Gifts
            </h3>
            <ul className="space-y-2">
              {report.moduleData.gifts.primaryGifts.slice(0, 4).map((g, i) => {
                const meta = spiritualGifts.find(gm => gm.id === g.gift)
                return (
                  <li key={g.gift} className="text-body text-stone-600">
                    <span className={`text-small px-2 py-0.5 rounded ${
                      g.evidenceStrength === 'strong' 
                        ? 'bg-sage-100 text-sage-700'
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {g.evidenceStrength}
                    </span>{' '}
                    {meta?.name}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Vocational Gravity */}
          <div className="card">
            <h3 className="font-serif text-lg text-stone-800 mb-4 flex items-center gap-2">
              <span>🧭</span> Vocational Direction
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-small text-stone-500 mb-1">Primary pull</p>
                <p className="text-body text-stone-700 font-medium">
                  {vocationalDomains.find(v => v.id === report.moduleData.vocational.primaryGravity.domain)?.name}
                </p>
              </div>
              {report.moduleData.vocational.secondaryDirections.length > 0 && (
                <div>
                  <p className="text-small text-stone-500 mb-1">Also drawn to</p>
                  <p className="text-body text-stone-600">
                    {report.moduleData.vocational.secondaryDirections.map(v => 
                      vocationalDomains.find(vm => vm.id === v.domain)?.name
                    ).join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main report content */}
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div 
            className="prose prose-stone prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-stone-800
              prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-body prose-p:text-stone-600 prose-p:mb-4
              prose-strong:text-stone-700
              prose-blockquote:border-sage-300 prose-blockquote:text-stone-600 prose-blockquote:italic
              prose-ul:text-stone-600 prose-li:text-stone-600"
            dangerouslySetInnerHTML={{ 
              __html: formatReportContent(report.content) 
            }}
          />
        </motion.div>
      </div>

      {/* Closing guidance */}
      <div className="container-narrow mt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-sage-50 rounded-gentle text-center"
        >
          <p className="font-serif text-lg text-stone-700 mb-4">
            What will you do with this?
          </p>
          <p className="text-body text-stone-600 max-w-lg mx-auto">
            Consider sharing this report with a mentor, pastor, or trusted friend. 
            Ask them: "What resonates? What surprises you? What am I not seeing?"
          </p>
          <div className="mt-6 no-print">
            <Link href="/dashboard" className="btn-secondary">
              Return to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Helper function to format the report content
function formatReportContent(content: string): string {
  // Convert markdown-style headers to HTML
  let html = content
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Scripture references (make them styled)
    .replace(/\(([A-Z][a-z]+ \d+:\d+(?:-\d+)?)\)/g, '<span class="text-sage-600 text-small">($1)</span>')
    // Paragraphs
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p)
    .map(p => {
      if (p.startsWith('<h')) return p
      return `<p>${p}</p>`
    })
    .join('\n')

  return html
}
