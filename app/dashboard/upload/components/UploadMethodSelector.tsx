import { Upload } from 'lucide-react'
import { Card } from '@/app/components/ui/Card'

type UploadMethod = 'choose' | 'camera' | 'file'

interface UploadMethodSelectorProps {
    onMethodSelect: (method: UploadMethod) => void
}

export default function UploadMethodSelector({ onMethodSelect }: UploadMethodSelectorProps) {
    return (
        <div className="space-y-4 lg:space-y-0 flex flex-col lg:flex-row gap-4 w-full">
            {/* <Card className="w-full ">
                <button
                    onClick={() => onMethodSelect('camera')}
                    disabled
                    className="w-full text-left p-4 rounded-full border-2 border-dashed border-ci-muted-light hover:border-ci-main hover:bg-ci-main/10 cursor-pointer transition-colors"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-ci-main rounded-full">
                            <Camera className="size-8 text-ci-black" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Take Photo</h3>
                            <p className="text-ci-muted">Use your device camera to capture a receipt</p>
                        </div>
                    </div>
                </button>
            </Card> */}

            <Card className="w-full">
                <button
                    onClick={() => onMethodSelect('file')}
                    className="w-full text-left p-4 rounded-full border-2 border-dashed border-ci-muted-light hover:border-ci-main hover:bg-ci-main/10 cursor-pointer transition-colors"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-ci-main rounded-full">
                            <Upload className="size-8 text-ci-black" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Upload File</h3>
                            <p className="text-ci-muted">Choose an image file from your device</p>
                        </div>
                    </div>
                </button>
            </Card>
        </div>
    )
}