import React, { forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const containerVariants = cva('mx-auto w-full', {
    variants: {
        size: {
            sm: 'max-w-3xl',
            md: 'max-w-5xl',
            lg: 'max-w-7xl',
            xl: 'max-w-[1400px]',
            full: 'max-w-full',
        },
        padding: {
            none: 'px-0',
            sm: 'px-4 sm:px-6',
            md: 'px-4 sm:px-6 lg:px-8',
            lg: 'px-4 sm:px-6 lg:px-12',
            xl: 'px-4 sm:px-6 lg:px-16',
        },
    },
    defaultVariants: {
        size: 'lg',
        padding: 'md',
    },
})

export interface ContainerProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof containerVariants> {
    as?: React.ElementType
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, size, padding, as: Component = 'div', ...props }, ref) => {
        return (
            <Component
                ref={ref}
                className={cn(containerVariants({ size, padding }), className)}
                {...props}
            />
        )
    }
)

Container.displayName = 'Container'

export { Container, containerVariants }