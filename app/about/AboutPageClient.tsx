"use client"

import Link from "next/link"
import Navbar from "../components/partials/Navbar"
import { Button } from "../components/ui/Button"
import { useAuth } from "../context/AuthContext"
import { Camera, Zap, TrendingUp, Shield, CheckCircle, Eye, Upload } from "lucide-react"
import Footer from "../components/partials/Footer"

export default function AboutPageClient() {
    const { isAuthenticated, isLoading } = useAuth()

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} loading={isLoading} />
            
            {/* Hero Section */}
            <section>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-6">
                            AI-Powered Expense Tracking Made Simple
                        </h1>
                        <p className="text-xl text-ci-muted mb-8 leading-relaxed">
                            Snap a photo of your receipt and let our AI instantly extract, categorize, 
                            and track your expenses. No manual data entry required.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        How It Works
                    </h2>
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-ci-main w-20 h-20 rounded-full border-2 border-ci-main flex items-center justify-center mx-auto mb-4">
                                    <Camera className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">1. Snap Receipt</h3>
                                <p className="text-ci-muted">
                                    Take a photo or upload your receipt image
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-ci-main w-20 h-20 rounded-full border-2 border-ci-main flex items-center justify-center mx-auto mb-4">
                                    <Zap className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">2. AI Processing</h3>
                                <p className="text-ci-muted">
                                    AI extracts items, prices, and auto-categorizes
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-ci-main w-20 h-20 rounded-full border-2 border-ci-main flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">3. Track & Analyze</h3>
                                <p className="text-ci-muted">
                                    View spending trends and weekly summaries
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        Key Features
                    </h2>
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="text-center">
                                <Eye className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Smart AI Recognition</h3>
                                <p className="text-ci-muted text-sm">
                                    Accurately reads receipts and extracts all details
                                </p>
                            </div>
                            <div className="text-center">
                                <CheckCircle className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Auto-Categorization</h3>
                                <p className="text-ci-muted text-sm">
                                    Automatically sorts expenses into categories
                                </p>
                            </div>
                            <div className="text-center">
                                <TrendingUp className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Spending Analytics</h3>
                                <p className="text-ci-muted text-sm">
                                    Interactive charts and weekly summaries
                                </p>
                            </div>
                            <div className="text-center">
                                <Camera className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Mobile-First</h3>
                                <p className="text-ci-muted text-sm">
                                    Optimized for mobile with camera integration
                                </p>
                            </div>
                            <div className="text-center">
                                <Zap className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Real-Time Processing</h3>
                                <p className="text-ci-muted text-sm">
                                    Instant receipt processing with live updates
                                </p>
                            </div>
                            <div className="text-center">
                                <Shield className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
                                <p className="text-ci-muted text-sm">
                                    Your data is encrypted and completely private
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="pt-10 text-center">
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Start Tracking Smarter?
                    </h2>
                    <p className="text-lg text-ci-muted mb-8 max-w-2xl mx-auto">
                        Join users who have simplified their expense tracking with AI
                    </p>
                 
                    <Link href="/dashboard/upload">
                        <Button
                            title="Go to uploading interface"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            Get Started
                        </Button>
                    </Link>
                </div>
                <Footer />
            </section>
        </>
    )
}