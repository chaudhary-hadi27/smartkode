import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badge = cva(
    'inline-flex items-center justify-center rounded-full font-semibold transition-all tracking-wider uppercase',
    {
        variants: {
            variant: {
                // Default - Gray background (most common in your code)
                default: 'bg-gray-800 text-white border border-gray-700',

                // White background
                white: 'bg-white text-black',

                // Transparent with border
                outline: 'bg-transparent border-2 border-white text-white',

                // Status colors with borders
                success: 'bg-green-500/20 text-green-400 border border-green-500/30',
                error: 'bg-red-500/20 text-red-400 border border-red-500/30',
                warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
                info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',

                // Subtle variants
                ghost: 'bg-white/5 backdrop-blur-sm text-gray-300 border border-white/10',
            },
            size: {
                sm: 'px-3 py-1 text-xs',
                md: 'px-4 py-2 text-sm',
                lg: 'px-6 sm:px-8 py-3 text-sm sm:text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md'
        },
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
      {dot && <span className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />}
            {children}
    </span>
    )
}