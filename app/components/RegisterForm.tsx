'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext'
import { Card } from '@/app/components/ui/Card'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import { getErrorMessage } from '@/app/lib/error-utils'

interface RegisterFormProps {
    onSuccess?: () => void
    showLinks?: boolean
    className?: string
}

export default function RegisterForm({ onSuccess, showLinks = true, className = "" }: RegisterFormProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const { register } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            await register({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            })
            if (onSuccess) {
                onSuccess()
            } else {
                router.push('/dashboard')
            }
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Registration failed'))
        } finally {
            setIsLoading(false)
        }
    }

    const isFormValid = name && email && password && passwordConfirmation

    return (
        <Card className={`p-6 ${className}`}>
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    {isLoading ? 'Creating account...' : 'Create account'}
                </Button>

                {showLinks && (
                    <div className="text-center text-sm text-ci-muted">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-ci-main hover:underline">
                            Sign in
                        </Link>
                    </div>
                )}
            </form>
        </Card>
    )
}