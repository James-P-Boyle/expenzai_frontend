import { useState } from 'react'
import { AlertTriangle, Edit3, Check, X } from 'lucide-react'
import { ReceiptItem } from '@/app/lib/types'

interface ReceiptItemRowProps {
    item: ReceiptItem
    categories: string[]
    onUpdateItem: (itemId: number, category: string) => Promise<void>
    isUpdating: boolean
}

export function ReceiptItemRow({ item, categories, onUpdateItem, isUpdating }: ReceiptItemRowProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editCategory, setEditCategory] = useState(item.category)

    const startEditing = () => {
        setIsEditing(true)
        setEditCategory(item.category)
    }

    const cancelEditing = () => {
        setIsEditing(false)
        setEditCategory(item.category)
    }

    const saveEdit = async () => {
        if (!editCategory) return

        await onUpdateItem(item.id, editCategory)
        setIsEditing(false)
    }

    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-full">
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{item.name}</h4>
                    {item.is_uncertain && (
                        <div className='flex items-center gap-2 text-ci-main'>
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm">Uncertain category</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-4 mt-1">
                    {isEditing ? (
                        <div className="flex items-center space-x-2">
                            <select
                                value={editCategory}
                                onChange={(e) => setEditCategory(e.target.value)}
                                className="text-sm border border-ci-muted rounded px-2 py-1"
                                disabled={isUpdating}
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <button
                                onClick={saveEdit}
                                disabled={isUpdating}
                                className="p-1 text-ci-success hover:text-ci-success"
                            >
                                <Check className="h-4 w-4" />
                            </button>
                            <button
                                onClick={cancelEditing}
                                disabled={isUpdating}
                                className="p-1 text-red-600 hover:text-red-800"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <span className={`text-sm px-2 py-1 rounded-full ${item.is_uncertain
                                    ? 'bg-ci-main text-ci-main'
                                    : 'bg-ci-main text-ci-main'
                                }`}>
                                {item.category}
                            </span>
                            <button
                                onClick={startEditing}
                                className="p-1 text-ci-muted hover:text-ci-muted"
                                title="Edit category"
                            >
                                <Edit3 className="h-3 w-3" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="text-right">
                <p className="font-medium">{item.formatted_price}</p>
            </div>
        </div>
    )
}