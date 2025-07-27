import { Metadata } from 'next'
import PrivacyPageClient from './PrivacyPageClient'

export const metadata: Metadata = {
    title: 'Privacy Policy & Data Protection',
    description: 'Learn how ExpenzAI collects, uses, and protects your personal data in compliance with GDPR and other privacy regulations.',
}

export default function PrivacyPage() {
    return <PrivacyPageClient />
}