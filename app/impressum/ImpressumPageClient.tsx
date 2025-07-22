"use client"

import Footer from "../components/partials/Footer"
import Navbar from "../components/partials/Navbar"
import { useAuth } from "../context/AuthContext"
import { Mail, Phone, MapPin, User, Shield, AlertCircle } from 'lucide-react'

export default function ImpressumPageClient() {
    const { isAuthenticated, isLoading } = useAuth()

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} loading={isLoading} />

            <section className="px-2">
                <div className="max-w-4xl mx-auto text-center lg:text-left mb-4">
                    <h1 className="text-4xl font-bold">
                        Impressum
                    </h1>
                    <p className="mt-2 text-lg text-ci-muted">
                        Legal Disclosure & Contact Information
                    </p>
                </div>

                <div className="max-w-4xl mx-auto text-lg">
                    <div className="space-y-8">

                        {/* Legal Notice */}
                        <section>
                            <div className="mb-8">
                                <div className="flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-ci-main mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-medium text-ci-main mb-2">Information according to § 5 TMG</h3>
                                        <p className="text-ci-main/80">
                                            This information is required by German law for all websites accessible in Germany.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Service Provider */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-6">
                                Service Provider
                            </h2>

                            <div className="rounded-lg">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-ci-main flex-shrink-0" />
                                        <div>
                                            <span className="font-medium">Name:</span>
                                            <span className="ml-2">James Boyle</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-ci-main mt-1 flex-shrink-0" />
                                        <div>
                                            <span className="font-medium">Address:</span>
                                            <div className="ml-2">
                                                Goldrain<br />
                                                36088 Hünfeld<br />
                                                Germany
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Contact Information */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-6">
                                Contact Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Mail className="w-5 h-5 text-ci-main flex-shrink-0" />
                                        <span className="font-medium">Email</span>
                                    </div>
                                    <a href="mailto:contact@expenzai.app" className="text-ci-main hover:underline ml-8">
                                        contact@expenzai.app
                                    </a>
                                </div>

                                <div className="rounded-lg">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Phone className="w-5 h-5 text-ci-main flex-shrink-0" />
                                        <span className="font-medium">Phone</span>
                                    </div>
                                    <a href="tel:+4915510220025" className="text-ci-main hover:underline ml-8">
                                        +49 155 10220025
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Content Responsibility */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Responsibility for Content
                            </h2>
                            <div className="p-6">
                                <p className="text-ci-muted leading-relaxed mb-4">
                                    <span className="font-medium">Responsible for content according to § 55 Abs. 2 RStV:</span>
                                </p>
                                <div className="text-ci-muted">
                                    James Boyle<br />
                                    Goldrain<br />
                                    36088 Hünfeld<br />
                                    Germany
                                </div>
                            </div>
                        </section>

                        {/* Disclaimer */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Disclaimer
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-3">Liability for Content</h3>
                                    <p className="text-ci-muted leading-relaxed">
                                        The contents of our pages have been created with the utmost care. However, we cannot
                                        guarantee the contents' accuracy, completeness, or topicality. According to statutory
                                        provisions, we are furthermore responsible for our own content on these web pages.
                                        In this matter, please note that we are not under obligation to supervise merely
                                        transmitted or saved information of third parties, or investigate circumstances pointing
                                        to illegal activity.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-3">Liability for Links</h3>
                                    <p className="text-ci-muted leading-relaxed">
                                        Our offer contains links to external third-party websites. We have no influence on the
                                        contents of those websites, therefore we cannot guarantee for those contents.
                                        Providers or administrators of linked websites are always responsible for the contents
                                        of the linked websites. The linked websites had been checked for possible violations
                                        of law at the time of the establishment of the link.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Copyright */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Copyright
                            </h2>
                            <p className="text-ci-muted leading-relaxed">
                                The content and works on these pages created by the site operators are subject to German
                                copyright law. Duplication, processing, distribution, or any form of commercialization of
                                such material beyond the scope of the copyright law shall require the prior written consent
                                of its respective author or creator. Downloads and copies of this site are only permitted
                                for private, non-commercial use.
                            </p>
                        </section>

                        {/* Data Protection Officer */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                Data Protection
                            </h2>
                            <div className="p-6">
                                <p className="leading-relaxed">
                                    For questions regarding data protection and privacy, please contact us at{' '}
                                    <a href="mailto:privacy@expenzai.app" className="font-medium hover:underline">
                                        privacy@expenzai.app
                                    </a>
                                    {' '}or refer to our{' '}
                                    <a href="/privacy" className="font-medium hover:underline">
                                        Privacy Policy
                                    </a>.
                                </p>
                            </div>
                        </section>

                        {/* EU Dispute Resolution */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">
                                EU Dispute Resolution
                            </h2>
                            <p className="text-ci-muted leading-relaxed break-all">
                                The European Commission provides a platform for online dispute resolution (ODR):
                                <a href="https://ec.europa.eu/consumers/odr" className="text-ci-main hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                                    https://ec.europa.eu/consumers/odr
                                </a>.
                                We are not willing or obliged to participate in dispute resolution proceedings
                                before a consumer arbitration board.
                            </p>
                        </section>

                        {/* Notice */}
                        <section className="pt-8">
                            <div className="bg-ci-warn/10 border border-ci-warn rounded-lg p-6">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-ci-warn mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-medium text-ci-warn mb-2">Personal Project Notice</h3>
                                        <p className="text-ci-warn leading-relaxed">
                                            ExpenzAI is a personal side project created for educational and practical purposes.
                                            While we strive to provide a reliable service, please understand this is not a
                                            commercial enterprise with dedicated support staff.
                                        </p>
                                    </div>
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