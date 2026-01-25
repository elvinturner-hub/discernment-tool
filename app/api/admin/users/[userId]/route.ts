import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ObjectId } from 'mongodb'
import { authOptions } from '@/lib/auth'
import { getDatabase, COLLECTIONS } from '@/lib/mongodb'

// Admin emails - CHANGE THIS TO YOUR EMAIL
const ADMIN_EMAILS = [
  'elvin.turner@googlemail.com',
]

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId } = params

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }

    const db = await getDatabase()
    const userObjectId = new ObjectId(userId)

    const user = await db.collection(COLLECTIONS.USERS).findOne(
      { _id: userObjectId },
      { projection: { password: 0 } }
    )

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    let progress = await db.collection('assessment_progress')
      .find({ userId: userObjectId })
      .toArray()

    if (progress.length === 0) {
      progress = await db.collection(COLLECTIONS.PROGRESS)
        .find({ userId: userObjectId })
        .toArray()
    }

    const report = await db.collection(COLLECTIONS.REPORTS)
      .findOne(
        { userId: userObjectId },
        { sort: { generatedAt: -1 } }
      )

    return NextResponse.json({
      user,
      progress,
      report,
    })
  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    )
  }
}
