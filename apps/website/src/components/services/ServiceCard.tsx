// src/components/services/ServiceCard.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { ServiceCard as ServiceCardType } from '@/data/services/servicesData';

// Type declaration for gtag
declare global {
    interface Window {
        gtag?: (
            command: 'event',
            eventName: string,
            parameters?: Record<string, unknown>
        ) => void;
    }
}

interface ServiceCardProps {
    service: ServiceCardType;
    index: number;
    isVisible: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isVisible }) => {
    const router = useRouter();
    const Icon = service.icon;

    const handleNavigate = () => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'service_interest', {
                service_name: service.title,
                service_id: service.id,
            });
        }
        router.push(service.route);
    };

    return (
        <section
            id={`service-${index}`}
            data-animate
            className={`flex flex-col ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20 mb-20 sm:mb-24 lg:mb-32`}
            role="region"
            aria-labelledby={`${service.id}-heading`}
        >
            {/* Image Container */}
            <div
                className={`w-full lg:w-1/2 transition-all duration-700 ease-out ${
                    isVisible
                        ? 'opacity-100 translate-x-0'
                        : `opacity-0 ${
                            index % 2 !== 0
                                ? 'translate-x-8 lg:translate-x-12'
                                : '-translate-x-8 lg:-translate-x-12'
                        }`
                }`}
            >
                <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/20 via-transparent to-black/40 z-10 pointer-events-none" />
                    <Image
                        src={service.image}
                        alt={`${service.title} - Professional ${service.title.toLowerCase()} services`}
                        width={600}
                        height={400}
                        className={`w-full transition-all duration-700 group-hover:scale-105 ${
                            service.id === 'ai' ||
                            service.id === 'automation' ||
                            service.id === 'data' ||
                            service.id === 'uiux'
                                ? 'h-48 sm:h-64 md:h-80 lg:h-[420px] xl:h-[480px] object-cover'
                                : 'h-56 sm:h-72 md:h-88 lg:h-[450px] xl:h-[500px] object-cover'
                        }`}
                        loading={index < 2 ? 'eager' : 'lazy'}
                        style={{
                            objectPosition:
                                service.id === 'ai'
                                    ? 'center 20%'
                                    : service.id === 'automation'
                                        ? 'center 70%'
                                        : service.id === 'data'
                                            ? 'center 30%'
                                            : service.id === 'uiux'
                                                ? 'center 25%'
                                                : 'center center',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />
                </div>
            </div>

            {/* Content */}
            <div
                className={`w-full lg:w-1/2 transition-all duration-700 delay-200 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
                <div className="flex items-center mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center mr-6 text-white shadow-xl border border-zinc-700/50">
                        <Icon className="w-8 h-8 sm:w-9 sm:h-9" />
                    </div>
                </div>

                <h2
                    id={`${service.id}-heading`}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight tracking-tight"
                >
                    {service.title}
                </h2>

                <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed">
                    {service.description}
                </p>

                <ul className="space-y-4 mb-8 sm:mb-10" role="list">
                    {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-gray-300">
                            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 border border-zinc-600/50">
                                <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                            <span className="text-sm sm:text-base md:text-lg leading-relaxed">{feature}</span>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    onClick={handleNavigate}
                    className="group bg-gradient-to-r from-white to-gray-100 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    aria-label={`Learn more about ${service.title}`}
                >
                    Learn More
                    <div className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path
                                fillRule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </section>
    );
};