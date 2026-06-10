// src/components/home/HomeTestimonials.tsx
"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Play, Pause, Building, TrendingUp, MapPin, Briefcase, Quote } from 'lucide-react';
import type { Testimonial } from '@/data/home/homeData';

interface HomeTestimonialsProps {
    testimonials: Testimonial[];
}

export const HomeTestimonials: React.FC<HomeTestimonialsProps> = ({ testimonials }) => {
    const [current, setCurrent] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.1, rootMargin: '50px' });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrent((prev) => (prev + 1) % testimonials.length);
            }, isMobile ? 8000 : 6000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isPlaying, testimonials.length, isMobile]);

    const next = useCallback(() => setCurrent((prev) => (prev + 1) % testimonials.length), [testimonials.length]);
    const prev = useCallback(() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length), [testimonials.length]);
    const togglePlay = useCallback(() => setIsPlaying(p => !p), []);
    const goTo = useCallback((index: number) => setCurrent(index), []);

    const data = testimonials[current];

    return (
        <section ref={sectionRef} className="relative py-16 md:py-20 lg:py-24 xl:py-28 bg-black overflow-hidden">
            <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-block mb-4">
            <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wider uppercase border border-gray-700">
              Client Success Stories
            </span>
                    </div>
                    <h2 className={`font-black mb-4 tracking-tight leading-tight ${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl'}`}>
                        <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">What Our</span>
                        <br />
                        <span className="text-gray-700 font-black">CLIENTS SAY</span>
                    </h2>
                    <p className={`text-gray-400 max-w-3xl mx-auto leading-relaxed ${isMobile ? 'text-base px-4' : 'text-lg'}`}>
                        See how SmartKode has transformed businesses across industries with cutting-edge AI, web development, and data solutions.
                    </p>
                </div>

                {/* Testimonial Card */}
                <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Mobile & Medium Screens */}
                    <div className={`max-w-5xl mx-auto ${isMobile ? 'block lg:hidden' : 'hidden'}`}>
                        <div className="bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-800 relative shadow-2xl mx-2 sm:mx-0">
                            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 opacity-5">
                                <Quote className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white" />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <Image src={data.image} alt={data.name} width={80} height={80} className="w-16 h-16 md:w-20 md:h-20 rounded-full border-3 border-gray-700 object-cover" loading="lazy" />
                                        <div className="absolute -bottom-1 -right-1 bg-gray-700 text-white p-1.5 rounded-full">
                                            <Building className="w-3 h-3" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{data.name}</h3>
                                        <p className="text-gray-400 font-semibold text-sm md:text-base">{data.role}</p>
                                        <p className="text-gray-500 text-sm md:text-base">{data.company}</p>
                                    </div>
                                </div>

                                <div className="text-center md:text-right">
                                    <div className="flex justify-center md:justify-end mb-3">
                                        {Array.from({ length: data.rating }, (_, i) => (
                                            <Star key={i} className="w-5 h-5 text-white fill-current mr-1" />
                                        ))}
                                    </div>
                                    <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold border border-gray-700">{data.highlight}</span>
                                </div>
                            </div>

                            <blockquote className="text-white text-base sm:text-lg md:text-xl leading-relaxed font-medium mb-6 sm:mb-8 relative z-10 break-words">
                                &quot;{data.content}&quot;
                            </blockquote>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                                {[
                                    { icon: Briefcase, label: 'Project', value: data.project },
                                    { icon: TrendingUp, label: 'Result', value: data.result },
                                    { icon: MapPin, label: 'Location', value: data.location.split(',')[0] }
                                ].map((item, i) => (
                                    <div key={i} className="bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-700">
                                        <div className="flex items-center text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
                                            <item.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                                            {item.label}
                                        </div>
                                        <div className="text-white font-semibold text-sm sm:text-base leading-tight">{item.value}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="flex space-x-2">
                                    {testimonials.map((_, i) => (
                                        <button key={i} onClick={() => goTo(i)} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === current ? 'bg-white' : 'bg-gray-700 hover:bg-gray-600'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Large Screens */}
                    <div className={`max-w-5xl mx-auto ${isMobile ? 'hidden' : 'hidden lg:block'}`}>
                        <div className="gap-8 lg:gap-10 items-start grid lg:grid-cols-5">

                            <div className="order-2 lg:order-1 lg:col-span-2">
                                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-800 text-center lg:sticky lg:top-8">
                                    <div className="relative mb-6">
                                        <Image src={data.image} alt={data.name} width={96} height={96} className="w-20 h-20 lg:w-24 lg:h-24 rounded-full mx-auto border-4 border-gray-800 object-cover" loading="lazy" />
                                        <div className="absolute -bottom-1 -right-1 bg-white text-black p-1.5 rounded-full">
                                            <Building className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">{data.name}</h3>
                                    <p className="text-gray-400 font-semibold mb-1 text-sm">{data.role}</p>
                                    <p className="text-gray-500 mb-4 text-sm">{data.company}</p>
                                    <div className="flex justify-center mb-4">
                                        {Array.from({ length: data.rating }, (_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            { icon: Briefcase, label: 'Industry', value: data.industry },
                                            { icon: MapPin, label: 'Location', value: data.location },
                                            { icon: TrendingUp, label: 'Result', value: data.result }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-gray-700 rounded-lg p-3">
                                                <div className="text-gray-400 text-xs mb-1 flex items-center justify-center">
                                                    <item.icon className="w-3 h-3 mr-1" />
                                                    {item.label}
                                                </div>
                                                <div className="text-white font-semibold text-sm">{item.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="order-1 lg:order-2 lg:col-span-3">
                                <div className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-800 relative">
                                    <div className="mb-6 pt-8">
                                        <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-bold">{data.highlight}</span>
                                    </div>
                                    <blockquote className="text-white leading-relaxed font-medium mb-6 relative z-10 text-lg lg:text-xl">
                                        &quot;{data.content}&quot;
                                    </blockquote>
                                    <div className="mb-6">
                                        <h4 className="font-bold text-white mb-2 text-lg">Project: {data.project}</h4>
                                        <div className="flex items-center text-gray-400">
                                            <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span>Result: {data.result}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center space-x-3">
                                            {[
                                                { onClick: prev, icon: ChevronLeft, label: 'Previous' },
                                                { onClick: togglePlay, icon: isPlaying ? Pause : Play, label: isPlaying ? 'Pause' : 'Play' },
                                                { onClick: next, icon: ChevronRight, label: 'Next' }
                                            ].map((btn, i) => (
                                                <button key={i} onClick={btn.onClick} className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors duration-300" aria-label={btn.label} type="button">
                                                    <btn.icon className="w-5 h-5 text-white" />
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex space-x-2">
                                            {testimonials.map((_, i) => (
                                                <button key={i} onClick={() => goTo(i)} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === current ? 'bg-white' : 'bg-gray-700 hover:bg-gray-600'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};