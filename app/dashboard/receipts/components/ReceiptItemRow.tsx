import { useState } from 'react'
import { AlertTriangle, Edit3, Check, X } from 'lucide-react'
import { ReceiptItem } from '@/app/lib/types'
import { Input } from '@/app/components/ui/Input'

interface ReceiptItemRowProps {
    item: ReceiptItem
    categories: readonly string[]
    onUpdateItem: (itemId: number, updates: { name?: string; category?: string }) => Promise<void>
    isUpdating: boolean
}

export function ReceiptItemRow({ item, categories, onUpdateItem, isUpdating }: ReceiptItemRowProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState(item.name)
    const [editCategory, setEditCategory] = useState(item.category)

    const startEditing = () => {
        setIsEditing(true)
        setEditName(item.name)
        setEditCategory(item.category)
    }

    const cancelEditing = () => {
        setIsEditing(false)
        setEditName(item.name)
        setEditCategory(item.category)
    }

    const saveEdit = async () => {
        if (!editName.trim() || !editCategory) return

        // Only send fields that have changed
        const updates: { name?: string; category?: string } = {}
        
        if (editName.trim() !== item.name) {
            updates.name = editName.trim()
        }
        
        if (editCategory !== item.category) {
            updates.category = editCategory
        }

        // Only make API call if something actually changed
        if (Object.keys(updates).length > 0) {
            await onUpdateItem(item.id, updates)
        }
        
        setIsEditing(false)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            saveEdit()
        } else if (e.key === 'Escape') {
            cancelEditing()
        }
    }

    return (
        <div className="flex items-center justify-between p-2 rounded-full">
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    {isEditing ? (
                        <Input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="py-0"
                            disabled={isUpdating}
                            placeholder="Item name"
                            autoFocus
                        />
                    ) : (
                        <h4 className="font-medium">{item.name}</h4>
                    )}
                    
                    {item.is_uncertain && !isEditing && (
                        <div className='flex items-center gap-2 text-ci-danger'>
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm">Uncertain category</span>
                        </div>
                    )}
                </div>
                
                <div className="flex items-center space-x-4 mt-1">
                    {isEditing ? (
                        <div className="flex items-center space-x-2 flex-wrap">
                            <select
                                value={editCategory}
                                onChange={(e) => setEditCategory(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="text-sm border border-ci-muted rounded px-2 py-1"
                                disabled={isUpdating}
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={saveEdit}
                                    disabled={isUpdating || !editName.trim()}
                                    className="p-1 text-ci-success hover:text-ci-success disabled:opacity-50"
                                    title="Save changes"
                                >
                                    <Check className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={cancelEditing}
                                    disabled={isUpdating}
                                    className="p-1 text-ci-danger hover:text-ci-danger/80"
                                    title="Cancel editing"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <span className={`text-sm px-2 py-1 rounded-full ${item.is_uncertain
                                    ? 'bg-ci-main/40 text-ci-black'
                                    : 'bg-ci-main/40 text-ci-black'
                                }`}>
                                {item.category}
                            </span>
                            <button
                                onClick={startEditing}
                                className="p-1 text-ci-muted hover:text-ci-muted"
                                title="Edit item name and category"
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