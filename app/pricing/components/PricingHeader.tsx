interface PricingHeaderProps {
    showHeader?: boolean
}

export function PricingHeader({ showHeader = true }: PricingHeaderProps) {
    if (!showHeader) return null

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-base/7 font-semibold text-ci-main">Pricing</h1>
                <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Choose the perfect plan for your expenses
                </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-ci-muted">
                Start with our free plan and upgrade as your expense tracking needs grow.
                All paid plans include a free 30-day trial with no credit card required.
            </p>
        </div>
    )
}
