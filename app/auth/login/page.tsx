'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext'
import { Card } from '@/app/components/ui/Card'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button';
import { getErrorMessage } from '@/app/lib/error-utils'
import Logo from '@/app/components/ui/Logo'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            await login({ email, password })
            router.push('/dashboard')
        } catch (err: unknown) {
            setError(getErrorMessage(err, ' Login failed'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-6 lg:py-12  px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className='flex flex-col justify-center items-center'>
                    <Logo />
                    <h2 className="mt-6 text-center text-3xl font-extrabold">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-ci-muted">
                        Or{' '}
                        <Link href="/auth/register" className="font-medium text-ci-main hover:text-ci-main">
                            create a new account
                        </Link>
                    </p>
                </div>

                <Card className="sm:p-4 lg:p-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
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
                    </form>
                </Card>
            </div>
        </div>
    )
}