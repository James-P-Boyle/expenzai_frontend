import { Metadata } from 'next'
import CookiePageClient from './CookiePageClient'

export const metadata: Metadata = {
    title: 'Cookie Policy',
    description: 'Learn about how ExpenzAI uses cookies and similar technologies to improve your experience.',
}

export default function CookiePage() {
    return <CookiePageClient />
}