// src/app/(marketing)/services/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { serviceCards } from '@/data/services/servicesData';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServicesHero } from '@/components/services/ServicesHero';
import { ContactForm } from '@/components/shared/ContactForm';

// Mobile breakpoint constant
const MOBILE_BREAKPOINT = 1024;

const ServicesPage: React.FC = () => {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Intersection observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => new Set(prev).add(entry.target.id));
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px 0px -50px 0px',
            }
        );

        const sections = document.querySelectorAll('[data-animate]');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    // SEO structured data
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Enterprise Technology Services',
        description:
            'We build intelligent systems that transform businesses. From AI development to cloud infrastructure — we deliver scalable, secure, and future-ready solutions.',
        serviceType: serviceCards.map((service) => service.title),
        areaServed: 'Worldwide',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Technology Services',
            itemListElement: serviceCards.map((service) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: service.title,
                    description: service.description,
                },
            })),
        },
    };

    return (
        <>
            <Toaster position="top-right" />

            {/* SEO Head */}
            <Head>
                <title>Enterprise Technology Services | SmartKode</title>
                <meta
                    name="description"
                    content="SmartKode provides enterprise technology services including AI development, web development, chatbots, automation, data analytics, digital marketing, DevOps, and UI/UX design."
                />
                <meta
                    name="keywords"
                    content="AI development, web development, chatbot development, automation services, data analytics, digital marketing, DevOps, UI/UX design, SmartKode"
                />
            </Head>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />

            <div className="bg-black text-white min-h-screen">
                <div className="px-4 sm:px-6 lg:px-8 xl:px-16 py-8 sm:py-12 lg:py-16">

                    {/* Hero Section */}
                    <ServicesHero />

                    {/* Services Grid */}
                    <main>
                        {serviceCards.map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={index}
                                isVisible={visibleSections.has(`service-${index}`)}
                            />
                        ))}
                    </main>

                    {/* Contact Form */}
                    <ContactForm />
                </div>
            </div>
        </>
    );
};

export default ServicesPage;