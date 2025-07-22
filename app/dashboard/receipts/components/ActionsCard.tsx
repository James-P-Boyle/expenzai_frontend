import Link from 'next/link'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { Upload } from 'lucide-react'

export function ActionsCard() {
    return (
        <Card className="p-4">
            <h4 className="font-medium mb-3 text-xl">Actions</h4>
            <div className="flex flex-col gap-2 w-full">
                <Link href="/dashboard/weekly" className="block">
                    <Button variant="secondary" className="w-full !py-1">
                       Weekly Summary
                    </Button>
                </Link>
                <Link href="/dashboard/upload" className="block">
                    <Button variant="secondary" className="w-full !py-1">
                        Upload
                    </Button>
                </Link>
            </div>
        </Card>
    )
}