'use client'

import { useState, useCallback } from 'react'
import { Calendar, Check, X, Edit } from 'lucide-react'

interface EditableDateFieldProps {
    value: string | null
    onUpdate: (newDate: string) => Promise<void>
    isUpdating?: boolean
}

export default function EditableDateField({
    value,
    onUpdate,
    isUpdating = false
}: EditableDateFieldProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [tempValue, setTempValue] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'No date'

        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        } catch {
            return 'Invalid date'
        }
    }

    const getInputDateValue = (dateString: string | null) => {
        if (!dateString) return ''

        try {
            return new Date(dateString).toISOString().split('T')[0]
        } catch {
            return ''
        }
    }

    const handleStartEdit = useCallback(() => {
        setTempValue(getInputDateValue(value))
        setIsEditing(true)
    }, [value])

    const handleCancel = useCallback(() => {
        setIsEditing(false)
        setTempValue('')
    }, [])

    const handleSave = useCallback(async () => {
        if (!tempValue || tempValue === getInputDateValue(value)) {
            handleCancel()
            return
        }

        setIsSubmitting(true)
        try {
            await onUpdate(tempValue)
            setIsEditing(false)
            setTempValue('')
        } catch (error) {
            console.error('Failed to update date:', error)
            // Keep editing mode open on error
        } finally {
            setIsSubmitting(false)
        }
    }, [tempValue, value, onUpdate, handleCancel])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSave()
        } else if (e.key === 'Escape') {
            e.preventDefault()
            handleCancel()
        }
    }, [handleSave, handleCancel])

    const getTodayDateString = () => {
        return new Date().toISOString().split('T')[0]
    }

    if (isEditing) {
        return (
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-ci-muted flex-shrink-0" />
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    <input
                        type="date"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        max={getTodayDateString()}
                        className="border rounded px-2 py-1 text-sm min-w-0 flex-1"
                        autoFocus
                        disabled={isSubmitting}
                    />
                    <div className="flex gap-1 flex-shrink-0">
                        <button
                            onClick={handleSave}
                            disabled={isSubmitting || !tempValue}
                            className="p-1 text-ci-success hover:bg-ci-success/20 rounded disabled:opacity-50"
                            title="Save"
                        >
                            <Check className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="p-1 text-ci-danger hover:bg-cidanger/10 rounded disabled:opacity-50"
                            title="Cancel"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2 group">
            <Calendar className="w-4 h-4 text-ci-muted flex-shrink-0" />
            <button
                onClick={handleStartEdit}
                disabled={isUpdating}
                className="flex items-center gap-2 text-left hover:bg-ci-main/20 rounded px-2 py-1 transition-colors disabled:opacity-50 min-w-0 flex-1"
                title="Click to edit date"
            >
                <span className="min-w-0 flex-1">
                    {formatDate(value)}
                </span>
                <Edit className="w-3 h-3 text-ci-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </button>
        </div>
    )
}