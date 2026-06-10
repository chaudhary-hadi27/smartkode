import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Format date consistently across the app
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(d)
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null
            func(...args)
        }

        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

/**
 * Throttle function for scroll/resize events
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean

    return function executedFunction(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

/**
 * Smooth scroll to element
 */
export function scrollToElement(
    elementId: string,
    options?: {
        offset?: number
        behavior?: ScrollBehavior
    }
): void {
    const element = document.getElementById(elementId)
    if (!element) return

    const offset = options?.offset || 80
    const elementPosition = element.offsetTop
    const offsetPosition = elementPosition - offset

    window.scrollTo({
        top: offsetPosition,
        behavior: options?.behavior || 'smooth',
    })
}

/**
 * Generate unique ID
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9)
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Truncate text
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
}

/**
 * Get contrast color (black or white) based on background
 */
export function getContrastColor(hexColor: string): string {
    const r = parseInt(hexColor.slice(1, 3), 16)
    const g = parseInt(hexColor.slice(3, 5), 16)
    const b = parseInt(hexColor.slice(5, 7), 16)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128 ? '#000000' : '#ffffff'
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount)
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
}

/**
 * Get responsive breakpoint
 */
export function getBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' {
    const width = window.innerWidth

    if (width < 475) return 'xs'
    if (width < 640) return 'sm'
    if (width < 768) return 'md'
    if (width < 1024) return 'lg'
    if (width < 1280) return 'xl'
    if (width < 1536) return '2xl'
    return '3xl'
}

/**
 * Check if mobile device
 */
export function isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
}

/**
 * Local storage helpers
 */
export const storage = {
    get: <T>(key: string): T | null => {
        if (typeof window === 'undefined') return null
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : null
        } catch {
            return null
        }
    },

    set: <T>(key: string, value: T): void => {
        if (typeof window === 'undefined') return
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error('Error saving to localStorage:', error)
        }
    },

    remove: (key: string): void => {
        if (typeof window === 'undefined') return
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.error('Error removing from localStorage:', error)
        }
    },

    clear: (): void => {
        if (typeof window === 'undefined') return
        try {
            window.localStorage.clear()
        } catch (error) {
            console.error('Error clearing localStorage:', error)
        }
    },
}