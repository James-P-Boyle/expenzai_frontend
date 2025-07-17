'use client'

import Navbar from './components/partials/Navbar'
import { useAuth } from './context/AuthContext'
import { Button } from './components/ui/Button'
import Link from 'next/link'
import HeroImages from './components/HeroImages'
import Hero from './components/Hero'

export default function HomePage() {
    const { isAuthenticated, isLoading } = useAuth()

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} loading={isLoading} />

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
        </>
    )
}