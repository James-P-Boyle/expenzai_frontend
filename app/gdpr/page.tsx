import { Metadata } from 'next'
import GDPRPageClient from './GDPRPageClient'

export const metadata: Metadata = {
    title: 'GDPR Compliance & Data Protection Rights',
    description: 'Your rights under GDPR and how ExpenzAI ensures compliance with European data protection regulations.',
}

export default function GDPRPage() {
    return <GDPRPageClient />
}
