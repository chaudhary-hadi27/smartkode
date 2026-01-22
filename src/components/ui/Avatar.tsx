import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { User } from 'lucide-react'

const avatar = cva(
    'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-background-tertiary',
    {
        variants: {
            size: {
                sm: 'w-8 h-8 text-xs',
                md: 'w-12 h-12 text-sm',
                lg: 'w-16 h-16 text-base',
                xl: 'w-24 h-24 text-xl',
            },
        },
        defaultVariants: { size: 'md' },
    }
)

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatar> {
    src?: string
    alt?: string
    fallback?: string
    status?: 'online' | 'offline' | 'away' | 'busy'
}

export function Avatar({ className, size, src, alt, fallback, status, ...props }: AvatarProps) {
    const statusColors = {
        online: 'bg-success',
        offline: 'bg-gray-500',
        away: 'bg-warning',
        busy: 'bg-error',
    }

    return (
        <div className={cn(avatar({ size }), className)} {...props}>
            {src ? (
                <Image src={src} alt={alt || 'Avatar'} fill className="object-cover" />
            ) : fallback ? (
                <span className="font-semibold text-foreground">{fallback}</span>
            ) : (
                <User className="w-1/2 h-1/2 text-foreground-muted" />
            )}
            {status && (
                <span
                    className={cn(
                        'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background',
                        statusColors[status]
                    )}
                />
            )}
        </div>
    )
}