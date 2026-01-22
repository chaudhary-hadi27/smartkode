'use client'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useKeyPress, useScrollLock } from '@/hooks'
import { Button } from './Button'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    description?: string
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    showCloseButton?: boolean
}

export function Modal({
                          isOpen,
                          onClose,
                          title,
                          description,
                          children,
                          size = 'md',
                          showCloseButton = true,
                      }: ModalProps) {
    useKeyPress('Escape', onClose)
    useScrollLock(isOpen)

    if (!isOpen) return null

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full m-4',
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />
            <div
                className={cn(
                    'relative bg-background-secondary rounded-2xl shadow-2xl border border-border w-full animate-scale-in',
                    sizes[size]
                )}
            >
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        <div>
                            {title && <h2 className="text-2xl font-bold text-foreground">{title}</h2>}
                            {description && <p className="text-sm text-foreground-tertiary mt-1">{description}</p>}
                        </div>
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-background-tertiary rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                )}
                <div className="p-6">{children}</div>
            </div>
        </div>
    )
}

export function ModalFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn('flex justify-end gap-3 pt-4 border-t border-border', className)}>
            {children}
        </div>
    )
}