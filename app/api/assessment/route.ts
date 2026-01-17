// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ObjectId } from 'mongodb'
import Anthropic from '@anthropic-ai/sdk'
import { authOptions } from '@/lib/auth'
import { getDatabase, COLLECTIONS } from '@/lib/mongodb'
import { StrengthDomain, SpiritualGift, VocationalDomain } from '@/lib/types'
import { strengthDomains } from '@/data/strengths'
import { spiritualGifts } from '@/data/gifts'
import { vocationalDomains } from '@/data/vocational'
import { SYSTEM_PROMPT, buildSynthesisPrompt, buildThemeExtractionPrompt } from '@/data/prompts'

const anthropic = new Anthropic()

function processStrengths(progress: any): any {
  const scores: Record<string, number[]> = {}
  strengthDomains.forEach(d => { scores[d.id] = [] })
  const prefixToDomain: Record<string, string> = {
    'sp': 'strategic-patterning', 'ad': 'analytical-discernment', 'vi': 'vision-imagination',
    'ed': 'execution-drive', 'ro': 'responsibility-orientation', 'sr': 'stability-reliability',
    'ap': 'adaptability', 'lv': 'learning-velocity', 'ra': 'relational-attunement',
    'ip': 'influence-persuasion', 'ci': 'courage-initiative', 'hm': 'harmony-mediation',
    'pe': 'precision-excellence', 'ss': 'systems-stewardship',
  }
  progress.answers.forEach((answer: any) => {
    const prefix = answer.questionId.split('-')[0]
    const domain = prefixToDomain[prefix]
    if (domain) {
      let score = 0
      const val = answer.value
      if (typeof val === 'number') { score = val }
      else if (typeof val === 'string') {
        if (val === prefix || val === `${prefix}-high`) { score = 5 }
        else if (val === `${prefix}-med`) { score = 4 }
        else if (val === `${prefix}-low`) { score = 2 }
        else if (val === `${prefix}-none` || val === 'other') { score = 1 }
        else if (val.startsWith('other-')) { score = 2 }
      }
      scores[domain].push(score)
    }
  })
  const rawScores: Record<string, number> = {}
  strengthDomains.forEach(d => {
    const domainScores = scores[d.id]
    rawScores[d.id] = domainScores.length > 0 ? domainScores.reduce((a, b) => a + b, 0) / domainScores.length : 0
  })
  const sorted = Object.entries(rawScores).sort(([, a], [, b]) => b - a).map(([domain, score]) => ({
    domain: domain as StrengthDomain,
    score: Math.round(score * 10) / 10,
    energy: (score >= 4 ? 'high' : score >= 2.5 ? 'moderate' : 'low') as 'high' | 'moderate' | 'low',
  }))
  return { topStrengths: sorted.slice(0, 5), secondaryStrengths: sorted.slice(5, 10), costlyZones: sorted.slice(-3).reverse(), rawScores }
}

function processGifts(progress: any): any {
  const scores: Record<string, number[]> = {}
  spiritualGifts.forEach(g => { scores[g.id] = [] })
  const prefixToGift: Record<string, string> = {
    'wis': 'wisdom', 'kno': 'knowledge', 'fai': 'faith', 'hea': 'healing', 'mir': 'miracles',
    'pro': 'prophecy', 'dis': 'discernment-of-spirits', 'ton': 'tongues', 'int': 'interpretation-of-tongues',
    'tea': 'teaching', 'she': 'shepherding', 'apo': 'apostolic', 'eva': 'evangelism',
    'ser': 'service', 'enc': 'encouragement', 'giv': 'giving',
  }
  progress.answers.forEach((answer: any) => {
    const prefix = answer.questionId.split('-')[0]
    const gift = prefixToGift[prefix]
    if (gift) {
      let score = 0
      const val = answer.value
      if (typeof val === 'number') { score = val }
      else if (typeof val === 'string') {
        if (val === 'high') score = 5
        else if (val === 'med') score = 3.5
        else if (val === 'low') score = 2
        else if (val === 'none') score = 1
      }
      scores[gift].push(score)
    }
  })
  const rawScores: Record<string, number> = {}
  spiritualGifts.forEach(g => {
    const giftScores = scores[g.id]
    rawScores[g.id] = giftScores.length > 0 ? giftScores.reduce((a, b) => a + b, 0) / giftScores.length : 0
  })
  const sorted = Object.entries(rawScores).filter(([, score]) => score >= 2.5).sort(([, a], [, b]) => b - a).map(([gift, score]) => ({
    gift: gift as SpiritualGift,
    evidenceStrength: (score >= 4 ? 'strong' : score >= 3 ? 'moderate' : 'emerging') as 'strong' | 'moderate' | 'emerging',
    patterns: [],
  }))
  return {
    primaryGifts: sorted.filter(g => g.evidenceStrength === 'strong' || g.evidenceStrength === 'moderate').slice(0, 4),
    emergingGifts: sorted.filter(g => g.evidenceStrength === 'emerging').slice(0, 3),
    rawScores,
  }
}

