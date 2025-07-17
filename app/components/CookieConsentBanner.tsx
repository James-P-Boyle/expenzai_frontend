'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './ui/Button'

export default function ConsentBanner() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has already given consent
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            setIsVisible(true)
        }
    }, [])

    const handleAcceptAll = () => {
        localStorage.setItem('cookie-consent', JSON.stringify({
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        }))
        setIsVisible(false)
    }

    const handleAcceptNecessary = () => {
        localStorage.setItem('cookie-consent', JSON.stringify({
            necessary: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        }))
        setIsVisible(false)
    }

    const handleCustomize = () => {
        window.open('/privacy', '_blank')
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-ci-white dark:bg-ci-black border-t border-ci-muted/50">
            <div className="max-w-6xl mx-auto py-6 px-4 lg:py-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2">
                            Cookie Consent
                        </h3>
                        <p className="">
                            We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. 
                            By continuing to use our site, you consent to our use of cookies.{' '}
                            <Link 
                                href="/privacy" 
                                className="text-ci-main hover:underline"
                            >
                                Learn more about our privacy practices
                            </Link>
                        </p>
                    </div>
                    
                    <div className="flex items-center flex-col lg:flex-row gap-2 w-full lg:w-auto">
                        <Button
                            onClick={handleAcceptNecessary}
                            variant='secondary'
                            className='whitespace-nowrap'
                        >
                            Necessary Only
                        </Button>
                        <Button
                            onClick={handleCustomize}
                            variant='secondary'
                        >
                            Customize
                        </Button>
                        <Button onClick={handleAcceptAll}>
                            Accept All
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}