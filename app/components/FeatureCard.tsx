import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
    icon: LucideIcon
    title: string
    description: string
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <div className="text-center w-4/5">
            <div className="flex justify-center">
                <Icon className="h-12 w-12 text-ci-main" />
            </div>
            <h3 className="mt-4 text-lg font-black">
                {title}
            </h3>
            <p className="mt-2 text-base text-ci-muted">
                {description}
            </p>
        </div>
    )
}