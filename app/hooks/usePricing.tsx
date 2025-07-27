// app/hooks/usePricing.ts

import { useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import type { User } from '@/app/lib/types'

export function usePricing() {
    const { user } = useAuth()
    const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly')

    const handleGetStarted = (planId: string) => {
        if (user) {
            // Redirect to dashboard subscription management
            window.location.href = `/dashboard?tab=subscription&plan=${planId}`
        } else {
            // Redirect to signup with plan parameter
            window.location.href = `/auth/register?plan=${planId}&billing=${billingInterval}`
        }
    }

    const handleIntervalChange = (interval: 'monthly' | 'yearly') => {
        setBillingInterval(interval)
    }

    return {
        user,
        billingInterval,
        handleGetStarted,
        handleIntervalChange,
    }
}