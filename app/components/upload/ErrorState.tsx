import { XCircle } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'

interface UploadErrorStateProps {
    error: string | null
    onTryAgain: () => void
    onBackToDashboard: () => void
}

export default function UploadErrorState({
    error,
    onTryAgain,
    onBackToDashboard
}: UploadErrorStateProps) {
    return (
        <Card className="p-6 text-center">
            <div className="text-red-500 mb-4">
                <XCircle className="mx-auto h-16 w-16" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
                Upload Failed
            </h3>
            <p className="text-ci-muted mb-2">
                {error || 'Something went wrong while uploading your receipt.'}
            </p>
            <p className="text-sm text-ci-muted mb-6">
                Please check your internet connection and try again.
            </p>
            <div className="flex flex-col md:flex-col flex-wrap gap-2 items-center">
                <Button onClick={onTryAgain} className="w-full">
                    Try Again
                </Button>
                <Button onClick={onBackToDashboard} variant="secondary" className="w-full">
                    Back to Dashboard
                </Button>
            </div>
        </Card>
    )
}