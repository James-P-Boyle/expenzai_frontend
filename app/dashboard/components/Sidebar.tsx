import UserCard from '@/app/components/UserCard'
import { NavigationItem, User } from '@/app/lib/types'
import NavigationList from './NavigationList'

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
            <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto py-20">

                    <div className="flex items-center flex-shrink-0 px-4">
                        <h2 className="text-xl font-bold">Receipt Tracker</h2>
                    </div>

                    <NavigationList
                        items={navigation}
                        currentPath={currentPath}
                        variant="desktop"
                    />

                </div>

                <UserCard
                    isAuthenticated={isAuthenticated}
                    user={user}
                    handleLogout={onLogout}
                />

            </div>
        </div>
    )
}