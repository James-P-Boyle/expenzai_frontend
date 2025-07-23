'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, XCircle, Mail, Loader2 } from 'lucide-react'
import { api } from '../lib/api'
import { Button } from '../components/ui/Button'

export default function VerifyEmailPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
    const [message, setMessage] = useState('')
    const [isResending, setIsResending] = useState(false)

    const token = searchParams.get('token')
    const email = searchParams.get('email')

    useEffect(() => {
        if (!token || !email) {
            setStatus('error')
            setMessage('Invalid verification link. Missing token or email.')
            return
        }

        verifyEmail()
    }, [token, email])

    const verifyEmail = async () => {
        try {
            const data = await api.verifyEmail(token!, email!)
            
            setStatus('success')
            setMessage(data.message || 'Email verified successfully!')
            
            // Redirect to dashboard after 3 seconds
            setTimeout(() => {
                router.push('/dashboard')
            }, 3000)
        } catch (error: any) {
            setStatus('error')
            setMessage(error.message || 'Verification failed. Please try again.')
        }
    }

    const resendVerification = async () => {
        setIsResending(true)
        try {
            const authToken = localStorage.getItem('auth-token')
            const data = await api.resendVerification(authToken || undefined)
            alert(data.message || 'Verification email sent! Please check your inbox.')
        } catch (error: any) {
            alert(error.message || 'Failed to resend verification email. Please try again.')
        } finally {
            setIsResending(false)
        }
    }

    return (
        <div className="min-h-screen bg-radial from-ci-black/50  to-ci-main/20 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-ci-black rounded-lg shadow-lg p-8 text-center">
                {status === 'verifying' && (
                    <>
                        <Loader2 className="h-16 w-16 text-ci-main mx-auto mb-4 animate-spin" />
                        <h1 className="text-2xl font-bold text-ci-white mb-2">
                            Verifying Email...
                        </h1>
                        <p className="text-ci-muted mb-4">
                            Please wait while we verify your email address.
                        </p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <CheckCircle className="h-16 w-16 text-ci-success mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-ci-white mb-2">
                            Email Verified!
                        </h1>
                        <p className="text-ci-muted mb-4">
                            {message}
                        </p>
                        <p className="text-sm text-ci-muted mb-4">
                            Redirecting to dashboard in 3 seconds...
                        </p>
                        <Button onClick={() => router.push('/dashboard')}>
                            Go to Dashboard Now
                        </Button>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <XCircle className="h-16 w-16 text-ci-danger mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-ci-white mb-2">
                            Verification Failed
                        </h1>
                        <p className="text-ci-muted mb-6">
                            {message}
                        </p>
                        
                        <div className="space-y-3">
                            <Button
                                onClick={verifyEmail}
                                variant='secondary'
                            >
                                Try Again
                            </Button>
                            
                            <Button
                                onClick={resendVerification}
                                disabled={isResending}

                            >
                                {isResending ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="h-4 w-4 mr-2" />
                                        Resend Verification Email
                                    </>
                                )}
                            </Button>
                            
                            <button
                                onClick={() => router.push('/auth/login')}
                                className="w-full text-ci-main py-2 px-4 transition duration-200 cursor-pointer"
                            >
                                Back to Login
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}