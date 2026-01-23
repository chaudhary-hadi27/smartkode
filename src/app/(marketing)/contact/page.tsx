// src/app/(marketing)/contact/page.tsx
"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin, Zap } from "lucide-react";
import { ContactForm } from "@/components/shared/ContactForm";
import { Toaster } from "react-hot-toast";

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

export default function ContactPage() {
    return (
        <>
            <Toaster position="top-right" />

            <Head>
                <title>Contact Us | SmartKode - Get in Touch</title>
                <meta
                    name="description"
                    content="Contact SmartKode for AI solutions, web development, and technology services. We're here to help transform your business."
                />
            </Head>

            <div className="bg-black text-white min-h-screen">
                <div className="px-4 sm:px-6 lg:px-8 xl:px-16 py-12 sm:py-16 lg:py-20">

                    {/* Hero Section */}
                    <motion.header
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 sm:mb-20 lg:mb-24 max-w-6xl mx-auto"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 sm:mb-8 leading-tight tracking-tight">
                            Get In Touch
                        </h1>
                        <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto px-4">
                            Ready to transform your business with cutting-edge technology? Let&apos;s
                            discuss your project and explore how we can help you achieve your goals.
                        </p>
                    </motion.header>

                    {/* Main Content Grid */}
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24">

                        {/* Left Side - Contact Info */}
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={fadeIn}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-8 lg:space-y-12"
                        >
                            <div className="space-y-6">
                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center mr-6 text-white shadow-xl border border-zinc-700/50">
                                        <MessageCircle className="w-8 h-8" />
                                    </div>
                                </div>

                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
                                    Let&apos;s Build Something Amazing Together
                                </h2>

                                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                                    Have questions about AI solutions or want to start a project with us?
                                    Drop us a message and we&apos;ll get back to you within 24 hours.
                                </p>
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-900/30 transition-colors duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-zinc-600/50">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Email Us</h3>
                                        <a
                                            href="mailto:info@smartkode.io"
                                            className="text-gray-300 hover:text-white transition-colors duration-200"
                                        >
                                            info@smartkode.io
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-900/30 transition-colors duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-zinc-600/50">
                                        <MessageCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">WhatsApp</h3>
                                        <a
                                            href="https://wa.me/+923259299969"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-300 hover:text-white transition-colors duration-200"
                                        >
                                            +92 325 9299969
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-900/30 transition-colors duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-zinc-600/50">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Location</h3>
                                        <p className="text-gray-300">Lahore, Pakistan</p>
                                    </div>
                                </div>
                            </div>

                            {/*/!* Social Links *!/*/}
                            {/*<div className="pt-6">*/}
                            {/*    <h3 className="text-white font-semibold mb-4">Connect With Us</h3>*/}
                            {/*    <div className="flex gap-4">*/}
                            {/*        <a*/}
                            {/*            href="https://www.linkedin.com/in/chaudharyhadi-ai-engineer/"*/}
                            {/*            target="_blank"*/}
                            {/*            rel="noopener noreferrer"*/}
                            {/*            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"*/}
                            {/*        >*/}
                            {/*            LinkedIn*/}
                            {/*        </a>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </motion.div>

                        {/* Right Side - Contact Form */}
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={fadeIn}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <ContactForm
                                title="Send Us a Message"
                                description=""
                                variant="contact"
                                showTrustBadge={true}
                                containerClassName="bg-zinc-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl border border-zinc-800"
                            />
                        </motion.div>
                    </div>

                    {/* CTA Section */}
                    <motion.section
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        transition={{ duration: 0.6 }}
                        className="max-w-6xl mx-auto mt-20 sm:mt-24 lg:mt-32 text-center"
                        role="region"
                        aria-labelledby="cta-heading"
                    >
                        <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-zinc-800">
                            <h2
                                id="cta-heading"
                                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight"
                            >
                                Ready to Start Your Project?
                            </h2>
                            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
                                Join hundreds of satisfied clients who have transformed their businesses
                                with our AI and technology solutions. Let&apos;s accelerate your growth together.
                            </p>

                            <p className="text-sm text-gray-400 mb-6 sm:mb-8 flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                Trusted by businesses worldwide
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="https://wa.me/+923259299969"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-gradient-to-r from-white to-gray-100 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
                                >
                                    <Zap className="w-5 h-5 mr-2" />
                                    Kickstart My Project
                                    <div className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </a>

                                <a
                                    href="mailto:info@smartkode.io"
                                    className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center"
                                >
                                    <Mail className="w-5 h-5 mr-2" />
                                    Email Discussion
                                </a>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </div>
        </>
    );
}