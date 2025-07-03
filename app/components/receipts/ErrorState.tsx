import { XCircle } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'

interface ErrorStateProps {
    error: string
    onRetry?: () => void
    label?: string
}

export function ErrorState({ error, onRetry, label }: ErrorStateProps) {
    return (
        <Card className="p-6 mb-6">
            <div className="text-center">
                <XCircle className="mx-auto size-8 mb-2  text-red-600" />
                <p className=' text-red-600'>{error}</p>
                {!!onRetry && (
                    <Button onClick={onRetry} variant="secondary" className="mt-4">
                        {label ?? 'Try Again'}
                    </Button>
                )}
            
            </div>
        </Card>
    )
}