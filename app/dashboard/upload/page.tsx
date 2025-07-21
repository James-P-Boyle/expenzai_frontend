'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/app/lib/api'
import UploadErrorState from '@/app/components/upload/ErrorState'
import UploadMethodSelector from '@/app/components/upload/UploadMethodSelector'
import MultiUploadInterface from '@/app/components/upload/MultiUploadInterface'
import Tips from '@/app/components/upload/Tips'
import { getErrorMessage } from '@/app/lib/error-utils'
import { useFlash } from '@/app/context/FlashContext'
import { useReceiptStatus } from '@/app/hooks/useReceiptStatus'


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
      const response = await api.uploadReceipts(files)
      
      // Immediately show upload success and reset to upload interface
      const uploadedCount = response.total_uploaded
      addFlash('success', `${uploadedCount} ${uploadedCount === 1 ? 'receipt' : 'receipts'} uploaded successfully!`)
      
      // Start monitoring the uploaded receipts for processing completion
      const receiptIds = response.receipts.map(r => r.id)
      setPendingReceiptIds(receiptIds)
      
      // Immediately reset to upload interface
      setUploadMethod('choose')
      setUploadStatus('idle')
      
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Upload failed'))
      setUploadStatus('error')
      addFlash('error', 'Upload failed. Please try again.')
    }
  }

  // const handleFileUpload = async (file: File) => {
  //   await handleMultiFileUpload([file])
  // }

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