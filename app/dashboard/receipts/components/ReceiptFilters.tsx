import { Search } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { ReceiptStatus } from '@/app/lib/types'
import { Input } from '@/app/components/ui/Input'

interface ReceiptFiltersProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    statusFilter: ReceiptStatus | 'all'
    onStatusChange: (value: ReceiptStatus | 'all') => void
}

export function ReceiptFilters({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusChange
}: ReceiptFiltersProps) {
    return (
        <Card className="p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ci-muted-light" />
                        <Input
                            type="text"
                            placeholder="Search receipts or items..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-6 border-ci-muted-light"
                        />
                    </div>
                </div>

                {/* Status Filter */}
                <div className="sm:w-48">
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusChange(e.target.value as ReceiptStatus | 'all')}
                        className="w-full text-ci-muted px-3 py-2 border border-ci-muted-light rounded-md focus:ring-ci-main focus:border-ci-main ring-ci-main outline-0 h-full"
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="processing">Processing</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
            </div>
        </Card>
    )
}