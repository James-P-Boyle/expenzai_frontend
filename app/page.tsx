'use client'

import { useAuth } from './context/AuthContext'
import Header from './components/partials/Header'
import Hero from './components/Hero'
import Features from './components/FeaturesSection'
import Link from 'next/link'
import { Button } from './components/ui/Button'

export default function HomePage() {
    const { isAuthenticated } = useAuth()

    return (
        <div className="min-h-screen">

            <Header isAuthenticated={isAuthenticated} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <Hero
                    title={<>Track Your Expenses<span className="block text-ci-main">with AI Power</span></>}
                    subtitle="Simply take a photo of your receipt and let AI automatically categorize your expenses. Get insights into your spending habits effortlessly."
                >
                    {isAuthenticated ? (
                        <Link href="/dashboard"><Button size="lg">Go to Dashboard</Button></Link>
                    ) : (
                        <Link href="/auth/register"><Button size="lg">Start Tracking Now</Button></Link>
                    )}
                </Hero>

                <Features />

            </main>
        </div>
    )
}