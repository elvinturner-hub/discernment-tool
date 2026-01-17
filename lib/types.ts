import { ObjectId } from 'mongodb'

// Assessment modules
export type AssessmentModule = 'strengths' | 'gifts' | 'vocational' | 'freetext'

// User
export interface User {
  _id?: ObjectId
  email: string
  password: string
  name: string
  createdAt: Date
  updatedAt: Date
}

// Assessment Progress
export interface AssessmentProgress {
  _id?: ObjectId
  userId: ObjectId
  module: AssessmentModule
  answers: AssessmentAnswer[]
  currentQuestionIndex: number
  completed: boolean
  completedAt?: Date
  startedAt: Date
  updatedAt: Date
}

export interface AssessmentAnswer {
  questionId: string
  value: string | number | string[]
  answeredAt: Date
}

// Report
export interface Report {
  _id?: ObjectId
  userId: ObjectId
  generatedAt: Date
  moduleData: {
    strengths: StrengthsResult
    gifts: GiftsResult
    vocational: VocationalResult
    freetext: FreetextResult
  }
  synthesis: SynthesisResult
  content: string // Full rendered report
}

// Strength domains
export type StrengthDomain =
  | 'strategic-patterning'
  | 'analytical-discernment'
  | 'vision-imagination'
  | 'execution-drive'
  | 'responsibility-orientation'
  | 'stability-reliability'
  | 'adaptability'
  | 'learning-velocity'
  | 'relational-attunement'
  | 'influence-persuasion'
  | 'courage-initiative'
  | 'harmony-mediation'
  | 'precision-excellence'
  | 'systems-stewardship'

export interface StrengthScore {
  domain: StrengthDomain
  score: number
  energy: 'high' | 'moderate' | 'low'
}

export interface StrengthsResult {
  topStrengths: StrengthScore[]
  secondaryStrengths: StrengthScore[]
  costlyZones: StrengthScore[]
  rawScores: Record<StrengthDomain, number>
}

// Spiritual gifts
export type SpiritualGift =
  | 'wisdom'
  | 'knowledge'
  | 'faith'
  | 'healing'
  | 'miracles'
  | 'prophecy'
  | 'discernment-of-spirits'
  | 'tongues'
  | 'interpretation-of-tongues'
  | 'teaching'
  | 'shepherding'
  | 'apostolic'
  | 'evangelism'
  | 'service'
  | 'encouragement'
  | 'giving'

export interface GiftIndicator {
  gift: SpiritualGift
  evidenceStrength: 'strong' | 'moderate' | 'emerging'
  patterns: string[]
}

export interface GiftsResult {
  primaryGifts: GiftIndicator[]
  emergingGifts: GiftIndicator[]
  rawScores: Record<SpiritualGift, number>
}

// Vocational domains
export type VocationalDomain =
  | 'formation-discipleship'
  | 'leadership-stewardship'
  | 'justice-mercy'
  | 'cultural-creation'
  | 'pioneering-mission'

export interface VocationalGravity {
  domain: VocationalDomain
  pull: 'strong' | 'moderate' | 'holding'
  costTolerance: 'high' | 'moderate' | 'uncertain'
}

export interface VocationalResult {
  primaryGravity: VocationalGravity
  secondaryDirections: VocationalGravity[]
  prayerfulHolds: VocationalGravity[]
  rawScores: Record<VocationalDomain, number>
}

// Free text
export interface FreetextResult {
  passions: string
  feedback: string
  dreams: string
  threads: string
  extractedThemes: string[]
}

// Synthesis
export interface SynthesisResult {
  alignment: string
  tension: string
  shadow: string
  nextSteps: string
  discernmentQuestion: string
}

// Question types
export interface BaseQuestion {
  id: string
  text: string
  helpText?: string
}

export interface ChoiceQuestion extends BaseQuestion {
  type: 'choice'
  options: { value: string; label: string }[]
}

export interface ScaleQuestion extends BaseQuestion {
  type: 'scale'
  minLabel: string
  maxLabel: string
  min: number
  max: number
}

export interface ScenarioQuestion extends BaseQuestion {
  type: 'scenario'
  scenario: string
  options: { value: string; label: string }[]
}

export interface ForcedChoiceQuestion extends BaseQuestion {
  type: 'forced-choice'
  optionA: { value: string; label: string }
  optionB: { value: string; label: string }
}

export interface FreetextQuestion extends BaseQuestion {
  type: 'freetext'
  placeholder?: string
  maxLength?: number
}

export type Question =
  | ChoiceQuestion
  | ScaleQuestion
  | ScenarioQuestion
  | ForcedChoiceQuestion
  | FreetextQuestion

// Assessment data
export interface AssessmentData {
  module: AssessmentModule
  title: string
  description: string
  instructions: string
  questions: Question[]
}

// Domain/Gift metadata
export interface StrengthDomainMeta {
  id: StrengthDomain
  name: string
  description: string
  highEnergyDesc: string
  lowEnergyDesc: string
}

export interface SpiritualGiftMeta {
  id: SpiritualGift
  name: string
  description: string
  scripture: string
  scriptureRef: string
}

export interface VocationalDomainMeta {
  id: VocationalDomain
  name: string
  description: string
  examples: string[]
  typicalCosts: string[]
}
