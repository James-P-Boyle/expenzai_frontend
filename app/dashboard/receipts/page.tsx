'use client'

import { useState, useEffect } from 'react'
import { api } from '@/app/lib/api'
import { Receipt, ReceiptStatus } from '@/app/lib/types'
import { useAuth } from '@/app/context/AuthContext'

import { ReceiptFilters } from './components/ReceiptFilters'
import { ErrorState } from './components/ErrorState'
import EmptyState from './components/EmptyState'
import { ReceiptsList } from './components/ReceiptList'
import { getErrorMessage } from '@/app/lib/error-utils'
import LoadingSpinner from '@/app/components/ui/LoadingSpinner'
import AnonymousSessionBanner from '@/app/components/AnonymousSessionBanner'

export default function ReceiptsIndexPage() {
    const { isAuthenticated, user } = useAuth()
    const [receipts, setReceipts] = useState<Receipt[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<ReceiptStatus | 'all'>('all')
    const [error, setError] = useState<string | null>(null)
    const [anonymousInfo, setAnonymousInfo] = useState<{
        remaining_uploads?: number
        total_count?: number
    }>({})

    useEffect(() => {
        fetchReceipts()
    }, [isAuthenticated]) // Refetch when auth status changes

    const fetchReceipts = async () => {
        try {
            setIsLoading(true)
            
            let response: { data: Receipt[], remaining_uploads?: number, total_count?: number }
            
            if (isAuthenticated) {
                // Fetch authenticated user receipts
                response = await api.getReceipts()
                setAnonymousInfo({}) // Clear anonymous info
            } else {
                // Fetch anonymous user receipts
                response = await api.getAnonymousReceipts()
                setAnonymousInfo({
                    remaining_uploads: response.remaining_uploads,
                    total_count: response.total_count
                })
            }
            
            setReceipts(response.data)
            setError(null)
            
            console.log(`📄 Loaded ${response.data.length} receipts for ${isAuthenticated ? 'authenticated' : 'anonymous'} user`)
            
        } catch (err: unknown) {
            console.error('❌ Fetch receipts error:', err)
            
            // Handle 401 for anonymous users (no receipts yet)
            if (!isAuthenticated && err instanceof Error && err.message.includes('401')) {
                setReceipts([])
                setError(null)
                setAnonymousInfo({ remaining_uploads: 3, total_count: 0 })
            } else {
                setError(getErrorMessage(err, 'Failed to fetch receipts'))
            }
        } finally {
            setIsLoading(false)
        }
    }

    const filteredReceipts = receipts.filter(receipt => {
        const matchesSearch = searchTerm === '' || 
            receipt.store_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            receipt.items?.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        
        const matchesStatus = statusFilter === 'all' || receipt.status === statusFilter
        
        return matchesSearch && matchesStatus
    })

    const hasFilters = searchTerm !== '' || statusFilter !== 'all'

    return (
        <div>
            <AnonymousSessionBanner />

            <ReceiptFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
            />

            {error && (
                <ErrorState
                    error={error}
                    onRetry={fetchReceipts}
                />
            )}

            {isLoading && (<LoadingSpinner />)}
            
            {filteredReceipts.length === 0 && !isLoading ? (
                <EmptyState 
                    hasFilters={hasFilters}
                    isAnonymous={!isAuthenticated}
                    remainingUploads={anonymousInfo.remaining_uploads}
                />
            ) : (
                <ReceiptsList receipts={filteredReceipts} />
            )}
        </div>
    )
}