// src/components/shared/ContactForm.tsx
"use client";

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';
import { Send, MessageCircle } from 'lucide-react';

interface ContactFormProps {
    title?: string;
    description?: string;
    showTrustBadge?: boolean;
    variant?: 'services' | 'contact';
    containerClassName?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
                                                            title = "Ready to Transform Your Business?",
                                                            description = "Let's discuss how our technology solutions can accelerate your growth and streamline your operations.",
                                                            showTrustBadge = true,
                                                            variant = 'services',
                                                            containerClassName = '',
                                                        }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [captcha, setCaptcha] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccess(false);

        const data = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            token: captcha,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });

            setIsSubmitting(false);

            if (res.ok) {
                toast.success('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
                setCaptcha(null);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 5000);
            } else {
                toast.error('Failed to send message. Please try again.');
            }
        } catch (error) {
            setIsSubmitting(false);
            console.error('Network error:', error);
            toast.error('Network error. Please try again later.');
        }
    };

    const isFormValid = formData.name.trim() &&
        formData.email.trim() &&
        formData.message.trim() &&
        captcha;

    // Variant-specific styles
    const containerStyles = variant === 'services'
        ? "max-w-6xl mx-auto mt-16 sm:mt-20 lg:mt-24 text-center bg-zinc-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-zinc-800"
        : "bg-zinc-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl border border-zinc-800";

    return (
        <section
            id="contact"
            className={containerClassName || containerStyles}
            role="region"
            aria-labelledby="contact-heading"
        >
            <h2
                id="contact-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
            >
                {title}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed max-w-4xl mx-auto">
                {description}
            </p>

            {showTrustBadge && (
                <p className="text-sm text-gray-400 mb-6 sm:mb-8 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    We typically respond within 24 hours
                </p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:gap-6 text-left max-w-2xl mx-auto">
                <div>
                    <label htmlFor="contact-name" className="sr-only">
                        Your Name
                    </label>
                    <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-sm sm:text-base"
                        disabled={isSubmitting}
                        autoComplete="name"
                    />
                </div>

                <div>
                    <label htmlFor="contact-email" className="sr-only">
                        Your Email
                    </label>
                    <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-sm sm:text-base"
                        disabled={isSubmitting}
                        autoComplete="email"
                    />
                </div>

                <div>
                    <label htmlFor="contact-message" className="sr-only">
                        Your Message
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        placeholder="Tell us about your project..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all resize-vertical text-sm sm:text-base"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="pt-2 flex justify-center">
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                        theme="dark"
                        onChange={(token) => setCaptcha(token)}
                        onExpired={() => setCaptcha(null)}
                        onError={() => {
                            setCaptcha(null);
                            toast.error('reCAPTCHA error. Please try again.');
                        }}
                    />
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isFormValid}
                    className="bg-white text-black px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Send Message
                        </>
                    )}
                </button>

                {success && (
                    <div className="text-center p-4 bg-green-900/20 border border-green-700/50 rounded-xl">
                        <p className="text-green-400 font-medium">
                            Message sent successfully! We&apos;ll get back to you soon.
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-sm sm:text-base">
                <a
                    href="mailto:info@smartkode.io"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800/30"
                    aria-label="Send us an email"
                >
                    <MessageCircle className="w-5 h-5" />
                    Email Us
                </a>
                <a
                    href="https://wa.me/+923004479894"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800/30"
                    aria-label="Chat with us on WhatsApp"
                >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                </a>
            </div>
        </section>
    );
};