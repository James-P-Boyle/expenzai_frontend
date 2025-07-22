import { Metadata } from 'next'
import ImpressumPageClient from './ImpressumPageClient'

export const metadata: Metadata = {
    title: 'Impressum - Legal Information',
    description: 'Legal disclosure and contact information for ExpenzAI as required by German law.',
}

export default function ImpressumPage() {
    return <ImpressumPageClient />
}