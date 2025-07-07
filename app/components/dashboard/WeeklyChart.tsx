import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

interface WeeklyData {
    week: string
    weekLabel: string
    amount: number
    receipts: number
}

interface WeeklyChartProps {
    data: WeeklyData[]
}

export function WeeklyChart({ data }: WeeklyChartProps) {
    return (
        <Card className="sm:p-6">
            <div className="flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center mb-6 gap-2">
                <div>
                    <h3 className="text-lg font-semibold font-sans">Weekly Spending Trend</h3>
                    <p className="text-sm text-ci-muted font-serif">Last 8 weeks spending overview</p>
                </div>
                <Link href="/dashboard/weekly" className='ml-auto'>
                    <Button variant="secondary" size="sm">View Details</Button>
                </Link>
            </div>

            {data.length > 0 ? (
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="weekLabel"
                                fontSize={12}
                                tick={{ fill: 'var(--ci-muted)' }}
                            />
                            <YAxis
                                fontSize={12}
                                tick={{ fill: 'var(--ci-muted)' }}
                                tickFormatter={(value) => `€${value}`}
                            />
                            <Tooltip
                                formatter={(value: number, name: string) => [
                                    `€${value.toFixed(2)}`,
                                    name === 'amount' ? 'Spent' : 'Receipts'
                                ]}
                                labelFormatter={(label) => `Week of ${label}`}
                                contentStyle={{
                                    backgroundColor: 'var(--ci-main)',
                                    color: 'var(--ci-black)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="var(--ci-main)"
                                strokeWidth={3}
                                dot={{ fill: 'var(--ci-main)', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, fill: 'var(--ci-main)' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="h-80 flex items-center justify-center text-ci-muted">
                    <div className="text-center">
                        <TrendingUp className="mx-auto size-12 text-ci-muted mb-4" />
                        <p className="font-serif">No spending data available yet</p>
                        <p className="text-sm font-serif">Upload receipts to see your spending trends</p>
                    </div>
                </div>
            )}
        </Card>
    )
}