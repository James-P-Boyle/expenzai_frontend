'use client'

import { LogOut, User as UserIcon  } from "lucide-react"
import { User } from "../lib/types"

export default function UserCard ({
    isAuthenticated,
    user,
    handleLogout,
    justIcon
} : {
    isAuthenticated: boolean,
    user?: User | null,
    handleLogout: () => Promise<void>,
    justIcon?: boolean
}) {

    if (!isAuthenticated) {
        return null 
    }

    if (justIcon) {
        return (
            <button
                    onClick={handleLogout}
                    className="ml-3 p-1 rounded-full text-ci-muted hover:text-ci-muted"
                    title="Logout"
                >
                    <LogOut className="h-5 w-5" />
                </button>
        )
    }

    return (
        <div className="flex-shrink-0 flex p-4">
            <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-ci-main text-ci-black flex items-center justify-center">
                        <UserIcon className="h-5 w-5" />
                    </div>
                </div>
                <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-ci-muted">{user?.name}</p>
                    <p className="text-xs text-ci-muted">{user?.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="ml-3 p-1 rounded-full text-ci-muted hover:text-ci-muted"
                    title="Logout"
                >
                    <LogOut className="h-5 w-5" />
                </button>
            </div>
    </div>
    )
}