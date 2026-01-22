'use client'
import { forwardRef } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Select Component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className, ...props }, ref) => (
        <div className="w-full">
        {label && <label className="text-sm font-medium text-foreground mb-2 block">{label}</label>}
            <div className="relative">
<select
    ref={ref}
className={cn(
    'w-full h-11 px-4 rounded-lg border bg-background-secondary text-foreground appearance-none cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-foreground',
    error ? 'border-error' : 'border-border hover:border-border-secondary',
    className
)}
{...props}
>
{options.map((opt) => (
    <option key={opt.value} value={opt.value}>
    {opt.label}
    </option>
))}
</select>
<ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-foreground-muted" />
    </div>
{error && <p className="text-sm text-error mt-1">{error}</p>}
    </div>
)
)
    Select.displayName = 'Select'

// Checkbox Component
    interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
        label?: string
    }

    export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
        ({ label, className, ...props }, ref) => (
            <label className="inline-flex items-center gap-3 cursor-pointer group">
            <div className="relative">
            <input
                ref={ref}
    type="checkbox"
    className="peer sr-only"
    {...props}
    />
    <div className="w-5 h-5 border-2 border-border rounded bg-background-secondary transition-all peer-checked:bg-foreground peer-checked:border-foreground peer-focus:ring-2 peer-focus:ring-foreground peer-focus:ring-offset-2 peer-focus:ring-offset-background" />
<Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-background opacity-0 peer-checked:opacity-100 transition-opacity" />
    </div>
    {label && <span className="text-sm text-foreground group-hover:text-foreground">{label}</span>}
        </label>
    )
    )
        Checkbox.displayName = 'Checkbox'

// Radio Component
        interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
            label?: string
        }

        export const Radio = forwardRef<HTMLInputElement, RadioProps>(
            ({ label, className, ...props }, ref) => (
                <label className="inline-flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                <input ref={ref} type="radio" className="peer sr-only" {...props} />
    <div className="w-5 h-5 border-2 border-border rounded-full bg-background-secondary transition-all peer-checked:border-foreground peer-focus:ring-2 peer-focus:ring-foreground peer-focus:ring-offset-2 peer-focus:ring-offset-background" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-foreground opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        {label && <span className="text-sm text-foreground">{label}</span>}
            </label>
        )
        )
            Radio.displayName = 'Radio'

// Switch Component
            interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
                label?: string
            }

            export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
                ({ label, className, ...props }, ref) => (
                    <label className="inline-flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                    <input ref={ref} type="checkbox" className="peer sr-only" {...props} />
        <div className="w-11 h-6 bg-background-tertiary border-2 border-border rounded-full transition-all peer-checked:bg-foreground peer-checked:border-foreground peer-focus:ring-2 peer-focus:ring-foreground peer-focus:ring-offset-2 peer-focus:ring-offset-background" />
        <div className="absolute top-1 left-1 w-4 h-4 bg-foreground-muted rounded-full transition-all peer-checked:translate-x-5 peer-checked:bg-background" />
            </div>
            {label && <span className="text-sm text-foreground">{label}</span>}
                </label>
            )
            )
                Switch.displayName = 'Switch'