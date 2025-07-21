'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

type FlashType = 'success' | 'error' | 'warning'

interface FlashMessage {
    id: string
    type: FlashType
    message: string
    timestamp: number
}

interface FlashContextType {
    messages: FlashMessage[]
    addFlash: (type: FlashType, message: string) => void
    removeFlash: (id: string) => void
    clearAll: () => void
}

const FlashContext = createContext<FlashContextType | undefined>(undefined)

export function FlashProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<FlashMessage[]>([])

    const addFlash = useCallback((type: FlashType, message: string) => {
        const id = Math.random().toString(36).substring(7)
        const newMessage: FlashMessage = {
            id,
            type,
            message,
            timestamp: Date.now()
        }

        setMessages(prev => [...prev, newMessage])

        // Auto remove after 5 seconds
        setTimeout(() => {
            setMessages(prev => prev.filter(msg => msg.id !== id))
        }, 5000)
    }, [])

    const removeFlash = useCallback((id: string) => {
        setMessages(prev => prev.filter(msg => msg.id !== id))
    }, [])

    const clearAll = useCallback(() => {
        setMessages([])
    }, [])

    return (
        <FlashContext.Provider value={{ messages, addFlash, removeFlash, clearAll }}>
            {children}
        </FlashContext.Provider>
    )
}

export function useFlash() {
    const context = useContext(FlashContext)
    if (context === undefined) {
        throw new Error('useFlash must be used within a FlashProvider')
    }
    return context
}