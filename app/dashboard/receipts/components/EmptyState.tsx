import Link from 'next/link'
import { Receipt as ReceiptIcon, Upload } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'

interface ReceiptsEmptyStateProps {
    hasFilters: boolean
}

export default function ReceiptsEmptyState({ hasFilters }: ReceiptsEmptyStateProps) {
    if (hasFilters) {
        return (
            <Card className="p-6 text-center">
                <ReceiptIcon className="mx-auto h-12 w-12 text-ci-muted mb-4" />
                <h3 className="text-lg font-medium mb-2">No matching receipts</h3>
                <p className="text-ci-muted">
                    Try adjusting your search or filters
                </p>
            </Card>
        )
    }

    return (
        <Card className="p-6 text-center">
            <ReceiptIcon className="mx-auto h-12 w-12 text-ci-muted mb-4" />
            <h3 className="text-lg font-medium mb-2">No receipts yet</h3>
            <p className="text-ci-muted mb-6">
                Upload your first receipt to get started tracking expenses
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