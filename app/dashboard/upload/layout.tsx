import { ReactNode } from "react"

export default function UploadLayout({
    children 
}: { 
    children: ReactNode 
}) {

    return (
        <div className="p-6 h-full">
            {children}
        </div>
    )
}