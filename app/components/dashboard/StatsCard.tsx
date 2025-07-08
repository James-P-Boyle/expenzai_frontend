import { LucideIcon } from 'lucide-react'
import { Card } from '../ui/Card'

interface StatCardProps {
    title: string
    value: string
    icon: LucideIcon
}

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
    return (
        <Card className="p-4">
            <div className="flex items-center">
                <div className="p-2 bg-ci-main rounded-full">
                    <Icon className="h-6 w-6 text-ci-black" />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-ci-muted font-serif">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
        </Card>
    )
}