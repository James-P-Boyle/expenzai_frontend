'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { Upload, Receipt as ReceiptIcon, TrendingUp, Euro, Calendar } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Receipt, WeeklySummary } from '../lib/types'
import { useAuth } from '../context/AuthContext'
import { Card } from '../components/ui/Card'
import { api } from '../lib/api'
import { Button } from '../components/ui/Button'

interface WeeklyData {
  week: string
  weekLabel: string
  amount: number
  receipts: number
}

export default function DashboardPage() {
  const { user } = useAuth()
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
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-80 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const currentWeekTotal = currentWeekSummary?.total_amount || 0
  const currentWeekReceipts = currentWeekSummary?.receipts_count || 0
  const lastMonthTotal = getTotalLastMonth()
  const avgWeeklySpending = getAverageWeeklySpending()

  return (
    <div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-ci-main rounded-lg">
              <Euro className="h-6 w-6 text-ci-main" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-ci-muted">This Week</p>
              <p className="text-2xl font-bold">
                €{currentWeekTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <ReceiptIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-ci-muted">Receipts</p>
              <p className="text-2xl font-bold">{currentWeekReceipts}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-ci-muted">Last Month</p>
              <p className="text-2xl font-bold">€{lastMonthTotal.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-ci-muted">Weekly Avg</p>
              <p className="text-2xl font-bold">€{avgWeeklySpending.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly Spending Chart */}
      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Weekly Spending Trend</h3>
            <p className="text-sm text-ci-muted mt-1">Last 8 weeks spending overview</p>
          </div>
          <Link href="/dashboard/weekly">
            <Button variant="secondary" size="sm">View Details</Button>
          </Link>
        </div>

        {weeklyData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="weekLabel" 
                  fontSize={12}
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis 
                  fontSize={12}
                  tick={{ fill: '#6B7280' }}
                  tickFormatter={(value) => `€${value}`}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `€${value.toFixed(2)}`,
                    name === 'amount' ? 'Spent' : 'Receipts'
                  ]}
                  labelFormatter={(label) => `Week of ${label}`}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#1D4ED8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-ci-muted">
            <div className="text-center">
              <TrendingUp className="mx-auto h-12 w-12 text-ci-muted mb-4" />
              <p>No spending data available yet</p>
              <p className="text-sm">Upload receipts to see your spending trends</p>
            </div>
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link href="/dashboard/upload">
              <Button className="w-full justify-start">
                <Upload className="mr-2 h-4 w-4" />
                Upload New Receipt
              </Button>
            </Link>
            <Link href="/dashboard/weekly">
              <Button variant="secondary" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Weekly Summary
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Top Categories This Week
            </h3>
            {currentWeekSummary && currentWeekSummary.categories.length > 0 && (
              <Link href="/dashboard/categories">
                <Button variant="secondary" size="sm">View All</Button>
              </Link>
            )}
          </div>
          {currentWeekSummary && currentWeekSummary.categories.length > 0 ? (
            <div className="space-y-3">
              {currentWeekSummary.categories.slice(0, 3).map((category, index) => (
                <Link 
                  key={index} 
                  href={`/dashboard/categories/${encodeURIComponent(category.category)}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{category.category}</span>
                      <p className="text-sm text-ci-muted">{category.count} items</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">€{category.total.toFixed(2)}</span>
                      <p className="text-xs text-ci-muted">
                        avg €{(category.total / category.count).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-ci-muted text-sm">
              No receipts this week. Upload your first receipt to get started!
            </p>
          )}
        </Card>
      </div>

      {/* Recent Receipts */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Receipts</h3>
          <Link href="/dashboard/receipts">
            <Button variant="secondary" size="sm">View All</Button>
          </Link>
        </div>
        
        {recentReceipts.length > 0 ? (
          <div className="space-y-3">
            {recentReceipts.map((receipt) => (
              <Link key={receipt.id} href={`/dashboard/receipts/${receipt.id}`}>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium">
                      {receipt.store_name || 'Unknown Store'}
                    </p>
                    <p className="text-sm text-ci-muted">
                      {receipt.receipt_date || 'No date'} • {receipt.items.length} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{receipt.formatted_total}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      receipt.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : receipt.status === 'processing'
                        ? 'bg-ci-main text-ci-main'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {receipt.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <ReceiptIcon className="mx-auto h-12 w-12 text-ci-muted" />
            <h3 className="mt-2 text-sm font-medium">No receipts yet</h3>
            <p className="mt-1 text-sm text-ci-muted">
              Upload your first receipt to get started tracking expenses.
            </p>
            <div className="mt-6">
              <Link href="/dashboard/upload">
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Receipt
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}