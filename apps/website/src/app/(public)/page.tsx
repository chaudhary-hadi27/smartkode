// src/app/(public)/page.tsx
"use client";

import { useState, useEffect } from "react";
import Navbar from "./Header/page";
import Footer from "./Footer/page";
import { HomeHero } from "@/components/home/HomeHero";
import ServicesSection from "./Services/page";
import { HomeTrustedCompanies } from "@/components/home/HomeTrustedCompanies";
import { HomeApproach } from "@/components/home/HomeApproach";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import {
    heroRotatingTexts,
    approachSteps,
    testimonials,
    faqs,
    trustedCompanies
} from "@/data/home/homeData";

export default function HomePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleBlurClick = () => {
        setSidebarOpen(false);
        document.body.classList.remove("sidebar-open");
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleBlurClick();
        };

        window.addEventListener("keydown", handleEscape);

        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        let observer: MutationObserver | null = null;

        if (mediaQuery.matches) {
            observer = new MutationObserver(() => {
                setSidebarOpen(document.body.classList.contains("sidebar-open"));
            });

            observer.observe(document.body, {
                attributes: true,
                attributeFilter: ["class"],
            });
        }

        return () => {
            window.removeEventListener("keydown", handleEscape);
            observer?.disconnect();
        };
    }, []);

    return (
        <div className="relative">
            {/* Mobile Blur Overlay */}
            {sidebarOpen && (
                <div
                    onClick={handleBlurClick}
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-all duration-300"
                />
            )}

            <main
                className={`min-h-screen bg-white transition-all duration-300 ease-in-out overflow-x-hidden ${
                    sidebarOpen ? "lg:ml-64" : "ml-0"
                }`}
            >
                <Navbar />
                <HomeHero rotatingTexts={heroRotatingTexts} />
                <ServicesSection />
                <HomeTrustedCompanies companies={trustedCompanies} />
                <HomeApproach steps={approachSteps} />
                <HomeTestimonials testimonials={testimonials} />
                <HomeFAQ faqs={faqs} />
                <Footer />
            </main>
        </div>
    );
}