'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Receipt as ReceiptIcon, Euro, Calendar, TrendingUp, Package } from 'lucide-react'
import { CategoryDetails } from '@/app/lib/types'
import { api } from '@/app/lib/api'
import LoadingSpinner from '@/app/components/ui/LoadingSpinner'
import { Button } from '@/app/components/ui/Button'
import { Card } from '@/app/components/ui/Card'
import Header from '@/app/components/dashboard/Header'
import { StatCard } from '@/app/components/dashboard/StatsCard'

export default function CategoryDetailPage() {
  const params = useParams()
  const [categoryDetails, setCategoryDetails] = useState<CategoryDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Add safety check for params - now using 'slug' instead of 'category'
  const categoryName = params?.slug ? decodeURIComponent(params.slug as string) : null

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      if (!categoryName) {
        setIsLoading(false)
        return
      }

      try {
        setError(null)
        const response = await api.getCategoryDetails(categoryName)
        setCategoryDetails(response.data) 
      } catch (error) {
        console.error('Failed to fetch category details:', error)
        setError(error instanceof Error ? error.message : 'Failed to load category details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategoryDetails()
  }, [categoryName])

  // Handle loading state
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center py-6 lg:py-12 ">
        <Package className="mx-auto h-12 w-12 text-red-400 mb-4" />
        <h3 className="text-lg font-medium font-sans">Error Loading Category</h3>
        <p className="text-ci-muted font-serif mb-6">
          {error}
        </p>
        <Link href="/dashboard/categories">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </Link>
      </div>
    )
  }

  // Handle missing category name
  if (!categoryName) {
    return (
      <div className="text-center py-6 lg:py-12 ">
        <Package className="mx-auto h-12 w-12 text-ci-muted mb-4" />
        <h3 className="text-lg font-medium font-sans">Invalid Category</h3>
        <p className="text-ci-muted font-serif mb-6">
          No category specified.
        </p>
        <Link href="/dashboard/categories">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </Link>
      </div>
    )
  }

  // Handle category not found
  if (!categoryDetails) {
    return (
      <div className="text-center py-6 lg:py-12 ">
        <Package className="mx-auto h-12 w-12 text-ci-muted mb-4" />
        <h3 className="text-lg font-medium font-sans">Category not found</h3>
        <p className="text-ci-muted font-serif mb-6">
          The category {categoryName} doesnt exist or has no data.
        </p>
        <Link href="/dashboard/categories">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Header 
        title={categoryName}
        subtitle={`Complete overview of your ${categoryName.toLowerCase()} expenses`}
      >
        <Link href="/dashboard/categories">
          <Button variant="secondary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </Link>
      </Header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Spent"
          value={`€${categoryDetails.total_spent.toFixed(2)}`}
          icon={Euro}
        />
        <StatCard
          title="Items Purchased"
          value={categoryDetails.item_count.toString()}
          icon={Package}
        />
        <StatCard
          title="Receipts"
          value={categoryDetails.receipt_count.toString()}
          icon={ReceiptIcon}
        />
        <StatCard
          title="Average Price"
          value={`€${categoryDetails.avg_price.toFixed(2)}`}
          icon={TrendingUp}
        />
      </div>

      {/* Time Range Info */}
      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold font-sans mb-4">Purchase Timeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-ci-main mr-3" />
            <div>
              <p className="text-sm text-ci-muted font-serif">First Purchase</p>
              <p className="font-medium font-sans">
                {new Date(categoryDetails.first_purchase).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-ci-main mr-3" />
            <div>
              <p className="text-sm text-ci-muted font-serif">Last Purchase</p>
              <p className="font-medium font-sans">
                {new Date(categoryDetails.last_purchase).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Monthly Breakdown */}
      {categoryDetails.monthly_breakdown && categoryDetails.monthly_breakdown.length > 0 && (
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-semibold font-sans mb-6">Monthly Breakdown</h2>
          <div className="space-y-4">
            {categoryDetails.monthly_breakdown.map((month, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium font-sans">
                    {new Date(month.month).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </p>
                  <p className="text-sm text-ci-muted font-serif">{month.count} items</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold font-sans">€{month.total.toFixed(2)}</p>
                  <p className="text-sm text-ci-muted font-serif">
                    avg €{(month.total / month.count).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recent Items */}
      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold font-sans">Recent Items</h2>
          <p className="text-sm text-ci-muted font-serif">
            {categoryDetails.items.length} total items
          </p>
        </div>
        
        {categoryDetails.items.length > 0 ? (
          <div className="space-y-3">
            {categoryDetails.items.slice(0, 10).map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium font-sans">{item.name}</p>
                  <p className="text-sm text-ci-muted font-serif">
                    {item.store_name || item.receipt?.store_name || 'Unknown Store'} • {new Date(item.receipt?.receipt_date || item.receipt?.created_at || '').toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold font-sans">
                    €{(() => {
                        const price = typeof item.price === 'string' ? parseFloat(item.price) : Number(item.price || 0)
                        return price.toFixed(2)
                    })()}
                  </p>
                  {item.is_uncertain && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      Uncertain
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {categoryDetails.items.length > 10 && (
              <p className="text-center text-sm text-ci-muted font-serif pt-4">
                Showing 10 of {categoryDetails.items.length} items
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-ci-muted font-serif py-8">
            No items found in this category
          </p>
        )}
      </Card>

      {/* Related Receipts */}
      <Card className="p-4 lg:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold font-sans">Related Receipts</h2>
          <p className="text-sm text-ci-muted font-serif">
            {categoryDetails.receipts.length} receipts
          </p>
        </div>
        
        {categoryDetails.receipts.length > 0 ? (
          <div className="space-y-3">
            {categoryDetails.receipts.map((receipt) => {
              const categoryItems = receipt.items.filter(item => 
                (item.category || 'Uncategorized') === categoryName
              )
              const categoryTotal = categoryItems.reduce((sum, item) => 
                sum + (typeof item.price === 'string' ? parseFloat(item.price) : (item.price || 0)), 0
              )
              
              return (
                <Link key={receipt.id} href={`/dashboard/receipts/${receipt.id}`}>
                  <div className="flex justify-between items-center p-3 rounded-lg border transition-colors hover:bg-gray-50">
                    <div>
                      <p className="font-medium font-sans">
                        {receipt.store_name || 'Unknown Store'}
                      </p>
                      <p className="text-sm text-ci-muted font-serif">
                        {new Date(receipt.receipt_date || receipt.created_at).toLocaleDateString()} • {categoryItems.length} {categoryName.toLowerCase()} item{categoryItems.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold font-sans">€{categoryTotal.toFixed(2)}</p>
                      <p className="text-sm text-ci-muted font-serif">
                        of {receipt.formatted_total}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-ci-muted font-serif py-8">
            No receipts found for this category
          </p>
        )}
      </Card>
    </div>
  )
}