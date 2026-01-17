'use client'

import { motion } from 'framer-motion'
import { Question } from '@/lib/types'

interface QuestionCardProps {
  question: Question
  value: string | number | string[] | undefined
  onChange: (value: string | number | string[]) => void
  questionNumber: number
  totalQuestions: number
}

export function QuestionCard({ 
  question, 
  value, 
  onChange, 
  questionNumber, 
  totalQuestions 
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="card max-w-2xl mx-auto"
    >
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-6 text-small text-stone-500">
        <span>Question {questionNumber} of {totalQuestions}</span>
        <div className="flex gap-1">
          {Array.from({ length: Math.min(totalQuestions, 20) }).map((_, i) => {
            const isGrouped = totalQuestions > 20
            const groupIndex = isGrouped ? Math.floor((questionNumber - 1) / (totalQuestions / 20)) : questionNumber - 1
            const dotIndex = isGrouped ? Math.floor(i) : i
            return (
              <div
                key={i}
                className={`progress-step ${
                  dotIndex < (isGrouped ? groupIndex : questionNumber - 1)
                    ? 'completed'
                    : dotIndex === (isGrouped ? groupIndex : questionNumber - 1)
                    ? 'active'
                    : ''
                }`}
              />
            )
          })}
        </div>
      </div>

      {/* Question text */}
      <h2 className="font-serif text-subheading text-stone-800 mb-3 text-balance">
        {question.text}
      </h2>

      {/* Help text */}
      {question.helpText && (
        <p className="text-small text-stone-500 mb-6">
          {question.helpText}
        </p>
      )}

      {/* Scenario if present */}
      {question.type === 'scenario' && (
        <div className="bg-stone-100/50 rounded-soft p-4 mb-6 text-body text-stone-600 italic">
          {question.scenario}
        </div>
      )}

      {/* Question input based on type */}
      <div className="mt-6">
        {question.type === 'choice' && (
          <ChoiceInput
            options={question.options}
            value={value as string}
            onChange={onChange}
          />
        )}

        {question.type === 'scale' && (
          <ScaleInput
            min={question.min}
            max={question.max}
            minLabel={question.minLabel}
            maxLabel={question.maxLabel}
            value={value as number}
            onChange={onChange}
          />
        )}

        {question.type === 'scenario' && (
          <ChoiceInput
            options={question.options}
            value={value as string}
            onChange={onChange}
          />
        )}

        {question.type === 'forced-choice' && (
          <ForcedChoiceInput
            optionA={question.optionA}
            optionB={question.optionB}
            value={value as string}
            onChange={onChange}
          />
        )}

        {question.type === 'freetext' && (
          <FreetextInput
            placeholder={question.placeholder}
            maxLength={question.maxLength}
            value={value as string}
            onChange={onChange}
          />
        )}
      </div>
    </motion.div>
  )
}

// Choice Input Component
function ChoiceInput({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[]
  value: string | undefined
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`option-card w-full text-left ${
            value === option.value ? 'selected' : ''
          }`}
        >
          <span className="text-body text-stone-700">{option.label}</span>
        </button>
      ))}
    </div>
  )
}

// Scale Input Component
function ScaleInput({
  min,
  max,
  minLabel,
  maxLabel,
  value,
  onChange,
}: {
  min: number
  max: number
  minLabel: string
  maxLabel: string
  value: number | undefined
  onChange: (value: number) => void
}) {
  const range = Array.from({ length: max - min + 1 }, (_, i) => min + i)

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-small text-stone-500">
        <span className="max-w-[40%]">{minLabel}</span>
        <span className="max-w-[40%] text-right">{maxLabel}</span>
      </div>
      <div className="flex justify-center gap-3">
        {range.map((num) => (
          <button
            key={num}
            onClick={() => onChange(num)}
            className={`w-12 h-12 rounded-full border-2 font-medium transition-all duration-200 ${
              value === num
                ? 'bg-sage-500 border-sage-500 text-white'
                : 'bg-white border-stone-300 text-stone-600 hover:border-sage-400 hover:bg-sage-50'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}

// Forced Choice Input Component
function ForcedChoiceInput({
  optionA,
  optionB,
  value,
  onChange,
}: {
  optionA: { value: string; label: string }
  optionB: { value: string; label: string }
  value: string | undefined
  onChange: (value: string) => void
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <button
        onClick={() => onChange(optionA.value)}
        className={`option-card text-left h-full ${
          value === optionA.value ? 'selected' : ''
        }`}
      >
        <span className="text-body text-stone-700">{optionA.label}</span>
      </button>
      <button
        onClick={() => onChange(optionB.value)}
        className={`option-card text-left h-full ${
          value === optionB.value ? 'selected' : ''
        }`}
      >
        <span className="text-body text-stone-700">{optionB.label}</span>
      </button>
    </div>
  )
}

// Freetext Input Component
function FreetextInput({
  placeholder,
  maxLength,
  value,
  onChange,
}: {
  placeholder?: string
  maxLength?: number
  value: string | undefined
  onChange: (value: string) => void
}) {
  const charCount = value?.length || 0

  return (
    <div className="space-y-2">
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="textarea min-h-[200px]"
      />
      {maxLength && (
        <p className="text-small text-stone-400 text-right">
          {charCount} / {maxLength} characters
        </p>
      )}
    </div>
  )
}
