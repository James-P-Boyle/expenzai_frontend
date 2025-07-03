'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/app/lib/api'
import UploadSuccessState from '@/app/components/upload/SuccessState'
import UploadErrorState from '@/app/components/upload/ErrorState'
import UploadMethodSelector from '@/app/components/upload/UploadMethodSelector'
import UploadInterface from '@/app/components/upload/UploadInterface'
import Tips from '@/app/components/upload/Tips'

type UploadMethod = 'choose' | 'camera' | 'file'
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

export default function UploadPage() {

    const [uploadMethod, setUploadMethod] = useState<UploadMethod>('choose')
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
    const [uploadedReceiptId, setUploadedReceiptId] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleFileUpload = async (file: File) => {
        setUploadStatus('uploading')
        setError(null)

        try {
            const response = await api.uploadReceipt(file)
            setUploadedReceiptId(response.id)
            setUploadStatus('success')
        } catch (err: any) {
            setError(err.message || 'Upload failed')
            setUploadStatus('error')
        }
    }

    const resetUpload = () => {
        setUploadMethod('choose')
        setUploadStatus('idle')
        setUploadedReceiptId(null)
        setError(null)
    }

    const goToReceipt = () => {
        if (uploadedReceiptId) {
            router.push(`/dashboard/receipts/${uploadedReceiptId}`)
        }
    }

    const goToDashboard = () => {
        router.push('/dashboard')
    }

    if (uploadStatus === 'success') {
        return (
            <div className="p-6 h-full">
                <UploadSuccessState
                    onViewReceipt={goToReceipt}
                    onUploadAnother={resetUpload}
                    onBackToDashboard={goToDashboard}
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
                <UploadInterface
                    uploadMethod={uploadMethod}
                    isUploading={uploadStatus === 'uploading'}
                    onFileUpload={handleFileUpload}
                    onCancel={resetUpload}
                />
            )}

            {(uploadMethod === 'choose' || uploadStatus === 'idle') && (
                <Tips />
            )}
        </>
    )
}