'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/Button"
import Logo from "../ui/Logo"

export default function Navbar({
    isAuthenticated,
    loading
}: {
    isAuthenticated: boolean
    loading: boolean
}) {
    const pathname = usePathname()

    const navLinks = [
        { href: '/about', label: 'About' },
        { href: '/pricing', label: 'Pricing' },
    ]

    return (
        <header className="max-w-7xl mx-auto px-4 mb-10 sm:px-6 lg:px-8 min-h-[292px] md:min-h-0 w-full">
            <div className="flex justify-between items-center flex-col md:flex-row gap-2 lg:gap-4">
                {!loading && (
                    <> 
                        <div className="min-h-[140px] lg:h-full">
                            <Logo />
                        </div>
                      
                        {/* Mobile Navigation Links - Stacked on top of auth buttons */}
                        <nav className="flex md:hidden flex-col gap-2 order-1">
                            <div className="flex gap-4 justify-center">
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.href}
                                        href={link.href} 
                                        className={`text-sm font-medium transition-colors text-ci-main ${
                                            pathname === link.href 
                                                ? 'border-b-2 border-ci-main pb-1' 
                                                : 'text-ci-main'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                   
                        {/* Desktop + Auth Navigation */}
                        <nav className="flex flex-row gap-4 items-center order-2">
                            {/* Desktop Navigation Links */}
                            <div className="hidden md:flex gap-6 mr-4">
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.href}
                                        href={link.href} 
                                        className={`text-sm font-medium transition-colors text-ci-main ${
                                            pathname === link.href 
                                                ? 'border-b-2 border-ci-main pb-1' 
                                                : 'text-ci-main hover:underline'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Auth Buttons */}
                            {isAuthenticated ? (
                                <Link href="/dashboard/upload">
                                    <Button>Upload Receipt</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/auth/login" className="text-ci-main font-bold hover:underline cursor-pointer">
                                        Sign In
                                    </Link>
                                    <Link href="/auth/register" className="text-ci-main font-bold hover:underline cursor-pointer">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </nav>
                    </>
                )}
            </div>
        </header>
    )
}