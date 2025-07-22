import { Button } from '@/app/components/ui/Button'
import { CheckCircle } from 'lucide-react'

interface UploadSuccessStateProps {
  onViewReceipt?: (() => void) | undefined  
  onUploadAnother: () => void
  onBackToDashboard: () => void
  uploadedCount?: number
}

export default function UploadSuccessState({ 
  onViewReceipt, 
  onUploadAnother, 
  onBackToDashboard,
  uploadedCount = 1
}: UploadSuccessStateProps) {
  const isMultiple = uploadedCount > 1

  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
      <div className="relative">
        <div className="text-ci-success mb-4">
          <CheckCircle className="mx-auto h-16 w-16" />
        </div>
        {isMultiple && (
          <div className="absolute -top-2 -right-2 bg-ci-main text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {uploadedCount}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold mb-2">
          {isMultiple ? 'Uploads Successful!' : 'Receipt Uploaded Successfully!'}
        </h3>
        <p className="text-ci-muted mb-6">
          {isMultiple 
            ? `Your ${uploadedCount} receipts are being processed by AI. This usually takes 15-30 seconds per receipt.`
            : "Your receipt is being processed by AI. This usually takes 15-30 seconds."
          }
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-2 w-full max-w-lg">
        {!isMultiple && onViewReceipt && (
          <Button onClick={onViewReceipt} variant="secondary" className="w-full">
            View Receipt Details
          </Button>
        )}
        
        <Button onClick={onUploadAnother} variant="secondary" className="w-full">
          Upload {isMultiple ? 'More' : 'Another'} Receipt{isMultiple ? 's' : ''}
        </Button>
        
        <Button onClick={onBackToDashboard} variant="secondary" className="w-full">
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}