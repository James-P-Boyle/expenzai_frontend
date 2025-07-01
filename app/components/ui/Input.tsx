interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
    return (
        <div className="space-y-1 dark:text-ci-white">
            {label && (
                <label className="block text-sm font-medium">
                    {label}
                </label>
            )}
            <input
                className={`
                    block w-full px-3 py-2 border border-ci-muted rounded-md shadow-sm placeholder-ci-muted focus:outline-none focus:ring-ci-main focus:border-ci-main
                    ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
                    ${className}
                `.trim()}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
