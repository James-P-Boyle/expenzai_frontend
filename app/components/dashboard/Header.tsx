import { ReactNode } from "react"

interface HeaderProps {
    title: string
    subtitle?: string
    children?: ReactNode
}

export default function Header({ title, subtitle, children }: HeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:justify-between gap-2 md:items-center mb-4">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                {subtitle && (
                    <p className="text-ci-muted font-serif">{subtitle}</p>
                )}
            </div>
            {children ? (
                children
            ) : null}
        </div>
    )
}