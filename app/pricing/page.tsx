import { Metadata } from "next"
import StaticPricingPage from "./StaticPricingPage"

export const metadata: Metadata = {
  title: 'Pricing Plans - AI-Powered Expense Tracking | ExpenzAI',
  description: 'Choose the perfect plan for your expense tracking needs. Start with our free plan (8 receipts/month) or upgrade to Pro for unlimited uploads, advanced analytics, and priority support. 30-day free trial included.',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <StaticPricingPage showHeader={true} />
      
      {/* FAQ Section */}
      <div className="bg-background py-24 sm:py-32 border-t border-ci-muted/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-6 text-lg text-ci-muted">
              Everything you need to know about ExpenzAI pricing and features.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl space-y-8">
            <div className="border-b border-ci-muted/20 pb-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                What happens during my free trial?
              </h3>
              <p className="text-ci-muted">
                Your 30-day free trial gives you full access to all Pro features without any limitations. 
                No credit card required to start, and you can cancel anytime during the trial period.
              </p>
            </div>
            
            <div className="border-b border-ci-muted/20 pb-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Can I change my plan anytime?
              </h3>
              <p className="text-ci-muted">
                Yes! You can upgrade, downgrade, or cancel your subscription at any time. 
                Changes take effect at the next billing cycle, and we'll prorate any differences.
              </p>
            </div>
            
            <div className="border-b border-ci-muted/20 pb-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-ci-muted">
                We accept all major credit cards (Visa, Mastercard, American Express) and other payment methods through Stripe. 
                All payments are processed securely.
              </p>
            </div>
            
            <div className="border-b border-ci-muted/20 pb-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Is my data secure?
              </h3>
              <p className="text-ci-muted">
                Absolutely. We use industry-standard encryption and security practices. 
                Your receipt data is processed securely and never shared with third parties.
              </p>
            </div>
            
            <div className="border-b border-ci-muted/20 pb-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                What if I exceed my upload limit?
              </h3>
              <p className="text-ci-muted">
                Free users get 8 receipts per month. If you need more, simply upgrade to Pro for unlimited uploads. 
                You'll also get access to advanced analytics and priority support.
              </p>
            </div>
            
            <div className="border-b border-ci-muted/20 pb-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                How does the AI categorization work?
              </h3>
              <p className="text-ci-muted">
                Our AI analyzes receipt text and images to automatically extract items, prices, and store information. 
                It then intelligently categorizes expenses based on purchase patterns and merchant data.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                When is Enterprise coming?
              </h3>
              <p className="text-ci-muted">
                Our Enterprise plan for teams and businesses is coming soon! 
                It will include team management, advanced reporting, API access, and dedicated support. 
                Contact us to join the waitlist and be notified when it's available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}