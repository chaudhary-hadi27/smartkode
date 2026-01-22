import React, { forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                // Primary - White background (most used in your code)
                primary: 'bg-white text-black hover:bg-gray-100 focus:ring-white',

                // Gradient variants (exact from your code)
                gradient: 'bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-gray-200',
                gradientBlue: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700',

                // Secondary - Dark backgrounds
                secondary: 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700',
                ghost: 'bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 border border-gray-700',

                // Outline
                outline: 'border-2 border-white text-white hover:bg-white hover:text-black',

                // Status colors
                success: 'bg-green-500 text-white hover:bg-green-600',
                error: 'bg-red-500 text-white hover:bg-red-600',
                warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
            },
            size: {
                // Responsive sizes (matches your current code)
                sm: 'h-9 px-4 py-2 text-sm rounded-lg',
                md: 'px-6 sm:px-8 py-3 sm:py-4 text-base rounded-xl',
                lg: 'px-8 sm:px-10 py-4 sm:py-5 text-lg rounded-xl',
                icon: 'h-10 w-10 p-2 rounded-xl',
            },
            fullWidth: {
                true: 'w-full',
                false: 'w-auto',
            },
        },
        defaultVariants: {
            variant: 'gradient',
            size: 'md',
            fullWidth: false,
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
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
                className={cn(buttonVariants({ variant, size, fullWidth }), className)}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                )}

                {!loading && leftIcon && (
                    <span className="mr-2 flex items-center" aria-hidden="true">
            {leftIcon}
          </span>
                )}

                {children}

                {!loading && rightIcon && (
                    <span className="ml-2 flex items-center" aria-hidden="true">
            {rightIcon}
          </span>
                )}
            </button>
        )
    }
)

Button.displayName = 'Button'

export { Button, buttonVariants }