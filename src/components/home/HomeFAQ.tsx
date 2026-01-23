// src/components/home/HomeFAQ.tsx
"use client";

import React, { useState, useCallback } from "react";
import type { FAQ } from '@/data/home/homeData';

interface HomeFAQProps {
    faqs: FAQ[];
}

interface FAQCardProps {
    faq: FAQ;
    isOpen: boolean;
    onToggle: () => void;
}

const FAQCard: React.FC<FAQCardProps> = ({ faq, isOpen, onToggle }) => {
    const Icon = faq.icon;

    return (
        <div className="overflow-hidden">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className={`w-full flex items-center justify-between p-5 text-left transition 
          ${isOpen ? "bg-gray-800" : "bg-black"}`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${isOpen ? "bg-white" : "bg-gray-800"}`}>
                        <Icon className={`w-5 h-5 ${isOpen ? "text-black" : "text-white"}`} />
                    </div>
                    <span
                        className={`text-lg sm:text-xl font-medium ${
                            isOpen ? "text-gray-300" : "text-white"
                        }`}
                    >
            {faq.question}
          </span>
                </div>
                <span className="text-xl text-white">{isOpen ? "−" : "+"}</span>
            </button>

            <div
                className={`transition-all duration-300 px-6 overflow-hidden ${
                    isOpen ? "py-4 max-h-[1000px]" : "max-h-0 py-0"
                }`}
            >
                <p className="text-gray-400 text-base leading-relaxed">{faq.answer}</p>
            </div>

            <hr className="border-gray-700 my-2" />
        </div>
    );
};

export const HomeFAQ: React.FC<HomeFAQProps> = ({ faqs }) => {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFAQ = useCallback((id: number) => {
        setOpenId((prev) => (prev === id ? null : id));
    }, []);

    return (
        <section className="bg-black text-white py-16 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-2">
                    {faqs.map((faq) => (
                        <FAQCard
                            key={faq.id}
                            faq={faq}
                            isOpen={openId === faq.id}
                            onToggle={() => toggleFAQ(faq.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};