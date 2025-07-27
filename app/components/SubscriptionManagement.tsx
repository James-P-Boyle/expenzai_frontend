"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/context/AuthContext"
import { Card } from "@/app/components/ui/Card"
import { Button } from "@/app/components/ui/Button"
import { getErrorMessage } from "@/app/lib/error-utils"

import { CheckCircle, CreditCard, ArrowUp, X, CreditCardIcon, AlertCircle } from "lucide-react"
import { Subscription } from "../lib/types"
import { PLAN_FEATURES } from "../lib/constants"
import { api } from "../lib/api"


interface SubscriptionManagementProps {
    className?: string
}

export default function SubscriptionManagement({ className = "" }: SubscriptionManagementProps) {
    const [subscription, setSubscription] = useState<Subscription | null>(null)
    const [usage, setUsage] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [actionLoading, setActionLoading] = useState<string | null>(null)

    const { user, token, isAuthenticated } = useAuth()

    useEffect(() => {
        // Add authentication check
        if (!isAuthenticated || !user || !token) {
            console.log('🚫 User not authenticated, skipping subscription data fetch')
            return
        }

        fetchSubscriptionData()
    }, [user, token, isAuthenticated])

    const fetchSubscriptionData = async () => {
        if (!token || !isAuthenticated) {
            console.error('🚫 No token available for subscription fetch')
            setError('Authentication required. Please log in again.')
            return
        }

        setIsLoading(true)
        setError('')
        
        try {
            console.log('📡 Fetching subscription data...')
            
            const [subResponse, usageResponse] = await Promise.all([
                api.subscription.getCurrentSubscription(token),
                api.subscription.getUploadUsage(token)
            ])
            
            console.log('✅ Subscription data fetched:', { subResponse, usageResponse })
            
            setSubscription(subResponse.data)
            setUsage(usageResponse)
        } catch (err) {
            console.error('❌ Failed to fetch subscription data:', err)
            const errorMessage = getErrorMessage(err, "Failed to load subscription data")
            setError(errorMessage)
            
            // If it's an auth error, suggest re-login
            if (errorMessage.includes('Unauthenticated') || errorMessage.includes('401')) {
                setError('Session expired. Please log in again.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpgrade = async () => {
        if (!token) {
            setError('Authentication required. Please log in again.')
            return
        }

        setActionLoading("upgrade")
        setError('')
        
        try {
            const response = await api.subscription.createSubscription("pro", "monthly", token)
            
            if (response.checkout_url) {
                window.location.href = response.checkout_url
            }
        } catch (err) {
            console.error('❌ Upgrade failed:', err)
            setError(getErrorMessage(err, "Failed to start upgrade"))
        } finally {
            setActionLoading(null)
        }
    }

    const handleManageBilling = async () => {
        if (!token) {
            setError('Authentication required. Please log in again.')
            return
        }

        setActionLoading("billing")
        setError('')
        
        try {
            const response = await api.subscription.getBillingPortal(token)
            window.location.href = response.url
        } catch (err) {
            console.error('❌ Billing portal failed:', err)
            setError(getErrorMessage(err, "Failed to open billing portal"))
        } finally {
            setActionLoading(null)
        }
    }

    const handleCancelSubscription = async () => {
        if (!token || !subscription) return

        if (!confirm("Are you sure you want to cancel your subscription? It will remain active until the end of your billing period.")) {
            return
        }

        setActionLoading("cancel")
        setError('')
        
        try {
            await api.subscription.cancelSubscription(token)
            await fetchSubscriptionData() // Refresh data
        } catch (err) {
            console.error('❌ Cancel failed:', err)
            setError(getErrorMessage(err, "Failed to cancel subscription"))
        } finally {
            setActionLoading(null)
        }
    }

    const handleResumeSubscription = async () => {
        if (!token || !subscription) return

        setActionLoading("resume")
        setError('')
        
        try {
            await api.subscription.resumeSubscription(token)
            await fetchSubscriptionData() // Refresh data
        } catch (err) {
            console.error('❌ Resume failed:', err)
            setError(getErrorMessage(err, "Failed to resume subscription"))
        } finally {
            setActionLoading(null)
        }
    }

    // Show authentication error state
    if (!isAuthenticated || !user) {
        return (
            <Card className={`p-6 ${className}`}>
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-ci-warn mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        Authentication Required
                    </h3>
                    <p className="text-ci-muted mb-4">
                        Please log in to manage your subscription.
                    </p>
                    <Button 
                        onClick={() => window.location.href = '/auth/login'}
                        variant="secondary"
                    >
                        Go to Login
                    </Button>
                </div>
            </Card>
        )
    }

    if (isLoading) {
        return (
            <Card className={`p-6 ${className}`}>
                <div className="animate-pulse">
                    <div className="h-6 bg-ci-muted/20 rounded mb-4"></div>
                    <div className="h-4 bg-ci-muted/20 rounded mb-2"></div>
                    <div className="h-4 bg-ci-muted/20 rounded"></div>
                </div>
            </Card>
        )
    }

    const currentPlan = subscription?.plan?.name || "Free"
    const isOnTrial = subscription?.status === "trialing"
    const isCancelled = subscription?.cancel_at_period_end
    const isFreePlan = !subscription || currentPlan === "Free"

    return (
        <div className={`space-y-6 flex flex-col justify-between ${className}`}>

            {/* Error Display */}
            {error && (
                <Card className="p-4 bg-ci-danger/10 border-ci-danger/20">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-ci-danger flex-shrink-0" />
                        <div>
                            <p className="text-ci-danger">{error}</p>
                            {error.includes('Session expired') && (
                                <Button 
                                    onClick={() => window.location.href = '/auth/login'}
                                    variant="secondary"
                                    size="sm"
                                    className="mt-2"
                                >
                                    Login Again
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            )}

            <div className="flex gap-2">
                {/* Current Plan Card */}
                <Card className="p-6 w-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                {currentPlan} Plan
                                {isOnTrial && (
                                    <span className="bg-ci-main text-ci-black px-2 py-1 rounded-full text-xs font-semibold">
                                        Free Trial
                                    </span>
                                )}
                                {isCancelled && (
                                    <span className="bg-ci-warn text-ci-black px-2 py-1 rounded-full text-xs font-semibold">
                                        Cancelling
                                    </span>
                                )}
                            </h3>
                            {subscription && (
                                <p className="text-ci-muted text-sm">
                                    {isOnTrial ? "Trial" : subscription.billing_interval} billing
                                    {subscription.current_period_end && (
                                        <span className="ml-2">
                                            • Next billing: {new Date(subscription.current_period_end).toLocaleDateString()}
                                        </span>
                                    )}
                                </p>
                            )}
                        </div>

                        {!isFreePlan && (
                            <Button
                                onClick={handleManageBilling}
                                variant="secondary"
                                size="sm"
                                isLoading={actionLoading === "billing"}
                                disabled={!!actionLoading}
                            >
                                <CreditCardIcon className="h-4 w-4 mr-1" />
                                Billing
                            </Button>
                        )}
                    </div>

                    {/* Usage Stats */}
                    {usage && (
                        <div className="bg-ci-muted/5 rounded-lg p-4 mb-4">
                            <h4 className="font-medium text-foreground mb-2">Usage This Month</h4>
                            <div className="flex justify-between items-center">
                                <span className="text-ci-muted">Receipts uploaded:</span>
                                <span className="font-semibold text-foreground">
                                    {usage.current_month_uploads}
                                    {usage.limit !== -1 && ` / ${usage.limit}`}
                                </span>
                            </div>
                            {usage.limit !== -1 && (
                                <div className="mt-2">
                                    <div className="w-full bg-ci-muted/20 rounded-full h-2">
                                        <div 
                                            className="bg-ci-main h-2 rounded-full transition-all"
                                            style={{ 
                                                width: `${Math.min(100, (usage.current_month_uploads / usage.limit) * 100)}%` 
                                            }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-ci-muted mt-1">
                                        {usage.remaining > 0 
                                            ? `${usage.remaining} uploads remaining` 
                                            : "Upload limit reached"
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Plan Features */}
                    <div className="mb-6">
                        <h4 className="font-medium text-foreground mb-3">Plan Features</h4>
                        <ul className="space-y-2">
                            {PLAN_FEATURES[isFreePlan ? "free" : "pro"].map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-ci-success flex-shrink-0" />
                                    <span className="text-ci-muted">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-ci-muted/20 mt-auto">
                        {isFreePlan ? (
                            <Button
                                onClick={handleUpgrade}
                                className="flex-1"
                                variant="outline"
                                isLoading={actionLoading === "upgrade"}
                                disabled={!!actionLoading}
                            >
                                <ArrowUp className="h-4 w-4 mr-1" />
                                Upgrade to Pro
                            </Button>
                        ) : (
                            <>
                                {isCancelled ? (
                                    <Button
                                        onClick={handleResumeSubscription}
                                        className="flex-1"
                                        isLoading={actionLoading === "resume"}
                                        disabled={!!actionLoading}
                                    >
                                        Resume Subscription
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleCancelSubscription}
                                        variant="secondary"
                                        className="flex-1 text-ci-danger border-ci-danger hover:bg-ci-danger/10"
                                        isLoading={actionLoading === "cancel"}
                                        disabled={!!actionLoading}
                                    >
                                        <X className="h-4 w-4 mr-1" />
                                        Cancel Subscription
                                    </Button>
                                )}
                            </>
                        )}
                    </div>

                    {isCancelled && subscription && (
                        <div className="mt-4 p-3 bg-ci-warn/10 border border-ci-warn/20 rounded-lg">
                            <p className="text-ci-warn text-sm">
                                Your subscription will be cancelled on{" "}
                                {new Date(subscription.current_period_end).toLocaleDateString()}.
                                You'll continue to have access until then.
                            </p>
                        </div>
                    )}
                </Card>

                {/* Upgrade Card (for free users) */}
                {isFreePlan && (
                    <Card className="flex flex-col p-6 bg-gradient-to-r from-ci-main/5 to-ci-main/10 border-ci-main/20 w-full">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            Upgrade to Pro
                        </h3>
                        <p className="text-ci-muted mb-4">
                            Get unlimited uploads, advanced analytics, and priority support.
                        </p>
                        
                        <div className="flex flex-col items-start gap-4 mb-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-foreground">$4.99</p>
                                <p className="text-xs text-ci-muted">per month</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-foreground">$49.99</p>
                                <p className="text-xs text-ci-muted">per year</p>
                                <p className="text-xs text-ci-success font-medium">Save 17%</p>
                            </div>
                            <p className="text-xs text-ci-muted text-center mb-2">
                                No credit card required • Cancel anytime
                            </p>
                        </div>

                        <div className="pt-4 border-t border-ci-muted/20 w-full max-w-[450px] mt-auto">
                            <Button
                                onClick={handleUpgrade}
                                className="w-full bg-ci-success hover:bg-ci-success/80"
                                isLoading={actionLoading === "upgrade"}
                                disabled={!!actionLoading}
                            >
                                Start 30-Day Free Trial
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    )
}