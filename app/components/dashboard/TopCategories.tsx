import Link from 'next/link'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

interface Category {
    category: string
    count: number
    total: number
}

interface TopCategoriesProps {
    categories: Category[]
    hasCategories: boolean
}

export function TopCategories({ categories, hasCategories }: TopCategoriesProps) {
    return (
        <Card className="p-4 lg:p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold font-sans">
                    Top Categories This Week
                </h3>
                {hasCategories && (
                    <Link href="/dashboard/categories">
                        <Button variant="secondary" size="sm">View All</Button>
                    </Link>
                )}
            </div>

            {hasCategories ? (
                <div className="space-y-3">
                    {categories.slice(0, 3).map((category, index) => (
                        <Link
                            key={index}
                            href={`/dashboard/categories/${encodeURIComponent(category.category)}`}
                            className="block p-3 rounded-full transition-colors hover:bg-gray-50"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-medium font-sans">{category.category}</span>
                                    <p className="text-sm text-ci-muted font-serif">{category.count} items</p>
                                </div>
                                <div className="text-right">
                                    <span className="font-semibold font-sans">€{category.total.toFixed(2)}</span>
                                    <p className="text-xs text-ci-muted font-serif">
                                        avg €{(category.total / category.count).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-ci-muted text-sm font-serif">
                    No receipts this week. Upload your first receipt to get started!
                </p>
            )}
        </Card>
    )
}