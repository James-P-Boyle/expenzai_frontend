import { Button } from '@/app/components/ui/Button'
import { Card } from '@/app/components/ui/Card'

interface ErrorStateProps {
    error: string
    onRetry: () => void
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
    return (
        <Card className="p-6 mb-6">
            <div className="text-center text-red-600">
                <p>{error}</p>
                <Button onClick={onRetry} variant="secondary" className="mt-4">
                    Try Again
                </Button>
            </div>
        </Card>
    )
}