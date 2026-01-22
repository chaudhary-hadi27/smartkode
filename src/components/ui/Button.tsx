import React, { forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                primary:
                    'bg-foreground text-background hover:bg-foreground/90 focus:ring-foreground',
                secondary:
                    'bg-background-tertiary text-foreground hover:bg-background-tertiary/80 border border-border focus:ring-border',
                outline:
                    'border-2 border-foreground text-foreground hover:bg-foreground hover:text-background focus:ring-foreground',
                ghost:
                    'text-foreground hover:bg-background-tertiary focus:ring-border',
                success:
                    'bg-success text-white hover:bg-success-dark focus:ring-success',
                error:
                    'bg-error text-white hover:bg-error-dark focus:ring-error',
                warning:
                    'bg-warning text-white hover:bg-warning-dark focus:ring-warning',
                link:
                    'text-foreground underline-offset-4 hover:underline focus:ring-foreground',
            },
            size: {
                sm: 'h-9 px-4 text-sm',
                md: 'h-11 px-6 text-base',
                lg: 'h-14 px-8 text-lg',
                xl: 'h-16 px-10 text-xl',
                icon: 'h-10 w-10',
            },
            fullWidth: {
                true: 'w-full',
                false: 'w-auto',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
            fullWidth: false,
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
    loading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            fullWidth,
            loading = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}

                {!loading && leftIcon && (
                    <span className="mr-2" aria-hidden="true">
            {leftIcon}
          </span>
                )}

                {children}

                {!loading && rightIcon && (
                    <span className="ml-2" aria-hidden="true">
            {rightIcon}
          </span>
                )}
            </button>
        )
    }
)

Button.displayName = 'Button'

export { Button, buttonVariants }