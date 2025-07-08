import { Calendar, MapPin, Euro } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { Receipt } from '@/app/lib/types'

interface ReceiptSummaryCardProps {
    receipt: Receipt
}

export function ReceiptSummaryCard({ receipt }: ReceiptSummaryCardProps) {
    return (
        <Card className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold mb-4">Receipt Summary</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-ci-muted" />
                    <div>
                        <p className="text-sm text-ci-muted">Store</p>
                        <p className="font-medium">{receipt.store_name || 'Unknown'}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-ci-muted" />
                    <div>
                        <p className="text-sm text-ci-muted">Date</p>
                        <p className="font-medium">
                            {receipt.receipt_date || receipt.created_at.split('T')[0]}
                        </p>
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