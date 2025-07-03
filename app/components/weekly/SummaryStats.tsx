import { Euro, Receipt as ReceiptIcon, TrendingUp, AlertTriangle } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { WeeklySummary } from '@/app/lib/types'

interface SummaryStatsProps {
    weeklySummary: WeeklySummary
}

export default function SummaryStats({ weeklySummary }: SummaryStatsProps) {
    const stats = [
        {
            label: 'Total Spent',
            value: `€${weeklySummary.total_amount.toFixed(2)}`,
            icon: Euro,
            bgColor: 'bg-ci-main',
            iconColor: 'text-ci-black'
        },
        {
            label: 'Receipts',
            value: weeklySummary.receipts_count.toString(),
            icon: ReceiptIcon,
            bgColor: 'bg-ci-main',
            iconColor: 'text-ci-black'
        },
        {
            label: 'Categories',
            value: weeklySummary.categories.length.toString(),
            icon: TrendingUp,
            bgColor: 'bg-ci-main',
            iconColor: 'text-ci-black'
        },
        {
            label: 'Avg per Receipt',
            value: `€${(weeklySummary.total_amount / weeklySummary.receipts_count).toFixed(2)}`,
            icon: AlertTriangle,
            bgColor: 'bg-ci-main',
            iconColor: 'text-ci-black'
        }
    ]

    return (
        <div className="flex flex-wrap justify-between md:justify-center gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="">
                    <div className="flex items-center">
                        <div className={`p-3 ${stat.bgColor} rounded-full`}>
                            <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-ci-muted">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}