'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });
          
          console.log('✅ Service Worker registered successfully:', registration);
          
          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('🔄 New content is available; please refresh.');
                  // You could show a toast notification here
                }
              });
            }
          });
          
        } catch (error) {
          console.error('❌ Service Worker registration failed:', error);
        }
      };

      registerSW();
    }
  }, []);

  return null; 
}