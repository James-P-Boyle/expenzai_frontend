import Link from 'next/link'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'

export function ActionsCard() {
    return (
        <Card className="p-4">
            <h4 className="font-medium mb-3">Actions</h4>
            <div className="space-y-2">
                <Link href="/dashboard/weekly">
                    <Button variant="secondary" size="sm" className="w-full justify-start">
                        View Weekly Summary
                    </Button>
                </Link>
                <Link href="/dashboard/upload">
                    <Button variant="secondary" size="sm" className="w-full justify-start">
                        Upload Another Receipt
                    </Button>
                </Link>
            </div>
        </Card>
    )
}