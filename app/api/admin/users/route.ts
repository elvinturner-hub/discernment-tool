import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDatabase, COLLECTIONS } from '@/lib/mongodb'

// Admin emails - CHANGE THIS TO YOUR EMAIL
const ADMIN_EMAILS = [
  'elvin.turner@googlemail.com',
]

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await getDatabase()
    
    const users = await db.collection(COLLECTIONS.USERS)
      .find({})
      .project({ password: 0 })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
