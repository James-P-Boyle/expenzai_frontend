'use client'

import { useAuth } from '../context/AuthContext'
import { usePricing } from '../hooks/usePricing'

import Navbar from '../components/partials/Navbar'
import { PricingHeader } from './components/PricingHeader'
import { UserStatusBanner } from './components/UserStatusBanner'
import { BillingToggle } from './components/BillingToggle'
import { FEATURE_HIGHLIGHTS, PRICING_PLANS } from '../lib/constants'
import { PricingCard } from './components/PricingCard'
import { FeatureHighlights } from './components/FeatureHighlights'

interface StaticPricingPageProps {
    showHeader?: boolean
    className?: string
}

export default function StaticPricingPage({
    showHeader = true,
    className = ''
}: StaticPricingPageProps) {
    const { isAuthenticated, isLoading } = useAuth()
    const { user, billingInterval, handleGetStarted, handleIntervalChange } = usePricing()

    return (
        <div className={`bg-background ${className} flex flex-col gap-16`}>
            <Navbar isAuthenticated={isAuthenticated} loading={isLoading} />
            
            <PricingHeader showHeader={showHeader} />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
                <UserStatusBanner user={user} />

                <BillingToggle 
                    billingInterval={billingInterval}
                    onIntervalChange={handleIntervalChange}
                />

                {/* Plans Grid */}
                <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-16 lg:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {PRICING_PLANS.map((plan) => (
                        <PricingCard
                            key={plan.id}
                            plan={plan}
                            billingInterval={billingInterval}
                            onGetStarted={handleGetStarted}
                        />
                    ))}
                </div>

                <FeatureHighlights features={FEATURE_HIGHLIGHTS} />
            </div>
        </div>
    )
}