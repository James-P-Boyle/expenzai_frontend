import { Suspense } from 'react'
import SubscriptionPageClient from './SubscriptionPageClient'
import { Loader } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'View and manage subscriptions',
    // description: 'Your rights under GDPR and how ExpenzAI ensures compliance with European data protection regulations.',
}

export default function SubscriptionPage() {
    return (
        <Suspense fallback={<Loader />}>
            <SubscriptionPageClient />
        </Suspense>
    )
}
