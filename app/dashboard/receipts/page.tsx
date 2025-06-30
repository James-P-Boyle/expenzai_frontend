'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { 
  Receipt as ReceiptIcon, 
  Upload, 
  Clock, 
  CheckCircle, 
  XCircle,
  Search,
  Filter,
  Calendar
} from 'lucide-react'
import { api } from '@/app/lib/api'
import { Button } from '@/app/components/ui/Button'
import { Card } from '@/app/components/ui/Card'
import { Receipt, ReceiptStatus } from '@/app/lib/types'

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<ReceiptStatus | 'all'>('all')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchReceipts()
  }, [])

  const fetchReceipts = async () => {
    try {
      setIsLoading(true)
      const response = await api.getReceipts()
      setReceipts(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch receipts')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: ReceiptStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'processing':
        return <Clock className="h-5 w-5 text-ci-main" />
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-ci-muted" />
    }
  }

  const getStatusColor = (status: ReceiptStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-ci-main text-ci-main'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = searchTerm === '' || 
      receipt.store_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || receipt.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-ci-black">My Receipts</h1>
          <p className="text-ci-muted mt-1">
            {receipts.length} receipt{receipts.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Link href="/dashboard/upload">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Receipt
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ci-muted" />
              <input
                type="text"
                placeholder="Search receipts or items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-ci-muted rounded-md focus:ring-ci-main focus:border-ci-main"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ReceiptStatus | 'all')}
              className="w-full px-3 py-2 border border-ci-muted rounded-md focus:ring-ci-main focus:border-ci-main"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="p-6 mb-6">
          <div className="text-center text-red-600">
            <XCircle className="mx-auto h-8 w-8 mb-2" />
            <p>{error}</p>
            <Button onClick={fetchReceipts} variant="secondary" className="mt-4">
              Try Again
            </Button>
          </div>
        </Card>
      )}

      {/* Receipts List */}
      {filteredReceipts.length === 0 ? (
        <Card className="p-12 text-center">
          <ReceiptIcon className="mx-auto h-12 w-12 text-ci-muted mb-4" />
          <h3 className="text-lg font-medium text-ci-black mb-2">
            {searchTerm || statusFilter !== 'all' ? 'No matching receipts' : 'No receipts yet'}
          </h3>
          <p className="text-ci-muted mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Upload your first receipt to get started tracking expenses'
            }
          </p>
          {(!searchTerm && statusFilter === 'all') && (
            <Link href="/dashboard/upload">
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Receipt
              </Button>
            </Link>
          )}
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReceipts.map((receipt) => (
            <Card key={receipt.id} className="p-6 hover:shadow-md transition-shadow">
              <Link href={`/dashboard/receipts/${receipt.id}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <ReceiptIcon className="h-6 w-6 text-ci-muted" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-ci-black">
                          {receipt.store_name || 'Unknown Store'}
                        </h3>
                        {getStatusIcon(receipt.status)}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-ci-muted">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {receipt.receipt_date || receipt.created_at.split('T')[0]}
                        </div>
                        <div>
                          {receipt.items.length} item{receipt.items.length !== 1 ? 's' : ''}
                        </div>
                        {receipt.status === 'completed' && (
                          <div className="font-medium text-ci-muted">
                            {receipt.formatted_total}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(receipt.status)}`}>
                      {receipt.status}
                    </span>
                    <div className="text-right">
                      {receipt.status === 'completed' && (
                        <div className="font-semibold text-ci-black">
                          {receipt.formatted_total}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}