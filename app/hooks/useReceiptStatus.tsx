'use client'

import { useEffect, useRef } from 'react'
import { api } from '@/app/lib/api'
import { useFlash } from '../context/FlashContext'


interface UseReceiptStatusProps {
  receiptIds: number[]
  onComplete?: () => void
}

export function useReceiptStatus({ receiptIds, onComplete }: UseReceiptStatusProps) {
  const { addFlash } = useFlash()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const completedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (receiptIds.length === 0) return

    const checkStatus = async () => {
      try {
        for (const receiptId of receiptIds) {
          if (completedRef.current.has(receiptId)) continue

          const receipt = await api.getReceipt(receiptId)
          
          if (receipt.status === 'completed') {
            completedRef.current.add(receiptId)
            addFlash('success', `Receipt "${receipt.id}" processed successfully!`)
          } else if (receipt.status === 'failed') {
            completedRef.current.add(receiptId)
            addFlash('error', `Failed to process "${receipt.id}"`)
          }
        }

        // If all receipts are complete, stop checking
        if (completedRef.current.size === receiptIds.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          onComplete?.()
        }
      } catch (error) {
        console.error('Error checking receipt status:', error)
      }
    }

    // Check immediately
    checkStatus()

    // Then check every 3 seconds
    intervalRef.current = setInterval(checkStatus, 3000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [receiptIds, addFlash, onComplete])

  const cleanup = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    completedRef.current.clear()
  }

  return { cleanup }
}