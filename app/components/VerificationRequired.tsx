'use client'

import { Mail, CheckCircle, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { useState } from 'react'
import { Button } from './ui/Button'

export default function VerificationRequired() {
    const { user, refreshUser } = useAuth()
    const [isResending, setIsResending] = useState(false)
    const [isChecking, setIsChecking] = useState(false)
    const [message, setMessage] = useState('')

    const resendVerification = async () => {
        setIsResending(true)
        setMessage('')
        
        try {
            const token = localStorage.getItem('auth_token')
            const response = await api.resendVerification(token || undefined)
            setMessage('Verification email sent! Please check your inbox.')
        } catch (error: any) {
            setMessage('Failed to send verification email. Please try again.')
        } finally {
            setIsResending(false)
        }
    }

    const checkVerification = async () => {
        setIsChecking(true)
        console.log('Before refresh - user verified:', user?.email_verified_at)
        
        const freshUserData = await refreshUser()
        
        setIsChecking(false)
    }

    return (
        <div className="flex items-center justify-center">
            <div className="max-w-md w-full rounded-lg p-6 text-center">
                <Mail className="h-16 w-16 text-ci-main mx-auto mb-4" />
                
                <h1 className="text-2xl font-bold text-ci-black dark:text-ci-white mb-2">
                    Email Verification Required
                </h1>
                
                <p className="text-ci-muted mb-4">
                    Hi <span className="dark:text-ci-white text-ci-black font-bold">{user?.name}</span>! 
                    To access this feature, please verify your email address.
                </p>

                <p className="text-sm text-ci-muted mb-6">
                    We've sent a verification link to{' '}
                    <span className="text-ci-main font-medium">{user?.email}</span>
                </p>

                <div className="space-y-3 mb-6">
                    <Button
                        onClick={resendVerification}
                        disabled={isResending}
                        variant="secondary"
                        className="w-full"
                    >
                        {isResending ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            'Resend Verification Email'
                        )}
                    </Button>
                    
                    <Button
                        onClick={checkVerification}
                        disabled={isChecking}
                        className="w-full flex items-center justify-center hover:bg-ci-success"
                    >
                        {isChecking ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Checking...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                I've Verified - Check Status
                            </>
                        )}
                    </Button>
                </div>

                {message && (
                    <div className={`p-3 rounded-md text-sm border mb-6 ${
                        message.includes('sent') 
                            ? 'bg-ci-success/10 text-ci-success border-ci-success/20' 
                            : 'bg-ci-danger/10 text-ci-danger border-ci-danger/20'
                    }`}>
                        {message}
                    </div>
                )}

                <div className="p-4 bg-ci-main/10 border border-ci-main/20 rounded-md">
                    <p className="text-sm text-ci-black font-medium mb-2">
                        What you can do while unverified:
                    </p>
                    <ul className="text-sm text-ci-muted text-left space-y-1">
                        <li>• Upload receipts (limited)</li>
                        <li>• View your uploaded receipts</li>
                    </ul>
                    <p className="text-sm text-ci-success mt-3 font-medium">
                        After verification: Full access to analytics, categories, and unlimited features!
                    </p>
                </div>
            </div>
        </div>
    )
}