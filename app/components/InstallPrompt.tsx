'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/Button'
import { Download, Smartphone } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(iOS)
    
    // Detect if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone === true
    setIsStandalone(standalone)

    // Only show prompt if not already installed
    if (!standalone) {
      setShowPrompt(true)
    }

    // Listen for beforeinstallprompt event (non-iOS browsers)
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log('📥 Install prompt event received')
      e.preventDefault()
      console.log('🛑 preventDefault() called - storing event for later use')
      setDeferredPrompt(e)
      setShowPrompt(true) // Make sure we show the prompt UI
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        console.log('🚀 Calling prompt() on deferred event')
        
        // Add a small delay to ensure event is fully processed
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const promptResult = await deferredPrompt.prompt()
        console.log('📱 Prompt result:', promptResult)
        
        const { outcome } = await deferredPrompt.userChoice
        console.log(`✅ Install prompt outcome: ${outcome}`)
        
        if (outcome === 'accepted') {
          console.log('🎉 User accepted the install prompt')
          setShowPrompt(false)
        } else {
          console.log('❌ User dismissed the install prompt')
        }
        
        setDeferredPrompt(null)
      } catch (error) {
        console.error('❌ Error showing install prompt:', error)
        
        // Try alternative approach
        if (deferredPrompt && typeof deferredPrompt.prompt === 'function') {
          try {
            console.log('🔄 Trying alternative prompt approach...')
            deferredPrompt.prompt()
          } catch (altError) {
            console.error('❌ Alternative approach also failed:', altError)
          }
        }
      }
    } else {
      console.log('⚠️ No deferred prompt available')
    }
  }

  // Don't show if already installed
  if (isStandalone) {
    return null
  }

  // TEMPORARY: Force show for debugging
  const forceShow = true

  if (!showPrompt && !forceShow) {
    return null
  }

  return (
    <div className="mt-10 p-4 border-2 border-ci-main/20 rounded-lg">
      <div className="flex items-center gap-2 mb-2 justify-center">
        <Smartphone className="h-5 w-5 text-ci-main" />
        <h3 className="text-lg font-semibold text-ci-main">Install ExpenzAI</h3>
        {deferredPrompt && <span className="text-xs bg-ci-success/20 text-ci-success px-2 py-1 rounded">Ready!</span>}
      </div>
      
      <p className="text-sm text-ci-main mb-3">
        Get the full app experience with offline access and quick launch from your home screen.
      </p>

      {isIOS ? (
        <div className="space-y-2">
          <p className="text-sm text-ci-muted">
            To install on iOS:
          </p>
          <ol className="text-sm text-ci-muted space-y-1 ml-4">
            <li>1. Tap the Share button <span className="inline-block">⎋</span></li>
            <li>2. Select "Add to Home Screen" <span className="inline-block">➕</span></li>
            <li>3. Tap "Add" to confirm</li>
          </ol>
        </div>
      ) : deferredPrompt ? (
        <Button
          onClick={handleInstallClick}
          variant="secondary"
        >
          <Download className="mr-2 h-4 w-4" />
          Add to Home Screen
        </Button>
      ) : (
        <p className="text-sm text-ci-muted">
          Install option will appear when available in your browser.
        </p>
      )}
    </div>
  )
}