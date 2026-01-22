'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '../ui/Container'

// NavLink Component
interface NavLinkProps {
    href: string
    children: React.ReactNode
    exact?: boolean
    className?: string
}

export function NavLink({ href, children, exact = false, className }: NavLinkProps) {
    const pathname = usePathname()
    const isActive = exact ? pathname === href : pathname.startsWith(href)

    return (
        <Link
            href={href}
    className={cn(
        'px-4 py-2 rounded-lg transition-all duration-200 font-medium',
        isActive
        ? 'bg-foreground text-background'
        : 'text-foreground-secondary hover:text-foreground hover:bg-background-tertiary',
        className
)}
>
    {children}
    </Link>
)
}

// Navbar Component
interface NavbarProps {
    logo: React.ReactNode
    children?: React.ReactNode
}

export function Navbar({ logo, children }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 bg-background border-b border-border backdrop-blur-lg bg-opacity-95">
        <Container>
            <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
            {logo}
            <div className="hidden md:flex items-center gap-2">{children}</div>
        </div>

        <button
    onClick={() => setIsOpen(!isOpen)}
    className="md:hidden p-2 hover:bg-background-tertiary rounded-lg"
        >
        {isOpen ? <X /> : <Menu />}
        </button>
        </div>

    {isOpen && (
        <div className="md:hidden py-4 border-t border-border animate-slide-in">
        <div className="flex flex-col gap-2">{children}</div>
            </div>
    )}
    </Container>
    </nav>
)
}

// Sidebar Component
interface SidebarProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    width?: 'sm' | 'md' | 'lg'
}

export function Sidebar({ isOpen, onClose, children, width = 'md' }: SidebarProps) {
    const widths = {
        sm: 'w-64',
        md: 'w-80',
        lg: 'w-96',
    }

    return (
        <>
            {isOpen && (
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
    onClick={onClose}
    />
)}
    <aside
        className={cn(
        'fixed top-0 left-0 h-full bg-background border-r border-border z-50 transition-transform duration-300',
        widths[width],
        isOpen ? 'translate-x-0' : '-translate-x-full'
)}
>
    <div className="p-6">
    <button
        onClick={onClose}
    className="absolute top-4 right-4 p-2 hover:bg-background-tertiary rounded-lg lg:hidden"
    >
    <X className="w-5 h-5" />
        </button>
    {children}
    </div>
    </aside>
    </>
)
}

// Breadcrumbs Component
interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
    className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-sm', className)}>
    <Link
        href="/"
    className="text-foreground-muted hover:text-foreground transition-colors"
    >
    <Home className="w-4 h-4" />
        </Link>
    {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
    <ChevronRight className="w-4 h-4 text-foreground-muted" />
        {item.href ? (
                    <Link
                        href={item.href}
                className="text-foreground-muted hover:text-foreground transition-colors"
                    >
                    {item.label}
                    </Link>
    ) : (
        <span className="text-foreground font-medium">{item.label}</span>
    )}
        </div>
    ))}
    </nav>
)
}