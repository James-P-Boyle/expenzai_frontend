'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/app/lib/api'
import UploadSuccessState from '@/app/components/upload/SuccessState'
import UploadErrorState from '@/app/components/upload/ErrorState'
import UploadMethodSelector from '@/app/components/upload/UploadMethodSelector'
import MultiUploadInterface from '@/app/components/upload/MultiUploadInterface'
import Tips from '@/app/components/upload/Tips'
import { getErrorMessage } from '@/app/lib/error-utils'

type UploadMethod = 'choose' | 'camera' | 'file'
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

interface UploadResult {
  uploadedReceipts: Array<{
    id: number
    status: string
    original_filename: string
  }>
  totalUploaded: number
}

export default function UploadPage() {
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>('choose')
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Updated to handle multiple files - ALWAYS use S3
  const handleMultiFileUpload = async (files: File[]) => {
    setUploadStatus('uploading')
    setError(null)

    try {
      // Always use S3 method (works for both single and multiple files)
      const response = await api.uploadReceipts(files)
      setUploadResult({
        uploadedReceipts: response.receipts,
        totalUploaded: response.total_uploaded
      })
      
      setUploadStatus('success')
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Upload failed'))
      setUploadStatus('error')
    }
  }

  // Backward compatibility for single file
  const handleFileUpload = async (file: File) => {
    await handleMultiFileUpload([file])
  }

  const resetUpload = () => {
    setUploadMethod('choose')
    setUploadStatus('idle')
    setUploadResult(null)
    setError(null)
  }

  const goToReceipt = () => {
    if (uploadResult?.uploadedReceipts[0]) {
      router.push(`/dashboard/receipts/${uploadResult.uploadedReceipts[0].id}`)
    }
  }

  const goToDashboard = () => {
    router.push('/dashboard')
  }

  if (uploadStatus === 'success') {
    return (
      <div className="p-6 h-full">
        <UploadSuccessState
          onViewReceipt={uploadResult?.totalUploaded === 1 ? goToReceipt : undefined}
          onUploadAnother={resetUpload}
          onBackToDashboard={goToDashboard}
          uploadedCount={uploadResult?.totalUploaded}
        />
      </div>
    )
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