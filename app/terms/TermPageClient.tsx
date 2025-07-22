"use client"

import Footer from "../components/partials/Footer"
import Navbar from "../components/partials/Navbar"
import { useAuth } from "../context/AuthContext"

export default function TermsPageClient() {
    const { isAuthenticated, isLoading } = useAuth()

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} loading={isLoading} />

            <section className="px-2">
                <div className="max-w-4xl mx-auto text-center lg:text-left mb-4">
                    <h1 className="text-4xl font-bold">
                        Terms of Service
                    </h1>
                    <p className="mt-2 text-lg text-ci-muted">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto text-lg">
                    <div className="space-y-8">

                        {/* Acceptance */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-ci-muted leading-relaxed">
                                By using ExpenzAI, you agree to these Terms of Service. If you don't agree, 
                                please don't use our service. We may update these terms occasionally, 
                                and continued use means you accept any changes.
                            </p>
                        </section>

                        {/* Service Description */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                2. Our Service
                            </h2>
                            <div className="text-ci-muted leading-relaxed space-y-3">
                                <p>ExpenzAI is an AI-powered expense tracking application that:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Processes receipt images using artificial intelligence</li>
                                    <li>Automatically categorizes expenses and extracts data</li>
                                    <li>Provides spending analytics and insights</li>
                                    <li>Stores your financial data securely</li>
                                </ul>
                                <p>This is a personal project provided "as-is" for your convenience.</p>
                            </div>
                        </section>

                        {/* User Responsibilities */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                3. Your Responsibilities
                            </h2>
                            <div className="text-ci-muted leading-relaxed">
                                <p className="mb-3">You agree to:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Provide accurate information when creating your account</li>
                                    <li>Keep your login credentials secure and confidential</li>
                                    <li>Use the service only for legitimate expense tracking purposes</li>
                                    <li>Not upload illegal, harmful, or inappropriate content</li>
                                    <li>Not attempt to hack, reverse engineer, or disrupt our service</li>
                                    <li>Comply with all applicable laws and regulations</li>
                                </ul>
                            </div>
                        </section>

                        {/* Data and Privacy */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                4. Data and Privacy
                            </h2>
                            <div className="rounded-lg p-6">
                                <div className="text-ci-muted leading-relaxed space-y-3">
                                    <p>
                                        <span className="font-medium">Your Data:</span> You own your receipt images and expense data. 
                                        We process it to provide our service but don't claim ownership.
                                    </p>
                                    <p>
                                        <span className="font-medium">AI Processing:</span> Receipt images are sent to OpenAI's 
                                        GPT-4 Vision API for text extraction and categorization.
                                    </p>
                                    <p>
                                        <span className="font-medium">Data Protection:</span> We follow GDPR and implement 
                                        security measures, but no system is 100% secure.
                                    </p>
                                    <p className="text-sm">
                                        See our <a href="/privacy" className="text-ci-main hover:underline">Privacy Policy</a> for complete details.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Limitations */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                5. Service Limitations
                            </h2>
                            <div className="text-ci-muted leading-relaxed space-y-3">
                                <p>Please understand that:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>AI categorization may not always be 100% accurate</li>
                                    <li>Service availability depends on third-party providers</li>
                                    <li>We may experience downtime for maintenance or technical issues</li>
                                    <li>This is a personal project with limited support resources</li>
                                    <li>Features may be added, modified, or removed without notice</li>
                                </ul>
                                <p className="mt-4">
                                    Always verify AI-generated categorizations for important financial records.
                                </p>
                            </div>
                        </section>

                        {/* Liability */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                6. Limitation of Liability
                            </h2>
                            <div className="rounded-lg p-6">
                                <div className="text-ci-muted leading-relaxed space-y-3">
                                    <p>
                                        <span className="font-medium">Important:</span> ExpenzAI is provided "as-is" without warranties. 
                                        We're not liable for any damages from using our service, including:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                                        <li>Incorrect expense categorizations or calculations</li>
                                        <li>Data loss or security breaches</li>
                                        <li>Service interruptions or downtime</li>
                                        <li>Tax or accounting errors resulting from our data</li>
                                    </ul>
                                    <p className="text-sm font-medium">
                                        Use this service as a convenience tool, not as your sole financial record system.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Account Termination */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                7. Account Termination
                            </h2>
                            <div className="text-ci-muted leading-relaxed space-y-3">
                                <p>Either party can end this agreement:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><span className="font-medium">You can:</span> Delete your account anytime through your settings</li>
                                    <li><span className="font-medium">We can:</span> Suspend or terminate accounts for terms violations</li>
                                    <li><span className="font-medium">Data deletion:</span> Account deletion removes all your data permanently</li>
                                    <li><span className="font-medium">Service closure:</span> We'll provide 30 days notice if discontinuing the service</li>
                                </ul>
                            </div>
                        </section>

                        {/* Payments (if applicable) */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                8. Payments and Billing
                            </h2>
                            <div className="text-ci-muted leading-relaxed">
                                <p>
                                    Currently, ExpenzAI is free to use. If we introduce paid features in the future, 
                                    we'll update these terms and notify you in advance. Any paid subscriptions would 
                                    be billed according to the pricing displayed at the time of purchase.
                                </p>
                            </div>
                        </section>

                        {/* German Law */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                9. Governing Law
                            </h2>
                            <div className="text-ci-muted leading-relaxed">
                                <p>
                                    These terms are governed by German law. Any disputes will be resolved in German courts. 
                                    If you're an EU consumer, you may also have rights under your local consumer protection laws.
                                </p>
                            </div>
                        </section>

                        {/* Contact */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                10. Contact
                            </h2>
                            <div className="text-ci-muted leading-relaxed">
                                <p>
                                    Questions about these terms? Contact us at{' '}
                                    <span className="font-medium">support@expenzai.app</span>
                                </p>
                                <p className="mt-2 text-sm">
                                    For legal notices, see our <a href="/impressum" className="text-ci-main hover:underline">Impressum</a>.
                                </p>
                            </div>
                        </section>

                        {/* Summary */}
                        <section className="border-t border-gray-200 pt-8">
                            <div className="rounded-lg p-6">
                                <h3 className="text-lg font-medium mb-3">TL;DR Summary</h3>
                                <div className="text-sm text-ci-muted space-y-2">
                                    <p>• Use ExpenzAI responsibly for expense tracking</p>
                                    <p>• We process your receipts with AI but you own your data</p>
                                    <p>• Service is provided "as-is" - verify important information</p>
                                    <p>• Follow our rules, respect others, don't break anything</p>
                                    <p>• You can delete your account anytime</p>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
                <Footer />
            </section>
        </>
    )
}