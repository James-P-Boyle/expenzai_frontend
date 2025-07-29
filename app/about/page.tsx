import { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
    title: 'About ExpenzAI - AI-Powered Expense Tracking & Receipt Processing',
    description: 'Discover how ExpenzAI revolutionizes expense tracking with AI-powered receipt processing. Snap photos, email receipts to receipts@expenzai.app, or upload images for instant categorization and analytics. 99% accuracy, mobile-first design, and enterprise security.',
}

export default function AboutPage() {
    return <AboutPageClient />
}