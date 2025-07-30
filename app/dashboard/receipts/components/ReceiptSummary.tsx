import { Calendar, MapPin, Euro } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { Receipt } from '@/app/lib/types'
import { formatDate } from '@/app/lib/utils'
import EditableDateField from '@/app/components/ui/EditableDateField'


interface ReceiptSummaryCardProps {
    receipt: Receipt
    onUpdateReceipt?: (updates: { receipt_date?: string }) => Promise<void>
    isUpdating?: boolean
}

export function ReceiptSummaryCard({
    receipt,
    onUpdateReceipt,
    isUpdating = false
}: ReceiptSummaryCardProps) {
    
    const handleDateUpdate = async (newDate: string) => {
        if (onUpdateReceipt) {
            await onUpdateReceipt({ receipt_date: newDate })
        }
    }

    return (
        <Card className="sm:p-4 lg:p-6">
            <h3 className="text-lg font-semibold mb-4">Receipt Summary</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-ci-muted" />
                    <div>
                        <p className="text-sm text-ci-muted">Store</p>
                        <p className="font-medium line-clamp-1">{receipt.store_name || 'Unknown'}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="min-w-0 flex-1">
                        <p className="text-sm text-ci-muted mb-1">Date</p>
                        {onUpdateReceipt ? (
                            <EditableDateField
                                value={receipt.receipt_date}
                                onUpdate={handleDateUpdate}
                                isUpdating={isUpdating}
                            />
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-ci-muted" />
                                <p className="font-medium">
                                    {formatDate(receipt.receipt_date || receipt.created_at.split('T')[0])}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Euro className="h-4 w-4 text-ci-muted" />
                    <div>
                        <p className="text-sm text-ci-muted">Total</p>
                        <p className="font-medium text-lg">{receipt.formatted_total}</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-ci-muted">Items</p>
                    <p className="font-medium">{receipt.items.length}</p>
                </div>
            </div>
        </Card>
    )
}