import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, FileImage, X, Trash2, Plus } from 'lucide-react'

interface FileWithPreview {
  file: File
  previewUrl: string
  id: string
}

interface MultiFileUploadProps {
  onFilesUpload: (files: File[]) => void
  onCancel: () => void
  isUploading?: boolean
}

export function MultiFileUpload({ onFilesUpload, onCancel, isUploading = false }: MultiFileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    fileInputRef.current?.click()
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
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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
        <h3 className="text-lg font-semibold">
          Upload Receipts {selectedFiles.length > 0 && `(${selectedFiles.length})`}
        </h3>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4
          ${dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <FileImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div>
          <p className="text-lg font-semibold mb-2">
            Drop receipt images here
          </p>
          <p className="text-gray-600 mb-2">
            or{' '}
            <button
              onClick={openFileDialog}
              className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
            >
              browse files
            </button>
          </p>
          <p className="text-sm text-gray-500">
            Supports: JPG, PNG • Max 20MB per file • Up to 10 files
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleInputChange}
        />
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Selected Files ({selectedFiles.length})</h4>
            <div className="flex gap-2">
              <button
                onClick={openFileDialog}
                className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                disabled={isUploading}
              >
                <Plus className="h-4 w-4" />
                Add More
              </button>
              <button
                onClick={removeAllFiles}
                className="flex items-center gap-1 px-3 py-1 text-sm text-ci-danger hover:text-red-700"
                disabled={isUploading}
              >
                <Trash2 className="h-4 w-4" />
                Remove All
              </button>
            </div>
          </div>

          {/* File Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {selectedFiles.map((fileWithPreview) => (
              <div key={fileWithPreview.id} className="relative group">
                <div className="aspect-square relative rounded-lg overflow-hidden border-2 border-gray-200">
                  <Image
                    src={fileWithPreview.previewUrl}
                    alt={fileWithPreview.file.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removeFile(fileWithPreview.id)}
                    className="absolute top-1 right-1 p-1 bg-ci-danger text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={isUploading}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="mt-1 text-xs text-center">
                  <p className="truncate font-medium">{fileWithPreview.file.name}</p>
                  <p className="text-gray-500">
                    {(fileWithPreview.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Summary */}
          <div className="rounded-lg p-4 bg-red-500">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">Ready to upload:</span>
              <span className="text-sm">
                {selectedFiles.length} files • {totalSizeMB} MB total
              </span>
            </div>
            
            <button
              onClick={handleUpload}
              disabled={isUploading || selectedFiles.length === 0}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Upload className="h-4 w-4" />
              {isUploading 
                ? 'Uploading...' 
                : `Upload ${selectedFiles.length} Receipt${selectedFiles.length !== 1 ? 's' : ''}`
              }
            </button>
          </div>
        </div>
      )}
    </div>
  )
}