"use client"

import Footer from "../components/partials/Footer"
import Navbar from "../components/partials/Navbar"
import { useAuth } from "../context/AuthContext"

export default function GDPRPageClient() {

    const { isAuthenticated, isLoading } = useAuth()

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} loading={isLoading} />

            <section className="px-2">
                <div className="max-w-4xl mx-auto text-center lg:text-left mb-4">
                    <h1 className="text-4xl font-bold">
                        GDPR Compliance & Data Protection
                    </h1>
                    <p className="mt-2 text-lg text-ci-muted">
                        Your rights under European data protection law
                    </p>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto text-lg">
                    <div className="space-y-8">

                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                What is GDPR?
                            </h2>
                            <p className="text-ci-muted">
                                The General Data Protection Regulation (GDPR) is a comprehensive data protection law
                                that gives you control over your personal data. As an EU resident, you have specific
                                rights regarding how your data is collected, processed, and stored by ExpenzAI.
                            </p>
                        </section>

                        {/* Legal Basis */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Legal Basis for Processing
                            </h2>
                            <div className="space-y-4">
                                <div className="p-4">
                                    <h3 className="text-lg font-medium mb-2">Legitimate Interest</h3>
                                    <p className="text-ci-muted text-sm">
                                        Processing receipt images and expense data to provide AI-powered categorization services
                                    </p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium mb-2">Contract Performance</h3>
                                    <p className="text-ci-muted text-sm">
                                        Processing necessary to provide the expense tracking services you requested
                                    </p>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium mb-2">Consent</h3>
                                    <p className="text-ci-muted text-sm">
                                        Marketing communications and optional analytics (you can withdraw consent anytime)
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Your Rights */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Your GDPR Rights
                            </h2>
                            <div className="grid gap-6">
                                <div className="p-6">
                                    <h3 className="text-xl font-medium mb-3 flex items-center">
                                        <span className="bg-ci-main rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 text-ci-black">1</span>
                                        Right of Access (Article 15)
                                    </h3>
                                    <p className="text-ci-muted mb-3">
                                        You can request a copy of all personal data we hold about you, including:
                                    </p>
                                    <ul className="list-disc list-inside text-ci-muted text-sm space-y-1">
                                        <li>Your account information and preferences</li>
                                        <li>All uploaded receipts and extracted data</li>
                                        <li>Spending analytics and categorizations</li>
                                        <li>Processing logs and system interactions</li>
                                    </ul>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-medium mb-3 flex items-center">
                                        <span className="bg-ci-main rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 text-ci-black">2</span>
                                        Right to Rectification (Article 16)
                                    </h3>
                                    <p className="text-ci-muted mb-3">
                                        Correct any inaccurate or incomplete data, including:
                                    </p>
                                    <ul className="list-disc list-inside text-ci-muted text-sm space-y-1">
                                        <li>Profile information and account details</li>
                                        <li>Incorrect expense categorizations</li>
                                        <li>Receipt processing errors</li>
                                    </ul>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-medium mb-3 flex items-center">
                                        <span className="bg-ci-main rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 text-ci-black">3</span>
                                        Right to Erasure (Article 17)
                                    </h3>
                                    <p className="text-ci-muted mb-3">
                                        Request deletion of your data when:
                                    </p>
                                    <ul className="list-disc list-inside text-ci-muted text-sm space-y-1">
                                        <li>Data is no longer necessary for original purpose</li>
                                        <li>You withdraw consent and no other legal basis exists</li>
                                        <li>Data has been unlawfully processed</li>
                                        <li>You close your account permanently</li>
                                    </ul>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-medium mb-3 flex items-center">
                                        <span className="bg-ci-main rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 text-ci-black">4</span>
                                        Right to Data Portability (Article 20)
                                    </h3>
                                    <p className="text-ci-muted mb-3">
                                        Export your data in machine-readable format:
                                    </p>
                                    <ul className="list-disc list-inside text-ci-muted text-sm space-y-1">
                                        <li>JSON export of all expenses and categories</li>
                                        <li>CSV format for easy import to other tools</li>
                                        <li>Original receipt images in ZIP archive</li>
                                    </ul>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-medium mb-3 flex items-center">
                                        <span className="bg-ci-main rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 text-ci-black">5</span>
                                        Right to Restrict Processing (Article 18)
                                    </h3>
                                    <p className="text-ci-muted mb-3">
                                        Limit how we process your data while disputes are resolved
                                    </p>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-medium mb-3 flex items-center">
                                        <span className="bg-ci-main rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 text-ci-black">6</span>
                                        Right to Object (Article 21)
                                    </h3>
                                    <p className="text-ci-muted mb-3">
                                        Object to processing based on legitimate interests, including:
                                    </p>
                                    <ul className="list-disc list-inside text-ci-muted text-sm space-y-1">
                                        <li>Analytics and usage tracking</li>
                                        <li>Marketing communications</li>
                                        <li>Automated decision-making processes</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Data Transfers */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                International Data Transfers
                            </h2>
                            <div className="p-6">
                                <h3 className="text-lg font-medium mb-2">Third Country Processing</h3>
                                <p className="text-ci-muted mb-4">
                                    Your data may be processed outside the EU/EEA by our service providers.
                                    All transfers are protected by appropriate safeguards:
                                </p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="font-medium">OpenAI (AI Processing)</span>
                                            <p className="text-xs text-ci-muted">Receipt analysis and categorization</p>
                                        </div>
                                        <span className="text-sm bg-ci-success/10 text-ci-success px-2 py-1 rounded">
                                            Adequate Protection
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="font-medium">Vercel (Frontend Hosting)</span>
                                            <p className="text-xs text-ci-muted">Website hosting and CDN</p>
                                        </div>
                                        <span className="text-sm bg-ci-success/10 text-ci-success px-2 py-1 rounded">
                                            Standard Contractual Clauses
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="font-medium">Railway (Backend Hosting)</span>
                                            <p className="text-xs text-ci-muted">API and database hosting</p>
                                        </div>
                                        <span className="text-sm bg-ci-success/10 text-ci-success px-2 py-1 rounded">
                                            Standard Contractual Clauses
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="font-medium">Cloudflare (CDN & Security)</span>
                                            <p className="text-xs text-ci-muted">Content delivery and DDoS protection</p>
                                        </div>
                                        <span className="text-sm bg-ci-success/10 text-ci-success px-2 py-1 rounded">
                                            Standard Contractual Clauses
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="font-medium">AWS S3 (File Storage)</span>
                                            <p className="text-xs text-ci-muted">Receipt image storage</p>
                                        </div>
                                        <span className="text-sm bg-ci-success/10 text-ci-success px-2 py-1 rounded">
                                            Standard Contractual Clauses
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-ci-success/10 rounded border-l-4 border-ci-success">
                                    <p className="text-sm">
                                        <span className="font-medium">Data Protection:</span> All service providers are bound by
                                        contractual agreements to protect your data and comply with GDPR requirements.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Exercise Rights */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                How to Exercise Your Rights
                            </h2>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                                        <p className="text-ci-muted mb-2">
                                            To exercise any of your GDPR rights, contact me directly:
                                        </p>
                                        <div className="text-sm space-y-1">
                                            <p><span className="font-medium">Email:</span> contact@expenzai.app</p>
                                            <p><span className="font-medium">Response Time:</span> Within 30 days</p>
                                            <p><span className="font-medium">Verification:</span> Account authentication required</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Complaint Rights</h3>
                                        <p className="text-ci-muted text-sm">
                                            If you're not satisfied with how your request is handled, you have the right
                                            to lodge a complaint with your local data protection authority or the
                                            German Federal Commissioner for Data Protection and Freedom of Information (BfDI).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Data Retention */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Data Retention Periods
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border border-ci-muted ">
                                    <thead className="">
                                        <tr>
                                            <th className="border-b border-ci-muted px-4 py-3 text-left font-medium">Data Type</th>
                                            <th className="border-b border-ci-muted px-4 py-3 text-left font-medium">Retention Period</th>
                                            <th className="border-b border-ci-muted px-4 py-3 text-left font-medium">Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        <tr>
                                            <td className="px-4 py-3">Account Data</td>
                                            <td className="px-4 py-3">Until account deletion</td>
                                            <td className="px-4 py-3">Service provision</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3">Receipt Images</td>
                                            <td className="px-4 py-3">Until user deletion</td>
                                            <td className="px-4 py-3">Core functionality</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3">Processing Logs</td>
                                            <td className="px-4 py-3">90 days</td>
                                            <td className="px-4 py-3">Debugging & security</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3">Analytics Data</td>
                                            <td className="px-4 py-3">12 months</td>
                                            <td className="px-4 py-3">Service improvement</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Updates */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Policy Updates
                            </h2>
                            <p className="text-ci-muted leading-relaxed">
                                This GDPR compliance page will be updated as regulations evolve or as the service changes.
                                Material changes affecting your rights will be communicated via email with at least 30 days notice.
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </section>
                    </div>
                </div>

            </section>
            <Footer />
        </>
    )
}