import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline'
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

    const baseClasses = 'w-full max-w-[450px] inline-flex font-sans items-center justify-center font-semibold rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all hover:lg:scale-105'

    const variantClasses = {
        primary: 'bg-ci-main hover:bg-ci-main !text-ci-black focus:ring-ci-main',
        secondary: 'hover:bg-ci-main/20 focus:ring-ci-main border border-ci-muted-light hover:border-ci-muted',
        danger: 'border-ci-danger border hover:bg-ci-danger/20 text-ci-danger focus:ring-ci-danger',
        outline: 'border border-foreground/20 text-foreground hover:bg-foreground/10 focus:ring-foreground/50 bg-transparent',
    }

    const sizeClasses = {
        sm: 'px-6 py-2 text-base',
        md: 'px-8 py-3 text-lg',
        lg: 'px-10 py-4 text-base',
    }

    const loadingClasses = isLoading ? 'animate-pulse' : ''

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${loadingClasses} ${className}`

    return (
        <button
            className={classes}
            disabled={disabled || isLoading}
            {...props}
        >
            {children}
        </button>
    )
}