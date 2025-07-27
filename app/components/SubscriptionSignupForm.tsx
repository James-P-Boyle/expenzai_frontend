'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext'
import { Card } from '@/app/components/ui/Card'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import { getErrorMessage } from '@/app/lib/error-utils'
import { api } from '../lib/api'
import { CheckCircle, Sparkles } from 'lucide-react'
import { PLAN_DETAILS } from '../lib/constants'

interface SubscriptionSignupFormProps {
    onSuccess?: () => void
    showLinks?: boolean
    className?: string
}

export default function SubscriptionSignupForm({ 
    onSuccess, 
    showLinks = true, 
    className = "" 
}: SubscriptionSignupFormProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [step, setStep] = useState<'signup' | 'payment'>('signup')
    
    const { register } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    
    // Get plan from URL params
    const selectedPlan = searchParams.get('plan') || 'free'
    const billingInterval = (searchParams.get('billing') as 'monthly' | 'yearly') || 'monthly'
    
    const planDetails = PLAN_DETAILS[selectedPlan as keyof typeof PLAN_DETAILS] || PLAN_DETAILS.free
    const price = planDetails.price[billingInterval]

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        // Basic validation
        if (password !== passwordConfirmation) {
            setError('Passwords do not match')
            setIsLoading(false)
            return
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            setIsLoading(false)
            return
        }

        try {
            const response = await register({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            })

            // If free plan, redirect to dashboard
            if (selectedPlan === 'free') {
                if (onSuccess) {
                    onSuccess()
                } else {
                    router.push('/dashboard')
                }
                return
            }

            // For paid plans, proceed to payment
            setStep('payment')
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Registration failed'))
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubscription = async () => {
        setIsLoading(true)
        setError('')

        try {
            const response = await api.createSubscription(selectedPlan, billingInterval)
            
            if (response.checkout_url) {
                // Redirect to Stripe Checkout
                window.location.href = response.checkout_url
            } else {
                // Handle trial or success
                router.push('/dashboard?subscription=success')
            }
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Failed to start subscription'))
        } finally {
            setIsLoading(false)
        }
    }

    const isFormValid = name && email && password && passwordConfirmation

    if (step === 'payment') {
        return (
            <Card className={`p-6 max-w-md mx-auto ${className}`}>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                        Complete Your Subscription
                    </h2>
                    <p className="text-ci-muted">
                        Welcome {name}! Let's set up your {planDetails.name} plan.
                    </p>
                </div>

                {/* Plan Summary */}
                <div className="bg-ci-main/5 border border-ci-main/20 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-foreground">{planDetails.name} Plan</h3>
                        {planDetails.popular && (
                            <span className="bg-ci-main text-ci-black px-2 py-1 rounded-full text-xs font-semibold">
                                Popular
                            </span>
                        )}
                    </div>
                    
                    <div className="flex justify-between items-baseline mb-3">
                        <span className="text-2xl font-bold text-foreground">
                            ${price}
                        </span>
                        <span className="text-ci-muted">
                            /{billingInterval === 'monthly' ? 'month' : 'year'}
                        </span>
                    </div>

                    {selectedPlan !== 'free' && (
                        <div className="flex items-center gap-1 text-ci-success text-sm mb-3">
                            <Sparkles className="h-4 w-4" />
                            <span>30-day free trial included</span>
                        </div>
                    )}

                    <ul className="space-y-2">
                        {planDetails.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-ci-muted">
                                <CheckCircle className="h-4 w-4 text-ci-success flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {error && (
                    <div className="bg-ci-danger/20 border border-ci-danger text-ci-danger px-4 py-3 rounded-md mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <Button
                        onClick={handleSubscription}
                        className="w-full"
                        isLoading={isLoading}
                    >
                        {isLoading ? 'Setting up...' : 'Start Free Trial'}
                    </Button>

                    <Button
                        onClick={() => setStep('signup')}
                        variant="secondary"
                        className="w-full"
                        disabled={isLoading}
                    >
                        ← Back to Signup
                    </Button>
                </div>

                <div className="text-center text-xs text-ci-muted mt-4">
                    <p>No credit card required for trial</p>
                    <p>Cancel anytime during trial period</p>
                </div>
            </Card>
        )
    }

    return (
        <Card className={`p-6 max-w-md mx-auto ${className}`}>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                    Create Your Account
                </h2>
                {selectedPlan !== 'free' && (
                    <p className="text-ci-muted">
                        Sign up for {planDetails.name} - {billingInterval} billing
                    </p>
                )}
            </div>

            {/* Selected Plan Preview */}
            {selectedPlan !== 'free' && (
                <div className="bg-ci-main/5 border border-ci-main/20 rounded-lg p-3 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold text-foreground">{planDetails.name}</h4>
                            <p className="text-sm text-ci-muted">
                                ${price}/{billingInterval === 'monthly' ? 'mo' : 'yr'}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-ci-success font-medium">30-day trial</p>
                            <Link 
                                href="/pricing" 
                                className="text-xs text-ci-main hover:underline"
                            >
                                Change plan
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <form className="space-y-6" onSubmit={handleSignup}>
                {error && (
                    <div className="bg-ci-danger/20 border border-ci-danger text-ci-danger px-4 py-3 rounded-md">
                        {error}
                    </div>
                )}

                <Input
                    label="Full name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                />

                <Input
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                />

                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Create a password (min 8 characters)"
                />

                <Input
                    label="Confirm password"
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    placeholder="Confirm your password"
                />

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={isLoading}
                    disabled={!isFormValid}
                >
                    {isLoading ? 'Creating account...' : 
                     selectedPlan === 'free' ? 'Create account' : 
                     'Create account & continue'}
                </Button>

                {showLinks && (
                    <div className="text-center text-sm text-ci-muted">
                        Already have an account?{' '}
                        <Link 
                            href={`/auth/login${selectedPlan !== 'free' ? `?plan=${selectedPlan}&billing=${billingInterval}` : ''}`}
                            className="text-ci-main hover:underline"
                        >
                            Sign in
                        </Link>
                    </div>
                )}
            </form>
        </Card>
    )
}