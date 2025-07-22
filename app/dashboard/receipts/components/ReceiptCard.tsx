import Link from 'next/link'
import {
    Receipt as ReceiptIcon,
    Clock,
    CheckCircle,
    XCircle,
    Calendar
} from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { Receipt, ReceiptStatus } from '@/app/lib/types'
import { formatDate } from '@/app/lib/utils'

interface ReceiptCardProps {
    receipt: Receipt
}

export function ReceiptCard({ receipt }: ReceiptCardProps) {
    const getStatusIcon = (status: ReceiptStatus) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-5 w-5 text-ci-success" />
            case 'processing':
                return <Clock className="h-5 w-5 text-ci-main" />
            case 'failed':
                return <XCircle className="h-5 w-5 text-ci-danger" />
            default:
                return <Clock className="h-5 w-5 text-ci-muted" />
        }
    }

    const getStatusColor = (status: ReceiptStatus) => {
        switch (status) {
            case 'completed':
                return 'bg-ci-success-light text-ci-success'
            case 'processing':
                return 'bg-ci-main text-ci-main'
            case 'failed':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <Card className="px-6 py-4 group">

            <Link 
                href={`/dashboard/receipts/${receipt.id}`} 
                title="View details"
            >

                <div className="flex items-center justify-between">

                    <div className="flex items-center space-x-4 flex-1">
                        <div className="p-2 rounded-full bg-ci-main hidden lg:blcok">
                            <ReceiptIcon className="h-6 w-6 text-ci-black" />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-medium group-hover:underline">
                                    {receipt.store_name || 'Unknown Store'}
                                </h3>
                                {getStatusIcon(receipt.status)}
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-x-4 text-sm text-ci-muted">
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {formatDate(receipt.receipt_date || receipt.created_at.split('T')[0])}
                                </div>
                                <div>
                                    {receipt.items.length} item{receipt.items.length !== 1 ? 's' : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(receipt.status)}`}>
                            {receipt.status}
                        </span>
    
                    </div>
                </div>
            </Link>
        </Card>
    )
}