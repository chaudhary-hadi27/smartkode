// src/components/home/HomeApproach.tsx
"use client";

import React from 'react';
import type { ApproachStep } from '@/data/home/homeData';

interface HomeApproachProps {
    steps: ApproachStep[];
}

export const HomeApproach: React.FC<HomeApproachProps> = ({ steps }) => {
    return (
        <section
            className="bg-black text-white py-16 px-4 sm:px-6 md:px-12 lg:px-20"
            aria-labelledby="approach-heading"
        >
            <div className="max-w-7xl mx-auto text-center">
                <h2 id="approach-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                    How We Solve Problems — The SmartKode Way
                </h2>
                <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-16">
                    Our method is structured, focused, and built to deliver practical solutions — whether it&apos;s a product or a service.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 place-items-center text-center">
                    {steps.map(({ id, step, heading, description, icon: Icon }, index) => {
                        const isLastOdd = steps.length % 2 === 1 && index === steps.length - 1;

                        return (
                            <div
                                key={id}
                                className={`flex flex-col items-center text-center px-2 ${
                                    isLastOdd ? 'col-span-2 justify-self-center sm:col-span-1' : ''
                                }`}
                            >
                                <div className="mb-3" aria-hidden="true">
                                    <Icon className="w-10 h-10 text-gray-500" />
                                </div>

                                <span className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                  {step}
                </span>

                                <h3 className="text-base font-semibold mb-1">{heading}</h3>

                                <p className="text-gray-500 text-sm leading-relaxed max-w-xs break-words">
                                    {description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};