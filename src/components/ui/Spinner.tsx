'use client'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const spinner = cva('animate-spin rounded-full border-t-transparent', {
    variants: {
        size: {
            sm: 'w-4 h-4 border-2',
            md: 'w-6 h-6 border-2',
            lg: 'w-8 h-8 border-3',
            xl: 'w-12 h-12 border-4',
        },
        variant: {
            primary: 'border-foreground',
            secondary: 'border-foreground-secondary',
            white: 'border-white',
        },
    },
    defaultVariants: { size: 'md', variant: 'primary' },
})

export interface SpinnerProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof spinner> {}

export function Spinner({ className, size, variant, ...props }: SpinnerProps) {
    return <div className={cn(spinner({ size, variant }), className)} {...props} />
}

export default Spinner