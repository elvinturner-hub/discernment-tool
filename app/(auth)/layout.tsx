import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-sage-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-sage-200/50 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-wheat-200/50 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <span className="text-3xl">🌱</span>
            <span className="font-serif text-2xl text-stone-800">Discernment</span>
          </Link>
          
          <blockquote className="font-serif text-subheading text-stone-700 italic mb-6 max-w-md">
            "For we are his workmanship, created in Christ Jesus for good works, 
            which God prepared beforehand, that we should walk in them."
          </blockquote>
          <cite className="text-small text-stone-500 not-italic">
            — Ephesians 2:10
          </cite>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="font-serif text-xl text-stone-800">Discernment</span>
            </Link>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  )
}
