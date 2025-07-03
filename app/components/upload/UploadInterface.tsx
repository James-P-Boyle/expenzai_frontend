import { CameraCapture } from "./CameraCapture"
import { FileUpload } from "./FileUpload"


type UploadMethod = 'choose' | 'camera' | 'file'

interface UploadInterfaceProps {
    uploadMethod: UploadMethod
    isUploading: boolean
    onFileUpload: (file: File) => void
    onCancel: () => void
}

export default function UploadInterface({
    uploadMethod,
    isUploading,
    onFileUpload,
    onCancel
}: UploadInterfaceProps) {

    if (uploadMethod === 'camera') {
        return (
            <CameraCapture
                onCapture={onFileUpload}
                onCancel={onCancel}
                isUploading={isUploading}
            />
        )
    }

    if (uploadMethod === 'file') {
        return (
            <FileUpload
                onFileSelect={onFileUpload}
                onCancel={onCancel}
                isUploading={isUploading}
            />
        )
    }

    return null
}