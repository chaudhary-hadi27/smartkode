'use client'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const skeleton = cva('animate-pulse rounded bg-foreground-muted/20', {
    variants: {
        variant: {
            text: 'h-4 w-full',
            title: 'h-8 w-3/4',
            circle: 'rounded-full',
            rect: 'rounded-lg',
        },
    },
    defaultVariants: { variant: 'text' },
})

export interface SkeletonProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof skeleton> {
    width?: string
    height?: string
}

export function Skeleton({
                             className,
                             variant,
                             width,
                             height,
                             style,
                             ...props
                         }: SkeletonProps) {
    return (
        <div
            className={cn(skeleton({ variant }), className)}
            style={{ width, height, ...style }}
            {...props}
        />
    )
}

export default Skeleton