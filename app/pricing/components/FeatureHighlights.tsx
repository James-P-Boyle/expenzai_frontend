import { FeatureHighlight } from "@/app/lib/constants"

interface FeatureHighlightsProps {
    features: FeatureHighlight[]
}

export function FeatureHighlights({ features }: FeatureHighlightsProps) {
    return (
        <div className="mx-auto mt-32 max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Why choose ExpenzAI?
                </h2>
                <p className="mt-6 text-lg text-ci-muted">
                    Built for modern expense tracking with cutting-edge AI technology.
                </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
                {features.map((feature) => (
                    <div key={feature.title} className="text-center">
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-ci-muted">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}