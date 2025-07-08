import { X } from 'lucide-react'
import NavigationList from './NavigationList'
import { NavigationItem } from '@/app/lib/types'
import Logo from '../ui/Logo'

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
            <div className="fixed inset-0 bg-ci-white/80 dark:bg-ci-black/80 border" onClick={onClose} />

            <div className="relative flex-1 flex flex-col w-full bg-ci-white dark:bg-ci-black border">
                <div className="absolute top-0 right-0 sm:-mr-9 pt-2">
                    <button
                        className="ml-1 flex items-center justify-center size-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={onClose}
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    
                    <div className="mx-auto  border">
                        <Logo />
                    </div>
                    <div className=''> 
                        <NavigationList
                            items={navigation}
                            currentPath={currentPath}
                            onItemClick={onClose}
                            variant="mobile"
                        />
                    </div>
                
                </div>
            </div>
        </div>
    )
}