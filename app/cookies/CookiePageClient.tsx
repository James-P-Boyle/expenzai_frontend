"use client"

import Footer from "../components/partials/Footer"
import Navbar from "../components/partials/Navbar"
import { useAuth } from "../context/AuthContext"
import { Settings, Shield, BarChart3, Target, Clock, Globe } from 'lucide-react'

export default function CookiePageClient() {
    const { isAuthenticated, isLoading } = useAuth()

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} loading={isLoading} />

            <section className="px-2">
                <div className="max-w-4xl mx-auto text-center lg:text-left mb-4">
                    <h1 className="text-4xl font-bold">
                        Cookie Policy
                    </h1>
                    <p className="mt-2 text-lg text-ci-muted">
                        How we use cookies and similar technologies
                    </p>
                </div>

                <div className="max-w-4xl mx-auto text-lg">
                    <div className="space-y-8">

                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                What Are Cookies?
                            </h2>
                            <p className="text-ci-muted leading-relaxed">
                                Cookies are small text files that are placed on your device when you visit our website. 
                                They help us provide you with a better experience by remembering your preferences and 
                                understanding how you use our service.
                            </p>
                        </section>

                        {/* Cookie Types */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-6">
                                Types of Cookies We Use
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="rounded-lg">
                                    <div className="flex items-start gap-4">
                                        <Shield className="w-6 h-6 text-ci-success mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-xl font-medium mb-3 text-ci-success">
                                                Essential Cookies (Required)
                                            </h3>
                                            <p className="text-ci-muted mb-3">
                                                These cookies are necessary for the website to function and cannot be disabled.
                                            </p>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="font-medium mb-2">Authentication</h4>
                                                    <ul className="text-ci-muted text-sm space-y-1 list-disc list-inside">
                                                        <li>Keep you logged in</li>
                                                        <li>Remember your session</li>
                                                        <li>Security tokens</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium mb-2">Functionality</h4>
                                                    <ul className="text-ci-muted text-sm space-y-1 list-disc list-inside">
                                                        <li>Remember your preferences</li>
                                                        <li>Form data storage</li>
                                                        <li>Error tracking</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg">
                                    <div className="flex items-start gap-4">
                                        <BarChart3 className="w-6 h-6 text-ci-warn mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-xl font-medium mb-3  text-ci-warn">
                                                Analytics Cookies (Optional)
                                            </h3>
                                            <p className="text-ci-muted mb-3">
                                                Help us understand how you use our app to improve your experience.
                                            </p>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="font-medium mb-2">Usage Analytics</h4>
                                                    <ul className="text-ci-muted text-sm space-y-1 list-disc list-inside">
                                                        <li>Page views and clicks</li>
                                                        <li>Feature usage patterns</li>
                                                        <li>Performance metrics</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium mb-2">Error Tracking</h4>
                                                    <ul className="text-ci-muted text-sm space-y-1 list-disc list-inside">
                                                        <li>Bug reports and crashes</li>
                                                        <li>Performance issues</li>
                                                        <li>User experience problems</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="rounded-lg p-6">
                                    <div className="flex items-start gap-4">
                                        <Target className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-xl font-medium mb-3 text-purple-700">
                                                Marketing Cookies (Optional)
                                            </h3>
                                            <p className="text-ci-muted mb-3">
                                                Used to deliver relevant advertisements and measure campaign effectiveness.
                                            </p>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="font-medium mb-2">Advertising</h4>
                                                    <ul className="text-ci-muted text-sm space-y-1 list-disc list-inside">
                                                        <li>Personalized ads</li>
                                                        <li>Ad performance tracking</li>
                                                        <li>Retargeting campaigns</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium mb-2">Social Media</h4>
                                                    <ul className="text-ci-muted text-sm space-y-1 list-disc list-inside">
                                                        <li>Social sharing buttons</li>
                                                        <li>Embedded content</li>
                                                        <li>Social login features</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </section>

                        {/* Cookie Details */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Specific Cookies We Use
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead className="">
                                        <tr>
                                            <th className="p-3 text-left">Cookie Name</th>
                                            <th className="p-3 text-left">Purpose</th>
                                            <th className="p-3 text-left">Duration</th>
                                            <th className="p-3 text-left">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 font-mono">auth_token</td>
                                            <td className="p-3">Authentication and session management</td>
                                            <td className="p-3">30 days</td>
                                            <td className="p-3"><span className="bg-ci-success/20 text-ci-success px-2 py-1 rounded text-sm">Essential</span></td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono">csrf_token</td>
                                            <td className="p-3">Security protection against CSRF attacks</td>
                                            <td className="p-3">Session</td>
                                            <td className="p-3"><span className="bg-ci-success/20 text-ci-success px-2 py-1 rounded text-sm">Essential</span></td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono">cookie_consent</td>
                                            <td className="p-3">Remember your cookie preferences</td>
                                            <td className="p-3">1 year</td>
                                            <td className="p-3"><span className="bg-ci-success/20 text-ci-success px-2 py-1 rounded text-sm">Essential</span></td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono">_ga</td>
                                            <td className="p-3">Google Analytics - distinguish users</td>
                                            <td className="p-3">2 years</td>
                                            <td className="p-3"><span className="bg-ci-success/20 text-ci-success px-2 py-1 rounded text-sm">Analytics</span></td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono">_gid</td>
                                            <td className="p-3">Google Analytics - distinguish users</td>
                                            <td className="p-3">24 hours</td>
                                            <td className="p-3"><span className="bg-ci-success/20 text-ci-success px-2 py-1 rounded text-sm">Analytics</span></td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-mono">fb_pixel</td>
                                            <td className="p-3">Facebook advertising and retargeting</td>
                                            <td className="p-3">90 days</td>
                                            <td className="p-3"><span className="bg-ci-success/20 text-ci-success px-2 py-1 rounded text-sm">Marketing</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Third Party Services */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Third-Party Services
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="rounded-lg p-4">
                                    <h3 className="font-medium mb-2 flex items-center gap-2">
                                        <Globe className="w-4 h-4" />
                                        Google Analytics
                                    </h3>
                                    <p className="text-ci-muted mb-2">
                                        Provides website analytics and user behavior insights.
                                    </p>
                                    <a href="https://policies.google.com/privacy" className="text-ci-main text-sm hover:underline">
                                        Google Privacy Policy →
                                    </a>
                                </div>
                                <div className="rounded-lg p-4">
                                    <h3 className="font-medium mb-2 flex items-center gap-2">
                                        <Target className="w-4 h-4" />
                                        Facebook Pixel
                                    </h3>
                                    <p className="text-ci-muted mb-2">
                                        Tracks conversions and enables targeted advertising.
                                    </p>
                                    <a href="https://www.facebook.com/privacy/explanation" className="text-ci-main text-sm hover:underline">
                                        Facebook Privacy Policy →
                                    </a>
                                </div>
                                <div className="rounded-lg p-4">
                                    <h3 className="font-medium mb-2 flex items-center gap-2">
                                        <Settings className="w-4 h-4" />
                                        Cloudflare
                                    </h3>
                                    <p className="text-ci-muted mb-2">
                                        CDN and security services for website performance.
                                    </p>
                                    <a href="https://www.cloudflare.com/privacy/" className="text-ci-main text-sm hover:underline">
                                        Cloudflare Privacy Policy →
                                    </a>
                                </div>
                                <div className="rounded-lg p-4">
                                    <h3 className="font-medium mb-2 flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Vercel Analytics
                                    </h3>
                                    <p className="text-ci-muted mb-2">
                                        Performance monitoring and website analytics.
                                    </p>
                                    <a href="https://vercel.com/legal/privacy-policy" className="text-ci-main text-sm hover:underline">
                                        Vercel Privacy Policy →
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Managing Cookies */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Managing Your Cookie Preferences
                            </h2>
                            <div className="rounded-lg p-6">
                                <h3 className="font-medium mb-3">Options for Managing Cookies:</h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="font-medium">Cookie Banner:</span>
                                        <span className="text-ci-muted ml-2">Accept or reject optional cookies when you first visit</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Privacy Settings:</span>
                                        <span className="text-ci-muted ml-2">Update your preferences anytime in your account settings</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Browser Settings:</span>
                                        <span className="text-ci-muted ml-2">Block or delete cookies through your browser preferences</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Do Not Track:</span>
                                        <span className="text-ci-muted ml-2">We respect browser Do Not Track signals where possible</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Browser Instructions */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Browser Cookie Settings
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-medium mb-2">Chrome</h3>
                                    <p className="text-ci-muted">Settings → Privacy and Security → Cookies and other site data</p>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">Firefox</h3>
                                    <p className="text-ci-muted">Options → Privacy & Security → Cookies and Site Data</p>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">Safari</h3>
                                    <p className="text-ci-muted">Preferences → Privacy → Manage Website Data</p>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">Edge</h3>
                                    <p className="text-ci-muted">Settings → Cookies and site permissions → Cookies and site data</p>
                                </div>
                            </div>
                        </section>

                        {/* Contact */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Questions About Cookies?
                            </h2>
                            <p className="text-ci-muted leading-relaxed">
                                If you have any questions about our use of cookies or this Cookie Policy, 
                                please contact us at <span className="font-medium">contact@expenzai.app</span>
                            </p>
                        </section>

                    </div>
                </div>
                <Footer />
            </section>
        </>
    )
}