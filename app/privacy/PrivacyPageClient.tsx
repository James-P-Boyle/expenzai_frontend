"use client"

import Navbar from "../components/partials/Navbar"
import { useAuth } from "../context/AuthContext"

export default function PrivacyPageClient() {

    const { isAuthenticated, isLoading } = useAuth()

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} loading={isLoading} />

            {/* Header */}
     
            <div className="max-w-4xl mx-auto p-6 text-center lg:text-left">
                <h1 className="text-3xl font-bold">
                    Privacy Policy & Data Protection
                </h1>
                <p className="mt-2 text-lg text-ci-muted">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>
        

            {/* Content */}
            <div className="max-w-4xl mx-auto p-6 text-lg ">
                <div className="-8 space-y-8">
                    
                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            Introduction
                        </h2>
                        <p className="text-ci-muted">
                            ExpenzAI ("we," "our," or "us") is committed to protecting your privacy and personal data. 
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                            when you use our AI-powered expense tracking application.
                        </p>
                    </section>

                    {/* Data We Collect */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            Data We Collect
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium mb-2">
                                    Personal Information
                                </h3>
                                <ul className="list-disc list-inside text-ci-muted space-y-1">
                                    <li>Name and email address (for account creation)</li>
                                    <li>Profile information you choose to provide</li>
                                    <li>Communication preferences</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium mb-2">
                                    Financial Data
                                </h3>
                                <ul className="list-disc list-inside text-ci-muted space-y-1">
                                    <li>Receipt images and extracted text data</li>
                                    <li>Expense categories and amounts</li>
                                    <li>Spending patterns and analytics</li>
                                    <li>Store names and purchase locations</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium mb-2">
                                    Technical Data
                                </h3>
                                <ul className="list-disc list-inside text-ci-muted space-y-1">
                                    <li>Device information and browser type</li>
                                    <li>IP address and location data</li>
                                    <li>Usage analytics and app performance data</li>
                                    <li>Cookies and similar tracking technologies</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Your Data */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            How We Use Your Data
                        </h2>
                        <ul className="list-disc list-inside text-ci-muted space-y-2">
                            <li>Process and categorize your receipts using AI technology</li>
                            <li>Provide spending analytics and insights</li>
                            <li>Maintain and improve our services</li>
                            <li>Send important service notifications</li>
                            <li>Ensure security and prevent fraud</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    {/* Your Rights (GDPR) */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            Your Rights Under GDPR
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Right to Access
                                    </h3>
                                    <p className="text-ci-muted text-sm">
                                        Request a copy of all personal data we hold about you
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Right to Rectification
                                    </h3>
                                    <p className="text-ci-muted text-sm">
                                        Correct any inaccurate or incomplete personal data
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Right to Erasure
                                    </h3>
                                    <p className="text-ci-muted text-sm">
                                        Request deletion of your personal data ("right to be forgotten")
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Right to Portability
                                    </h3>
                                    <p className="text-ci-muted text-sm">
                                        Export your data in a machine-readable format
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Right to Object
                                    </h3>
                                    <p className="text-ci-muted text-sm">
                                        Object to processing based on legitimate interests
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-medium mb-2">
                                        Right to Restriction
                                    </h3>
                                    <p className="text-ci-muted text-sm">
                                        Limit how we process your personal data
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Data Security */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            Data Security
                        </h2>
                        <div className="bg-ci-main/10 border border-blue-200 dark:border-ci-main rounded-lg p-6">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                We implement industry-standard security measures including encryption in transit and at rest, 
                                secure authentication, regular security audits, and access controls. Your receipt images and 
                                financial data are processed using secure AI services and stored with enterprise-grade protection.
                            </p>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            Cookies & Tracking
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium mb-2">
                                    Essential Cookies
                                </h3>
                                <p className="text-ci-muted text-sm">
                                    Required for authentication, security, and core functionality
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium mb-2">
                                    Analytics Cookies
                                </h3>
                                <p className="text-ci-muted text-sm">
                                    Help us understand how you use our app to improve user experience
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium mb-2">
                                    Marketing Cookies
                                </h3>
                                <p className="text-ci-muted text-sm">
                                    Used to deliver relevant advertisements and measure campaign effectiveness
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact */}
                    {/* <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            Contact Us
                        </h2>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                            <p className="text-ci-muted mb-4">
                                For privacy-related questions or to exercise your rights, contact us:
                            </p>
                            <div className="space-y-2 text-sm">
                                <p className="text-gray-700 dark:text-gray-200">
                                    <span className="font-medium">Email:</span> privacy@expenzai.app
                                </p>
                                <p className="text-gray-700 dark:text-gray-200">
                                    <span className="font-medium">Data Protection Officer:</span> dpo@expenzai.app
                                </p>
                                <p className="text-gray-700 dark:text-gray-200">
                                    <span className="font-medium">Response Time:</span> Within 30 days of request
                                </p>
                            </div>
                        </div>
                    </section> */}

                    {/* Updates */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            Policy Updates
                        </h2>
                        <p className="text-ci-muted leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any material 
                            changes by posting the new policy on this page and updating the "Last updated" date. 
                            Your continued use of our services after such modifications constitutes acceptance of the updated policy.
                        </p>
                    </section>
                </div>
            </div>

        </>

    )
}