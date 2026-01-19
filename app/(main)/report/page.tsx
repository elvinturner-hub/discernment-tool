'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { strengthDomains } from '@/data/strengths'
import { spiritualGifts } from '@/data/gifts'
import { vocationalDomains } from '@/data/vocational'

export default function ReportPage() {
  const reportRef = useRef<HTMLDivElement>(null)
  const [report, setReport] = useState<any>(null)
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
      const response = await fetch('/api/report', { method: 'POST' })
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

  async function downloadPDF() {
    if (!reportRef.current) return
    
    const html2pdf = (await import('html2pdf.js')).default
    
    const element = reportRef.current
    const opt = {
      margin: [15, 15, 15, 15],
      filename: 'my-discernment-report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    html2pdf().set(opt).from(element).save()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-stone-300 border-t-stone-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-500">Loading your report...</p>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto text-center"
        >
          <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-8">
            <div className="text-6xl mb-6">📜</div>
            <h1 className="text-2xl font-bold text-stone-800 mb-3">
              Generate Your Report
            </h1>
            <p className="text-stone-500 mb-8 leading-relaxed">
              Your responses will be synthesised into a personalised report — connecting dots you might not expect.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={generateReport}
              disabled={generating}
              className="w-full bg-gradient-to-r from-stone-800 to-stone-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {generating ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </span>
              ) : (
                'Generate My Report ✨'
              )}
            </button>

            <p className="text-stone-400 text-sm mt-6">
              Takes about 30-60 seconds — we&apos;re finding the deep stuff 🔍
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  // Get sorted data for rankings
  const strengthsData = report.moduleData?.strengths
  const giftsData = report.moduleData?.gifts
  const vocationalData = report.moduleData?.vocational

  // Sort strengths by score
  const sortedStrengths = strengthsData?.rawScores 
    ? Object.entries(strengthsData.rawScores)
        .map(([id, score]) => ({
          id,
          name: strengthDomains.find(d => d.id === id)?.name || id,
          score: score as number
        }))
        .sort((a, b) => b.score - a.score)
    : []

  // Sort gifts by score
  const sortedGifts = giftsData?.rawScores
    ? Object.entries(giftsData.rawScores)
        .map(([id, score]) => ({
          id,
          name: spiritualGifts.find(g => g.id === id)?.name || id,
          score: score as number
        }))
        .sort((a, b) => b.score - a.score)
    : []

  // Sort vocational by score
  const sortedVocational = vocationalData?.rawScores
    ? Object.entries(vocationalData.rawScores)
        .map(([id, score]) => ({
          id,
          name: vocationalDomains.find(v => v.id === id)?.name || id,
          score: score as number
        }))
        .sort((a, b) => b.score - a.score)
    : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-lg border-b border-stone-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="text-stone-400 hover:text-stone-600 text-sm font-medium flex items-center gap-1 transition-colors">
            ← Back
          </Link>
          <div className="flex gap-2">
            <button
              onClick={downloadPDF}
              className="bg-stone-800 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-stone-700 transition-colors flex items-center gap-2"
            >
              <span>📥</span> PDF
            </button>
            <button
              onClick={() => window.print()}
              className="bg-stone-100 text-stone-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-stone-200 transition-colors hidden sm:flex items-center gap-2"
            >
              <span>🖨️</span> Print
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Title */}
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">🌿</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-2 tracking-tight">
              Your Discernment Report
            </h1>
            <p className="text-stone-400 text-sm">
              {new Date(report.generatedAt).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </p>
          </div>

          {/* Notice */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-3xl p-6 mb-10">
            <p className="text-amber-800 text-sm leading-relaxed">
              <span className="font-semibold">Real talk:</span> This reflects patterns in your answers — it&apos;s not prophecy. 
              You know yourself. Hold this loosely, test it with people who know you, 
              and feel free to disagree. 🙏
            </p>
          </div>

          {/* ============================================= */}
          {/* SCORE SUMMARY SECTION */}
          {/* ============================================= */}
          
          <div className="mb-12">
            <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
              <span>📊</span> Your Scores at a Glance
            </h2>

            {/* Top 3 Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
                <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">🥇 Top Strength</div>
                <div className="text-base font-bold text-emerald-800">
                  {sortedStrengths[0]?.name || 'N/A'}
                </div>
                <div className="text-2xl font-bold text-emerald-600 mt-1">
                  {sortedStrengths[0]?.score?.toFixed(1) || '—'}
                </div>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-5 border border-violet-100">
                <div className="text-xs font-bold text-violet-500 uppercase tracking-wider mb-1">✨ Top Gift</div>
                <div className="text-base font-bold text-violet-800">
                  {sortedGifts[0]?.name || 'Emerging...'}
                </div>
                <div className="text-2xl font-bold text-violet-600 mt-1">
                  {sortedGifts[0]?.score?.toFixed(1) || '—'}
                </div>
              </div>

              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-5 border border-sky-100">
                <div className="text-xs font-bold text-sky-500 uppercase tracking-wider mb-1">🧭 Top Direction</div>
                <div className="text-base font-bold text-sky-800">
                  {sortedVocational[0]?.name || 'N/A'}
                </div>
                <div className="text-2xl font-bold text-sky-600 mt-1">
                  {sortedVocational[0]?.score?.toFixed(1) || '—'}
                </div>
              </div>
            </div>

            {/* Strengths Rankings */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6">
              <h3 className="font-bold text-stone-700 mb-4 flex items-center gap-2">
                <span className="text-lg">🌱</span> Created Strengths
                <span className="text-xs font-normal text-stone-400 ml-auto">Ranked by score</span>
              </h3>
              <div className="space-y-3">
                {sortedStrengths.slice(0, 7).map((strength, index) => (
                  <ScoreBar 
                    key={strength.id}
                    rank={index + 1}
                    name={strength.name}
                    score={strength.score}
                    maxScore={5}
                    color={index < 3 ? 'emerald' : 'stone'}
                    isTop={index < 3}
                  />
                ))}
                {sortedStrengths.length > 7 && (
                  <details className="mt-2">
                    <summary className="text-sm text-stone-400 cursor-pointer hover:text-stone-600">
                      Show all {sortedStrengths.length} strengths...
                    </summary>
                    <div className="space-y-3 mt-3">
                      {sortedStrengths.slice(7).map((strength, index) => (
                        <ScoreBar 
                          key={strength.id}
                          rank={index + 8}
                          name={strength.name}
                          score={strength.score}
                          maxScore={5}
                          color="stone"
                          isTop={false}
                        />
                      ))}
                    </div>
                  </details>
                )}
              </div>
            </div>

            {/* Gifts Rankings */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6">
              <h3 className="font-bold text-stone-700 mb-4 flex items-center gap-2">
                <span className="text-lg">✨</span> Spiritual Gifts
                <span className="text-xs font-normal text-stone-400 ml-auto">Ranked by evidence</span>
              </h3>
              <div className="space-y-3">
                {sortedGifts.slice(0, 6).map((gift, index) => (
                  <ScoreBar 
                    key={gift.id}
                    rank={index + 1}
                    name={gift.name}
                    score={gift.score}
                    maxScore={5}
                    color={index < 3 ? 'violet' : 'stone'}
                    isTop={index < 3}
                  />
                ))}
                {sortedGifts.length > 6 && (
                  <details className="mt-2">
                    <summary className="text-sm text-stone-400 cursor-pointer hover:text-stone-600">
                      Show all {sortedGifts.length} gifts...
                    </summary>
                    <div className="space-y-3 mt-3">
                      {sortedGifts.slice(6).map((gift, index) => (
                        <ScoreBar 
                          key={gift.id}
                          rank={index + 7}
                          name={gift.name}
                          score={gift.score}
                          maxScore={5}
                          color="stone"
                          isTop={false}
                        />
                      ))}
                    </div>
                  </details>
                )}
              </div>
            </div>

            {/* Vocational Rankings */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h3 className="font-bold text-stone-700 mb-4 flex items-center gap-2">
                <span className="text-lg">🧭</span> Vocational Direction
                <span className="text-xs font-normal text-stone-400 ml-auto">Ranked by pull</span>
              </h3>
              <div className="space-y-3">
                {sortedVocational.map((direction, index) => (
                  <ScoreBar 
                    key={direction.id}
                    rank={index + 1}
                    name={direction.name}
                    score={direction.score}
                    maxScore={5}
                    color={index === 0 ? 'sky' : index === 1 ? 'sky' : 'stone'}
                    isTop={index < 2}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px bg-stone-200"></div>
            <span className="text-stone-400 text-sm">Deeper Insights</span>
            <div className="flex-1 h-px bg-stone-200"></div>
          </div>

          {/* Main Report Content */}
          <div 
            className="report-content space-y-6"
            dangerouslySetInnerHTML={{ __html: formatReportContent(report.content) }}
          />

          {/* Closing */}
          <div className="mt-14 pt-10 border-t border-stone-200">
            <div className="bg-gradient-to-br from-stone-100 to-stone-50 rounded-3xl p-8 text-center">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">What&apos;s Next?</h3>
              <p className="text-stone-500 mb-6 max-w-sm mx-auto leading-relaxed">
                Share this with someone who knows you. Ask: &ldquo;What resonates? What surprises you?&rdquo;
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={downloadPDF}
                  className="bg-stone-800 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-stone-700 transition-colors flex items-center justify-center gap-2"
                >
                  📥 Download PDF
                </button>
                <Link 
                  href="/dashboard" 
                  className="bg-white text-stone-600 px-6 py-3 rounded-2xl font-medium border border-stone-200 hover:bg-stone-50 transition-colors"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Regenerate */}
          <div className="mt-8 text-center">
            <button
              onClick={generateReport}
              disabled={generating}
              className="text-stone-400 hover:text-stone-600 text-sm transition-colors"
            >
              {generating ? 'Regenerating...' : '🔄 Regenerate with fresh insights'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .sticky { position: relative !important; }
          button { display: none !important; }
          a[href="/dashboard"] { display: none !important; }
          details { display: block !important; }
          details > summary { display: none !important; }
          details > div { display: block !important; }
        }
        
        .report-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1c1917;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .report-content h3:first-child {
          margin-top: 0;
        }
        
        .report-content p {
          color: #57534e;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        
        .report-content strong {
          color: #1c1917;
          font-weight: 600;
        }
        
        .report-content em {
          color: #78716c;
        }
      `}</style>
    </div>
  )
}

// Score Bar Component
function ScoreBar({ 
  rank, 
  name, 
  score, 
  maxScore, 
  color, 
  isTop 
}: { 
  rank: number
  name: string
  score: number
  maxScore: number
  color: 'emerald' | 'violet' | 'sky' | 'stone'
  isTop: boolean
}) {
  const percentage = (score / maxScore) * 100
  
  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-100',
      fill: 'bg-emerald-500',
      text: 'text-emerald-700',
      rank: 'bg-emerald-500 text-white',
    },
    violet: {
      bg: 'bg-violet-100',
      fill: 'bg-violet-500',
      text: 'text-violet-700',
      rank: 'bg-violet-500 text-white',
    },
    sky: {
      bg: 'bg-sky-100',
      fill: 'bg-sky-500',
      text: 'text-sky-700',
      rank: 'bg-sky-500 text-white',
    },
    stone: {
      bg: 'bg-stone-100',
      fill: 'bg-stone-400',
      text: 'text-stone-600',
      rank: 'bg-stone-300 text-stone-600',
    },
  }
  
  const c = colorClasses[color]
  
  return (
    <div className="flex items-center gap-3">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${c.rank}`}>
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-sm font-medium truncate ${isTop ? c.text : 'text-stone-600'}`}>
            {name}
          </span>
          <span className={`text-sm font-bold ml-2 ${isTop ? c.text : 'text-stone-500'}`}>
            {score.toFixed(1)}
          </span>
        </div>
        <div className={`h-2 rounded-full ${c.bg} overflow-hidden`}>
          <motion.div 
            className={`h-full rounded-full ${c.fill}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  )
}

function formatReportContent(content: string): string {
  if (!content) return ''
  
  let html = content
    .replace(/^### ([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]) (.+)$/gmu, '<h3><span style="font-size:1.5rem">$1</span> $2</h3>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\(([1-3]?\s?[A-Z][a-z]+ \d+:\d+(?:-\d+)?)\)/g, '<span style="color:#6b8068;font-size:0.875rem;font-weight:500">($1)</span>')
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p)
    .map(p => {
      if (p.startsWith('<h')) return p
      return `<p>${p.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')

  return html
}
