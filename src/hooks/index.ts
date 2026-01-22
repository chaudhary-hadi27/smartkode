import { useEffect, useRef, useState, useCallback } from 'react'

// Media Query Hook
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) setMatches(media.matches)
        const listener = () => setMatches(media.matches)
        media.addEventListener('change', listener)
        return () => media.removeEventListener('change', listener)
    }, [matches, query])

    return matches
}

// Click Outside Hook
export function useClickOutside<T extends HTMLElement>(
    handler: () => void
): React.RefObject<T | null> {
    const ref = useRef<T | null>(null)

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) return
            handler()
        }
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)
        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [handler])

    return ref
}

// Key Press Hook
export function useKeyPress(targetKey: string, handler: () => void): void {
    useEffect(() => {
        const downHandler = (e: KeyboardEvent) => {
            if (e.key === targetKey) handler()
        }
        window.addEventListener('keydown', downHandler)
        return () => window.removeEventListener('keydown', downHandler)
    }, [targetKey, handler])
}

// Scroll Lock Hook
export function useScrollLock(lock: boolean): void {
    useEffect(() => {
        if (lock) {
            document.body.style.overflow = 'hidden'
            return () => { document.body.style.overflow = 'unset' }
        }
    }, [lock])
}

// Intersection Observer Hook
export function useIntersection(
    ref: React.RefObject<HTMLElement>,
    options?: IntersectionObserverInit
): boolean {
    const [isIntersecting, setIsIntersecting] = useState(false)

    useEffect(() => {
        if (!ref.current) return
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting)
        }, options)
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [ref, options])

    return isIntersecting
}

// Debounce Hook
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}

// Local Storage Hook
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch {
            return initialValue
        }
    })

    const setValue = useCallback((value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore))
            }
        } catch (error) {
            console.error(error)
        }
    }, [key, storedValue])

    return [storedValue, setValue] as const
}