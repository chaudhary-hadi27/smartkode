import React, { forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
    'rounded-2xl border transition-all duration-300',
    {
        variants: {
            variant: {
                // Gradient variants (exact from your code)
                default: 'bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-white/10 hover:border-white/20',
                elevated: 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-white/10 shadow-lg hover:shadow-xl',

                // Colored gradients
                blue: 'bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-500/20 hover:border-blue-500/30',
                purple: 'bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-500/30 hover:border-purple-500/50',
                green: 'bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-500/20 hover:border-green-500/30',
                red: 'bg-gradient-to-br from-red-900/20 to-red-800/20 border-red-500/30 hover:border-red-500/50',
                orange: 'bg-gradient-to-br from-orange-900/30 to-orange-800/30 border-orange-500/30 hover:border-orange-500/50',

                // Solid variants
                dark: 'bg-gray-900/50 backdrop-blur-sm border-gray-800',
                black: 'bg-black/40 backdrop-blur-sm border-gray-700',

                // Ghost
                ghost: 'bg-transparent border-transparent hover:border-white/10',
            },
            padding: {
                none: 'p-0',
                sm: 'p-4',
                md: 'p-6 sm:p-8',
                lg: 'p-8 sm:p-10',
                xl: 'p-10 sm:p-12',
            },
            interactive: {
                true: 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
                false: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            padding: 'md',
            interactive: false,
        },
    }
)

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, padding, interactive, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(cardVariants({ variant, padding, interactive }), className)}
                {...props}
            />
        )
    }
)

Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex flex-col space-y-1.5 mb-6', className)}
            {...props}
        />
    )
)

CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn(
                'text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-white',
                className
            )}
            {...props}
        />
    )
)

CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn('text-base sm:text-lg text-gray-400 leading-relaxed', className)}
            {...props}
        />
    )
)

CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('text-gray-300', className)} {...props} />
    )
)

CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex items-center pt-6 border-t border-white/10', className)}
            {...props}
        />
    )
)

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }