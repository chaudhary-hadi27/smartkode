// src/components/careers/CareerPageTemplate.tsx
"use client";

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import type { CareerPageData } from '@/data/careers/careersData';

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const fadeInStagger = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.3,
        },
    },
};

interface CareerPageTemplateProps {
    data: CareerPageData;
    children?: React.ReactNode;
}

export const CareerPageTemplate: React.FC<CareerPageTemplateProps> = ({ data, children }) => {
    return (
        <>
            <Head>
                <title>{data.seo.title}</title>
                <meta name="description" content={data.seo.description} />
                <meta name="keywords" content={data.seo.keywords} />
            </Head>

            <div className="bg-black text-white font-sans">

                {/* Hero Section */}
                <motion.section
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInStagger}
                    className="px-6 md:px-16 py-24 text-center"
                >
                    <motion.h1
                        variants={fadeIn}
                        className="text-5xl font-extrabold mb-6 leading-tight tracking-tight"
                    >
                        {data.title}
                    </motion.h1>
                    {data.subtitle && (
                        <motion.p
                            variants={fadeIn}
                            className="text-2xl font-semibold mb-6 text-gray-300"
                        >
                            {data.subtitle}
                        </motion.p>
                    )}
                    <motion.p
                        variants={fadeIn}
                        className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto"
                    >
                        {data.heroDescription}
                    </motion.p>
                </motion.section>

                <div className="border-t border-gray-800 my-16 w-full max-w-5xl mx-auto" />

                {/* Main Sections */}
                {data.sections && data.sections.length > 0 && (
                    <motion.section
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInStagger}
                        className="px-6 md:px-16 py-20 max-w-5xl mx-auto space-y-16"
                    >
                        {data.sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <motion.div key={section.id} variants={fadeIn}>
                                    <h3 className="text-3xl font-semibold mb-4 flex items-center gap-2">
                                        <Icon className="text-white" aria-hidden="true" />
                                        {section.heading}
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        {section.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.section>
                )}

                {/* Benefits Grid */}
                {data.benefits && data.benefits.length > 0 && (
                    <motion.section
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInStagger}
                        className="px-6 md:px-16 py-20 max-w-6xl mx-auto border-t border-gray-800"
                    >
                        <h3 className="text-2xl font-bold mb-10 text-center">Benefits & Perks</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {data.benefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                        className="bg-[#111] p-6 rounded-xl border border-gray-800 shadow-md hover:shadow-xl transition"
                                    >
                                        <Icon className="w-8 h-8 mb-4 text-white/60" />
                                        <h4 className="text-white font-semibold text-lg mb-2">
                                            {benefit.title}
                                        </h4>
                                        <p className="text-gray-400 text-sm">{benefit.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.section>
                )}

                {/* Positions List */}
                {data.positions && data.positions.length > 0 && (
                    <motion.section
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInStagger}
                        className="px-6 md:px-16 py-20 max-w-6xl mx-auto"
                    >
                        <div className="space-y-6">
                            {data.positions.map((position, index) => (
                                <motion.div
                                    key={position.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className="bg-[#111] p-8 rounded-xl border border-gray-800 hover:border-gray-700 transition"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                        <div>
                                            <h4 className="text-2xl font-bold text-white mb-2">
                                                {position.title}
                                            </h4>
                                            <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                        <span className="px-3 py-1 bg-gray-800 rounded-full">
                          {position.department}
                        </span>
                                                <span className="px-3 py-1 bg-gray-800 rounded-full capitalize">
                          {position.type}
                        </span>
                                                <span className="px-3 py-1 bg-gray-800 rounded-full">
                          {position.location}
                        </span>
                                            </div>
                                        </div>
                                        <a
                                            href="/careers/apply"
                                            className="mt-4 md:mt-0 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition inline-block text-center"
                                        >
                                            Apply Now
                                        </a>
                                    </div>
                                    <p className="text-gray-300 mb-6">{position.description}</p>
                                    <div>
                                        <h5 className="font-semibold text-white mb-3">Requirements:</h5>
                                        <ul className="space-y-2">
                                            {position.requirements.map((req, idx) => (
                                                <li key={idx} className="flex items-start text-gray-400">
                                                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0" />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Custom Children Content (for apply page form) */}
                {children && (
                    <div className="px-6 md:px-16 py-20 max-w-4xl mx-auto">
                        {children}
                    </div>
                )}

                {/* CTA Section */}
                {data.cta && (
                    <motion.section
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInStagger}
                        className="px-6 md:px-16 py-24 text-center border-t border-gray-800"
                    >
                        <motion.h3
                            variants={fadeIn}
                            className="text-3xl font-bold mb-4"
                        >
                            {data.cta.title}
                        </motion.h3>
                        <motion.p
                            variants={fadeIn}
                            className="text-gray-300 text-lg max-w-2xl mx-auto mb-8"
                        >
                            {data.cta.description}
                        </motion.p>
                        <motion.a
                            variants={fadeIn}
                            href={data.cta.buttonLink}
                            className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
                        >
                            {data.cta.buttonText}
                        </motion.a>
                    </motion.section>
                )}
            </div>
        </>
    );
};