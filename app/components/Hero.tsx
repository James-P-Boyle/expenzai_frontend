import Link from "next/link";
import { Button } from "./ui/Button";
import Section from "./partials/Section";

export default function Hero({
    isAuthenticated
}: {
    isAuthenticated: boolean
}) {

    return (
        <Section>
            <h2 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                Track Your Expenses
                <span className="block text-ci-main">with AI Power</span>
            </h2>
            <p className="w-4/5 mx-auto max-w-[600px]">
                Simply take a photo of your receipt and let AI automatically categorize your expenses.
                Get insights into your spending habits effortlessly.
            </p>
            <div className="">
                {isAuthenticated ? (
                    <Link href="/dashboard">
                        <Button size="lg">
                            Go to Dashboard
                        </Button>
                    </Link>
                ) : (
                    <Link href="/auth/register">
                        <Button size="lg">
                            Start Tracking Now
                        </Button>
                    </Link>
                )}
            </div>
        </Section>
    )
}