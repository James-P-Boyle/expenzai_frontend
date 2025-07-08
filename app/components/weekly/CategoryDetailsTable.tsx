import { AlertTriangle } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { WeeklySummary } from '@/app/lib/types'
import { COLORS } from '@/app/lib/constants'


interface CategoryDetailsTableProps {
  weeklySummary: WeeklySummary
}

export default function CategoryDetailsTable({ weeklySummary }: CategoryDetailsTableProps) {
  const sortedCategories = weeklySummary.categories.sort((a, b) => b.total - a.total)

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Category Details</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-ci-muted uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-ci-muted uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-ci-muted uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-ci-muted uppercase tracking-wider">
                Avg per Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-ci-muted uppercase tracking-wider">
                Uncertain
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCategories.map((category, index) => (
              <tr key={category.category} className={index % 2 === 0 ? '' : 'bg-ci-main/5'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div 
                      className="size-4 rounded-full mr-3"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm font-bold">
                      {category.category}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  €{category.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {category.count}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  €{(category.total / category.count).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {category.uncertain_count && category.uncertain_count > 0 ? (
                    <span className="inline-flex items-center py-1 px-2 rounded-full text-xs font-bold bg-ci-main text-ci-black">
                      <AlertTriangle className="size-4 mr-1" />
                      {category.uncertain_count}
                    </span>
                  ) : (
                    <span className="text-sm text-ci-muted">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}