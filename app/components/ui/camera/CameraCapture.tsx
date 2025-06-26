'use client'

import { useState, useRef, useCallback } from 'react'
import { Camera, X, RotateCcw, Upload } from 'lucide-react'
import { Button } from '../Button'

interface CameraCaptureProps {
    onCapture: (file: File) => void
    onCancel: () => void
    isUploading?: boolean
}

export function CameraCapture({ onCapture, onCancel, isUploading = false }: CameraCaptureProps) {
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [capturedImage, setCapturedImage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const startCamera = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Prefer back camera
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            })

            setStream(mediaStream)
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream
            }
        } catch (err) {
            setError('Unable to access camera. Please check permissions.')
            console.error('Camera access error:', err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop())
            setStream(null)
        }
    }, [stream])

    const capturePhoto = useCallback(() => {
        if (!videoRef.current || !canvasRef.current) return

        const video = videoRef.current
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        if (!context) return

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert to blob and create file
        canvas.toBlob((blob) => {
            if (blob) {
                const imageUrl = canvas.toDataURL('image/jpeg', 0.8)
                setCapturedImage(imageUrl)
                stopCamera()
            }
        }, 'image/jpeg', 0.8)
    }, [stopCamera])

    const retakePhoto = useCallback(() => {
        setCapturedImage(null)
        startCamera()
    }, [startCamera])

    const confirmPhoto = useCallback(() => {
        if (!canvasRef.current || !capturedImage) return

        canvasRef.current.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], 'receipt.jpg', { type: 'image/jpeg' })
                onCapture(file)
            }
        }, 'image/jpeg', 0.8)
    }, [capturedImage, onCapture])

    // Auto-start camera when component mounts
    useState(() => {
        startCamera()
        return () => stopCamera()
    })

    if (error) {
        return (
            <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-red-500 mb-4">
                    <Camera className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Camera Access Error</h3>
                <p className="text-gray-500 mb-4">{error}</p>
                <div className="space-x-3">
                    <Button onClick={startCamera} variant="secondary">
                        Try Again
                    </Button>
                    <Button onClick={onCancel} variant="secondary">
                        Cancel
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                    {capturedImage ? 'Review Photo' : 'Take Photo'}
                </h3>
                <button
                    onClick={onCancel}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Camera/Preview Area */}
            <div className="relative bg-black">
                {isLoading && (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-white text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                            <p>Starting camera...</p>
                        </div>
                    </div>
                )}

                {!isLoading && !capturedImage && (
                    <div className="relative">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-auto max-h-96 object-cover"
                        />
                        {/* Camera overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="border-2 border-white border-dashed rounded-lg w-80 h-48 opacity-50"></div>
                        </div>
                    </div>
                )}

                {capturedImage && (
                    <div className="relative">
                        <img
                            src={capturedImage}
                            alt="Captured receipt"
                            className="w-full h-auto max-h-96 object-cover"
                        />
                    </div>
                )}

                {/* Hidden canvas for photo capture */}
                <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Controls */}
            <div className="p-4">
                {!capturedImage ? (
                    <div className="flex justify-center space-x-4">
                        <Button
                            onClick={capturePhoto}
                            disabled={!stream || isLoading}
                            size="lg"
                            className="flex-1 max-w-xs"
                        >
                            <Camera className="mr-2 h-5 w-5" />
                            Capture
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-center space-x-3">
                        <Button
                            onClick={retakePhoto}
                            variant="secondary"
                            disabled={isUploading}
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Retake
                        </Button>
                        <Button
                            onClick={confirmPhoto}
                            isLoading={isUploading}
                            disabled={isUploading}
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            {isUploading ? 'Uploading...' : 'Upload Receipt'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}