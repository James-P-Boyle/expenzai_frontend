import Link from 'next/link'
import { Receipt as ReceiptIcon, Upload, UserPlus } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'

interface ReceiptsEmptyStateProps {
    hasFilters: boolean
    isAnonymous?: boolean
    remainingUploads?: number
}

export default function ReceiptsEmptyState({ 
    hasFilters, 
    isAnonymous = false, 
    remainingUploads = 0 
}: ReceiptsEmptyStateProps) {
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

    // Anonymous user with no receipts
    if (isAnonymous) {
        return (
            <Card className="p-6 text-center">
                <ReceiptIcon className="mx-auto h-12 w-12 text-ci-main mb-4" />
                <h3 className="text-lg font-medium mb-2">No receipts uploaded yet</h3>
                
                {remainingUploads > 0 ? (
                    <>
                        <p className="text-ci-muted mb-4">
                            Upload your first receipt to get started! You have{' '}
                            <span className="text-ci-main font-medium">{remainingUploads}</span>{' '}
                            free uploads remaining.
                        </p>
                        <div className="space-y-3">
                            <Link href="/dashboard/upload">
                                <Button className="w-full sm:w-auto mb-4">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Your First Receipt
                                </Button>
                            </Link>
                            <div className="text-sm text-ci-muted">
                                or{' '}
                                <Link href="/auth/register" className="text-ci-main hover:underline">
                                    sign up
                                </Link>
                                {' '}for unlimited uploads
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-ci-muted mb-4">
                            You've used all your free uploads! Sign up to save your receipts permanently 
                            and get unlimited uploads.
                        </p>
                        <div className="space-y-3">
                            <Link href="/auth/register">
                                <Button className="w-full sm:w-auto">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Sign Up for Unlimited Uploads
                                </Button>
                            </Link>
                            <div className="text-sm text-ci-muted">
                                Already have an account?{' '}
                                <Link href="/auth/login" className="text-ci-main hover:underline">
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </Card>
        )
    }

    // Authenticated user with no receipts
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