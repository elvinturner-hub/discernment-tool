import { MongoClient, Db } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 60000, // Increased from 30s to 60s
  socketTimeoutMS: 60000,
  connectTimeoutMS: 60000,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production, create a new connection
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const client = await clientPromise
  const db = client.db()
  return { client, db }
}

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db()
}

export const COLLECTIONS = {
  USERS: 'users',
  ASSESSMENTS: 'assessments',
  PROGRESS: 'progress',
  REPORTS: 'reports',
} as const

export default clientPromise
