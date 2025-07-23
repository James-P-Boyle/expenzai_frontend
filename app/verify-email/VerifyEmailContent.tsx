'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, XCircle, Mail, Loader2 } from 'lucide-react'
import { api } from '../../lib/api'
import { Button } from '../../components/ui/Button'

export default function VerifyEmailContent() {
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
            setMessage('Invalid verification link. Please check your email for the correct link.')
            return
        }

        const verifyEmail = async () => {
            try {
                const response = await api.post('/auth/verify-email', {
                    token,
                    email
                })

                if (response.data.success) {
                    setStatus('success')
                    setMessage('Your email has been verified successfully!')
                    
                    // Redirect to login after 3 seconds
                    setTimeout(() => {
                        router.push('/auth/login?verified=true')
                    }, 3000)
                } else {
                    setStatus('error')
                    setMessage(response.data.message || 'Verification failed')
                }
            } catch (error: any) {
                setStatus('error')
                setMessage(error.response?.data?.message || 'An error occurred during verification')
            }
        }

        verifyEmail()
    }, [token, email, router])

    const handleResendVerification = async () => {
        if (!email) return

        setIsResending(true)
        try {
            const response = await api.post('/auth/resend-verification', {
                email
            })

            if (response.data.success) {
                setMessage('Verification email sent! Please check your inbox.')
            } else {
                setMessage(response.data.message || 'Failed to resend verification email')
            }
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'An error occurred while resending')
        } finally {
            setIsResending(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        {status === 'verifying' && (
                            <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
                        )}
                        {status === 'success' && (
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        )}
                        {status === 'error' && (
                            <XCircle className="h-16 w-16 text-red-500" />
                        )}
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {status === 'verifying' && 'Verifying Your Email'}
                        {status === 'success' && 'Email Verified!'}
                        {status === 'error' && 'Verification Failed'}
                    </h2>

                    <p className="text-gray-600 mb-8">
                        {message}
                    </p>

                    {status === 'success' && (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">
                                Redirecting to login page in a few seconds...
                            </p>
                            <Button 
                                onClick={() => router.push('/auth/login?verified=true')}
                                className="w-full"
                            >
                                Continue to Login
                            </Button>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="space-y-4">
                            <Button
                                onClick={handleResendVerification}
                                disabled={isResending || !email}
                                className="w-full"
                                variant="outline"
                            >
                                {isResending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="w-4 h-4 mr-2" />
                                        Resend Verification Email
                                    </>
                                )}
                            </Button>
                            
                            <Button
                                onClick={() => router.push('/auth/login')}
                                variant="ghost"
                                className="w-full"
                            >
                                Back to Login
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}