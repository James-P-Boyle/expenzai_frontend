'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { initGA, updateConsent as updateGAConsent } from '../lib/analytics'

interface ConsentPreferences {
    necessary: boolean
    analytics: boolean
    marketing: boolean
    timestamp?: string
}

interface ConsentContextType {
    consent: ConsentPreferences | null
    updateConsent: (preferences: ConsentPreferences | null) => void
    hasConsent: (type: keyof ConsentPreferences) => boolean
    resetConsent: () => void
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined)

export function ConsentProvider({ children }: { children: ReactNode }) {
    const [consent, setConsent] = useState<ConsentPreferences | null>(null)

    useEffect(() => {
        // Initialize GA on mount
        initGA()
        
        // Load consent from localStorage on mount
        const savedConsent = localStorage.getItem('cookie-consent')
        if (savedConsent) {
            try {
                const parsedConsent = JSON.parse(savedConsent)
                setConsent(parsedConsent)
                
                // Update GA consent based on saved preferences
                updateGAConsent(
                    parsedConsent.analytics ? 'granted' : 'denied',
                    parsedConsent.marketing ? 'granted' : 'denied'
                )
            } catch (error) {
                console.error('Error parsing consent preferences:', error)
            }
        }
    }, [])

    const updateConsent = (preferences: ConsentPreferences | null) => {

        if(preferences == null) return 
        
        const consentWithTimestamp = {
            ...preferences,
            timestamp: new Date().toISOString()
        }
        
        setConsent(consentWithTimestamp)
        localStorage.setItem('cookie-consent', JSON.stringify(consentWithTimestamp))
        
        // Update Google Analytics consent
        updateGAConsent(
            preferences.analytics ? 'granted' : 'denied',
            preferences.marketing ? 'granted' : 'denied'
        )
    }

    const hasConsent = (type: keyof ConsentPreferences) => {
        if (!consent) return false
        return consent[type] === true
    }

    const resetConsent = () => {
        setConsent(null)
        localStorage.removeItem('cookie-consent')
        
        // Reset GA consent
        updateGAConsent('denied', 'denied')
    }

    return (
        <ConsentContext.Provider value={{
            consent,
            updateConsent,
            hasConsent,
            resetConsent
        }}>
            {children}
        </ConsentContext.Provider>
    )
}

export function useConsent() {
    const context = useContext(ConsentContext)
    if (context === undefined) {
        throw new Error('useConsent must be used within a ConsentProvider')
    }
    return context
} 

// Hook for conditional analytics/marketing code
export function useConditionalScript(
    type: 'analytics' | 'marketing',
    scriptFn: () => void
) {
    const { hasConsent } = useConsent()
    
    useEffect(() => {
        if (hasConsent(type)) {
            scriptFn()
        }
    }, [hasConsent, type, scriptFn])
}