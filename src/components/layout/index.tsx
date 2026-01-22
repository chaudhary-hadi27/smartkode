import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Grid Component
const grid = cva('grid', {
    variants: {
        cols: {
            1: 'grid-cols-1',
            2: 'grid-cols-1 md:grid-cols-2',
            3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
            6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
        },
        gap: {
            none: 'gap-0',
            sm: 'gap-2 sm:gap-4',
            md: 'gap-4 sm:gap-6',
            lg: 'gap-6 sm:gap-8',
            xl: 'gap-8 sm:gap-12',
        },
    },
    defaultVariants: { cols: 3, gap: 'md' },
})

interface GridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof grid> {}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
    ({ className, cols, gap, ...props }, ref) => (
        <div ref={ref} className={cn(grid({ cols, gap }), className)} {...props} />
)
)
Grid.displayName = 'Grid'

// Flex Component
const flex = cva('flex', {
    variants: {
        direction: {
            row: 'flex-row',
            col: 'flex-col',
            rowReverse: 'flex-row-reverse',
            colReverse: 'flex-col-reverse',
        },
        align: {
            start: 'items-start',
            center: 'items-center',
            end: 'items-end',
            stretch: 'items-stretch',
            baseline: 'items-baseline',
        },
        justify: {
            start: 'justify-start',
            center: 'justify-center',
            end: 'justify-end',
            between: 'justify-between',
            around: 'justify-around',
            evenly: 'justify-evenly',
        },
        gap: {
            none: 'gap-0',
            xs: 'gap-1',
            sm: 'gap-2',
            md: 'gap-4',
            lg: 'gap-6',
            xl: 'gap-8',
        },
        wrap: {
            true: 'flex-wrap',
            false: 'flex-nowrap',
        },
    },
    defaultVariants: {
        direction: 'row',
        align: 'start',
        justify: 'start',
        gap: 'md',
        wrap: false,
    },
})

interface FlexProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof flex> {}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
    ({ className, direction, align, justify, gap, wrap, ...props }, ref) => (
        <div ref={ref} className={cn(flex({ direction, align, justify, gap, wrap }), className)} {...props} />
)
)
Flex.displayName = 'Flex'

// Stack Component (simplified Flex for common use case)
const stack = cva('flex flex-col', {
    variants: {
        spacing: {
            none: 'gap-0',
            xs: 'gap-1',
            sm: 'gap-2',
            md: 'gap-4',
            lg: 'gap-6',
            xl: 'gap-8',
        },
        align: {
            start: 'items-start',
            center: 'items-center',
            end: 'items-end',
            stretch: 'items-stretch',
        },
    },
    defaultVariants: { spacing: 'md', align: 'start' },
})

interface StackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stack> {}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
    ({ className, spacing, align, ...props }, ref) => (
        <div ref={ref} className={cn(stack({ spacing, align }), className)} {...props} />
)
)
Stack.displayName = 'Stack'