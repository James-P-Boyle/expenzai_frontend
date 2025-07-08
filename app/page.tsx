'use client'

import Header from './components/partials/Header'
import { useAuth } from './context/AuthContext'
import { Button } from './components/ui/Button'
import Link from 'next/link'
import HeroImages from './components/HeroImages'
import Hero from './components/Hero'

export default function HomePage() {
    const { isAuthenticated } = useAuth()

    return (
        <div className="min-h-screen px-2 lg:px-8">
            <Header isAuthenticated={isAuthenticated} />

            <Hero 
                title="Smart Expense Tracking"
                subtitle="Transform your receipt management with AI-powered categorization..."
                images={<HeroImages />}
            >
                <Link href="/dashboard/upload">
                    <Button variant='secondary'>
                        Start Tracking Now
                    </Button>
                </Link>
            </Hero>
        </div>
    )
}