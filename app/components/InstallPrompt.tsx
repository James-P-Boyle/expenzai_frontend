'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { Download, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);
    
    // Detect if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    // Only show prompt if not already installed
    if (!standalone) {
      setShowPrompt(true);
    }

    // Listen for beforeinstallprompt event (non-iOS browsers)
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log('📥 Install prompt event received');
      e.preventDefault();
      console.log('🛑 preventDefault() called - storing event for later use');
      setDeferredPrompt(e);
      setShowPrompt(true); // Make sure we show the prompt UI
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        console.log('🚀 Calling prompt() on deferred event');
        const promptResult = await deferredPrompt.prompt();
        console.log('📱 Prompt result:', promptResult);
        
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`✅ Install prompt outcome: ${outcome}`);
        
        if (outcome === 'accepted') {
          console.log('🎉 User accepted the install prompt');
          setShowPrompt(false);
        } else {
          console.log('❌ User dismissed the install prompt');
        }
        
        setDeferredPrompt(null);
      } catch (error) {
        console.error('❌ Error showing install prompt:', error);
      }
    } else {
      console.log('⚠️ No deferred prompt available');
    }
  };

  // Don't show if already installed
  if (isStandalone) {
    return null;
  }

  // TEMPORARY: Force show for debugging
  const forceShow = true;

  if (!showPrompt && !forceShow) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Smartphone className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-900">Install ExpenzAI</h3>
        {deferredPrompt && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ready!</span>}
      </div>
      
      <p className="text-sm text-blue-700 mb-3">
        Get the full app experience with offline access and quick launch from your home screen.
      </p>

      {isIOS ? (
        <div className="space-y-2">
          <p className="text-sm text-blue-600">
            To install on iOS:
          </p>
          <ol className="text-sm text-blue-600 space-y-1 ml-4">
            <li>1. Tap the Share button <span className="inline-block">⎋</span></li>
            <li>2. Select "Add to Home Screen" <span className="inline-block">➕</span></li>
            <li>3. Tap "Add" to confirm</li>
          </ol>
        </div>
      ) : deferredPrompt ? (
        <Button
          onClick={handleInstallClick}
          variant="secondary"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Download className="mr-2 h-4 w-4" />
          Add to Home Screen
        </Button>
      ) : (
        <p className="text-sm text-blue-600">
          Install option will appear when available in your browser.
        </p>
      )}
    </div>
  );
}