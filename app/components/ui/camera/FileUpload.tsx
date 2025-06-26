'use client'

import { useState, useRef } from 'react'
import { Upload, FileImage, X } from 'lucide-react'
import { Button } from '../Button'

interface FileUploadProps {
    onFileSelect: (file: File) => void
    onCancel: () => void
    isUploading?: boolean
}

export function FileUpload({ onFileSelect, onCancel, isUploading = false }: FileUploadProps) {
    const [dragActive, setDragActive] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file)
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFileChange(file)
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const file = e.dataTransfer.files?.[0]
        if (file) handleFileChange(file)
    }

    const openFileDialog = () => {
        fileInputRef.current?.click()
    }

    const removeFile = () => {
        setSelectedFile(null)
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
            setPreviewUrl(null)
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleUpload = () => {
        if (selectedFile) {
            onFileSelect(selectedFile)
        }
    }

    return (
        <div className="bg-white rounded-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Upload Receipt</h3>
                <button
                    onClick={onCancel}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {!selectedFile ? (
                /* Upload Area */
                <div
                    className={`
                        relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
                        ${dragActive
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <FileImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="space-y-2">
                        <p className="text-lg font-medium text-gray-900">
                            Drop your receipt here
                        </p>
                        <p className="text-gray-500">
                            or{' '}
                            <button
                                onClick={openFileDialog}
                                className="text-blue-600 hover:text-blue-500 font-medium"
                            >
                                browse files
                            </button>
                        </p>
                        <p className="text-sm text-gray-400">
                            Supports: JPG, PNG (max 10MB)
                        </p>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleInputChange}
                    />
                </div>
            ) : (
                /* Preview Area */
                <div className="space-y-4">
                    <div className="relative">
                        <img
                            src={previewUrl!}
                            alt="Receipt preview"
                            className="w-full h-64 object-cover rounded-lg border"
                        />
                        <button
                            onClick={removeFile}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            disabled={isUploading}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <FileImage className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {selectedFile.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <Button
                            onClick={removeFile}
                            variant="secondary"
                            disabled={isUploading}
                            className="flex-1"
                        >
                            Choose Different
                        </Button>
                        <Button
                            onClick={handleUpload}
                            isLoading={isUploading}
                            disabled={isUploading}
                            className="flex-1"
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            {isUploading ? 'Uploading...' : 'Upload Receipt'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}