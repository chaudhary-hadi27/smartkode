import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
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
                    <label
                        htmlFor={textareaId}
                        className="text-sm font-medium text-foreground"
                    >
                        {label}
                        {props.required && (
                            <span className="ml-1 text-error" aria-label="required">
                *
              </span>
                        )}
                    </label>
                )}

                <textarea
                    id={textareaId}
                    className={cn(
                        'flex min-h-[120px] w-full rounded-lg border bg-background-secondary px-4 py-3 text-base text-foreground',
                        'placeholder:text-foreground-muted',
                        'transition-colors duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        error
                            ? 'border-error focus:ring-error'
                            : 'border-border hover:border-border-secondary',
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
                    <p
                        id={`${textareaId}-error`}
                        className="text-sm text-error"
                        role="alert"
                    >
                        {error}
                    </p>
                )}

                {!error && helperText && (
                    <p
                        id={`${textareaId}-helper`}
                        className="text-sm text-foreground-muted"
                    >
                        {helperText}
                    </p>
                )}
            </div>
        )
    }
)

Textarea.displayName = 'Textarea'

export { Textarea }