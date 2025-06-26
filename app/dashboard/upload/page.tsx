'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, Upload, CheckCircle, XCircle } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'
import { CameraCapture } from '@/app/components/ui/camera/CameraCapture'
import { FileUpload } from '@/app/components/ui/camera/FileUpload'
import { Button } from '@/app/components/ui/Button'
import { api } from '@/app/lib/api'


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

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Upload Receipt</h1>
          <p className="text-gray-600 mt-1">
            Take a photo or upload an image of your receipt for AI processing
          </p>
        </div>

        {/* Upload Method Selection */}
        {uploadMethod === 'choose' && uploadStatus === 'idle' && (
          <div className="space-y-4">
            <Card className="p-6">
              <button
                onClick={() => setUploadMethod('camera')}
                className="w-full text-left p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Camera className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Take Photo</h3>
                    <p className="text-gray-500">Use your device camera to capture a receipt</p>
                  </div>
                </div>
              </button>
            </Card>

            <Card className="p-6">
              <button
                onClick={() => setUploadMethod('file')}
                className="w-full text-left p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Upload className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Upload File</h3>
                    <p className="text-gray-500">Choose an image file from your device</p>
                  </div>
                </div>
              </button>
            </Card>
          </div>
        )}

        {/* Camera Component */}
        {uploadMethod === 'camera' && (
          <CameraCapture
            onCapture={handleFileUpload}
            onCancel={resetUpload}
            isUploading={uploadStatus === 'uploading'}
          />
        )}

        {/* File Upload Component */}
        {uploadMethod === 'file' && (
          <FileUpload
            onFileSelect={handleFileUpload}
            onCancel={resetUpload}
            isUploading={uploadStatus === 'uploading'}
          />
        )}

        {/* Success State */}
        {uploadStatus === 'success' && (
          <Card className="p-8 text-center">
            <div className="text-green-500 mb-4">
              <CheckCircle className="mx-auto h-16 w-16" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Receipt Uploaded Successfully!
            </h3>
            <p className="text-gray-600 mb-6">
              Your receipt is being processed by AI. This usually takes 15-30 seconds.
            </p>
            <div className="space-y-3">
              <Button onClick={goToReceipt} className="w-full">
                View Receipt Details
              </Button>
              <Button onClick={resetUpload} variant="secondary" className="w-full">
                Upload Another Receipt
              </Button>
              <Button onClick={goToDashboard} variant="secondary" className="w-full">
                Back to Dashboard
              </Button>
            </div>
          </Card>
        )}

        {/* Error State */}
        {uploadStatus === 'error' && (
          <Card className="p-8 text-center">
            <div className="text-red-500 mb-4">
              <XCircle className="mx-auto h-16 w-16" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Upload Failed
            </h3>
            <p className="text-gray-600 mb-2">
              {error || 'Something went wrong while uploading your receipt.'}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Please check your internet connection and try again.
            </p>
            <div className="space-y-3">
              <Button onClick={resetUpload} className="w-full">
                Try Again
              </Button>
              <Button onClick={goToDashboard} variant="secondary" className="w-full">
                Back to Dashboard
              </Button>
            </div>
          </Card>
        )}

        {/* Tips */}
        {(uploadMethod === 'choose' || uploadStatus === 'idle') && (
          <Card className="p-6 mt-8">
            <h4 className="font-medium text-gray-900 mb-3">📸 Tips for better results:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Ensure the receipt is well-lit and all text is visible</li>
              <li>• Avoid shadows and reflections</li>
              <li>• Keep the receipt flat and straight</li>
              <li>• Include the entire receipt from top to bottom</li>
            </ul>
          </Card>
        )}
      </div>
    </div>
  )
}