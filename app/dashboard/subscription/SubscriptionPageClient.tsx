
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import SubscriptionManagement from '@/app/components/SubscriptionManagement'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { useAuth } from '@/app/context/AuthContext'
import { api } from '@/app/lib/api'
import { getErrorMessage } from '@/app/lib/error-utils'
import { ExternalLink, Sparkles, Lock } from 'lucide-react'
import type { Subscription } from '@/app/lib/types'

export default function SubscriptionPage() {
    const searchParams = useSearchParams()
    const { user, token } = useAuth()
    const [showSuccess, setShowSuccess] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState('')
    const [subscription, setSubscription] = useState<Subscription | null>(null)
    const [isLoadingSubscription, setIsLoadingSubscription] = useState(true)

    // Check for subscription success/plan upgrade from URL params
    const tab = searchParams.get('tab')
    const planParam = searchParams.get('plan')
    const subscriptionParam = searchParams.get('subscription')

    useEffect(() => {
        if (subscriptionParam === 'success') {
            setShowSuccess(true)
            // Auto-hide success message after 5 seconds
            const timer = setTimeout(() => setShowSuccess(false), 5000)
            return () => clearTimeout(timer)
        }
    }, [subscriptionParam])

    // Fetch subscription data
    useEffect(() => {
        const fetchSubscription = async () => {
            if (!token) {
                setIsLoadingSubscription(false)
                return
            }

            try {
                const response = await api.subscription.getCurrentSubscription(token)
                setSubscription(response.data)
            } catch (err) {
                console.error('Failed to fetch subscription:', err)
                // Don't show error for this, as it's handled in SubscriptionManagement
            } finally {
                setIsLoadingSubscription(false)
            }
        }

        fetchSubscription()
    }, [token])

    const handleQuickUpgrade = async () => {
        if (!token) return

        setIsProcessing(true)
        setError('')

        try {
            const response = await api.createSubscription('pro', 'monthly', token)
            
            if (response.checkout_url) {
                window.location.href = response.checkout_url
            }
        } catch (err) {
            setError(getErrorMessage(err, 'Failed to start upgrade'))
        } finally {
            setIsProcessing(false)
        }
    }

    const handleBillingPortal = async () => {
        if (!token || !subscription) return

        setIsProcessing(true)
        setError('')

        try {
            const response = await api.subscription.getBillingPortal(token)
            window.open(response.url, '_blank')
        } catch (err) {
            setError(getErrorMessage(err, 'Failed to open billing portal'))
        } finally {
            setIsProcessing(false)
        }
    }

    // Check if user has active subscription
    const hasActiveSubscription = subscription && 
        ['active', 'trialing'].includes(subscription.status) &&
        new Date(subscription.current_period_end) > new Date()

    return (
        <div className="space-y-6">
            {/* Success Banner */}
            {showSuccess && (
                <Card className="p-4 bg-ci-success/10 border-ci-success/20">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-ci-success/20 rounded-full flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-ci-success" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-ci-success">Subscription Updated Successfully!</h3>
                            <p className="text-sm text-ci-success/80">
                                Your new plan is now active. Welcome to ExpenzAI Pro!
                            </p>
                        </div>
                    </div>
                </Card>
            )}

            {/* Error Message */}
            {error && (
                <Card className="p-4 bg-ci-danger/10 border-ci-danger/20">
                    <p className="text-ci-danger">{error}</p>
                </Card>
            )}

            {/* Main Subscription Management */}
            <SubscriptionManagement />

            {/* Additional Resources */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                    Need Help?
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <h4 className="font-medium text-foreground">Billing Questions</h4>
                        <p className="text-sm text-ci-muted">
                            View your invoices, update payment methods, and manage billing details.
                        </p>
                        
                        {hasActiveSubscription ? (
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={handleBillingPortal}
                                disabled={isProcessing || isLoadingSubscription}
                                isLoading={isProcessing}
                            >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Billing Portal
                            </Button>
                        ) : (
                            <div className="space-y-2">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    disabled={true}
                                    className="opacity-50 cursor-not-allowed"
                                >
                                    <Lock className="h-4 w-4 mr-1" />
                                    Billing Portal
                                </Button>
                                <p className="text-xs text-ci-muted">
                                    {isLoadingSubscription 
                                        ? 'Loading subscription...' 
                                        : 'Active subscription required'
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-3">
                        <h4 className="font-medium text-foreground">Support</h4>
                        <p className="text-sm text-ci-muted">
                            Have questions about your subscription or need technical support?
                        </p>
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open('mailto:support@expenzai.app', '_blank')}
                        >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Contact Support
                        </Button>
                    </div>
                </div>

                {/* Additional info for free users */}
                {!hasActiveSubscription && !isLoadingSubscription && (
                    <div className="mt-6 p-4 bg-ci-main/5 border border-ci-main/20 rounded-lg">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-ci-main/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Sparkles className="h-3 w-3 text-ci-main" />
                            </div>
                            <div>
                                <h5 className="font-medium text-foreground mb-1">Upgrade to Pro for Billing Management</h5>
                                <p className="text-sm text-ci-muted mb-3">
                                    Access the billing portal to manage invoices, update payment methods, and view your subscription details.
                                </p>
                                <Button 
                                    onClick={handleQuickUpgrade}
                                    size="sm"
                                    isLoading={isProcessing}
                                    disabled={isProcessing}
                                >
                                    Upgrade to Pro
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Card>

            {/* Plan Comparison */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                    Plan Comparison
                </h3>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-ci-muted/20">
                                <th className="text-left py-3 font-medium text-foreground">Feature</th>
                                <th className="text-center py-3 font-medium text-foreground">Free</th>
                                <th className="text-center py-3 font-medium text-foreground">
                                    Pro
                                    {hasActiveSubscription && (
                                        <span className="ml-1 text-xs bg-ci-main text-ci-black px-1.5 py-0.5 rounded-full">
                                            Current
                                        </span>
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-ci-muted/20">
                            <tr>
                                <td className="py-3 text-ci-muted">Monthly Uploads</td>
                                <td className="py-3 text-center text-foreground">8 receipts</td>
                                <td className="py-3 text-center text-ci-success font-medium">Unlimited</td>
                            </tr>
                            <tr>
                                <td className="py-3 text-ci-muted">AI Categorization</td>
                                <td className="py-3 text-center text-ci-success">✓</td>
                                <td className="py-3 text-center text-ci-success">✓</td>
                            </tr>
                            <tr>
                                <td className="py-3 text-ci-muted">Basic Analytics</td>
                                <td className="py-3 text-center text-ci-success">✓</td>
                                <td className="py-3 text-center text-ci-success">✓</td>
                            </tr>
                            <tr>
                                <td className="py-3 text-ci-muted">Advanced Analytics</td>
                                <td className="py-3 text-center text-ci-muted">—</td>
                                <td className="py-3 text-center text-ci-success">✓</td>
                            </tr>
                            <tr>
                                <td className="py-3 text-ci-muted">Export Features</td>
                                <td className="py-3 text-center text-ci-muted">—</td>
                                <td className="py-3 text-center text-ci-success">✓</td>
                            </tr>
                            <tr>
                                <td className="py-3 text-ci-muted">Priority Support</td>
                                <td className="py-3 text-center text-ci-muted">—</td>
                                <td className="py-3 text-center text-ci-success">✓</td>
                            </tr>
                            <tr>
                                <td className="py-3 text-ci-muted">Billing Portal Access</td>
                                <td className="py-3 text-center text-ci-muted">—</td>
                                <td className="py-3 text-center text-ci-success">✓</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}