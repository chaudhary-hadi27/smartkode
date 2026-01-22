import React, { forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
    'rounded-xl border bg-background-secondary transition-all duration-300',
    {
        variants: {
            variant: {
                default: 'border-border hover:border-border-secondary',
                elevated:
                    'border-border shadow-lg hover:shadow-xl hover:border-border-secondary',
                outline: 'border-2 border-border hover:border-foreground',
                ghost: 'border-transparent hover:border-border',
            },
            padding: {
                none: 'p-0',
                sm: 'p-4',
                md: 'p-6',
                lg: 'p-8',
                xl: 'p-10',
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

const CardHeader = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5', className)}
        {...props}
    />
))

CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            'text-2xl font-bold leading-none tracking-tight text-foreground',
            className
        )}
        {...props}
    />
))

CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-base text-foreground-tertiary', className)}
        {...props}
    />
))

CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('text-foreground-secondary', className)}
        {...props}
    />
))

CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center pt-6', className)}
        {...props}
    />
))

CardFooter.displayName = 'CardFooter'

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    cardVariants,
}