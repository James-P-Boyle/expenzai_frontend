import Link from 'next/link'
import { Upload, TrendingUp } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

export function QuickActions() {
    return (
        <Card className="sm:p-4 lg:p-6">
            <h3 className="text-lg font-semibold mb-4 font-sans">
                Quick Actions
            </h3>
            <div className="flex gap-2 flex-wrap">
                <Link href="/dashboard/upload">
                    <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Receipt
                    </Button>
                </Link>
                <Link href="/dashboard/weekly">
                    <Button variant="secondary">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        View Weekly Summary
                    </Button>
                </Link>
            </div>
        </Card>
    )
}