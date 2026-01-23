// src/components/about/AboutPageTemplate.tsx
"use client";

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { AboutPageData } from '@/data/about/aboutData';

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

interface AboutPageTemplateProps {
    data: AboutPageData;
}

export const AboutPageTemplate: React.FC<AboutPageTemplateProps> = ({ data }) => {
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
                        <motion.h2
                            variants={fadeIn}
                            className="text-3xl font-bold mb-6 text-gray-300"
                        >
                            {data.subtitle}
                        </motion.h2>
                    )}
                    <motion.p
                        variants={fadeIn}
                        className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto"
                    >
                        {data.heroDescription}
                    </motion.p>

                    {/* Founder Section - Only for main about page */}
                    {data.founder && (
                        <motion.div
                            variants={fadeIn}
                            className="mt-10 flex flex-col items-center"
                        >
                            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-4">
                                <Image
                                    src={data.founder.image}
                                    alt={`${data.founder.name} – ${data.founder.role}`}
                                    width={256}
                                    height={256}
                                    className="w-full h-full object-cover object-bottom scale-125 transition-transform duration-500 hover:scale-150"
                                    priority
                                />
                            </div>
                            <h3 className="text-xl font-semibold">{data.founder.name}</h3>
                            <p className="text-gray-400 text-sm">{data.founder.role}</p>
                            <p className="text-gray-500 text-sm mt-2 max-w-md">
                                {data.founder.description}
                            </p>
                        </motion.div>
                    )}
                </motion.section>

                {/* Main Sections */}
                <motion.section
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInStagger}
                    className="px-6 md:px-16 py-20 max-w-5xl mx-auto border-t border-gray-800 space-y-16"
                >
                    {data.sections.map((section, index) => {
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

                {/* Features Grid (if exists) */}
                {data.features && data.features.length > 0 && (
                    <motion.section
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInStagger}
                        className="px-6 md:px-16 py-20 max-w-6xl mx-auto border-t border-gray-800"
                    >
                        <h3 className="text-2xl font-bold mb-10 text-center">
                            {data.title === 'Our Mission' ? 'How We Think' : 'Our Core Principles'}
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 text-gray-400 text-sm leading-relaxed">
                            {data.features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className="bg-[#111] p-6 rounded-xl border border-gray-800 shadow-md hover:shadow-xl transition"
                                >
                                    <h4 className="text-white font-semibold text-lg mb-2">
                                        {feature.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* CTA Section (if exists) */}
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