'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { moduleInfo, assessmentOrder, assessments } from '@/data'
import { AssessmentModule, AssessmentProgress } from '@/lib/types'

interface ModuleStatus {
  module: AssessmentModule
  progress: AssessmentProgress | null
  questionsAnswered: number
  totalQuestions: number
  percentComplete: number
  status: 'not-started' | 'in-progress' | 'completed'
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [moduleStatuses, setModuleStatuses] = useState<ModuleStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [allComplete, setAllComplete] = useState(false)
  const [hasReport, setHasReport] = useState(false)

  useEffect(() => {
    loadProgress()
  }, [])

  async function loadProgress() {
    try {
      const response = await fetch('/api/assessment')
      const data = await response.json()
      
      const progressMap = new Map<AssessmentModule, AssessmentProgress>()
      if (data.progress) {
        data.progress.forEach((p: AssessmentProgress) => {
          progressMap.set(p.module, p)
        })
      }

      const statuses: ModuleStatus[] = assessmentOrder.map(module => {
        const progress = progressMap.get(module) || null
        const totalQuestions = assessments[module].questions.length
        const questionsAnswered = progress?.answers?.length || 0
        const percentComplete = Math.round((questionsAnswered / totalQuestions) * 100)
        
        let status: 'not-started' | 'in-progress' | 'completed' = 'not-started'
        if (progress?.completed) {
          status = 'completed'
        } else if (questionsAnswered > 0) {
          status = 'in-progress'
        }

        return {
          module,
          progress,
          questionsAnswered,
          totalQuestions,
          percentComplete,
          status,
        }
      })

      setModuleStatuses(statuses)
      setAllComplete(statuses.every(s => s.status === 'completed'))

      // Check if report exists
      const reportResponse = await fetch('/api/report')
      const reportData = await reportResponse.json()
      setHasReport(!!reportData.report)
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const getNextModule = (): AssessmentModule | null => {
    for (const status of moduleStatuses) {
      if (status.status !== 'completed') {
        return status.module
      }
    }
    return null
  }

  if (loading) {
    return (
      <div className="container-wide py-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-sage-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-stone-500">Loading your progress...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-wide py-12">
      {/* Welcome section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-serif text-heading text-stone-800 mb-2">
          Welcome{session?.user?.name ? `, ${session.user.name}` : ''}
        </h1>
        <p className="text-body text-stone-600">
          {allComplete 
            ? 'You have completed all assessments. Your report is ready.'
            : 'Continue your discernment journey at your own pace.'}
        </p>
      </motion.div>

      {/* Progress overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-subheading text-stone-800">
            Overall Progress
          </h2>
          <span className="text-small text-stone-500">
            {moduleStatuses.filter(s => s.status === 'completed').length} of {moduleStatuses.length} complete
          </span>
        </div>
        
        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-sage-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${(moduleStatuses.filter(s => s.status === 'completed').length / moduleStatuses.length) * 100}%` 
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Module cards */}
      <div className="space-y-4 mb-12">
        {moduleStatuses.map((status, index) => {
          const info = moduleInfo[status.module]
          const isNext = !allComplete && getNextModule() === status.module
          
          return (
            <motion.div
              key={status.module}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link href={`/assessment/${status.module}`}>
                <div className={`card-hover flex flex-col md:flex-row md:items-center gap-4 ${
                  isNext ? 'ring-2 ring-sage-400 ring-offset-2' : ''
                }`}>
                  {/* Icon and title */}
                  <div className="flex items-center gap-4 md:w-64 shrink-0">
                    <span className="text-3xl">{info.icon}</span>
                    <div>
                      <h3 className="font-serif text-lg text-stone-800">
                        {info.title}
                      </h3>
                      <p className="text-small text-stone-500">
                        {info.estimatedTime}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-body text-stone-600 flex-1">
                    {info.description}
                  </p>

                  {/* Status */}
                  <div className="flex items-center gap-4 md:w-48 shrink-0 justify-end">
                    {status.status === 'completed' ? (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-small">
                        <span>✓</span> Complete
                      </span>
                    ) : status.status === 'in-progress' ? (
                      <div className="text-right">
                        <span className="text-small text-stone-600">
                          {status.questionsAnswered} / {status.totalQuestions}
                        </span>
                        <div className="w-24 h-1.5 bg-stone-200 rounded-full mt-1">
                          <div 
                            className="h-full bg-wheat-500 rounded-full"
                            style={{ width: `${status.percentComplete}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-small text-stone-400">
                        Not started
                      </span>
                    )}

                    <span className="text-stone-400">→</span>
                  </div>
                </div>
              </Link>

              {isNext && (
                <p className="text-small text-sage-600 mt-2 ml-4">
                  ↑ Continue here
                </p>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Report section */}
      {allComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card bg-sage-50 border-sage-200"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-subheading text-stone-800 mb-2">
                {hasReport ? 'Your Report is Ready' : 'Generate Your Report'}
              </h2>
              <p className="text-body text-stone-600">
                {hasReport 
                  ? 'View your personalized discernment synthesis, or generate a fresh report with your latest responses.'
                  : 'All assessments complete. Generate your personalized discernment synthesis.'}
              </p>
            </div>
            <Link href="/report" className="btn-primary shrink-0">
              {hasReport ? 'View Report' : 'Generate Report'}
            </Link>
          </div>
        </motion.div>
      )}

      {/* Guidance note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 p-6 bg-stone-100/50 rounded-gentle text-center"
      >
        <p className="text-small text-stone-500 max-w-xl mx-auto">
          Remember: This assessment is a discernment aid, not a prophecy. 
          Your report will invite reflection and conversation — it will not 
          tell you what to do. Take your time, answer honestly, and hold 
          the results prayerfully.
        </p>
      </motion.div>
    </div>
  )
}
