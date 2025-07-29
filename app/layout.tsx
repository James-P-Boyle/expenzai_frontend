import type { Metadata } from 'next'
import { League_Spartan, Libre_Baskerville } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import ConsentBanner from './components/CookieConsentBanner'
import { ConsentProvider } from './context/CookieConsent'
import ServiceWorkerRegistration from './components/ServiceWorkerRegistration'

const leagueSpartan = League_Spartan({
    variable: "--font-league-spartan",
    subsets: ['latin'],
    display: "swap",
})

const libreBaskerville = Libre_Baskerville({
    variable: "--font-libre-baskerville",
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    display: "swap",
})

const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.expenzai.app' 
    : 'http://localhost:3002'

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl), 
    title: {
        default: 'ExpenzAI - AI-Powered Expense Management',
        template: '%s | ExpenzAI'
    },
    description: 'Transform your expense tracking with AI-powered receipt scanning. Automatically categorize purchases, analyze spending patterns, and manage your finances effortlessly.',
    keywords: [
        'receipt scanner',
        'receipt ai',
        'expense tracker',
        'AI expense management',
        'receipt categorization',
        'expense analytics',
        'financial tracking',
        'receipt OCR',
        'spending analysis',
        'ExpenzAI'
    ],
    authors: [{ name: 'James Boyle - Boylerplate' }],
    creator: 'BoylerPlate',
    publisher: 'ExpenzAI',
    category: 'Finance',
    classification: 'Business',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: baseUrl,
        title: 'ExpenzAI - AI-Powered Expense Management',
        description: 'Transform your expense tracking with AI-powered receipt scanning. Automatically categorize purchases and analyze spending patterns.',
        siteName: 'ExpenzAI',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'ExpenzAI - AI Expense Management Dashboard'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ExpenzAI - AI-Powered Expense Management',
        description: 'Transform your expense tracking with AI-powered receipt scanning.',
        images: ['/og-image.png'],
        creator: '@expenzai'
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: baseUrl,
    },
    verification: {
        // Add when you have these
        // google: 'your-google-verification-code',
        // yandex: 'your-yandex-verification-code',
        // yahoo: 'your-yahoo-verification-code',
    },
    manifest: '/manifest.json',
}

// JSON-LD Structured Data
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ExpenzAI",
    "description": "AI-powered expense management application that automatically categorizes receipts and analyzes spending patterns",
    "url": baseUrl,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "creator": {
        "@type": "Person",
        "name": "James Boyle",
        "jobTitle": "Developer"
    },
    "publisher": {
        "@type": "Organization",
        "name": "BoylerPlate",
        "url": baseUrl
    },
    "featureList": [
        "AI-powered receipt scanning",
        "Automatic expense categorization",
        "Spending analytics and trends",
        "Weekly spending summaries",
        "Receipt image storage",
        "Manual categorization editing"
    ],
    "screenshot": `${baseUrl}/og-image.png`,
    "softwareVersion": "1.0.0",
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "ExpenzAI Features",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Receipt Scanning",
                    "description": "AI-powered receipt scanning and text extraction"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Expense Categorization",
                    "description": "Automatic categorization of expenses using AI"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Spending Analytics",
                    "description": "Interactive charts and spending trend analysis"
                }
            }
        ]
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                {/* Preconnect to important domains */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                
                {/* Favicons - Complete set */}
                <link rel="icon" type="image/png" href="/favicons/favicon-196x196.png" sizes="196x196" />
                <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
                <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16" />
                <link rel="icon" type="image/png" href="/favicons/favicon-128.png" sizes="128x128" />
                
                {/* Apple Touch Icons */}
                <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png" />
                <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
                <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png" />
                <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
                <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png" />
                <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />
                <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png" />
                
                {/* Manifest */}
                <link rel="manifest" href="/manifest.json" />
                
                {/* Theme color - FIXED TO MATCH MANIFEST */}
                <meta name="theme-color" content="#3b82f6" />
                <meta name="msapplication-TileColor" content="#3b82f6" />
                <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
                <meta name="msapplication-square70x70logo" content="/favicons/mstile-70x70.png" />
                <meta name="msapplication-square150x150logo" content="/favicons/mstile-150x150.png" />
                <meta name="msapplication-wide310x150logo" content="/favicons/mstile-310x150.png" />
                <meta name="msapplication-square310x310logo" content="/favicons/mstile-310x310.png" />
                
                {/* Additional meta tags for better SEO */}
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="ExpenzAI" />
                
                {/* Prevent indexing in development */}
                {process.env.NODE_ENV !== 'production' && (
                    <meta name="robots" content="noindex, nofollow" />
                )}
                
                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd)
                    }}
                />
            </head>
            <body className={`${leagueSpartan.variable} ${libreBaskerville.variable} font-sans antialiased`}>
                <ConsentProvider>
                    <AuthProvider>
                        <ServiceWorkerRegistration />
                        <main className="min-h-screen sticky top-0">
                            {children}
                            <ConsentBanner />
                        </main>
                    </AuthProvider>
                </ConsentProvider>
            </body>
        </html>
    )
}