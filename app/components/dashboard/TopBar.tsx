import UserCard from '@/app/components/UserCard'
import { User } from '@/app/lib/types'
import { Menu } from 'lucide-react'


interface TopBarProps {
    onMenuClick: () => void
    isAuthenticated: boolean
    user: User | null
    onLogout: () => Promise<void>,
}

export default function TopBar({
    onMenuClick,
    isAuthenticated,
    user,
    onLogout
}: TopBarProps) {
    return (
        <div className="lg:hidden flex items-center justify-between px-4 py-3">
            <button
                onClick={onMenuClick}
                className="p-2 rounded-md text-ci-muted cursor-pointer hover:scale-105 transition-all"
            >
                <Menu className="h-6 w-6" />
            </button>

            <h1 className="text-lg font-bold">Receipt Tracker</h1>

            <UserCard
                isAuthenticated={isAuthenticated}
                user={user}
                handleLogout={onLogout}
                justIcon
            />
        </div>
    )
}