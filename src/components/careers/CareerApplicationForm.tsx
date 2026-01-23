// src/components/careers/CareerApplicationForm.tsx
"use client";

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';

export const CareerApplicationForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [captcha, setCaptcha] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        position: '',
        experience: '',
        portfolio: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccess(false);

        const data = {
            ...formData,
            token: captcha,
        };

        try {
            const res = await fetch('/api/careers', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });

            setIsSubmitting(false);

            if (res.ok) {
                toast.success('Application submitted successfully!');
                setFormData({
                    fullName: '',
                    email: '',
                    position: '',
                    experience: '',
                    portfolio: '',
                    message: '',
                });
                setCaptcha(null);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 5000);
            } else {
                toast.error('Failed to submit application. Please try again.');
            }
        } catch (error) {
            setIsSubmitting(false);
            console.error('Network error:', error);
            toast.error('Network error. Please try again later.');
        }
    };

    const isFormValid =
        formData.fullName.trim() &&
        formData.email.trim() &&
        formData.position.trim() &&
        formData.portfolio.trim() &&
        captcha;

    return (
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-2xl border border-zinc-800">
            <h2 className="text-2xl font-bold mb-6">Application Form</h2>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                        Full Name *
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all"
                        placeholder="Your full name"
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all"
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="position" className="block text-sm font-medium mb-2">
                        Position *
                    </label>
                    <select
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all"
                        disabled={isSubmitting}
                        required
                    >
                        <option value="">Select position</option>
                        <option value="Senior AI Engineer">Senior AI Engineer</option>
                        <option value="Full-Stack Developer">Full-Stack Developer</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                        <option value="Product Designer">Product Designer</option>
                        <option value="AI Engineering Intern">AI Engineering Intern</option>
                        <option value="Other">Other / General Application</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="experience" className="block text-sm font-medium mb-2">
                        Years of Experience
                    </label>
                    <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all"
                        disabled={isSubmitting}
                    >
                        <option value="">Select experience</option>
                        <option value="0-1">0-1 year</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5+">5+ years</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium mb-2">
                        Portfolio / GitHub / LinkedIn *
                    </label>
                    <input
                        id="portfolio"
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all"
                        placeholder="https://github.com/yourname"
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Cover Letter / Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all resize-vertical"
                        placeholder="Tell us why you're a great fit..."
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
                    className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Submit Application
                        </>
                    )}
                </button>

                {success && (
                    <div className="text-center p-4 bg-green-900/20 border border-green-700/50 rounded-xl">
                        <p className="text-green-400 font-medium">
                            Application submitted successfully! We'll review and respond within 3-5 business days.
                        </p>
                    </div>
                )}
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
                Questions? Email us at <a href="mailto:careers@smartkode.io" className="text-gray-400 hover:text-white">careers@smartkode.io</a>
            </p>
        </div>
    );
};