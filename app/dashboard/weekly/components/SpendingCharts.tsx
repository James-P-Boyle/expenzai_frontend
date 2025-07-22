import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'
import { Card } from '@/app/components/ui/Card'
import { WeeklySummary } from '@/app/lib/types'
import { COLORS } from '@/app/lib/constants'

interface SpendingChartsProps {
    weeklySummary: WeeklySummary
}

export default function SpendingCharts({ weeklySummary }: SpendingChartsProps) {
    const pieChartData = weeklySummary.categories.map((category, index) => ({
        name: category.category,
        value: category.total,
        count: category.count,
        color: COLORS[index % COLORS.length]
    }))

    const barChartData = weeklySummary.categories.map((category) => ({
        category: category.category.length > 12
            ? category.category.substring(0, 10) + '...'
            : category.category,
        amount: category.total,
        count: category.count,
        uncertain: category.uncertain_count
    }))

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Card>
                <h3 className="font-bold pb-2">
                    Spending by Category
                </h3>
                <div className="h-60 text-ci-danger">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent! * 100).toFixed(0)}%`}
                                outerRadius={100}
                                className='dark:stroke-ci-black'
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => [`€${value.toFixed(2)}`, 'Amount']} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Bar Chart */}
            <Card>
                <h3 className="font-bold pb-2">
                    Category Breakdown
                </h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData}>
                            <CartesianGrid strokeDasharray="3 3" className='stroke-ci-muted-light' />
                            <XAxis
                                dataKey="category"
                                angle={-45}
                                textAnchor="end"
                                height={60}
                                fontSize={12}
                                className='stroke-ci-muted-light' 
                            />
                            <YAxis />
                            <Bar dataKey="amount" fill="var(--ci-main)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    )
}