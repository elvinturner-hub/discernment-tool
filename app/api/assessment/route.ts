// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ObjectId } from 'mongodb'
import { authOptions } from '@/lib/auth'
import { getDatabase, COLLECTIONS } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { searchParams } = new URL(request.url)
    const module = searchParams.get('module')
    const db = await getDatabase()
    const userId = new ObjectId(session.user.id)
    if (module) {
      const progress = await db.collection(COLLECTIONS.PROGRESS).findOne({ userId, module })
      return NextResponse.json({ progress })
    } else {
      const allProgress = await db.collection(COLLECTIONS.PROGRESS).find({ userId }).toArray()
      return NextResponse.json({ progress: allProgress })
    }
  } catch (error) {
    console.error('Error loading assessment progress:', error)
    return NextResponse.json({ error: 'Failed to load progress' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const body = await request.json()
    const { module, answers, currentQuestionIndex, completed } = body
    if (!module) {
      return NextResponse.json({ error: 'Module is required' }, { status: 400 })
    }
    const db = await getDatabase()
    const userId = new ObjectId(session.user.id)
    const updateData = {
      userId,
      module,
      answers: answers || [],
      currentQuestionIndex: currentQuestionIndex || 0,
      completed: completed || false,
      updatedAt: new Date(),
    }
    if (completed) {
      updateData.completedAt = new Date()
    }
    await db.collection(COLLECTIONS.PROGRESS).updateOne(
      { userId, module },
      { $set: updateData, $setOnInsert: { startedAt: new Date() } },
      { upsert: true }
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving assessment progress:', error)
    return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const body = await request.json()
    const { module, questionId, value, currentQuestionIndex } = body
    if (!module || !questionId) {
      return NextResponse.json({ error: 'Module and questionId are required' }, { status: 400 })
    }
    const db = await getDatabase()
    const userId = new ObjectId(session.user.id)
    const answer = { questionId, value, answeredAt: new Date() }
    
    const existingProgress = await db.collection(COLLECTIONS.PROGRESS).findOne({ userId, module })
    
    if (existingProgress) {
      const answers = existingProgress.answers || []
      const existingIndex = answers.findIndex((a: any) => a.questionId === questionId)
      if (existingIndex >= 0) {
        answers[existingIndex] = answer
      } else {
        answers.push(answer)
      }
      await db.collection(COLLECTIONS.PROGRESS).updateOne(
        { userId, module },
        { $set: { answers, currentQuestionIndex, updatedAt: new Date() } }
      )
    } else {
      await db.collection(COLLECTIONS.PROGRESS).insertOne({
        userId,
        module,
        answers: [answer],
        currentQuestionIndex,
        completed: false,
        startedAt: new Date(),
        updatedAt: new Date(),
      })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating answer:', error)
    return NextResponse.json({ error: 'Failed to save answer' }, { status: 500 })
  }
}
