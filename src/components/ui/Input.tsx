import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    helperText?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            fullWidth = false,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

        return (
            <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
                {label && (
                    <label htmlFor={inputId} className="text-sm font-medium text-white">
                        {label}
                        {props.required && (
                            <span className="ml-1 text-red-500" aria-label="required">
                *
              </span>
                        )}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        id={inputId}
                        type={type}
                        className={cn(
                            // Exact match from your contact/services pages
                            'w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl',
                            'bg-black/40 border text-white placeholder-gray-400',
                            'focus:outline-none focus:ring-1 focus:ring-white focus:border-white',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                            'transition-all duration-300',
                            error
                                ? 'border-red-700 focus:ring-red-500'
                                : 'border-gray-700 hover:border-gray-600',
                            leftIcon && 'pl-10',
                            rightIcon && 'pr-10',
                            className
                        )}
                        ref={ref}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={
                            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
                        }
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {error && (
                    <p id={`${inputId}-error`} className="text-sm text-red-400" role="alert">
                        {error}
                    </p>
                )}

                {!error && helperText && (
                    <p id={`${inputId}-helper`} className="text-sm text-gray-400">
                        {helperText}
                    </p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

export { Input }