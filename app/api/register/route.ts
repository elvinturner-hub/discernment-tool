import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { getDatabase, COLLECTIONS } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    // Check if user already exists
    const existingUser = await db.collection(COLLECTIONS.USERS).findOne({
      email: email.toLowerCase(),
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password and create user
    const hashedPassword = await hash(password, 12)
    
    const result = await db.collection(COLLECTIONS.USERS).insertOne({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      { 
        message: 'Account created successfully',
        userId: result.insertedId.toString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
