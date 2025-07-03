import { CheckCircle } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'

interface UploadSuccessStateProps {
    onViewReceipt: () => void
    onUploadAnother: () => void
    onBackToDashboard: () => void
}

export default function UploadSuccessState({
    onViewReceipt,
    onUploadAnother,
    onBackToDashboard
}: UploadSuccessStateProps) {
    return (
        <Card className="p-6 text-center">
            <div className="text-ci-success mb-4">
                <CheckCircle className="mx-auto h-16 w-16" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
                Receipt Uploaded Successfully!
            </h3>
            <p className="text-ci-muted mb-6">
                Your receipt is being processed by AI. This usually takes 15-30 seconds.
            </p>
            <div className="flex flex-col md:flex-row gap-2">
                <Button onClick={onViewReceipt} variant="secondary" className="w-full">
                    View Receipt Details
                </Button>
                <Button onClick={onUploadAnother} variant="secondary" className="w-full">
                    Upload Another Receipt
                </Button>
                <Button onClick={onBackToDashboard} variant="secondary" className="w-full">
                    Back to Dashboard
                </Button>
            </div>
        </Card>
    )
}