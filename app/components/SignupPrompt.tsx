'use client'

import { useState } from 'react'
import { UserPlus, LogIn } from 'lucide-react'
import { Button } from '@/app/components/ui/Button'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import Link from 'next/link'

export default function SignupPrompt() {
    const [showForm, setShowForm] = useState<'none' | 'signup' | 'login'>('none')

    if (showForm === 'signup') {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="max-w-md w-full">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-ci-white mb-2">
                            Create Your Account
                        </h2>
                        <p className="text-ci-muted">
                            Sign up to save your receipts and access all features
                        </p>
                    </div>
                    
                    <RegisterForm 
                        showLinks={false}
                        onSuccess={() => {
                            // Will redirect to dashboard automatically
                        }}
                    />
                    
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setShowForm('login')}
                            className="text-ci-main hover:underline text-sm"
                        >
                            Already have an account? Sign in
                        </button>
                        <span className="mx-2 text-ci-muted">•</span>
                        <button
                            onClick={() => setShowForm('none')}
                            className="text-ci-muted hover:text-ci-white text-sm"
                        >
                            Continue without account
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (showForm === 'login') {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="max-w-md w-full">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-ci-white mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-ci-muted">
                            Sign in to access your saved receipts
                        </p>
                    </div>
                    
                    <LoginForm 
                        showLinks={false}
                        onSuccess={() => {
                            // Will redirect to dashboard automatically
                        }}
                    />
                    
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setShowForm('signup')}
                            className="text-ci-main hover:underline text-sm"
                        >
                            Don't have an account? Sign up
                        </button>
                        <span className="mx-2 text-ci-muted">•</span>
                        <Link
                            href="/dashboard/upload"
                            className="text-ci-muted hover:text-ci-white text-sm"
                        >
                            Continue without account
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    // Default prompt
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="max-w-md w-full text-center bg-ci-white dark:bg-ci-black/50 p-8 rounded-lg">
                <UserPlus className="h-16 w-16 text-ci-main mx-auto mb-4" />
                
                <h2 className="text-2xl font-bold text-ci-white mb-2">
                    Get Full Access
                </h2>
                
                <p className="text-ci-muted mb-6">
                    This feature requires an account. Sign up to unlock all dashboard features 
                    including analytics, categories, and increased upload limits.
                </p>

                <div className="space-y-3">
                    <Button
                        onClick={() => setShowForm('signup')}
                        className="w-full"
                    >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Create Account
                    </Button>
                    
                    <Button
                        onClick={() => setShowForm('login')}
                        variant="secondary"
                        className="w-full"
                    >
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                    </Button>
                </div>

                <Link
                    href="/dashboard/upload"
                    className="mt-4 text-ci-muted hover:text-ci-white text-sm inline-block"
                >
                    ← Go back
                </Link>
            </div>
        </div>
    )
}