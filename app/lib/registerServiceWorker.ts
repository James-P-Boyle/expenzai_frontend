"use client"
import { useEffect } from "react"

export const registerServiceWorker = async () => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        })
        
        console.log('Service Worker registered successfully:', registration)
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, prompt user to refresh
                console.log('New content is available please refresh.')
              }
            })
          }
        })
        
        return registration
      } catch (error) {
        console.error('Service Worker registration failed:', error)
      }
    }
  }
  
  // Add this to your layout.tsx or a separate component
  export const useServiceWorker = () => {
    useEffect(() => {
      registerServiceWorker()
    }, [])
  }