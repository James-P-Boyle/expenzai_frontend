'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
    Home,
    Upload,
    Receipt,
    BarChart3,
    Tag,
    Cog
} from 'lucide-react'

import { useState  } from 'react'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import MobileMenu from '../components/dashboard/MobileMenu'
import Sidebar from '../components/dashboard/Sidebar'
import TopBar from '../components/dashboard/TopBar'
import Header from '../components/dashboard/Header'

const navigation = [
    { name: 'Upload Receipt', href: '/dashboard/upload', icon: Upload },
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Receipts', href: '/dashboard/receipts', icon: Receipt },
    { name: 'Weekly Summary', href: '/dashboard/weekly', icon: BarChart3 },
    { name: 'Categories', href: '/dashboard/categories', icon: Tag },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog },
]

const getHeaderConfig = (pathname: string) => {
    const configs: Record<string, { title: string; subtitle: string; showUpload?: boolean }> = {
        '/dashboard/upload': {
            title: 'Upload Receipt',
            subtitle: 'Take a photo or upload an image of your receipt for AI processing',
            showUpload: false
        },
        '/dashboard': {
            title: 'Dashboard',
            subtitle: 'Overview of your expenses',
            showUpload: true
        },
        '/dashboard/receipts': {
            title: 'My Receipts',
            subtitle: 'View and manage all your uploaded receipts',
            showUpload: true
        },
        '/dashboard/weekly': {
            title: 'Weekly Summary',
            subtitle: 'Track your spending patterns and insights'
        },
        '/dashboard/categories': {
            title: 'Categories Overview',
            subtitle: 'Track your spending patterns by category'
        },
        '/dashboard/settings': {
            title: 'Update Settings',
            subtitle: 'Mange your consent settings'
        },
    }
    
    // Handle dynamic receipt detail pages
    if (pathname && pathname.startsWith('/dashboard/receipts/') && pathname !== '/dashboard/receipts') {
        return {
            title: `Receipt Details`,
            subtitle: 'View receipt details and edit item categories',
            showUpload: false
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

                <main className="flex-1 p-2 py-6 flex flex-col">

                    <Header 
                        title={headerConfig.title}
                        subtitle={headerConfig.subtitle}
                    />

                    <div>
                        {children}
                    </div>
             
                </main>
            </div>
        </>
    )
}