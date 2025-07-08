import Link from "next/link"
import { Button } from "../ui/Button"
import Logo from "../ui/Logo"

export default function Header({
    isAuthenticated,
    loading
}: {
    isAuthenticated: boolean
    loading: boolean
}) {

    return (
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-6 min-h-[100px]">
            <div className="flex justify-between items-center flex-col md:flex-row gap-2 lg:gap-4">
                {!loading && (
                    <>
                        <Logo />
                   
                        <div className="flex flex-row gap-4">
                            {!isAuthenticated ? (
                                <Link href="/dashboard">
                                    <Button>Go to Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/auth/login" className="text-ci-main font-bold hover:undeline cursor-pointer">
                                        Sign In
                                    </Link>
                                    <Link href="/auth/register" className="text-ci-main font-bold hover:undeline cursor-pointer">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </>
                )}

            </div>
        </header>
    )
}