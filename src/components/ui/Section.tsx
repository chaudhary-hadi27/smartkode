import React, { forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Container } from './Container'

const sectionVariants = cva('w-full', {
    variants: {
        spacing: {
            none: 'py-0',
            sm: 'py-8 sm:py-12',
            md: 'py-12 sm:py-16 lg:py-20',
            lg: 'py-16 sm:py-20 lg:py-24',
            xl: 'py-20 sm:py-24 lg:py-32',
        },
        background: {
            transparent: 'bg-transparent',
            primary: 'bg-background',
            secondary: 'bg-background-secondary',
            tertiary: 'bg-background-tertiary',
        },
    },
    defaultVariants: {
        spacing: 'md',
        background: 'transparent',
    },
})

export interface SectionProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof sectionVariants> {
    containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    containerPadding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    withContainer?: boolean
}

const Section = forwardRef<HTMLElement, SectionProps>(
    (
        {
            className,
            spacing,
            background,
            containerSize = 'lg',
            containerPadding = 'md',
            withContainer = true,
            children,
            ...props
        },
        ref
    ) => {
        const content = withContainer ? (
            <Container size={containerSize} padding={containerPadding}>
                {children}
            </Container>
        ) : (
            children
        )

        return (
            <section
                ref={ref}
                className={cn(sectionVariants({ spacing, background }), className)}
                {...props}
            >
                {content}
            </section>
        )
    }
)

Section.displayName = 'Section'

const SectionHeader = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
    align?: 'left' | 'center' | 'right'
}
>(({ className, align = 'center', ...props }, ref) => {
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }

    return (
        <div
            ref={ref}
            className={cn(
                'mb-12 lg:mb-16',
                alignmentClasses[align],
                className
            )}
            {...props}
        />
    )
})

SectionHeader.displayName = 'SectionHeader'

const SectionBadge = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'inline-block mb-4 sm:mb-6',
            className
        )}
        {...props}
    >
    <span className="bg-background-tertiary text-foreground px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase border border-border">
      {props.children}
    </span>
    </div>
))

SectionBadge.displayName = 'SectionBadge'

const SectionTitle = forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
>(({ className, as: Component = 'h2', ...props }, ref) => (
    <Component
        ref={ref}
        className={cn(
            'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 tracking-tight leading-tight',
            className
        )}
        {...props}
    />
))

SectionTitle.displayName = 'SectionTitle'

const SectionDescription = forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn(
            'text-base sm:text-lg text-foreground-tertiary max-w-4xl mx-auto leading-relaxed',
            className
        )}
        {...props}
    />
))

SectionDescription.displayName = 'SectionDescription'

export {
    Section,
    SectionHeader,
    SectionBadge,
    SectionTitle,
    SectionDescription,
    sectionVariants,
}