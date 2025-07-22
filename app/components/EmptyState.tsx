import Link from 'next/link'
import { Receipt as ReceiptIcon, Upload } from 'lucide-react'
import { Button } from '@/app/components/ui/Button'
import { Card } from '@/app/components/ui/Card'

export default function EmptyState() {
    return (
        <Card className="p-6 text-center">
            <ReceiptIcon className="mx-auto size-12 text-ci-muted mb-4" />
            <h3 className="text-lg font-bold mb-2">No receipts this week</h3>
            <p className="text-ci-muted mb-6 w-4/5 mx-auto">
                Upload receipts to see your weekly spending summary and insights.
            </p>
            <Link href="/dashboard/upload">
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Receipt
                </Button>
            </Link>
        </Card>
    )
}