import Link from 'next/link'
import type { User } from '@/app/lib/types'

interface UserStatusBannerProps {
    user: User | null
}

export function UserStatusBanner({ user }: UserStatusBannerProps) {
    if (!user) return null

    return (
        <div className="mx-auto max-w-2xl mb-8 p-4 bg-ci-success/10 border border-ci-success/20 rounded-lg text-center">
            <p className="text-ci-success">
                👋 Welcome back, {user.name}!
                <Link href="/dashboard/subscription" className="ml-2 underline hover:no-underline">
                    Manage your subscription in dashboard →
                </Link>
            </p>
        </div>
    )
}