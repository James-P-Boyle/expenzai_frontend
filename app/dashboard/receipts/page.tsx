'use client'

import { useState, useEffect } from 'react'
import { api } from '@/app/lib/api'
import { Receipt, ReceiptStatus } from '@/app/lib/types'

import { ReceiptFilters } from './components/ReceiptFilters'
import { ErrorState } from './components/ErrorState'
import EmptyState from './components/EmptyState'
import { ReceiptsList } from './components/ReceiptList'
import { getErrorMessage } from '@/app/lib/error-utils'

export default function ReceiptsIndexPage() {
    const [receipts, setReceipts] = useState<Receipt[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<ReceiptStatus | 'all'>('all')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchReceipts()
    }, [])

    const fetchReceipts = async () => {
        try {
            setIsLoading(true)
            const response = await api.getReceipts()
            setReceipts(response.data)
            setError(null)
        } catch (err: unknown) {
            setError(getErrorMessage(err, 'Failed to fetch receipts'))
        } finally {
            setIsLoading(false)
        }
    }

    const filteredReceipts = receipts.filter(receipt => {
        const matchesSearch = searchTerm === '' || 
            receipt.store_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            receipt.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        
        const matchesStatus = statusFilter === 'all' || receipt.status === statusFilter
        
        return matchesSearch && matchesStatus
    })

    const hasFilters = searchTerm !== '' || statusFilter !== 'all'


    return (
        <div>
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

            {filteredReceipts.length === 0 && !isLoading ? (
                <EmptyState hasFilters={hasFilters} />
            ) : (
                <ReceiptsList receipts={filteredReceipts} />
            )}
        </div>
    )
}