import { Card } from '@/app/components/ui/Card'
import { Receipt } from '@/app/lib/types'

interface ReceiptCategoryBreakdownProps {
  receipt: Receipt
}

export function ReceiptCategoryBreakdown({ receipt }: ReceiptCategoryBreakdownProps) {
  const categoryTotals = receipt.items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + parseFloat(item.price)
    return acc
  }, {} as Record<string, number>)

  return (
    <Card className="p-4">
      <h4 className="font-medium mb-3">Category Breakdown</h4>
      <div className="space-y-2">
        {Object.entries(categoryTotals).map(([category, total]) => (
          <div key={category} className="flex justify-between text-sm">
            <span className="text-ci-muted">{category}</span>
            <span className="font-medium">€{total.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}