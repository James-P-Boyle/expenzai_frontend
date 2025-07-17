import UserCard from '@/app/components/UserCard'
import { NavigationItem, User } from '@/app/lib/types'
import NavigationList from './NavigationList'
import Logo from '../ui/Logo'
import { Link, Cog } from 'lucide-react'

interface SidebarProps {
    navigation: NavigationItem[]
    currentPath: string
    isAuthenticated: boolean
    user: User | null
    onLogout: () => Promise<void>
}

export default function Sidebar({
    navigation,
    currentPath,
    isAuthenticated,
    user,
    onLogout
}: SidebarProps) {

    return (
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
            <div className="flex-1 flex flex-col min-h-0 pt-4">

                <div className='mx-auto'>
                    <Logo />
                </div>
        
                <NavigationList
                    items={navigation}
                    currentPath={currentPath}
                    variant="desktop"
                />
                
                <UserCard
                    isAuthenticated={isAuthenticated}
                    user={user}
                    handleLogout={onLogout}
                />

            </div>
        </div>
    )
}