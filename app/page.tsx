'use client'

import { useState, useEffect } from 'react'
import { Euro, Receipt as ReceiptIcon, TrendingUp, Calendar } from 'lucide-react'
import { Receipt, WeeklySummary } from './lib/types'

import LoadingSpinner from './components/ui/LoadingSpinner'
import { StatCard } from './components/dashboard/StatsCard'
import { WeeklyChart } from './components/dashboard/WeeklyChart'
import { QuickActions } from './components/dashboard/QuickActions'
import { TopCategories } from './components/dashboard/TopCategories'
import { RecentReceipts } from './components/dashboard/RecentReceipts'
import { api } from './lib/api'


interface WeeklyData {
    week: string
    weekLabel: string
    amount: number
    receipts: number
}

export default function DashboardPage() { 
    const [recentReceipts, setRecentReceipts] = useState<Receipt[]>([])
    const [currentWeekSummary, setCurrentWeekSummary] = useState<WeeklySummary | null>(null)
    const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([])
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

                const chartData = weeklyResponses.reverse().map((week, index) => {
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
        return <LoadingSpinner />
    }

    const currentWeekTotal = currentWeekSummary?.total_amount || 0
    const currentWeekReceipts = currentWeekSummary?.receipts_count || 0
    const lastMonthTotal = getTotalLastMonth()
    const avgWeeklySpending = getAverageWeeklySpending()

    return (
        <div>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <QuickActions />
                <TopCategories
                    categories={currentWeekSummary?.categories || []}
                    hasCategories={!!(currentWeekSummary && currentWeekSummary.categories.length > 0)}
                />
            </div>

            <RecentReceipts receipts={recentReceipts} />
        </div>
    )
}