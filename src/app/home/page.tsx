"use client";

import { useEffect, useState } from "react";
import Navbar from "./Header/page";
import Hero from "./Hero/page";
import ServicesSection from "./Services/page";
import TrustedCompanies from "./TrustedCompanies/page";
import ApproachSection from "./Approach/page";
import TestimonialsSection from "./Testimonials/page";
import FAQSection from "./FAQ/page";
import Footer from "./Footer/page";

export default function MainPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleBlurClick = () => {
    setSidebarOpen(false);
    document.body.classList.remove("sidebar-open");
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleBlurClick();
      }
    };

    window.addEventListener("keydown", handleEscape);

    // Only apply MutationObserver on large screen
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    let observer: MutationObserver | null = null;

    if (mediaQuery.matches) {
      observer = new MutationObserver(() => {
        const isOpen = document.body.classList.contains("sidebar-open");
        setSidebarOpen(isOpen);
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
      {/* Blur overlay for mobile only */}
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
        <Hero />
        <ServicesSection />
        <TrustedCompanies />
        <ApproachSection />
        <TestimonialsSection />
        <FAQSection />
        <Footer />
      </main>
    </div>
  );
}
