'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext'
import { Card } from '@/app/components/ui/Card'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import { getErrorMessage } from '@/app/lib/error-utils'

interface LoginFormProps {
    onSuccess?: () => void
    showLinks?: boolean
    className?: string
}

export default function LoginForm({ onSuccess, showLinks = true, className = "" }: LoginFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            await login({ email, password })
            if (onSuccess) {
                onSuccess()
            } else {
                router.push('/dashboard')
            }
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Login failed'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className={`p-6 ${className}`}>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-ci-danger/20 border border-ci-danger text-ci-danger px-4 py-3 rounded-md">
                        {error}
                    </div>
                )}

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
                    placeholder="Enter your password"
                />

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={isLoading}
                    disabled={!email || !password}
                >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>

                {showLinks && (
                    <div className="text-center text-sm text-ci-muted">
                        Don't have an account?{' '}
                        <Link href="/auth/register" className="text-ci-main hover:underline">
                            Create one
                        </Link>
                    </div>
                )}
            </form>
        </Card>
    )
}