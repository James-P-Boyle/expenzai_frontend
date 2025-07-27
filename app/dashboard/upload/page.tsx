'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/app/lib/api'
import { getErrorMessage } from '@/app/lib/error-utils'
import { useFlash } from '@/app/context/FlashContext'
import { useReceiptStatus } from '@/app/hooks/useReceiptStatus'
import UploadErrorState from './components/ErrorState'
import UploadMethodSelector from './components/UploadMethodSelector'
import MultiUploadInterface from './components/MultiUploadInterface'
import Tips from './components/Tips'
import AnonymousSessionBanner from '@/app/components/AnonymousSessionBanner'
import type { MultiUploadResponse } from '@/app/lib/types'

type UploadMethod = 'choose' | 'camera' | 'file'
type UploadStatus = 'idle' | 'uploading' | 'error'

export default function UploadPage() {
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>('choose')
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [pendingReceiptIds, setPendingReceiptIds] = useState<number[]>([])
  const router = useRouter()
  const { addFlash } = useFlash()

  // Monitor receipt processing status
  const { cleanup } = useReceiptStatus({
    receiptIds: pendingReceiptIds,
    onComplete: () => {
      setPendingReceiptIds([])
    }
  })

  const handleMultiFileUpload = async (files: File[]) => {
    setUploadStatus('uploading')
    setError(null)

    try {
      // Check if user is authenticated and use appropriate upload method
      const isAuthenticated = !!localStorage.getItem('auth_token')
      let response: MultiUploadResponse
      
      if (isAuthenticated) {
        response = await api.uploadReceipts(files)
      } else {
        response = await api.uploadReceiptsAnonymous(files)
      }
      
      // Show upload success message
      const uploadedCount = response.total_uploaded
      let successMessage: string
      
      if (isAuthenticated) {
        successMessage = `${uploadedCount} ${uploadedCount === 1 ? 'receipt' : 'receipts'} uploaded successfully!`
      } else {
        const remaining = response.remaining_uploads ?? 0
        successMessage = `${uploadedCount} ${uploadedCount === 1 ? 'receipt' : 'receipts'} uploaded successfully! ${remaining} uploads remaining.`
      }
      
      addFlash('success', successMessage)
      
      // Show signup prompt if anonymous user has reached limit
      if (!isAuthenticated && response.signup_prompt) {
        addFlash('warning', response.signup_prompt)
      }
      
      // Start monitoring the uploaded receipts for processing completion
      const receiptIds = response.receipts?.map((receipt) => receipt.id) || []
      setPendingReceiptIds(receiptIds)
      
      // Reset to upload interface
      setUploadMethod('choose')
      setUploadStatus('idle')
      
    } catch (err: unknown) {
      console.error('Upload failed:', err)
      
      // Handle upload limit reached for anonymous users
      const errorMessage = getErrorMessage(err, 'Upload failed')
      
      if (errorMessage.includes('upload_limit_reached') || 
          errorMessage.includes('limit of 3 uploads') ||
          errorMessage.includes('reached the limit')) {
        setError('You\'ve reached the free upload limit. Sign up to continue uploading!')
        addFlash('warning', 'Upload limit reached! Sign up for unlimited uploads.')
      } else {
        setError(errorMessage)
        addFlash('error', 'Upload failed. Please try again.')
      }
      setUploadStatus('error')
    }
  }

  const resetUpload = () => {
    setUploadMethod('choose')
    setUploadStatus('idle')
    setError(null)
    cleanup() // Clean up any pending status checks
    setPendingReceiptIds([])
  }

  const goToDashboard = () => {
    cleanup() // Clean up before navigating away
    router.push('/dashboard')
  }

  if (uploadStatus === 'error') {
    return (
      <div className="p-6 h-full">
        <UploadErrorState
          error={error}
          onTryAgain={resetUpload}
          onBackToDashboard={goToDashboard}
        />
      </div>
    )
  }

  return (
    <>
      <AnonymousSessionBanner />
      
      {uploadMethod === 'choose' && uploadStatus === 'idle' && (
        <UploadMethodSelector onMethodSelect={setUploadMethod} />
      )}
      
      {(uploadMethod === 'camera' || uploadMethod === 'file') && (
        <MultiUploadInterface
          uploadMethod={uploadMethod}
          isUploading={uploadStatus === 'uploading'}
          onFilesUpload={handleMultiFileUpload}
          onCancel={resetUpload}
        />
      )}

      {(uploadMethod === 'choose' || uploadStatus === 'idle') && (
        <Tips />
      )}
    </>
  )
}