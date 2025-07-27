import { PricingPlan } from '@/app/lib/constants'
import { ArrowRightIcon, CheckIcon, SparklesIcon } from 'lucide-react'


interface PricingCardProps {
    plan: PricingPlan
    billingInterval: 'monthly' | 'yearly'
    onGetStarted: (planId: string) => void
}

export function PricingCard({ plan, billingInterval, onGetStarted }: PricingCardProps) {
    const price = billingInterval === 'monthly' ? plan.price.monthly : plan.price.yearly

    const yearlyDiscount = () => {
        if (plan.price.monthly === 0) return 0
        const monthlyTotal = plan.price.monthly * 12
        const yearlyPrice = plan.price.yearly
        return Math.round(((monthlyTotal - yearlyPrice) / monthlyTotal) * 100)
    }

    const discount = yearlyDiscount()

    return (
        <div
            className={`relative rounded-3xl p-8 ring-1 transition-all duration-200 xl:p-10 ${plan.popular
                    ? 'bg-ci-main/5 ring-ci-main/20 scale-105'
                    : 'bg-background ring-ci-muted/20 hover:ring-ci-main/40'
                } ${plan.comingSoon ? 'opacity-60' : ''}`}
        >
            {/* Popular badge */}
            {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-ci-main px-3 py-2 text-center text-sm font-semibold text-ci-black">
                    Most Popular
                </div>
            )}

            {/* Coming Soon badge */}
            {plan.comingSoon && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-ci-muted px-3 py-2 text-center text-sm font-semibold text-ci-white">
                    Coming Soon
                </div>
            )}

            <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg/8 font-semibold text-foreground">
                    {plan.name}
                </h3>
            </div>

            <p className="mt-4 text-sm/6 text-ci-muted">{plan.description}</p>

            <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-semibold tracking-tight text-foreground">
                    ${price}
                </span>
                <span className="text-sm/6 font-semibold text-ci-muted">
                    /{billingInterval === 'monthly' ? 'month' : 'year'}
                </span>
            </p>

            {/* Yearly discount notice */}
            {billingInterval === 'yearly' && discount > 0 && (
                <p className="mt-1 text-xs text-ci-success font-medium">
                    Save {discount}% vs monthly billing
                </p>
            )}

            {/* Free trial notice */}
            {plan.trialText && !plan.comingSoon && (
                <p className="mt-2 text-xs text-ci-success font-medium flex items-center gap-1">
                    <SparklesIcon className="h-3 w-3" />
                    {plan.trialText}
                </p>
            )}

            <button
                onClick={() => onGetStarted(plan.id)}
                disabled={plan.comingSoon}
                className={`mt-6 block w-full rounded-lg px-3 py-2 text-center text-sm font-semibold transition-all duration-200 ${plan.comingSoon
                        ? 'bg-ci-muted/20 text-ci-muted cursor-not-allowed'
                        : plan.popular
                            ? 'bg-ci-main text-ci-black hover:bg-ci-main/90 shadow-lg'
                            : 'bg-foreground/10 text-foreground hover:bg-foreground/20 border border-foreground/20'
                    }`}
            >
                {plan.ctaText}
                {!plan.comingSoon && <ArrowRightIcon className="inline ml-1 h-4 w-4" />}
            </button>

            {/* Upload limit highlight */}
            <div className="mt-4 p-3 bg-ci-muted/5 rounded-lg border border-ci-muted/10">
                <p className="text-sm text-center">
                    <span className="font-semibold text-foreground">{plan.uploadLimit}</span>
                    <span className="text-ci-muted"> per month</span>
                </p>
            </div>

            <ul role="list" className="mt-6 space-y-3 text-sm/6 text-ci-muted">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                        <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-ci-success" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}