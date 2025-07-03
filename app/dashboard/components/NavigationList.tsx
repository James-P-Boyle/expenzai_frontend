import Link from 'next/link'
import { NavigationItem } from '@/app/lib/types'

interface NavigationListProps {
    items: NavigationItem[]
    currentPath: string
    onItemClick?: () => void
    variant?: 'desktop' | 'mobile'
}

export default function NavigationList({
    items,
    currentPath,
    onItemClick,
    variant = 'desktop'
}: NavigationListProps) {

    const baseClasses = "group flex items-center text-sm lg:text-lg"
    const desktopClasses = "px-4 py-2 rounded-full"
    const mobileClasses = "px-2 py-2 rounded-md font-medium"

    const getItemClasses = (isActive: boolean) => {
        const variantClasses = variant === 'desktop' ? desktopClasses : mobileClasses
        const activeClasses = isActive
            ? 'font-black '
            : 'text-ci-muted hover:bg-gray-50 dark:hover:bg-ci-main/10'

        return `${baseClasses} ${variantClasses} ${activeClasses}`
    }

    return (
        <nav className={`py-4 space-y-2 ${variant === 'desktop' ? 'mt-5 flex-1 px-2' : 'mt-5 px-2'}`}>

            {items.map((item) => {

                const isActive = currentPath === item.href

                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={getItemClasses(isActive)}
                        onClick={onItemClick}
                    >
                        <item.icon  className={`mr-3 size-5 lg:size-8 ${isActive && 'text-ci-main'}`} />
                        {item.name}
                    </Link>
                )
            })}

        </nav>
    )
}