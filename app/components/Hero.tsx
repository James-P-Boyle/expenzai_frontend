import { ReactNode } from "react"
import Section from "./partials/Section"

interface HeroProps {
  title: ReactNode
  subtitle?: string
  children?: ReactNode
}

export default function Hero({ title, subtitle, children }: HeroProps) {
  return (
    <Section>
      <h2 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="w-4/5 mx-auto max-w-[600px]">
          {subtitle}
        </p>
      )}
      {children && (
        <div className="">
          {children}
        </div>
      )}
    </Section>
  )
}