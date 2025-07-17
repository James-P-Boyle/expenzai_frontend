// utils/analytics.ts
declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'consent',
            targetIdOrEventName: string,
            config?: { [key: string]: any }
        ) => void
        dataLayer: any[]
    }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Initialize Google Analytics
export const initGA = () => {
    if (typeof window === 'undefined' || !GA_TRACKING_ID) return

    // Load gtag script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script)

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    
    // Define gtag function
    window.gtag = function gtag() {
        window.dataLayer.push(...arguments)
    }

    // Set default consent
    window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
    })

    // Initialize GA
    window.gtag('config', GA_TRACKING_ID, {
        page_title: document.title,
        page_location: window.location.href
    })
}

// Track events
export const trackEvent = (eventName: string, parameters?: { [key: string]: any }) => {
    if (typeof window === 'undefined' || !window.gtag) return
    
    window.gtag('event', eventName, parameters)
}

// Track page views
export const trackPageView = (url: string) => {
    if (typeof window === 'undefined' || !window.gtag || !GA_TRACKING_ID) return
    
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url
    })
}

// Update consent
export const updateConsent = (analyticsStorage: 'granted' | 'denied', adStorage: 'granted' | 'denied') => {
    if (typeof window === 'undefined' || !window.gtag) return
    
    window.gtag('consent', 'update', {
        analytics_storage: analyticsStorage,
        ad_storage: adStorage
    })
}