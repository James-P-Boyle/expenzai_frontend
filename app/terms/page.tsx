import { Metadata } from 'next'
import TermsPageClient from './TermPageClient'

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Terms and conditions for using ExpenzAI expense tracking service.',
}

export default function TermsPage() {
    return <TermsPageClient />
}