function processVocational(progress: any): any {
  const scores: Record<string, number[]> = {}
  const costScores: Record<string, number[]> = {}
  vocationalDomains.forEach(d => { scores[d.id] = []; costScores[d.id] = [] })
  const prefixToDomain: Record<string, string> = {
    'fd': 'formation-discipleship', 'ls': 'leadership-stewardship', 'jm': 'justice-mercy',
    'cc': 'cultural-creation', 'pm': 'pioneering-mission',
  }
  progress.answers.forEach((answer: any) => {
    const prefix = answer.questionId.split('-')[0]
    const domain = prefixToDomain[prefix]
    const questionNum = parseInt(answer.questionId.split('-')[1])
    if (domain) {
      let score = 0
      const val = answer.value
      if (typeof val === 'number') { score = val }
      else if (typeof val === 'string') {
        if (val === `${prefix}-high` || val === prefix) { score = 5 }
        else if (val.startsWith('other-')) {
          const otherPrefix = val.replace('other-', '')
          const otherDomain = prefixToDomain[otherPrefix]
          if (otherDomain) { scores[otherDomain].push(4) }
          score = 2
        } else if (val === 'other') { score = 2 }
      }
      if (questionNum === 3) { costScores[domain].push(score) }
      else { scores[domain].push(score) }
    }
  })
  const rawScores: Record<string, number> = {}
  vocationalDomains.forEach(d => {
    const domainScores = scores[d.id]
    rawScores[d.id] = domainScores.length > 0 ? domainScores.reduce((a, b) => a + b, 0) / domainScores.length : 0
  })
  const sorted = Object.entries(rawScores).sort(([, a], [, b]) => b - a).map(([domain, score]) => {
    const domainCosts = costScores[domain]
    const avgCost = domainCosts.length > 0 ? domainCosts.reduce((a, b) => a + b, 0) / domainCosts.length : 3
    return {
      domain: domain as VocationalDomain,
      pull: (score >= 4 ? 'strong' : score >= 3 ? 'moderate' : 'holding') as 'strong' | 'moderate' | 'holding',
      costTolerance: (avgCost >= 4 ? 'high' : avgCost >= 2.5 ? 'moderate' : 'uncertain') as 'high' | 'moderate' | 'uncertain',
    }
  })
  return {
    primaryGravity: sorted[0],
    secondaryDirections: sorted.slice(1, 3).filter(d => d.pull !== 'holding'),
    prayerfulHolds: sorted.filter(d => d.pull === 'holding'),
    rawScores,
  }
}

function processFreetext(progress: any): any {
  const result = { passions: '', feedback: '', dreams: '', threads: '', extractedThemes: [] as string[] }
  progress.answers.forEach((answer: any) => {
    const val = answer.value as string
    if (answer.questionId === 'ft-passions') result.passions = val
    else if (answer.questionId === 'ft-feedback') result.feedback = val
    else if (answer.questionId === 'ft-dreams') result.dreams = val
    else if (answer.questionId === 'ft-threads') result.threads = val
  })
  return result
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const db = await getDatabase()
    const userId = new ObjectId((session.user as any).id)
    const report = await db.collection(COLLECTIONS.REPORTS).findOne({ userId } as any, { sort: { generatedAt: -1 } })
    return NextResponse.json({ report })
  } catch (error) {
    console.error('Error loading report:', error)
    return NextResponse.json({ error: 'Failed to load report' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const db = await getDatabase()
    const userId = new ObjectId((session.user as any).id)
    const allProgress = await db.collection(COLLECTIONS.PROGRESS).find({ userId, completed: true } as any).toArray()
    const modules = allProgress.map(p => p.module)
    const requiredModules = ['strengths', 'gifts', 'vocational', 'freetext']
    const missingModules = requiredModules.filter(m => !modules.includes(m))
    if (missingModules.length > 0) {
      return NextResponse.json({ error: `Please complete all assessments first. Missing: ${missingModules.join(', ')}` }, { status: 400 })
    }
    const strengthsProgress = allProgress.find(p => p.module === 'strengths')
    const giftsProgress = allProgress.find(p => p.module === 'gifts')
    const vocationalProgress = allProgress.find(p => p.module === 'vocational')
    const freetextProgress = allProgress.find(p => p.module === 'freetext')
    const strengths = processStrengths(strengthsProgress)
    const gifts = processGifts(giftsProgress)
    const vocational = processVocational(vocationalProgress)
    const freetext = processFreetext(freetextProgress)
    if (freetext.passions || freetext.feedback || freetext.dreams || freetext.threads) {
      try {
        const themeResponse = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514', max_tokens: 500,
          messages: [{ role: 'user', content: buildThemeExtractionPrompt(freetext) }]
        })
        const themeText = themeResponse.content[0].type === 'text' ? themeResponse.content[0].text : ''
        try { freetext.extractedThemes = JSON.parse(themeText) } catch { freetext.extractedThemes = [] }
      } catch (error) { console.error('Theme extraction error:', error); freetext.extractedThemes = [] }
    }
    const synthesisPrompt = buildSynthesisPrompt(strengths, gifts, vocational, freetext, session.user.name || 'Friend')
    const synthesisResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', max_tokens: 4000, system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: synthesisPrompt }]
    })
    const reportContent = synthesisResponse.content[0].type === 'text' ? synthesisResponse.content[0].text : ''
    const report = {
      userId, generatedAt: new Date(),
      moduleData: { strengths, gifts, vocational, freetext },
      synthesis: { alignment: '', tension: '', shadow: '', nextSteps: '', discernmentQuestion: '' },
      content: reportContent,
    }
    await db.collection(COLLECTIONS.REPORTS).insertOne(report as any)
    return NextResponse.json({ success: true, report })
  } catch (error) {
    console.error('Error generating report:', error)
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 })
  }
}
