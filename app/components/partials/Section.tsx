import { ReactNode } from "react"

export default function Section ({
    className,
    children
}:{
    className?: string
    children: ReactNode
}) {

    return (
        <section className={`text-center min-h-[70vh] flex flex-col justify-center gap-10 ${className}`}>
            {children}
        </section>
    )
} 