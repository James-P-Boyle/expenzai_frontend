import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
    icon: LucideIcon
    title: string
    description: string
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <div className="text-center ">
            <div className="flex justify-center">
                <Icon className="h-12 w-12 text-ci-main" />
            </div>
            <h3 className="mt-4 text-2xl lg:text-4xl font-black font-sans">
                {title}
            </h3>
            <p className="mt-2 text-base lg:text-lg text-ci-muted font-serif">
                {description}
            </p>
        </div>
    )
}