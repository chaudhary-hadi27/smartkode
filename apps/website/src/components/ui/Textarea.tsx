import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
    helperText?: string
    fullWidth?: boolean
    resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            className,
            label,
            error,
            helperText,
            fullWidth = false,
            resize = 'vertical',
            id,
            ...props
        },
        ref
    ) => {
        const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

        const resizeClasses = {
            none: 'resize-none',
            vertical: 'resize-y',
            horizontal: 'resize-x',
            both: 'resize',
        }

        return (
            <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
                {label && (
                    <label htmlFor={textareaId} className="text-sm font-medium text-white">
                        {label}
                        {props.required && (
                            <span className="ml-1 text-red-500" aria-label="required">
                *
              </span>
                        )}
                    </label>
                )}

                <textarea
                    id={textareaId}
                    className={cn(
                        // Exact match from your contact/services pages
                        'flex min-h-[120px] w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl',
                        'bg-black/40 border text-white placeholder-gray-400',
                        'focus:outline-none focus:ring-1 focus:ring-white focus:border-white',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'transition-all duration-300',
                        error
                            ? 'border-red-700 focus:ring-red-500'
                            : 'border-gray-700 hover:border-gray-600',
                        resizeClasses[resize],
                        className
                    )}
                    ref={ref}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={
                        error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
                    }
                    {...props}
                />

                {error && (
                    <p id={`${textareaId}-error`} className="text-sm text-red-400" role="alert">
                        {error}
                    </p>
                )}

                {!error && helperText && (
                    <p id={`${textareaId}-helper`} className="text-sm text-gray-400">
                        {helperText}
                    </p>
                )}
            </div>
        )
    }
)

Textarea.displayName = 'Textarea'

export { Textarea }