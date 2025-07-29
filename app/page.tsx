'use client'

import Navbar from './components/partials/Navbar'
import { useAuth } from './context/AuthContext'
import { Button } from './components/ui/Button'
import Link from 'next/link'
import HeroImages from './components/HeroImages'
import Hero from './components/Hero'
import { Upload } from 'lucide-react'
import Footer from './components/partials/Footer'
import InstallPrompt from './components/InstallPrompt'
import PWADebug from './components/PWADebug'

export default function HomePage() {
    const { isAuthenticated, isLoading } = useAuth()

    return (
        <>
            <section className="!min-h-screen flex flex-col">
                <Navbar isAuthenticated={isAuthenticated} loading={isLoading} />

                <Hero
                    title="Smart Expense Tracking"
                    subtitle="Transform your receipt management with AI-powered categorization..."
                    images={<HeroImages />}
                >
                    <Link href="/dashboard/upload">
                        <Button
                            title="Go to uploading interface"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            Start Tracking
                        </Button>
                    </Link>
                    <InstallPrompt />
                    {/* <PWADebug /> */}
                </Hero>


            </section>
            <Footer />
        </>
    )
}