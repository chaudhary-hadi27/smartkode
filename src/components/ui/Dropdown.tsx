'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useClickOutside } from '@/hooks'

interface DropdownProps {
    trigger: React.ReactNode
    children: React.ReactNode
    align?: 'left' | 'right' | 'center'
}

export function Dropdown({ trigger, children, align = 'left' }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false))

    const alignments = {
        left: 'left-0',
        right: 'right-0',
        center: 'left-1/2 -translate-x-1/2',
    }

    return (
        <div ref={ref} className="relative inline-block">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
                {trigger}
            </button>
            {isOpen && (
                <div
                    className={cn(
                        'absolute top-full mt-2 min-w-[200px] bg-background-secondary rounded-xl border border-border shadow-xl animate-scale-in z-50',
                        alignments[align]
                    )}
                >
                    {children}
                </div>
            )}
        </div>
    )
}

export function DropdownItem({
                                 children,
                                 onClick,
                                 icon,
                             }: {
    children: React.ReactNode
    onClick?: () => void
    icon?: React.ReactNode
}) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-background-tertiary transition-colors first:rounded-t-xl last:rounded-b-xl"
        >
            {icon}
            {children}
        </button>
    )
}

export function DropdownDivider() {
    return <div className="h-px bg-border my-1" />
}