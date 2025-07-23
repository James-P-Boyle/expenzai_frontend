'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from './Button'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    showCloseButton?: boolean
    closeOnBackdropClick?: boolean
}

export default function Modal({ 
    isOpen, 
    onClose, 
    children, 
    title,
    size = 'md',
    showCloseButton = true,
    closeOnBackdropClick = true 
}: ModalProps) {
    
    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden' // Prevent background scroll
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && closeOnBackdropClick) {
            onClose()
        }
    }

    return (
        <div 
            className="fixed inset-0 bg-ci-white/80 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={handleBackdropClick}
        >
            <div className={`w-full ${sizeClasses[size]} bg-ci-black rounded-lg shadow-2xl relative border border-ci-main/20 max-h-[90vh] overflow-y-auto`}>
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-6 pb-0">
                        {title && (
                            <h2 className="text-xl font-semibold">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <Button
                                onClick={onClose}
                                variant="secondary"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className={title || showCloseButton ? 'p-6 pt-4' : 'p-6'}>
                    {children}
                </div>
            </div>
        </div>
    )
}