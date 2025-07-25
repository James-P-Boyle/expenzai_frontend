import { Ref } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    ref?: Ref<HTMLInputElement>
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
                    block w-full px-3 py-2 border border-ci-muted-light rounded-md placeholder-ci-muted focus:outline-none focus:ring-ci-main focus:border-ci-main
                    ${error ? 'border-red-300 focus:ring-ci-danger focus:border-ci-danger' : ''}
                    ${className}
                `.trim()}
                {...props}
            />
            {error && (
                <p className="text-sm text-ci-danger">{error}</p>
            )}
        </div>
    );
}
