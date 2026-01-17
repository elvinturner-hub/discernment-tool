export { strengthsAssessment, strengthDomains } from './strengths'
export { giftsAssessment, spiritualGifts } from './gifts'
export { vocationalAssessment, vocationalDomains } from './vocational'
export { freetextAssessment } from './freetext'

import { strengthsAssessment } from './strengths'
import { giftsAssessment } from './gifts'
import { vocationalAssessment } from './vocational'
import { freetextAssessment } from './freetext'
import { AssessmentModule } from '@/lib/types'

export const assessments = {
  strengths: strengthsAssessment,
  gifts: giftsAssessment,
  vocational: vocationalAssessment,
  freetext: freetextAssessment,
} as const

export const assessmentOrder: AssessmentModule[] = [
  'strengths',
  'gifts',
  'vocational',
  'freetext',
]

export const moduleInfo = {
  strengths: {
    title: 'Created Strengths',
    description: 'Understand your natural wiring and energy patterns',
    estimatedTime: '15-20 minutes',
    icon: '🌱',
  },
  gifts: {
    title: 'Spirit-Given Gifts',
    description: 'Discern evidence of spiritual gifts at work',
    estimatedTime: '10-15 minutes',
    icon: '✨',
  },
  vocational: {
    title: 'Vocational Direction',
    description: 'Notice which kinds of futures draw you',
    estimatedTime: '8-12 minutes',
    icon: '🧭',
  },
  freetext: {
    title: 'Additional Reflections',
    description: 'Share what structure cannot capture',
    estimatedTime: '10-15 minutes',
    icon: '📝',
  },
} as const
