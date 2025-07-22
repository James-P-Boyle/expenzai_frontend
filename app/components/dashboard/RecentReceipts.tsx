import Link from 'next/link'
import { Receipt as ReceiptIcon, Upload } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Receipt } from '@/app/lib/types'
import { formatDate } from '@/app/lib/utils'

interface RecentReceiptsProps {
    receipts: Receipt[]
}

export function RecentReceipts({ receipts }: RecentReceiptsProps) {
    const getStatusStyles = (status: Receipt['status']) => {
        switch (status) {
            case 'completed':
                return 'bg-ci-success-light text-ci-success'
            case 'processing':
                return 'bg-ci-main text-ci-main'
            default:
                return 'bg-ci-warn/20 text-ci-warn'
        }
    }

    return (
        <Card className="sm:p-4 lg:p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold font-sans">Recent Receipts</h3>
                <Link href="/dashboard/receipts">
                    <Button variant="secondary" size="sm">View All</Button>
                </Link>
            </div>

            {receipts.length > 0 ? (
                <div className="space-y-3">
                    {receipts.map((receipt) => (
                        <Link key={receipt.id} href={`/dashboard/receipts/${receipt.id}`}>
                            <div className="flex justify-between items-center p-2 rounded-full transition-colors">
                                <div>
                                    <p className="font-medium font-sans">
                                        {receipt.store_name || 'Unknown Store'}
                                    </p>
                                    <p className="text-sm text-ci-muted font-serif">
                                        {receipt.receipt_date && formatDate(receipt.receipt_date)} <span className="text-ci-main">•</span> {receipt.items.length} items
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium font-sans">{receipt.formatted_total}</p>
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles(receipt.status)}`}>
                                        {receipt.status}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <ReceiptIcon className="mx-auto h-12 w-12 text-ci-muted" />
                    <h3 className="mt-2 text-sm font-medium font-sans">No receipts yet</h3>
                    <p className="mt-1 text-sm text-ci-muted font-serif">
                        Upload your first receipt to get started tracking expenses.
                    </p>
                    <div className="mt-6">
                        <Link href="/dashboard/upload">
                            <Button>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Receipt
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </Card>
    )
}