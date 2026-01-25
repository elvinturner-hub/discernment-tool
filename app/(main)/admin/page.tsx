'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface User {
  _id: string
  email: string
  name: string
  createdAt: string
}

interface Answer {
  questionId: string
  value: any
  answeredAt: string
}

interface Progress {
  _id: string
  module: string
  answers: Answer[]
  completed: boolean
  completedAt?: string
}

interface Report {
  _id: string
  generatedAt: string
  content: string
  moduleData: any
}

interface UserData {
  user: User
  progress: Progress[]
  report: Report | null
}

// Admin emails that can access this page - CHANGE THIS TO YOUR EMAIL
const ADMIN_EMAILS = [
  'elvin.turner@googlemail.com',
]

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingUser, setLoadingUser] = useState(false)
  const [error, setError] = useState('')

  const isAdmin = session?.user?.email && ADMIN_EMAILS.includes(session.user.email)

  useEffect(() => {
    if (isAdmin) {
      fetchUsers()
    } else {
      setLoading(false)
    }
  }, [isAdmin])

  async function fetchUsers() {
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      if (res.ok) {
        setUsers(data.users)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  async function fetchUserData(userId: string) {
    setLoadingUser(true)
    setUserData(null)
    try {
      const res = await fetch(`/api/admin/users/${userId}`)
      const data = await res.json()
      if (res.ok) {
        setUserData(data)
        setSelectedUser(userId)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to load user data')
    } finally {
      setLoadingUser(false)
    }
  }

  function exportToJSON() {
    if (!userData) return
    const dataStr = JSON.stringify(userData, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${userData.user.email.replace('@', '_at_')}_export.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function exportToText() {
    if (!userData) return
    
    let text = `DISCERNMENT ASSESSMENT EXPORT\n`
    text += `=============================\n\n`
    text += `User: ${userData.user.name}\n`
    text += `Email: ${userData.user.email}\n`
    text += `Account Created: ${new Date(userData.user.createdAt).toLocaleDateString()}\n\n`

    userData.progress.forEach(prog => {
      text += `\n${'='.repeat(50)}\n`
      text += `MODULE: ${prog.module.toUpperCase()}\n`
      text += `${'='.repeat(50)}\n`
      text += `Completed: ${prog.completed ? 'Yes' : 'No'}\n`
      if (prog.completedAt) {
        text += `Completed At: ${new Date(prog.completedAt).toLocaleDateString()}\n`
      }
      text += `\nAnswers:\n`
      text += `---------\n`
      prog.answers.forEach((answer, i) => {
        text += `${i + 1}. Question: ${answer.questionId}\n`
        text += `   Answer: ${JSON.stringify(answer.value)}\n`
        text += `   Answered: ${new Date(answer.answeredAt).toLocaleString()}\n\n`
      })
    })

    if (userData.report) {
      text += `\n${'='.repeat(50)}\n`
      text += `GENERATED REPORT\n`
      text += `${'='.repeat(50)}\n`
      text += `Generated: ${new Date(userData.report.generatedAt).toLocaleDateString()}\n\n`
      text += userData.report.content
    }

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${userData.user.email.replace('@', '_at_')}_export.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-stone-500">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-800 mb-4">Admin Access Required</h1>
          <Link href="/login" className="text-stone-600 hover:text-stone-800 underline">
            Sign in
          </Link>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Access Denied</h1>
          <p className="text-stone-500 mb-4">You don't have admin permissions.</p>
          <Link href="/dashboard" className="text-stone-600 hover:text-stone-800 underline">
            Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔐</span>
            <h1 className="text-xl font-bold text-stone-800">Admin Dashboard</h1>
          </div>
          <Link href="/dashboard" className="text-stone-500 hover:text-stone-700 text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h2 className="text-lg font-bold text-stone-800 mb-4">Users ({users.length})</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {users.map(user => (
                  <button
                    key={user._id}
                    onClick={() => fetchUserData(user._id)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      selectedUser === user._id
                        ? 'bg-stone-800 text-white'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <div className="font-medium truncate">{user.name}</div>
                    <div className={`text-sm truncate ${
                      selectedUser === user._id ? 'text-stone-300' : 'text-stone-500'
                    }`}>
                      {user.email}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {loadingUser ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                <div className="text-stone-500">Loading user data...</div>
              </div>
            ) : userData ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl border border-stone-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-stone-800">{userData.user.name}</h2>
                      <p className="text-stone-500">{userData.user.email}</p>
                      <p className="text-stone-400 text-sm">
                        Joined: {new Date(userData.user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={exportToJSON}
                        className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        Export JSON
                      </button>
                      <button
                        onClick={exportToText}
                        className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Export Text
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {['strengths', 'gifts', 'vocational', 'freetext'].map(module => {
                      const prog = userData.progress.find(p => p.module === module)
                      return (
                        <div
                          key={module}
                          className={`p-3 rounded-xl text-center ${
                            prog?.completed
                              ? 'bg-emerald-50 border border-emerald-200'
                              : prog
                              ? 'bg-amber-50 border border-amber-200'
                              : 'bg-stone-50 border border-stone-200'
                          }`}
                        >
                          <div className="text-xs font-medium text-stone-500 uppercase mb-1">
                            {module}
                          </div>
                          <div className={`text-sm font-bold ${
                            prog?.completed
                              ? 'text-emerald-600'
                              : prog
                              ? 'text-amber-600'
                              : 'text-stone-400'
                          }`}>
                            {prog?.completed ? '✓ Done' : prog ? 'In Progress' : 'Not Started'}
                          </div>
                          {prog && (
                            <div className="text-xs text-stone-400 mt-1">
                              {prog.answers.length} answers
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {userData.progress.map(prog => (
                  <div key={prog._id} className="bg-white rounded-2xl border border-stone-200 p-6">
                    <h3 className="text-lg font-bold text-stone-800 mb-4 capitalize flex items-center gap-2">
                      {prog.module === 'strengths' && '🌱'}
                      {prog.module === 'gifts' && '✨'}
                      {prog.module === 'vocational' && '🧭'}
                      {prog.module === 'freetext' && '💬'}
                      {prog.module} Assessment
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        prog.completed
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {prog.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </h3>
                    
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {prog.answers.map((answer, i) => (
                        <div key={i} className="bg-stone-50 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-mono text-stone-500">
                              {answer.questionId}
                            </span>
                            <span className="text-xs text-stone-400">
                              {new Date(answer.answeredAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="mt-1 text-stone-800">
                            {typeof answer.value === 'object'
                              ? JSON.stringify(answer.value)
                              : String(answer.value)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {userData.report ? (
                  <div className="bg-white rounded-2xl border border-stone-200 p-6">
                    <h3 className="text-lg font-bold text-stone-800 mb-2 flex items-center gap-2">
                      📜 Generated Report
                    </h3>
                    <p className="text-sm text-stone-400 mb-4">
                      Generated: {new Date(userData.report.generatedAt).toLocaleString()}
                    </p>
                    <div className="bg-stone-50 rounded-xl p-4 max-h-96 overflow-y-auto">
                      <div className="prose prose-stone prose-sm max-w-none whitespace-pre-wrap">
                        {userData.report.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-stone-100 rounded-2xl p-6 text-center text-stone-500">
                    No report generated yet
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                <div className="text-5xl mb-4">👈</div>
                <p className="text-stone-500">Select a user to view their data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
