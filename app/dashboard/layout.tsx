'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
    Home,
    Upload,
    Receipt,
    BarChart3,
} from 'lucide-react'
import Link from 'next/link'

import { useState, ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import MobileMenu from './components/MobileMenu'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Header from './components/Header'
import { Button } from '../components/ui/Button'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Upload Receipt', href: '/dashboard/upload', icon: Upload },
    { name: 'My Receipts', href: '/dashboard/receipts', icon: Receipt },
    { name: 'Weekly Summary', href: '/dashboard/weekly', icon: BarChart3 },
]

const getHeaderConfig = (pathname: string) => {
    const configs: Record<string, { title: string; subtitle: string; showUpload?: boolean }> = {
        '/dashboard': {
            title: 'Dashboard',
            subtitle: 'Overview of your expenses',
            showUpload: true
        },
        '/dashboard/upload': {
            title: 'Upload Receipt',
            subtitle: 'Take a photo or upload an image of your receipt for AI processing',
            showUpload: false
        },
        '/dashboard/receipts': {
            title: 'My Receipts',
            subtitle: 'View and manage all your uploaded receipts',
            showUpload: true
        },
        '/dashboard/weekly': {
            title: 'Weekly Summary',
            subtitle: 'Track your spending patterns and insights'
        }
    }
    
    return configs[pathname] || {
        title: 'Dashboard',
        subtitle: 'Manage your expenses',
        showUpload: true
    }
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isAuthenticated, isLoading, user, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const headerConfig = getHeaderConfig(pathname)

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/auth/login')
        }
    }, [isAuthenticated, isLoading, router])

    const handleLogout = async () => {
        logout()
        router.push('/')
    }

    const closeMobileMenu = () => setIsMobileMenuOpen(false)
    const openMobileMenu = () => setIsMobileMenuOpen(true)

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <>
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
                navigation={navigation}
                currentPath={pathname}
            />

            <Sidebar
                navigation={navigation}
                currentPath={pathname}
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout}
            />

            <div className="lg:pl-64 flex flex-col flex-1">
                <TopBar
                    onMenuClick={openMobileMenu}
                    isAuthenticated={isAuthenticated}
                    user={user}
                    onLogout={handleLogout}
                />

                <main className="flex-1 p-4 md:p-8 lg:p-10 flex flex-col gap-10">

                    <Header 
                        title={headerConfig.title}
                        subtitle={headerConfig.subtitle}
                    />

                    <>
                        {children}
                    </>
             
                </main>
            </div>
        </>
    )
}