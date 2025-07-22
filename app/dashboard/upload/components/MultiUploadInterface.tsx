import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, FileImage, X, Trash2, Plus, Camera } from 'lucide-react'
import { Button } from '@/app/components/ui/Button'


interface FileWithPreview {
    file: File
    previewUrl: string
    id: string
}

interface MultiUploadInterfaceProps {
    onFilesUpload: (files: File[]) => void
    onCancel: () => void
    isUploading?: boolean
    uploadMethod: 'file' | 'camera'
}

export default function MultiUploadInterface({
    onFilesUpload,
    onCancel,
    isUploading = false,
    uploadMethod
}: MultiUploadInterfaceProps) {
    const [dragActive, setDragActive] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const cameraInputRef = useRef<HTMLInputElement>(null)

    const addFiles = (newFiles: FileList | File[]) => {
        const filesArray = Array.from(newFiles)
        const validFiles = filesArray.filter(file =>
            file.type.startsWith('image/') && file.size <= 20 * 1024 * 1024 // 20MB max
        )

        const filesWithPreview: FileWithPreview[] = validFiles.map(file => ({
            file,
            previewUrl: URL.createObjectURL(file),
            id: crypto.randomUUID()
        }))

        setSelectedFiles(prev => [...prev, ...filesWithPreview])
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            addFiles(e.target.files)
        }
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

        if (e.dataTransfer.files) {
            addFiles(e.dataTransfer.files)
        }
    }

    const openFileDialog = () => {
        if (uploadMethod === 'camera') {
            cameraInputRef.current?.click()
        } else {
            fileInputRef.current?.click()
        }
    }

    const removeFile = (id: string) => {
        setSelectedFiles(prev => {
            const fileToRemove = prev.find(f => f.id === id)
            if (fileToRemove) {
                URL.revokeObjectURL(fileToRemove.previewUrl)
            }
            return prev.filter(f => f.id !== id)
        })
    }

    const removeAllFiles = () => {
        selectedFiles.forEach(file => URL.revokeObjectURL(file.previewUrl))
        setSelectedFiles([])
        if (fileInputRef.current) fileInputRef.current.value = ''
        if (cameraInputRef.current) cameraInputRef.current.value = ''
    }

    const handleUpload = () => {
        if (selectedFiles.length > 0) {
            onFilesUpload(selectedFiles.map(f => f.file))
        }
    }

    const totalSize = selectedFiles.reduce((sum, f) => sum + f.file.size, 0)
    const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2)

    return (
        <div className="sm:p-4 lg:p-6">
            {/* Header */}
            <div className="flex justify-between items-center pb-4">
                <h3 className="text-lg font-semibold text-ci-text">
                    {uploadMethod === 'camera' ? 'Take Photos' : 'Upload Files'}
                    {selectedFiles.length > 0 && ` (${selectedFiles.length})`}
                </h3>
                <Button
                    onClick={onCancel}
                    variant='secondary'
                    size='sm'
                    className="text-ci-muted hover:text-ci-muted !w-auto border-0"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* Upload Area */}
            <div
                className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4
          ${dragActive
                        ? 'border-ci-main bg-ci-main/10'
                        : 'border-ci-muted-light hover:border-ci-muted'
                    }
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {uploadMethod === 'camera' ? (
                    <Camera className="mx-auto h-12 w-12 text-ci-muted-light mb-4" />
                ) : (
                    <FileImage className="mx-auto h-12 w-12 text-ci-muted-light mb-4" />
                )}

                <div>
                    <p className="text-lg font-semibold text-ci-text mb-2">
                        {uploadMethod === 'camera'
                            ? 'Take photos of your receipts'
                            : 'Drop receipt images here'
                        }
                    </p>
                    <p className="text-ci-muted mb-2">
                        or{' '}
                        <button
                            onClick={openFileDialog}
                            className="text-ci-main hover:text-ci-main hover:underline cursor-pointer"
                        >
                            {uploadMethod === 'camera' ? 'open camera' : 'browse files'}
                        </button>
                    </p>
                    <p className="text-sm text-ci-muted">
                        Supports: JPG, PNG • Max 20MB per file • Up to 10 files
                    </p>
                </div>

                {/* File inputs */}
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleInputChange}
                />
                <input
                    ref={cameraInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    capture="environment"
                    multiple
                    onChange={handleInputChange}
                />
            </div>

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
                <div className="space-y-4">

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <h4 className="font-medium text-ci-text">
                            Selected Files ({selectedFiles.length})
                        </h4>

                        <div className="flex justify-end gap-2 w-full md:w-1/2">
                            <button
                                onClick={removeAllFiles}
                                className="flex justify-center items-center gap-1  w-full px-3 py-1 text-sm text-ci-danger hover:text-ci-danger/80"
                                disabled={isUploading}
                            >
                                <Trash2 className="h-4 w-4" />
                                Remove All
                            </button>
                            <Button
                                onClick={openFileDialog}
                                className="flex items-center gap-1 px-3 py-1 text-sm text-ci-main hover:text-ci-main"
                                disabled={isUploading}
                                variant='secondary'
                            >
                                <Plus className="h-4 w-4" />
                                Add More
                            </Button>
                        </div>
                    </div>

                    {/* File Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                        {selectedFiles.map((fileWithPreview) => (
                            <div key={fileWithPreview.id} className="relative group">
                                <div className="aspect-square relative rounded-lg overflow-hidden border-2 border-ci-muted-light">
                                    <Image
                                        src={fileWithPreview.previewUrl}
                                        alt={fileWithPreview.file.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={() => removeFile(fileWithPreview.id)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        disabled={isUploading}
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                                <div className="mt-1 text-xs text-center">
                                    <p className="truncate font-medium text-ci-text">
                                        {fileWithPreview.file.name}
                                    </p>
                                    <p className="text-ci-muted">
                                        {(fileWithPreview.file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Upload Summary */}
                    <div className="bg-black/40 rounded-lg px-4 py-8">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-medium text-ci-text">Ready to upload:</span>
                            <span className="text-sm text-ci-muted">
                                {selectedFiles.length} files • {totalSizeMB} MB total
                            </span>
                        </div>
                        <div className='flex justify-center'>
                            <Button
                                onClick={handleUpload}
                                isLoading={isUploading}
                                disabled={isUploading || selectedFiles.length === 0}
                                className="w-full"
                            >
                                <Upload className="mr-2 h-4 w-4" />
                                {isUploading
                                    ? 'Uploading...'
                                    : `Upload ${selectedFiles.length} Receipt${selectedFiles.length !== 1 ? 's' : ''}`
                                }
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}