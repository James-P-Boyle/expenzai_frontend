import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'

interface ReceiptDetailsErrorProps {
    error: string | null
}

export function ReceiptDetailsError({ error }: ReceiptDetailsErrorProps) {
    return (
        <div className="sm:p-4 lg:p-6">
            <Card className="p-12 text-center">
                <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Receipt Not Found</h3>
                <p className="text-ci-muted mb-6">{error || 'This receipt does not exist'}</p>
                <Link href="/dashboard/receipts">
                    <Button>Back to Receipts</Button>
                </Link>
            </Card>
        </div>
    )
}