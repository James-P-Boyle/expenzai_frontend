import { X } from 'lucide-react'
import NavigationList from './NavigationList'
import { NavigationItem } from '@/app/lib/types'

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    navigation: NavigationItem[]
    currentPath: string
}

export default function MobileMenu({
    isOpen,
    onClose,
    navigation,
    currentPath
}: MobileMenuProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-ci-white/80 dark:bg-ci-black/80" onClick={onClose} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-ci-white dark:bg-ci-black">
                <div className="absolute top-0 right-0 sm:-mr-9 pt-2">
                    <button
                        className="ml-1 flex items-center justify-center size-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={onClose}
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 flex items-center px-4">
                        <h2 className="text-lg font-bold">Receipt Tracker</h2>
                    </div>

                    <NavigationList
                        items={navigation}
                        currentPath={currentPath}
                        onItemClick={onClose}
                        variant="mobile"
                    />
                </div>
            </div>
        </div>
    )
}