'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Home,
    Upload,
    Receipt,
    BarChart3,
    User,
    LogOut,
    Menu,
    X
} from 'lucide-react'

import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Upload Receipt', href: '/dashboard/upload', icon: Upload },
    { name: 'My Receipts', href: '/dashboard/receipts', icon: Receipt },
    { name: 'Weekly Summary', href: '/dashboard/weekly', icon: BarChart3 },
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isAuthenticated, isLoading, user, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/auth/login')
        }
    }, [isAuthenticated, isLoading, router])

    const handleLogout = async () => {
        await logout()
        router.push('/')
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null // Will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile menu */}
            <div className={`fixed inset-0 z-40 lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X className="h-6 w-6 text-white" />
                        </button>
                    </div>
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <h2 className="text-lg font-semibold text-gray-900">Receipt Tracker</h2>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <h2 className="text-xl font-semibold text-gray-900">Receipt Tracker</h2>
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>

                    {/* User section */}
                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                        <div className="flex items-center w-full">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-600"
                                title="Logout"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64 flex flex-col flex-1">
                {/* Top bar for mobile */}
                <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">Receipt Tracker</h1>
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                        <LogOut className="h-6 w-6" />
                    </button>
                </div>

                {/* Page content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}