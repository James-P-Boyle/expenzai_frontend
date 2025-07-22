'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy', title: 'Read our privacy policy and data protection information' },
    { href: '/terms', label: 'Terms of Service', title: 'View our terms and conditions of service' },
    { href: '/impressum', label: 'Impressum', title: 'Legal disclosure and contact information' },
    { href: '/cookies', label: 'Cookie Policy', title: 'Learn about how we use cookies and tracking' },
    { href: '/gdpr', label: 'Data Protection', title: 'Your GDPR rights and data protection information' },
]

export default function Footer() {
    const pathname = usePathname()

    return (
        <footer className='border-t border-ci-muted/20 mx-2 mt-10 text-ci-white' role="contentinfo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-8">
                    {/* Company Info */}
                    <div className="text-sm">
                        <span itemScope itemType="https://schema.org/Organization">
                            © 2025{' '}
                            <span itemProp="name">ExpenzAI</span>
                            . All rights reserved.
                        </span>
                    </div>
                    
                    {/* Legal Links */}
                    <nav className="flex flex-wrap justify-center md:justify-end gap-4 text-sm" aria-label="Legal and policy links">
                        {legalLinks.map((link) => {
                            const isActive = pathname === link.href
                            
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href} 
                                    className={`transition-colors ${
                                        isActive 
                                            ? 'text-ci-main font-bold underline' 
                                            : 'hover:text-ci-main'
                                    }`}
                                    title={link.title}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
                
                <div className="mt-6 pt-6 border-t border-ci-muted/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ci-muted">
                        {/* Service Description */}
                        <div className="text-center md:text-left">
                            <span itemScope itemType="https://schema.org/WebApplication">
                                <span itemProp="name">ExpenzAI</span> - 
                                <span itemProp="description"> AI-powered expense tracking and receipt management</span>
                            </span>
                        </div>
                        
                        {/* Location & Contact */}
                        <div className="text-center md:text-right">
                            <span itemScope itemType="https://schema.org/Organization">
                                Made in{' '}
                                <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                    <span itemProp="addressLocality">Hünfeld</span>,{' '}
                                    <span itemProp="addressCountry">Germany</span>
                                </span>
                                {' '}•{' '}
                                <Link 
                                    href="mailto:contact@expenzai.app" 
                                    className="hover:text-ci-main transition-colors"
                                    itemProp="email"
                                    title="Contact ExpenzAI support"
                                >
                                    contact@expenzai.app
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}