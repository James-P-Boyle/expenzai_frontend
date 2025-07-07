'use client'

import { useState, useEffect } from 'react'
import { Receipt, WeeklySummary } from '../lib/types'
import { api } from '../lib/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { QuickActions } from '../components/dashboard/QuickActions'
import { WeeklyChart } from '../components/dashboard/WeeklyChart'
import { RecentReceipts } from '../components/dashboard/RecentReceipts'

import { TopCategories } from '../components/dashboard/TopCategories'
import { Euro, Receipt as ReceiptIcon, TrendingUp, Calendar } from 'lucide-react'
import { StatCard } from '../components/dashboard/StatsCard'

interface WeeklyData {
    week: string
    weekLabel: string
    amount: number
    receipts: number
}

interface Category {
    category: string
    count: number
    total: number
}

export default function DashboardPage() {
    const [recentReceipts, setRecentReceipts] = useState<Receipt[]>([])
    const [currentWeekSummary, setCurrentWeekSummary] = useState<WeeklySummary | null>(null)
    const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([])
    const [topCategories, setTopCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch current week summary and recent receipts
                const [receiptsResponse, currentWeekResponse] = await Promise.all([
                    api.getReceipts(),
                    api.getWeeklySummary()
                ])

                setRecentReceipts(receiptsResponse.data.slice(0, 5))
                setCurrentWeekSummary(currentWeekResponse)

                // Fetch last 8 weeks of data for the chart
                const weeklyPromises = []
                for (let i = 0; i < 8; i++) {
                    const date = new Date()
                    date.setDate(date.getDate() - (i * 7))
                    const dateStr = date.toISOString().split('T')[0]
                    weeklyPromises.push(api.getWeeklySummary(dateStr))
                }

                const weeklyResponses = await Promise.all(weeklyPromises)

                const chartData = weeklyResponses.reverse().map((week) => {
                    const weekStart = new Date(week.week_start)
                    const weekLabel = weekStart.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })

                    return {
                        week: week.week_start,
                        weekLabel,
                        amount: week.total_amount,
                        receipts: week.receipts_count
                    }
                })

                setWeeklyData(chartData)

                // Calculate top categories from recent receipts
                const categoryMap = new Map<string, { count: number, total: number }>()

                receiptsResponse.data.forEach(receipt => {
                    receipt.items.forEach(item => {
                        const category = item.category || 'Uncategorized'
                        const existing = categoryMap.get(category) || { count: 0, total: 0 }
                        const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) : (item.price || 0)
                        categoryMap.set(category, {
                            count: existing.count + 1,
                            total: existing.total + itemPrice
                        })
                    })
                })

                const categories = Array.from(categoryMap.entries())
                    .map(([category, data]) => ({
                        category,
                        count: data.count,
                        total: data.total
                    }))
                    .sort((a, b) => b.total - a.total)

                setTopCategories(categories)
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    const getTotalLastMonth = () => {
        return weeklyData.slice(-4).reduce((sum, week) => sum + week.amount, 0)
    }

    const getAverageWeeklySpending = () => {
        const nonZeroWeeks = weeklyData.filter(week => week.amount > 0)
        if (nonZeroWeeks.length === 0) return 0
        return nonZeroWeeks.reduce((sum, week) => sum + week.amount, 0) / nonZeroWeeks.length
    }

    if (isLoading) {
        return (<LoadingSpinner />)
    }

    const currentWeekTotal = currentWeekSummary?.total_amount || 0
    const currentWeekReceipts = currentWeekSummary?.receipts_count || 0
    const lastMonthTotal = getTotalLastMonth()
    const avgWeeklySpending = getAverageWeeklySpending()

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="This Week"
                    value={`€${currentWeekTotal.toFixed(2)}`}
                    icon={Euro}
                />
                <StatCard
                    title="Receipts"
                    value={currentWeekReceipts.toString()}
                    icon={ReceiptIcon}
                />
                <StatCard
                    title="Last Month"
                    value={`€${lastMonthTotal.toFixed(2)}`}
                    icon={TrendingUp}
                />
                <StatCard
                    title="Weekly Avg"
                    value={`€${avgWeeklySpending.toFixed(2)}`}
                    icon={Calendar}
                />
            </div>

            <WeeklyChart data={weeklyData} />
            <QuickActions />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentReceipts receipts={recentReceipts} />
                <TopCategories
                    categories={topCategories}
                    hasCategories={topCategories.length > 0}
                />
            </div>
        </>
    )
}