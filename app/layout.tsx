import type { Metadata } from 'next'
import { League_Spartan, Libre_Baskerville } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './context/AuthContext'

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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
    title: {
        default: 'Receipt Tracker - AI-Powered Expense Management',
        template: '%s | Receipt Tracker'
    },
    description: 'Transform your expense tracking with AI-powered receipt scanning. Automatically categorize purchases, analyze spending patterns, and manage your finances effortlessly.',
    keywords: [
        'receipt scanner',
        'expense tracker',
        'AI expense management',
        'receipt categorization',
        'expense analytics',
        'financial tracking',
        'receipt OCR',
        'spending analysis'
    ],
    authors: [{ name: 'Receipt Tracker Team' }],
    creator: 'BoylerPlate',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: baseUrl,
        title: 'Receipt Tracker - AI-Powered Expense Management',
        description: 'Transform your expense tracking with AI-powered receipt scanning. Automatically categorize purchases and analyze spending patterns.',
        siteName: 'Receipt Tracker',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Receipt Tracker - AI Expense Management Dashboard'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Receipt Tracker - AI-Powered Expense Management',
        description: 'Transform your expense tracking with AI-powered receipt scanning.',
        images: ['/og-image.png']
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
                
                {/* Favicons */}
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                
                {/* Theme color */}
                <meta name="theme-color" content="#3b82f6" />
                <meta name="msapplication-TileColor" content="#3b82f6" />
                
                {/* Additional meta tags */}
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            </head>
            <body className={`${leagueSpartan.variable} ${libreBaskerville.variable} font-sans antialiased`}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}