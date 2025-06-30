'use client'

import { useAuth } from './context/AuthContext'
import Header from './components/partials/Header'
import Hero from './components/Hero'
import Features from './components/FeaturesSection'

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen">

      <Header isAuthenticated={isAuthenticated} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <Hero isAuthenticated={isAuthenticated} />

        <Features />

      </main>
    </div>
  )
}