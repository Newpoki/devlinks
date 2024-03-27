import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
    startIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, id, type, startIcon, ...props }, ref) => {
        const hasError = error != null

        return (
            <label
                className={cn(
                    'border-slate-200 flex h-12 w-full items-center gap-3 rounded-lg border border-grey-300 bg-white px-4 text-b-m transition-colors placeholder:text-grey-900/50 focus-within:drop-shadow-active hover:border-purple-500 disabled:cursor-not-allowed',
                    {
                        'border-red-500 text-red-500 focus-within:drop-shadow-none hover:border-red-500':
                            hasError,
                    },
                    className
                )}
                htmlFor={id}
            >
                {startIcon != null && (
                    <div className="flex-shrink-0 text-grey-900">{startIcon}</div>
                )}

                <input
                    className="w-full focus-visible:outline-none"
                    id={id}
                    type={type}
                    ref={ref}
                    {...props}
                />

                {hasError && (
                    <span className="ml-auto flex-shrink-0 text-b-s text-red-500">{error}</span>
                )}
            </label>
        )
    }
)

Input.displayName = 'Input'

export { Input }
