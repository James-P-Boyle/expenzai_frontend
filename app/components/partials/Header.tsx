import Link from "next/link";
import { Button } from "../ui/Button";

export default function Header({
    isAuthenticated
} : {
    isAuthenticated: boolean
}) {

    return (
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-ci-black">Receipt Tracker</h1>
            <div className="space-x-4">
                {isAuthenticated ? (
                <Link href="/dashboard">
                    <Button>Go to Dashboard</Button>
                </Link>
                ) : (
                <>
                    <Link href="/auth/login">
                    <Button variant="secondary">Sign In</Button>
                    </Link>
                    <Link href="/auth/register">
                    <Button>Get Started</Button>
                    </Link>
                </>
                )}
            </div>
            </div>
        </header>
    )
}