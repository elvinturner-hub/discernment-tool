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

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
              <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">🌱 Top Strength</div>
              <div className="text-base sm:text-lg font-bold text-emerald-800">
                {strengthDomains.find(d => d.id === report.moduleData?.strengths?.topStrengths?.[0]?.domain)?.name || 'N/A'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-5 border border-violet-100">
              <div className="text-xs font-bold text-violet-500 uppercase tracking-wider mb-1">✨ Primary Gift</div>
              <div className="text-base sm:text-lg font-bold text-violet-800">
                {spiritualGifts.find(g => g.id === report.moduleData?.gifts?.primaryGifts?.[0]?.gift)?.name || 'Emerging...'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-5 border border-sky-100">
              <div className="text-xs font-bold text-sky-500 uppercase tracking-wider mb-1">🧭 Drawn Toward</div>
              <div className="text-base sm:text-lg font-bold text-sky-800">
                {vocationalDomains.find(v => v.id === report.moduleData?.vocational?.primaryGravity?.domain)?.name || 'N/A'}
              </div>
            </div>
          </div>

          {/* Main Report */}
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
