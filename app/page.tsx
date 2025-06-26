'use client'

import Link from 'next/link'
import { Camera, Receipt, BarChart3 } from 'lucide-react'
import { useAuth } from './context/AuthContext'
import { Button } from './components/ui/Button'

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Receipt Tracker</h1>
          <div className="space-x-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="secondary">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Track Your Expenses
            <span className="block text-blue-600">with AI Power</span>
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Simply take a photo of your receipt and let AI automatically categorize your expenses. 
            Get insights into your spending habits effortlessly.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Tracking Now
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <Camera className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Snap & Go
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Take a quick photo of any receipt and we'll handle the rest
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Receipt className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                AI Processing
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Advanced AI extracts and categorizes every item automatically
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <BarChart3 className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Smart Insights
              </h3>
              <p className="mt-2 text-base text-gray-500">
                View weekly summaries and track spending patterns over time
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}