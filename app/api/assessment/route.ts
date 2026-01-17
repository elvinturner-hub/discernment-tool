import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ObjectId } from 'mongodb'
import { authOptions } from '@/lib/auth'
import { getDatabase, COLLECTIONS } from '@/lib/mongodb'
import { AssessmentModule, AssessmentAnswer } from '@/lib/types'

type AssessmentDoc = {
  userId: string
  module: string
  answers: AssessmentAnswer[]
  currentQuestionIndex: number
  updatedAt: Date
  createdAt?: Date
}

// GET - Load assessment progress
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const module = searchParams.get('module') as AssessmentModule | null

    const db = await getDatabase()
    const userId = new ObjectId((session.user as any).id)

    if (module) {
      // Get progress for specific module
      const progress = await db.collection(COLLECTIONS.PROGRESS).findOne({
        userId,
        module,
      })
      return NextResponse.json({ progress })
    } else {
      // Get progress for all modules
      const allProgress = await db.collection(COLLECTIONS.PROGRESS)
        .find({ userId })
        .toArray()
      return NextResponse.json({ progress: allProgress })
    }
  } catch (error) {
    console.error('Error loading assessment progress:', error)
    return NextResponse.json(
      { error: 'Failed to load progress' },
      { status: 500 }
    )
  }
}

// POST - Save assessment progress
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { module, answers, currentQuestionIndex, completed } = await request.json()

    if (!module) {
      return NextResponse.json(
        { error: 'Module is required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const userId = new ObjectId((session.user as any).id)

    const updateData: any = {
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

    const result = await db.collection(COLLECTIONS.PROGRESS).updateOne(
      { userId, module },
      { 
        $set: updateData,
        $setOnInsert: { startedAt: new Date() }
      },
      { upsert: true }
    )

    return NextResponse.json({ 
      success: true,
      upserted: result.upsertedCount > 0,
      modified: result.modifiedCount > 0,
    })
  } catch (error) {
    console.error('Error saving assessment progress:', error)
    return NextResponse.json(
      { error: 'Failed to save progress' },
      { status: 500 }
    )
  }
}

// PATCH - Update single answer (for auto-save)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { module, questionId, value, currentQuestionIndex } = await request.json()

    if (!module || !questionId) {
      return NextResponse.json(
        { error: 'Module and questionId are required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const userId = new ObjectId((session.user as any).id)

    const answer: AssessmentAnswer = {
      questionId,
      value,
      answeredAt: new Date(),
    }

    // First, try to update existing answer
    const updateResult = await db.collection(COLLECTIONS.PROGRESS).updateOne(
      { 
        userId, 
        module,
        'answers.questionId': questionId 
      },
      { 
        $set: { 
          'answers.$.value': value,
          'answers.$.answeredAt': new Date(),
          currentQuestionIndex,
          updatedAt: new Date(),
        }
      }
    )

    // If no existing answer found, add new one
    if (updateResult.matchedCount === 0) {
      await db.collection<AssessmentDoc>(COLLECTIONS.PROGRESS).updateOne(
        { userId, module },
        { 
          $push: { answers: answer },
          $set: { 
            currentQuestionIndex,
            updatedAt: new Date(),
          },
          $setOnInsert: { 
            startedAt: new Date(),
            completed: false,
          }
        },
        { upsert: true }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating answer:', error)
    return NextResponse.json(
      { error: 'Failed to save answer' },
      { status: 500 }
    )
  }
}
