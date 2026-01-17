'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="border-b border-stone-200 bg-white/60 backdrop-blur-md sticky top-0 z-50">
      <div className="container-wide py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl">🌿</span>
          <span className="font-serif text-xl text-stone-800">Discernment</span>
        </Link>

        {session?.user && (
          <nav className="flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className="text-small text-stone-600 hover:text-stone-800 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/report" 
              className="text-small text-stone-600 hover:text-stone-800 transition-colors"
            >
              Report
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-small text-stone-500 hover:text-stone-700 transition-colors"
            >
              Sign out
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
