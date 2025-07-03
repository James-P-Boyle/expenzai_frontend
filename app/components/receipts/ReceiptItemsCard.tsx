import { Card } from '@/app/components/ui/Card'
import { Receipt } from '@/app/lib/types'
import { ReceiptItemRow } from './ReceiptItemRow'

interface ReceiptItemsCardProps {
    receipt: Receipt
    categories: string[]
    onUpdateItem: (itemId: number, category: string) => Promise<void>
    isUpdating: boolean
}

export function ReceiptItemsCard({ receipt, categories, onUpdateItem, isUpdating }: ReceiptItemsCardProps) {
    return (
        <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Items</h3>
            {receipt.items.length === 0 ? (
                <p className="text-ci-muted text-center py-8">No items found</p>
            ) : (
                <div className="space-y-3">
                    {receipt.items.map((item) => (
                        <ReceiptItemRow
                            key={item.id}
                            item={item}
                            categories={categories}
                            onUpdateItem={onUpdateItem}
                            isUpdating={isUpdating}
                        />
                    ))}
                </div>
            )}
        </Card>
    )
}