'use client'
import { Camera, Receipt, BarChart3 } from 'lucide-react'
import FeatureCard from './FeatureCard'
import Section from './partials/Section'

const features = [
    {
        icon: Camera,
        title: 'Snap & Go',
        description: 'Take a quick photo of any receipt and we\'ll handle the rest'
    },
    {
        icon: Receipt,
        title: 'AI Processing',
        description: 'Advanced AI extracts and categorizes every item automatically'
    },
    {
        icon: BarChart3,
        title: 'Smart Insights',
        description: 'View weekly summaries and track spending patterns over time'
    }
]

export default function FeaturesSection() {
    return (
        <Section className='grid gap-6 sm:grid-cols-3 place-items-center'>
            {features.map((feature, index) => (
                <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                />
            ))}
    
        </Section>
    )
}