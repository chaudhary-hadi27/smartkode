// src/components/services/ServicesHero.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

export const ServicesHero: React.FC = () => {
    return (
        <motion.header
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={fadeIn.transition}
            className="text-center mb-16 sm:mb-20 lg:mb-24 max-w-6xl mx-auto"
        >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 sm:mb-8 leading-tight tracking-tight">
                Enterprise Technology Services
            </h1>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto px-4">
                We build intelligent systems that transform businesses. From AI
                development to cloud infrastructure — we deliver scalable, secure,
                and future-ready solutions.
            </p>
        </motion.header>
    );
};