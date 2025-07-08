'use client'

import { useState, useEffect, useCallback } from 'react'
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

export default function ReceiptDetailsPage() {
    const [receipt, setReceipt] = useState<Receipt | null>(null)
    // const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const router = useRouter()
    const params = useParams()

    const categories = [
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
    ]

    const fetchReceipt = useCallback(async () => {
        try {
            // setIsLoading(true)
            const response = await api.getReceipt(parseInt(params.id as string))
            setReceipt(response)
            setError(null)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to fetch receipt')
        }
        
        // finally {
        //     // setIsLoading(false)
        // }
    }, [params.id])

    useEffect(() => {
        if (params.id) {
            fetchReceipt()
        }
    }, [params.id, fetchReceipt])

    useEffect(() => {
        if (params.id) {
            fetchReceipt()
        }
    }, [params.id, fetchReceipt])

    // const goToDashboard = () => {
    //     router.push('/dashboard')
    // }

    const handleUpdateItem = async (itemId: number, category: string) => {
        setIsUpdating(true)
        try {
            await api.updateItem(itemId, {
                category: category,
                is_uncertain: false
            })

            if (receipt) {
                setReceipt({
                    ...receipt,
                    items: receipt.items.map(item =>
                        item.id === itemId
                            ? { ...item, category: category, is_uncertain: false }
                            : item
                    )
                })
            }
        } catch (err: unknown) {
            alert(err instanceof Error ? err.message : 'Failed to update item')
            throw err
        } finally {
            setIsUpdating(false)
        }
    }

    const handleDeleteReceipt = async () => {
        if (!receipt || !confirm('Are you sure you want to delete this receipt?')) return

        try {
            await api.deleteReceipt(receipt.id)
            router.push('/dashboard/receipts')
        } catch (err: unknown) {
            alert(getErrorMessage(err, 'Failed to delete receipt'))
            throw err
        }
    }

    if (error || !receipt) {
        return <ErrorState 
            error={'Receipt not found'} 
        />
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
                        categories={categories}
                        onUpdateItem={handleUpdateItem}
                        isUpdating={isUpdating}
                    />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {receipt.status === 'processing' && (
                        <ProcessingStatus onRefresh={fetchReceipt} />
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