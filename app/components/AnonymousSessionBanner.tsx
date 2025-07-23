'use client'

import { useAuth } from '@/app/context/AuthContext'
import { useState, useEffect } from 'react'
import { api } from '@/app/lib/api'
import Link from 'next/link'

interface AnonymousSessionInfo {
    remaining_uploads?: number
    total_count?: number
}

interface AnonymousSessionBannerProps {
    className?: string
    showSignupPrompt?: boolean
}

export default function AnonymousSessionBanner({ 
    className = "mb-6", 
    showSignupPrompt = true 
}: AnonymousSessionBannerProps) {
    const { isAuthenticated } = useAuth()
    const [sessionInfo, setSessionInfo] = useState<AnonymousSessionInfo>({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSessionInfo = async () => {
            if (isAuthenticated) {
                setIsLoading(false)
                return
            }

            try {
                const response = await api.getAnonymousReceipts()
                setSessionInfo({
                    remaining_uploads: response.remaining_uploads,
                    total_count: response.total_count
                })
            } catch (error) {
                // If no session exists yet, show default values
                setSessionInfo({ remaining_uploads: 3, total_count: 0 })
            } finally {
                setIsLoading(false)
            }
        }

        fetchSessionInfo()
    }, [isAuthenticated])

    if (isAuthenticated || isLoading) {
        return null
    }

    const remainingUploads = sessionInfo.remaining_uploads || 0
    const totalCount = sessionInfo.total_count || 0

    return (
        <div className={`${className} p-4 bg-ci-main/10 border border-ci-main/20 rounded-lg`}>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-medium">
                        Anonymous Upload Session
                    </h3>
                    <p className="text-sm text-ci-muted mt-1">
                        You have <span className="text-ci-main font-medium">
                            {remainingUploads}
                        </span> uploads remaining.{' '}
                        {showSignupPrompt && (
                            <>Sign up to save your receipts permanently and get unlimited uploads!</>
                        )}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-ci-muted">
                        Receipts: {totalCount}/3
                    </p>
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-2">
                <Link href="/auth/login" className="font-bold hover:underline cursor-pointer">
                    Sign In
                </Link>
                <Link href="/auth/register" className="font-bold hover:underline cursor-pointer">
                    Register
                </Link>
            </div>
        </div>
    )
}