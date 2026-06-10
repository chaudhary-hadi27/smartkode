import React, { forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const containerVariants = cva('mx-auto w-full', {
    variants: {
        size: {
            sm: 'max-w-3xl',
            md: 'max-w-4xl',
            lg: 'max-w-5xl',
            xl: 'max-w-6xl',
            '2xl': 'max-w-7xl',
            full: 'max-w-full',
        },
        padding: {
            none: 'px-0',
            sm: 'px-4',
            md: 'px-4 sm:px-6',
            lg: 'px-4 sm:px-6 lg:px-8',
            xl: 'px-4 sm:px-6 lg:px-8 xl:px-16',
        },
    },
    defaultVariants: {
        size: 'xl',
        padding: 'lg',
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