export const COLORS = [
	"var(--ci-main)",
	"var(--ci-danger)",
	"var(--ci-warn)",
	"var(--ci-success)",

	"var(--chart-color-5)",
	"var(--chart-color-6)",
	"var(--chart-color-7)",
	"var(--chart-color-8)",
	"var(--chart-color-9)",
	"var(--chart-color-10)",
]
export interface PricingPlan {
	id: string
	name: string
	price: { monthly: number; yearly: number }
	description: string
	features: string[]
	uploadLimit: string
	popular: boolean
	comingSoon: boolean
	ctaText: string
	trialText?: string
}

export interface FeatureHighlight {
	title: string
	description: string
	icon: string
}

export const PRICING_PLANS: PricingPlan[] = [
	{
		id: "free",
		name: "Free",
		price: { monthly: 0, yearly: 0 },
		description:
			"Perfect for personal use and getting started with expense tracking.",
		features: [
			"8 receipt uploads per month",
			"AI-powered categorization",
			"Basic expense analytics",
			"Monthly spending summaries",
			"Manual categorization editing",
			"Receipt image storage",
			"Export basic reports",
		],
		uploadLimit: "8 receipts/month",
		popular: false,
		comingSoon: false,
		ctaText: "Get Started Free",
	},
	{
		id: "pro",
		name: "Pro",
		price: { monthly: 4.99, yearly: 49.99 },
		description: "Unlimited uploads and advanced features for power users.",
		features: [
			"Unlimited receipt uploads",
			"AI-powered categorization",
			"Advanced expense analytics",
			"Weekly & monthly summaries",
			"Category insights and trends",
			"Export data (CSV, PDF)",
			"Priority email support",
			"Receipt search and filters",
			"Custom categories",
			"Expense goal tracking",
		],
		uploadLimit: "Unlimited",
		popular: true,
		comingSoon: false,
		ctaText: "Start Free Trial",
		trialText: "30-day free trial",
	},
	{
		id: "enterprise",
		name: "Enterprise",
		price: { monthly: 29.99, yearly: 299.99 },
		description: "Advanced features for teams and businesses.",
		features: [
			"Everything in Pro",
			"Team management",
			"Multi-user accounts",
			"Advanced reporting",
			"API access",
			"Custom integrations",
			"SSO integration",
			"Dedicated account manager",
			"Priority phone support",
			"Custom deployment options",
		],
		uploadLimit: "Unlimited",
		popular: false,
		comingSoon: true,
		ctaText: "Coming Soon",
	},
]

export const FEATURE_HIGHLIGHTS: FeatureHighlight[] = [
	{
		title: "AI-Powered Recognition",
		description:
			"Our advanced AI extracts items, prices, and store information from your receipts automatically.",
		icon: "🤖",
	},
	{
		title: "Smart Categorization",
		description:
			"Expenses are automatically categorized with machine learning, saving you hours of manual work.",
		icon: "🏷️",
	},
	{
		title: "Insightful Analytics",
		description:
			"Understand your spending patterns with beautiful charts and detailed breakdowns.",
		icon: "📊",
	},
	{
		title: "Secure & Private",
		description:
			"Your financial data is encrypted and secure. We never share your information.",
		icon: "🔒",
	},
]


export const PLAN_DETAILS = {
    free: {
        name: 'Free',
        price: { monthly: 0, yearly: 0 },
        features: ['8 receipts/month', 'Basic analytics', 'AI categorization'],
        popular: false
    },
    pro: {
        name: 'Pro',
        price: { monthly: 4.99, yearly: 49.99 },
        features: ['Unlimited receipts', 'Advanced analytics', 'Priority support', '30-day free trial'],
        popular: true
    }
}

export const PLAN_FEATURES = {
    free: [
        "8 receipts per month",
        "AI categorization",
        "Basic analytics",
        "Monthly summaries"
    ],
    pro: [
        "Unlimited receipts",
        "Advanced analytics",
        "Priority support",
        "Export features",
        "Category insights"
    ]
}
