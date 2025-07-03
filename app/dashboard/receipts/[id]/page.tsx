'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { Receipt } from '@/app/lib/types'
import { api } from '@/app/lib/api'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { ReceiptHeader } from '../components/ReceiptHeader'
import { ReceiptSummaryCard } from '../components/ReceiptSummary'
import { ReceiptItemsCard } from '../components/ReceiptItemsCard'
import { ProcessingStatus } from '../components/ProcessingStatus'
import { ReceiptCategoryBreakdown } from '../components/CategoryBreakdown'
import { ActionsCard } from '../components/ActionsCard'
import { ErrorState } from '../components/ErrorState'

export default function ReceiptDetailsPage() {
    const [receipt, setReceipt] = useState<Receipt | null>(null)
    const [isLoading, setIsLoading] = useState(true)
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

    useEffect(() => {
        if (params.id) {
            fetchReceipt()
        }
    }, [params.id])

    const fetchReceipt = async () => {
        try {
            setIsLoading(true)
            const response = await api.getReceipt(parseInt(params.id as string))
            setReceipt(response)
            setError(null)
        } catch (err: any) {
            setError(err.message || 'Failed to fetch receipt')
        } finally {
            setIsLoading(false)
        }
    }

    const goToDashboard = () => {
        router.push('/dashboard')
    }

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
        } catch (err: any) {
            alert(err.message || 'Failed to update item')
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
        } catch (err: any) {
            alert(err.message || 'Failed to delete receipt')
        }
    }

    if (error || !receipt) {
        return <ErrorState 
            error={'Receipt not found'} 
        />
    }

    return (
        <div className="p-6">
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