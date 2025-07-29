'use client';

import { useEffect, useState } from 'react';

interface DebugInfo {
  isStandalone?: boolean;
  isIOS?: boolean;
  hasServiceWorker?: boolean;
  swRegistration?: string;
  manifestFetch?: string;
  protocol?: string;
  isLocalhost?: boolean;
  userAgent?: string;
  installPromptReceived?: boolean;
  eventType?: string;
  manifestName?: string;
  manifestError?: string;
}

export default function PWADebug() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({});

  useEffect(() => {
    const checkPWAStatus = () => {
      const info: DebugInfo = {
        isStandalone: window.matchMedia('(display-mode: standalone)').matches,
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
        hasServiceWorker: 'serviceWorker' in navigator,
        swRegistration: 'checking...',
        manifestFetch: 'pending',
        protocol: window.location.protocol,
        isLocalhost: window.location.hostname === 'localhost',
        userAgent: navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other',
      };

      // Check service worker registration
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration()
          .then(reg => {
            setDebugInfo(prev => ({
              ...prev,
              swRegistration: reg ? 'registered' : 'not registered'
            }));
          });
      }

      // Try to fetch manifest
      fetch('/manifest.json')
        .then(res => res.json())
        .then(manifest => {
          setDebugInfo(prev => ({
            ...prev,
            manifestFetch: 'success',
            manifestName: manifest.name
          }));
        })
        .catch(err => {
          setDebugInfo(prev => ({
            ...prev,
            manifestFetch: 'failed',
            manifestError: err.message
          }));
        });

      setDebugInfo(info);
    };

    checkPWAStatus();

    // Listen for install prompt
    const handleInstallPrompt = (e: any) => {
      console.log('🎯 DEBUG: Install prompt intercepted');
      console.log('🔍 Event details:', e);
      setDebugInfo(prev => ({...prev, installPromptReceived: true, eventType: e.type}));
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">PWA Debug Info:</h3>
      <div className="space-y-1">
        <div>Protocol: {debugInfo.protocol}</div>
        <div>Localhost: {debugInfo.isLocalhost ? '✅' : '❌'}</div>
        <div>Browser: {debugInfo.userAgent}</div>
        <div>Standalone: {debugInfo.isStandalone ? '✅' : '❌'}</div>
        <div>iOS: {debugInfo.isIOS ? '✅' : '❌'}</div>
        <div>SW Support: {debugInfo.hasServiceWorker ? '✅' : '❌'}</div>
        <div>SW Registered: {debugInfo.swRegistration || 'checking...'}</div>
        <div>Manifest: {debugInfo.manifestFetch}</div>
        <div>Install Prompt: {debugInfo.installPromptReceived ? '✅ Received' : '⏳ Waiting'}</div>
        {debugInfo.manifestError && (
          <div className="text-red-400">Error: {debugInfo.manifestError}</div>
        )}
      </div>
    </div>
  );
}