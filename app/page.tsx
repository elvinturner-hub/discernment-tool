import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <div className="mb-8">
            <span className="text-6xl">🌿</span>
          </div>
          
          <h1 className="font-serif text-display text-stone-800 mb-6 text-balance">
            Strengths, Gifts &<br />Vocational Discernment
          </h1>
          
          <p className="text-body text-stone-600 mb-10 max-w-xl mx-auto text-balance">
            A tool for young adults seeking to understand their created wiring, 
            notice patterns of spiritual gifting, and move forward faithfully 
            into their future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary">
              Begin Your Journey
            </Link>
            <Link href="/login" className="btn-secondary">
              Continue Where You Left Off
            </Link>
          </div>
        </div>
      </section>

      {/* What This Is Section */}
      <section className="bg-white/50 border-t border-stone-200 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-heading text-stone-800 mb-8 text-center">
            What This Is — And What It Is Not
          </h2>
          
          <div className="space-y-6 text-body text-stone-600">
            <p>
              This is a <strong className="text-stone-800">discernment aid</strong>, 
              not a personality test, career matcher, or destiny finder. It will not 
              tell you what to do with your life.
            </p>
            
            <p>
              Instead, it helps you <strong className="text-stone-800">notice patterns</strong> — 
              in how you are wired, in where the Spirit may be at work, and in which 
              kinds of futures stir something in you.
            </p>
            
            <p>
              What emerges here is meant to be <strong className="text-stone-800">tested</strong> — 
              in prayer, in community, with wise counsel, and over time. You remain 
              free to disagree with anything you find. The goal is clarity for 
              discernment, not certainty for decision.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="font-serif text-lg text-stone-800 mb-2">Created Strengths</h3>
              <p className="text-small text-stone-500">
                Understand your natural wiring — where energy flows and where it costs you
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-serif text-lg text-stone-800 mb-2">Spirit-Given Gifts</h3>
              <p className="text-small text-stone-500">
                Discern evidence of spiritual gifts, grounded in Scripture
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl mb-3">🧭</div>
              <h3 className="font-serif text-lg text-stone-800 mb-2">Vocational Direction</h3>
              <p className="text-small text-stone-500">
                Notice which kinds of futures draw you — and what costs you are willing to bear
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="font-serif text-subheading text-stone-700 italic mb-4">
            "For we are God's handiwork, created in Christ Jesus to do good works, 
            which God prepared in advance for us to do."
          </blockquote>
          <cite className="text-small text-stone-500">— Ephesians 2:10</cite>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 px-6">
        <div className="max-w-3xl mx-auto text-center text-small text-stone-500">
          <p>
            This tool is offered as a gift for discernment. It is not a substitute 
            for prayer, community, or wise counsel.
          </p>
        </div>
      </footer>
    </main>
  )
}
