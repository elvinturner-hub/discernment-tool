'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { QuestionCard } from '@/components/QuestionCard'
import { assessments, moduleInfo, assessmentOrder } from '@/data'
import { AssessmentModule, AssessmentAnswer, Question } from '@/lib/types'
import Link from 'next/link'

export default function AssessmentPage() {
  const router = useRouter()
  const params = useParams()
  const module = params.module as AssessmentModule

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Map<string, any>>(new Map())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [completed, setCompleted] = useState(false)

  const assessment = assessments[module]
  const info = moduleInfo[module]
  const questions = assessment?.questions || []
  const totalQuestions = questions.length
  const currentQuestion = questions[currentIndex]

  // Load existing progress
  useEffect(() => {
    if (!assessment) {
      router.push('/dashboard')
      return
    }
    loadProgress()
  }, [module])

  async function loadProgress() {
    try {
      const response = await fetch(`/api/assessment?module=${module}`)
      const data = await response.json()
      
      if (data.progress) {
        const answerMap = new Map<string, any>()
        data.progress.answers?.forEach((a: AssessmentAnswer) => {
          answerMap.set(a.questionId, a.value)
        })
        setAnswers(answerMap)
        
        if (data.progress.completed) {
          setCompleted(true)
          setShowIntro(false)
        } else if (data.progress.answers?.length > 0) {
          setCurrentIndex(data.progress.currentQuestionIndex || 0)
          setShowIntro(false)
        }
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setLoading(false)
    }
  }

  // Auto-save answer
  const saveAnswer = useCallback(async (questionId: string, value: any, questionIndex: number) => {
    setSaving(true)
    try {
      await fetch('/api/assessment', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module,
          questionId,
          value,
          currentQuestionIndex: questionIndex,
        }),
      })
    } catch (error) {
      console.error('Error saving answer:', error)
    } finally {
      setSaving(false)
    }
  }, [module])

  // Handle answer change
  const handleAnswer = (value: any) => {
    const questionId = currentQuestion.id
    setAnswers(prev => {
      const next = new Map(prev)
      next.set(questionId, value)
      return next
    })
    saveAnswer(questionId, value, currentIndex)
  }

  // Navigation
  const canGoNext = answers.has(currentQuestion?.id)
  const canGoPrev = currentIndex > 0
  const isLastQuestion = currentIndex === totalQuestions - 1

  const goNext = async () => {
    if (isLastQuestion) {
      // Complete the assessment
      setSaving(true)
      try {
        const answersArray = Array.from(answers.entries()).map(([questionId, value]) => ({
          questionId,
          value,
          answeredAt: new Date(),
        }))

        await fetch('/api/assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            module,
            answers: answersArray,
            currentQuestionIndex: currentIndex,
            completed: true,
          }),
        })

        setCompleted(true)
      } catch (error) {
        console.error('Error completing assessment:', error)
      } finally {
        setSaving(false)
      }
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const goPrev = () => {
    if (canGoPrev) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  // Get next module
  const getNextModule = (): AssessmentModule | null => {
    const currentModuleIndex = assessmentOrder.indexOf(module)
    if (currentModuleIndex < assessmentOrder.length - 1) {
      return assessmentOrder[currentModuleIndex + 1]
    }
    return null
  }

  if (loading) {
    return (
      <div className="container-narrow py-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-sage-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-stone-500">Loading assessment...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!assessment) {
    return null
  }

  // Completion screen
  if (completed) {
    const nextModule = getNextModule()
    const nextInfo = nextModule ? moduleInfo[nextModule] : null

    return (
      <div className="container-narrow py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card text-center"
        >
          <div className="text-5xl mb-6">{info.icon}</div>
          <h1 className="font-serif text-heading text-stone-800 mb-4">
            {info.title} Complete
          </h1>
          <p className="text-body text-stone-600 mb-8 max-w-md mx-auto">
            Your responses have been saved. Thank you for taking the time to reflect carefully.
          </p>

          {nextModule ? (
            <div className="space-y-4">
              <p className="text-small text-stone-500">
                Ready for the next section?
              </p>
              <Link href={`/assessment/${nextModule}`} className="btn-primary">
                Continue to {nextInfo?.title}
              </Link>
              <p className="text-small text-stone-400">
                or{' '}
                <Link href="/dashboard" className="link">
                  return to dashboard
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-body text-sage-700 font-medium">
                All assessments complete!
              </p>
              <Link href="/report" className="btn-primary">
                Generate Your Report
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    )
  }

  // Introduction screen
  if (showIntro) {
    return (
      <div className="container-narrow py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="text-center mb-8">
            <span className="text-5xl mb-4 block">{info.icon}</span>
            <h1 className="font-serif text-heading text-stone-800 mb-2">
              {assessment.title}
            </h1>
            <p className="text-body text-stone-600">
              {assessment.description}
            </p>
          </div>

          <div className="divider" />

          <div className="prose prose-stone max-w-none">
            <h2 className="font-serif text-lg text-stone-800 mb-4">Before You Begin</h2>
            <div className="text-body text-stone-600 whitespace-pre-line">
              {assessment.instructions}
            </div>
          </div>

          <div className="divider" />

          <div className="flex items-center justify-between">
            <p className="text-small text-stone-500">
              {totalQuestions} questions • {info.estimatedTime}
            </p>
            <button
              onClick={() => setShowIntro(false)}
              className="btn-primary"
            >
              Begin Assessment
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Question screen
  return (
    <div className="container-narrow py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/dashboard" 
          className="text-small text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-2"
        >
          ← Dashboard
        </Link>
        <div className="flex items-center gap-3">
          {saving && (
            <span className="text-small text-sage-600 flex items-center gap-2">
              <div className="w-3 h-3 border border-sage-500 border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          )}
          <span className="text-small text-stone-500">
            {info.icon} {info.title}
          </span>
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          value={answers.get(currentQuestion.id)}
          onChange={handleAnswer}
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
        />
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 max-w-2xl mx-auto">
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <button
          onClick={goNext}
          disabled={!canGoNext}
          className={`${isLastQuestion ? 'btn-primary' : 'btn-secondary'} disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          {isLastQuestion ? 'Complete Section' : 'Next →'}
        </button>
      </div>

      {/* Skip hint */}
      {!canGoNext && (
        <p className="text-center text-small text-stone-400 mt-4">
          Please select an answer to continue
        </p>
      )}
    </div>
  )
}
