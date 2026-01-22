import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badge = cva(
    'inline-flex items-center justify-center rounded-full font-semibold transition-all',
    {
        variants: {
            variant: {
                default: 'bg-foreground text-background',
                secondary: 'bg-background-tertiary text-foreground border border-border',
                success: 'bg-success text-white',
                error: 'bg-error text-white',
                warning: 'bg-warning text-white',
                outline: 'border-2 border-foreground text-foreground bg-transparent',
            },
            size: {
                sm: 'px-2 py-0.5 text-xs',
                md: 'px-3 py-1 text-sm',
                lg: 'px-4 py-1.5 text-base',
            },
        },
        defaultVariants: { variant: 'default', size: 'md' },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badge> {
    dot?: boolean
}

export function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
    return (
        <span className={cn(badge({ variant, size }), className)} {...props}>
      {dot && <span className="w-2 h-2 rounded-full bg-current mr-1.5" />}
            {children}
    </span>
    )
}