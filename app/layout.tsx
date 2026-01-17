import type { Metadata } from 'next'
import { SessionProvider } from '@/components/SessionProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Discernment | Strengths, Gifts & Vocational Direction',
  description: 'A discernment tool to help you understand your created wiring, recognise Spirit-given gifts, and move forward faithfully.',
  keywords: ['discernment', 'spiritual gifts', 'vocation', 'calling', 'Christian'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
