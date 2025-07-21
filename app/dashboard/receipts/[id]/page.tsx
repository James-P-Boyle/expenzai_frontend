'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Receipt } from '@/app/lib/types'
import { api } from '@/app/lib/api'
import { ReceiptHeader } from '../../../components/receipts/ReceiptHeader'
import { ReceiptSummaryCard } from '../../../components/receipts/ReceiptSummary'
import { ReceiptItemsCard } from '../../../components/receipts/ReceiptItemsCard'
import { ProcessingStatus } from '../../../components/receipts/ProcessingStatus'
import { ReceiptCategoryBreakdown } from '../../../components/receipts/CategoryBreakdown'
import { ActionsCard } from '../../../components/receipts/ActionsCard'
import { ErrorState } from '../../../components/receipts/ErrorState'
import { getErrorMessage } from '@/app/lib/error-utils'
import LoadingSpinner from '@/app/components/ui/LoadingSpinner'

const CATEGORIES = [
    'Food & Groceries',
    'Household',
    'Personal Care',
    'Beverages',
    'Snacks',
    'Meat & Deli',
    'Dairy',
    'Vegetables',
    'Fruits',
    'Other'
] as const

export default function ReceiptDetailsPage() {
    const [receipt, setReceipt] = useState<Receipt | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const router = useRouter()
    const params = useParams()

    const receiptId = useMemo(() => {
        return params.id ? parseInt(params.id as string) : null
    }, [params.id])

    const fetchReceipt = useCallback(async () => {
        if (!receiptId) return

        try {
            setIsLoading(true)
            setError(null)
            const response = await api.getReceipt(receiptId)
            setReceipt(response)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to fetch receipt')
            setReceipt(null)
        } finally {
            setIsLoading(false)
        }
    }, [receiptId])

    useEffect(() => {
        fetchReceipt()
    }, [fetchReceipt])

    const handleUpdateItem = useCallback(async (itemId: number, category: string) => {
        if (!receipt) return

        setIsUpdating(true)
        try {
            await api.updateItem(itemId, {
                category: category,
                is_uncertain: false
            })

            // Optimistic update
            setReceipt(prevReceipt => {
                if (!prevReceipt) return prevReceipt
                
                return {
                    ...prevReceipt,
                    items: prevReceipt.items.map(item =>
                        item.id === itemId
                            ? { ...item, category: category, is_uncertain: false }
                            : item
                    )
                }
            })
        } catch (err: unknown) {
            alert(err instanceof Error ? err.message : 'Failed to update item')
            // Revert optimistic update by refetching
            await fetchReceipt()
        } finally {
            setIsUpdating(false)
        }
    }, [receipt, fetchReceipt])

    const handleDeleteReceipt = useCallback(async () => {
        if (!receipt || !confirm('Are you sure you want to delete this receipt?')) return

        try {
            await api.deleteReceipt(receipt.id)
            router.push('/dashboard/receipts')
        } catch (err: unknown) {
            alert(getErrorMessage(err, 'Failed to delete receipt'))
        }
    }, [receipt, router])

    const handleRefresh = useCallback(() => {
        fetchReceipt()
    }, [fetchReceipt])

 
    if (isLoading) {
        return (<LoadingSpinner />)
    }

    if (error || !receipt) {
        return <ErrorState error={error || 'Receipt not found'} />
    }

    return (
        <div className="p-4 lg:p-6">
            <ReceiptHeader
                receipt={receipt}
                onDelete={handleDeleteReceipt}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Receipt Info */}
                <div className="lg:col-span-2 space-y-6">
                    <ReceiptSummaryCard receipt={receipt} />

                    <ReceiptItemsCard 
                        receipt={receipt}
                        categories={CATEGORIES}
                        onUpdateItem={handleUpdateItem}
                        isUpdating={isUpdating}
                    />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {receipt.status === 'processing' && (
                        <ProcessingStatus onRefresh={handleRefresh} />
                    )}

                    {receipt.status === 'completed' && receipt.items.length > 0 && (
                        <ReceiptCategoryBreakdown receipt={receipt} />
                    )}
                    
                    <ActionsCard />
                </div>
            </div>
        </div>
    )
}
