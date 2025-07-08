'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, Receipt as ReceiptIcon, Euro, Package } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { api, CategorySummary } from '../../lib/api'
import { StatCard } from '@/app/components/dashboard/StatsCard'


export default function CategoriesIndexPage() {
  const [categories, setCategories] = useState<CategorySummary[]>([])
  const [weeklyCategories, setWeeklyCategories] = useState<CategorySummary[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        // Fetch categories from API
        const [allCategoriesResponse, weeklyCategoriesResponse] = await Promise.all([
          api.getCategories(),
          api.getWeeklyCategories()
        ])
        
        setCategories(allCategoriesResponse.data)
        setWeeklyCategories(weeklyCategoriesResponse.data)
      } catch (error) {
        console.error('Failed to fetch categories data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategoriesData()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  const weeklyTotal = weeklyCategories.reduce((sum, cat) => sum + cat.total, 0)
  const weeklyItems = weeklyCategories.reduce((sum, cat) => sum + cat.count, 0)
  const totalCategories = categories.length
  const allTimeTotal = categories.reduce((sum, cat) => sum + cat.total, 0)

  return (
    <div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="This Week Total"
          value={`€${weeklyTotal.toFixed(2)}`}
          icon={Euro}
        />
        <StatCard
          title="Weekly Items"
          value={weeklyItems.toString()}
          icon={ReceiptIcon}
        />
        <StatCard
          title="Total Categories"
          value={totalCategories.toString()}
          icon={Package}
        />
        <StatCard
          title="All-Time Total"
          value={`€${allTimeTotal.toFixed(2)}`}
          icon={TrendingUp}
        />
      </div>

      {/* This Week's Top Categories */}
      <Card className="p-4 lg:p-6">
        <h2 className="text-lg font-semibold font-sans">Top Categories This Week</h2>
        
        {weeklyCategories.length > 0 ? (
          <div className="space-y-4">
            {weeklyCategories.map((category, index) => (
              <Link
                key={index}
                href={`/dashboard/categories/${encodeURIComponent(category.category)}`}
                className="block p-4 rounded-lg border transition-colors hover:bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold font-sans text-lg">{category.category}</h3>
                    <p className="text-sm text-ci-muted font-serif">{category.count} items purchased</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold font-sans">€{category.total.toFixed(2)}</p>
                    <p className="text-sm text-ci-muted font-serif">
                      avg €{category.avgPrice.toFixed(2)} per item
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="mx-auto h-12 w-12 text-ci-muted mb-4" />
            <p className="text-ci-muted font-serif">No purchases this week yet</p>
          </div>
        )}
      </Card>

      {/* All Categories */}
      <Card className="p-4 lg:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold font-sans">All Categories</h2>
          <p className="text-sm text-ci-muted font-serif">
            {categories.length} categories total
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="space-y-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/dashboard/categories/${encodeURIComponent(category.category)}`}
                className="block p-4 rounded-lg border transition-colors hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold font-sans text-lg">{category.category}</h3>
                    <div className="flex gap-4 mt-1">
                      <p className="text-sm text-ci-muted font-serif">
                        {category.count} items
                      </p>
                      {category.lastPurchase && (
                        <p className="text-sm text-ci-muted font-serif">
                          Last: {new Date(category.lastPurchase).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold font-sans">€{category.total.toFixed(2)}</p>
                    <p className="text-sm text-ci-muted font-serif">
                      avg €{category.avgPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="mx-auto h-12 w-12 text-ci-muted mb-4" />
            <h3 className="mt-2 text-sm font-medium font-sans">No categories yet</h3>
            <p className="mt-1 text-sm text-ci-muted font-serif">
              Upload receipts to start tracking your spending by category.
            </p>
            <div className="mt-6">
              <Link href="/dashboard/upload">
                <Button>
                  <ReceiptIcon className="mr-2 h-4 w-4" />
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