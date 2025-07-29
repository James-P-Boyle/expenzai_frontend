"use client"

import Link from "next/link"
import Head from "next/head"
import Navbar from "../components/partials/Navbar"
import { Button } from "../components/ui/Button"
import { useAuth } from "../context/AuthContext"
import { Camera, Zap, TrendingUp, Shield, CheckCircle, Eye, Upload, Mail, Smartphone, Download, Clock, BarChart3, Database } from "lucide-react"
import Footer from "../components/partials/Footer"
import { useState, useEffect } from "react"

export default function AboutPageClient() {
    const { isAuthenticated, isLoading } = useAuth()
    const [showInstallPrompt, setShowInstallPrompt] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setShowInstallPrompt(true)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }, [])

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice
            if (outcome === 'accepted') {
                setShowInstallPrompt(false)
            }
            setDeferredPrompt(null)
        }
    }

    return (
        <section className="relative">

            <Navbar isAuthenticated={isAuthenticated} loading={isLoading} />
            
            {/* Install App Prompt */}
            {showInstallPrompt && (
                <div className="bg-ci-main absolute top-[280px] lg:top-[100px] right-0 left-0 py-3">
                    <div className="container mx-auto px-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <Smartphone className="w-5 h-5 mr-2" />
                            <span className="text-sm font-medium">Install ExpenzAI for the best mobile experience</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                onClick={handleInstallClick}
                                size="sm"
                                variant="secondary"
                                className="bg-ci-main/10er:bg-gray-100"
                            >
                                <Download className="w-4 h-4 mr-1" />
                                Install
                            </Button>
                            <button
                                onClick={() => setShowInstallPrompt(false)}
                                className="text-white hover:text-gray-200 text-sm"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Hero Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl font-bold mb-6 leading-tight">
                            Transform Your Expense Tracking with <span className="text-ci-main">AI-Powered</span> Receipt Processing
                        </h1>
                        <p className="text-xl text-ci-muted mb-8 leading-relaxed">
                            ExpenzAI revolutionizes expense management by automatically extracting, categorizing, and analyzing 
                            your receipts using advanced artificial intelligence. Simply snap a photo, email your receipt, 
                            or upload an image - our AI handles the rest, giving you instant insights into your spending patterns.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/dashboard/upload">
                                <Button size="lg" className="w-full sm:w-auto">
                                    <Upload className="mr-2 h-5 w-5" />
                                    Start Tracking Now
                                </Button>
                            </Link>
                            <p className="text-sm text-ci-muted">
                                No credit card required • 3 free uploads
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">
                            Three Simple Ways to Track Expenses
                        </h2>
                        <p className="text-lg text-ci-muted max-w-3xl mx-auto">
                            ExpenzAI offers multiple convenient methods to capture and process your receipts. 
                            Choose the method that works best for your workflow and lifestyle.
                        </p>
                    </div>
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <div className="text-center p-6 rounded-lg">
                                <div className="text-ci-main w-20 h-20 rounded-full border-2 border-ci-main flex items-center justify-center mx-auto mb-4">
                                    <Camera className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">1. Snap & Upload</h3>
                                <p className="text-ci-muted mb-4">
                                    Use your smartphone camera to instantly capture receipts or upload existing images from your gallery.
                                </p>
                                <ul className="text-sm text-ci-muted text-left space-y-1">
                                    <li>• Works with any image format</li>
                                    <li>• Optimized mobile camera interface</li>
                                    <li>• Drag & drop on desktop</li>
                                </ul>
                            </div>
                            <div className="text-center p-6 rounded-lg">
                                <div className="text-ci-main w-20 h-20 rounded-full border-2 border-ci-main flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">2. Email Processing</h3>
                                <p className="text-ci-muted mb-4">
                                    Forward receipts directly to <strong>receipts@expenzai.app</strong> and our AI will automatically process them.
                                </p>
                                <ul className="text-sm text-ci-muted text-left space-y-1">
                                    <li>• Perfect for digital receipts</li>
                                    <li>• Supports multiple attachments</li>
                                    <li>• Automatic email notifications</li>
                                </ul>
                            </div>
                            <div className="text-center p-6 rounded-lg">
                                <div className="text-ci-main w-20 h-20 rounded-full border-2 border-ci-main flex items-center justify-center mx-auto mb-4">
                                    <Zap className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">3. AI Magic</h3>
                                <p className="text-ci-muted mb-4">
                                    Our advanced AI extracts every detail, categorizes expenses, and provides instant analytics.
                                </p>
                                <ul className="text-sm text-ci-muted text-left space-y-1">
                                    <li>• 99%+ accuracy rate</li>
                                    <li>• Smart categorization</li>
                                    <li>• Real-time processing</li>
                                </ul>
                            </div>
                        </div>
                        
                        {/* Process Flow */}
                        <div className="p-8 rounded-lg">
                            <h3 className="text-2xl font-semibold text-center mb-8">Complete Processing Workflow</h3>
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Clock className="w-8 h-8 text-ci-main" />
                                    </div>
                                    <h4 className="font-semibold mb-2">Instant Upload</h4>
                                    <p className="text-sm text-ci-muted">Receipt captured and uploaded in seconds</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Eye className="w-8 h-8 text-ci-main" />
                                    </div>
                                    <h4 className="font-semibold mb-2">AI Analysis</h4>
                                    <p className="text-sm text-ci-muted">Advanced OCR extracts all receipt data</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <CheckCircle className="w-8 h-8 text-ci-main" />
                                    </div>
                                    <h4 className="font-semibold mb-2">Smart Categorization</h4>
                                    <p className="text-sm text-ci-muted">Expenses automatically sorted by category</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <BarChart3 className="w-8 h-8 text-ci-main" />
                                    </div>
                                    <h4 className="font-semibold mb-2">Instant Insights</h4>
                                    <p className="text-sm text-ci-muted">Charts and analytics generated automatically</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">
                            Why Choose ExpenzAI for Expense Management?
                        </h2>
                        <p className="text-lg text-ci-muted max-w-3xl mx-auto">
                            Our comprehensive expense tracking platform combines cutting-edge AI technology with 
                            user-friendly design to deliver the most efficient receipt processing experience available.
                        </p>
                    </div>
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="text-center p-6 rounded-lg">
                                <Eye className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-3">Advanced OCR Technology</h3>
                                <p className="text-ci-muted text-sm leading-relaxed">
                                    State-of-the-art optical character recognition powered by GPT-4 Vision accurately 
                                    reads even poor quality receipts, extracting merchant names, dates, items, prices, 
                                    and tax information with 99%+ accuracy.
                                </p>
                            </div>
                            <div className="text-center p-6 rounded-lg">
                                <CheckCircle className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-3">Intelligent Auto-Categorization</h3>
                                <p className="text-ci-muted text-sm leading-relaxed">
                                    Machine learning algorithms automatically categorize expenses into standard categories 
                                    like Food & Dining, Transportation, Shopping, and more. Manual corrections improve 
                                    future accuracy through continuous learning.
                                </p>
                            </div>
                            <div className="text-center p-6 rounded-lg">
                                <TrendingUp className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-3">Comprehensive Analytics</h3>
                                <p className="text-ci-muted text-sm leading-relaxed">
                                    Interactive charts and detailed reports show spending patterns, weekly summaries, 
                                    category breakdowns, and trend analysis. Export data for tax preparation or 
                                    expense reimbursement with one click.
                                </p>
                            </div>
                            <div className="text-center p-6 rounded-lg">
                                <Smartphone className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-3">Mobile-First Design</h3>
                                <p className="text-ci-muted text-sm leading-relaxed">
                                    Responsive web app optimized for mobile devices with native camera integration, 
                                    offline capability, and progressive web app (PWA) support. Install directly 
                                    from your browser for app-like experience.
                                </p>
                            </div>
                            <div className="text-center p-6 rounded-lg">
                                <Mail className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-3">Email Integration</h3>
                                <p className="text-ci-muted text-sm leading-relaxed">
                                    Forward digital receipts from online purchases directly to receipts@expenzai.app 
                                    for automatic processing. Perfect for e-commerce receipts, subscription services, 
                                    and digital invoices from services like Uber or Amazon.
                                </p>
                            </div>
                            <div className="text-center p-6 rounded-lg">
                                <Shield className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-3">Enterprise-Grade Security</h3>
                                <p className="text-ci-muted text-sm leading-relaxed">
                                    Bank-level encryption protects your financial data. Images are securely stored 
                                    with automatic deletion options. GDPR compliant with transparent privacy policies 
                                    and complete user control over personal data.
                                </p>
                            </div>
                            <div className="text-center p-6 rounded-lg">
                                <Zap className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-3">Lightning-Fast Processing</h3>
                                <p className="text-ci-muted text-sm leading-relaxed">
                                    Cloud-based processing delivers results in seconds, not minutes. Real-time status 
                                    updates keep you informed throughout the process. Background processing ensures 
                                    the app remains responsive even during peak usage.
                                </p>
                            </div>
                            <div className="text-center p-6 rounded-lg">
                                <Database className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-3">Smart Data Management</h3>
                                <p className="text-ci-muted text-sm leading-relaxed">
                                    Automatic backup and sync across devices. Export capabilities for popular 
                                    accounting software including QuickBooks, Xero, and CSV formats. Search and 
                                    filter functionality makes finding specific expenses effortless.
                                </p>
                            </div>
                            <div className="text-center p-6 rounded-lg">
                                <Clock className="w-12 h-12 text-ci-main mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-3">Time-Saving Automation</h3>
                                <p className="text-ci-muted text-sm leading-relaxed">
                                    Eliminate manual data entry forever. What used to take 5-10 minutes per receipt 
                                    now happens automatically in seconds. Batch processing capabilities handle 
                                    multiple receipts simultaneously for maximum efficiency.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-gradient-to-br from-ci-main/10 via-background to-ci-main/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">
                            Save Time, Reduce Errors, Gain Insights
                        </h2>
                        <p className="text-lg text-ci-muted mb-12">
                            ExpenzAI transforms the tedious task of expense tracking into an effortless, 
                            automated process that saves hours of manual work while providing valuable 
                            insights into your spending habits.
                        </p>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold text-ci-main mb-2">95%</div>
                                <div className="text-lg font-semibold mb-2">Time Saved</div>
                                <div className="text-sm text-ci-muted">Compared to manual entry</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-ci-main mb-2">99%+</div>
                                <div className="text-lg font-semibold mb-2">Accuracy Rate</div>
                                <div className="text-sm text-ci-muted">AI extraction precision</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-ci-main mb-2">3s</div>
                                <div className="text-lg font-semibold mb-2">Average Processing</div>
                                <div className="text-sm text-ci-muted">From upload to insights</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 text-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold mb-6">
                            Ready to Revolutionize Your Expense Tracking?
                        </h2>
                        <p className="text-lg text-ci-muted mb-8 leading-relaxed">
                            Join thousands of users who have already simplified their expense management with ExpenzAI's 
                            powerful AI technology. Start your free trial today with no credit card required and 
                            experience the future of receipt processing.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <Link href="/dashboard/upload">
                                <Button size="lg" className="w-full sm:w-auto">
                                    <Upload className="mr-2 h-5 w-5" />
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                    Create Account
                                </Button>
                            </Link>
                        </div>

                        <div className="text-sm text-ci-muted space-y-2">
                            <p>✓ 3 free receipt uploads • ✓ No credit card required • ✓ Full feature access</p>
                            <p>✓ Email processing • ✓ Mobile optimized • ✓ Instant analytics</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </section>
    )
}