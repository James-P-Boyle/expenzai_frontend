'use client'

import { useState, useRef } from 'react'
import { Upload, FileImage, X } from 'lucide-react'
import { Button } from '../../../components/ui/Button'

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

            {!selectedFile ? (
                /* Upload Area */
                <div
                    className={`
                        relative border-2 border-dashed rounded-full p-6 text-center transition-colors
                        ${dragActive
                        ? 'border-ci-main bg-ci-main/80'
                        : 'border-ci-muted-light hover:border-ci-muted-light'
                    }
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <FileImage className="mx-auto size-10 text-ci-muted-light" />
                    <div>
                        <p className="text-lg font-semibold">
                            Drop your receipt here
                        </p>
                        <p className="text-ci-muted">
                            or{' '}
                            <button
                                onClick={openFileDialog}
                                className="text-ci-main hover:text-ci-main hover:underline cursor-pointer transition-all"
                            >
                                browse files
                            </button>
                        </p>
                        <p className="text-sm text-ci-muted">
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
               
                    <img
                        src={previewUrl!}
                        alt="Receipt preview"
                        className="w-full h-full max-h-[400px] max-w-[400px] mx-auto object-cover rounded-xl"
                    />
            
                    <div className="rounded-full mx-auto">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center space-x-2">
                                <FileImage className="h-5 w-5 text-ci-muted" />
                                <div>
                                    <p className="text-sm font-medium">
                                        {selectedFile.name}
                                    </p>
                                    <p className="text-xs text-ci-muted">
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