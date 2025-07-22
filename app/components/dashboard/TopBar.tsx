import { User } from '@/app/lib/types'
import { Menu, Upload } from 'lucide-react'
import { Button } from '../ui/Button'
import Link from 'next/link'


interface TopBarProps {
    onMenuClick: () => void
    // isAuthenticated: boolean
    // user: User | null
    // onLogout: () => Promise<void>,
}

export default function TopBar({
    onMenuClick
}: TopBarProps) {
    return (
        <div className="lg:hidden flex items-center justify-between px-4 py-3">
            <button
                onClick={onMenuClick}
                className="p-2 rounded-md text-ci-muted cursor-pointer hover:scale-105 transition-all"
            >
                <Menu className="h-6 w-6" />
            </button>

            <h1 className="text-lg font-bold">Expenz<span className='text-ci-main'>Ai</span></h1>

             <Link href="/dashboard/upload">
        
                <Upload className="mr-2 h-4 w-4" />
           
            </Link>
        </div>
    )
}