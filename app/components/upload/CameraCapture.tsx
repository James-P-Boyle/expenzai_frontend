'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from "next/image"
import { Camera, X, RotateCcw, Upload } from 'lucide-react'
import { Button } from '../ui/Button'

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
        } catch (err: unknown) {
            console.error('Camera access error:', err)
            
            if (err instanceof DOMException) {
                if (err.name === 'NotAllowedError') {
                    setError('Camera access denied. Please allow camera permissions and try again.')
                } else if (err.name === 'NotFoundError') {
                    setError('No camera found on this device.')
                } else if (err.name === 'NotSupportedError') {
                    setError('Camera is not supported by this browser.')
                } else if (err.name === 'NotReadableError') {
                    setError('Camera is already in use by another application.')
                } else {
                    setError('Unable to access camera. Please check permissions and try again.')
                }
            } else {
                setError('Unable to access camera. Please check permissions and try again.')
            }
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

        // Convert to data URL and set captured image
        const imageUrl = canvas.toDataURL('image/jpeg', 0.8)
        setCapturedImage(imageUrl)
        stopCamera()
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

    // Use useEffect instead of useState for side effects
    useEffect(() => {
        startCamera()
        
        // Cleanup function
        return () => {
            stopCamera()
        }
    }, []) // Empty dependency array to run only on mount

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }
        }
    }, [stream])

    if (error) {
        return (
            <div className="p-6 text-center w-full">
                <div className="text-red-500 mb-4">
                    <Camera className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-ci-black mb-2">Camera Access Required</h3>
                <p className="text-ci-muted mb-4">{error}</p>
                
                {/* Instructions for allowing camera */}
                <div className="bg-ci-main/10 border border-ci-main/20 rounded-lg p-4 mb-4 text-left">
                    <h4 className="font-medium text-ci-black mb-2">To allow camera access:</h4>
                    <ul className="text-sm text-ci-muted space-y-1">
                        <li>• Click the <strong>🔒 lock icon</strong> in your address bar</li>
                        <li>• Set Camera to <strong>"Allow"</strong></li>
                        <li>• Refresh the page or click "Try Again"</li>
                    </ul>
                </div>
                
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
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-end items-center pb-2">
                <Button
                    onClick={onCancel}
                    variant='secondary'
                    size='sm'
                    className="text-ci-muted hover:text-ci-muted rounded-full"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* Camera/Preview Area */}
            <div className="relative bg-ci-muted-light rounded-lg overflow-hidden max-w-[700px] mx-auto">
                {isLoading && (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ci-main mx-auto mb-2"></div>
                            <p>Starting camera...</p>
                        </div>
                    </div>
                )}

                {!isLoading && !capturedImage && stream && (
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
                            <div className="border-2 border-white border-dashed rounded-lg w-80 h-48 opacity-70"></div>
                        </div>
                    </div>
                )}

                {capturedImage && (
                    <div className="relative">
                        <Image
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