import { Clock } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'

interface ProcessingStatusProps {
    onRefresh: () => void
}

export function ProcessingStatus({ onRefresh }: ProcessingStatusProps) {
    return (
        <Card className="p-4">
            <div className="text-center">
                <Clock className="mx-auto h-8 w-8 text-ci-main mb-2" />
                <p className="text-sm font-medium">Processing</p>
                <p className="text-xs text-ci-muted mt-1">
                    AI is analyzing your receipt. This usually takes 15-30 seconds.
                </p>
                <Button
                    onClick={onRefresh}
                    variant="secondary"
                    size="sm"
                    className="mt-3 w-full"
                >
                    Refresh
                </Button>
            </div>
        </Card>
    )
}