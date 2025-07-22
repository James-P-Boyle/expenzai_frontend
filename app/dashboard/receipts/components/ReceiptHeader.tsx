import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react'
import { Button } from '@/app/components/ui/Button'
import { Receipt } from '@/app/lib/types'

interface ReceiptHeaderProps {
    receipt: Receipt
    onDelete: () => void
}

export function ReceiptHeader({ receipt, onDelete }: ReceiptHeaderProps) {
    const getStatusIcon = (status: string) => {
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

    return (
        <div className="flex items-center gap-2 justify-evenly mb-8">
        
            <Link href="/dashboard/receipts">
                <Button variant="secondary" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </Link>

            <div className="flex items-center space-x-2 mt-1">
                {getStatusIcon(receipt.status)}
                <span className="text-ci-muted">
                    {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
                </span>
            </div>
    
            <Button onClick={onDelete} variant="danger" size="sm" className='lg:ml-auto !w-auto'>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
            </Button>
        </div>
    )
}