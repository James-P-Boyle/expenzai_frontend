import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    className = '',
    ...props
}: ButtonProps) {

    const baseClasses = 'w-full inline-flex font-sans items-center justify-center font-semibold rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all hover:scale-105'

    const variantClasses = {
        primary: 'bg-ci-main hover:bg-ci-main !text-ci-black focus:ring-ci-main',
        secondary: 'hover:bg-ci-main/20 focus:ring-ci-main border border-ci-muted-light hover:border-ci-muted',
        danger: 'border-red-600 border hover:bg-red-600/20 text-red-600 focus:ring-red-500',
    }

    const sizeClasses = {
        sm: 'px-6 py-2 text-base',
        md: 'px-8 py-3 text-lg',
        lg: 'px-10 py-4 text-base',
    }

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

    return (
        <button
            className={classes}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            )}
            {children}
        </button>
    )
}
