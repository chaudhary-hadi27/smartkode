// src/components/home/HomeHero.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface HomeHeroProps {
    rotatingTexts: string[];
}

export const HomeHero: React.FC<HomeHeroProps> = ({ rotatingTexts }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentText, setCurrentText] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [rotatingTexts.length]);

    const handleExploreClick = (): void => {
        const target = document.getElementById("explore");
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center pt-40 sm:pt-40">
            {/* Neural Network Nodes */}
            <div className="absolute inset-0 hidden sm:block">
                {Array.from({ length: 25 }).map((_, i) => (
                    <div
                        key={`main-node-${i}`}
                        className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                        style={{
                            left: `${10 + (i % 5) * 20}%`,
                            top: `${20 + Math.floor(i / 5) * 15}%`,
                            animationDelay: `${i * 0.4}s`,
                            animationDuration: "4s",
                        }}
                    />
                ))}

                {/* Accent Corner Nodes */}
                <div className="absolute top-10 left-10 w-3 h-3 bg-gray-800 rounded-full animate-pulse" />
                <div className="absolute top-10 right-10 w-3 h-3 bg-gray-800 rounded-full animate-pulse delay-[1000ms]" />
                <div className="absolute bottom-10 left-10 w-3 h-3 bg-gray-800 rounded-full animate-pulse delay-[500ms]" />
                <div className="absolute bottom-10 right-10 w-3 h-3 bg-gray-800 rounded-full animate-pulse delay-[1500ms]" />
            </div>

            {/* Particle Effect */}
            <div className="absolute inset-0">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-60"
                        style={{
                            left: `${15 + i * 10}%`,
                            top: `${30 + (i % 3) * 20}%`,
                            animation: "particleFlow 6s infinite linear",
                            animationDelay: `${i * 0.8}s`,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
                <div
                    className={`transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    }`}
                >
                    {/* Tagline */}
                    <div className="mb-6 sm:mb-8">
                        <div className="inline-flex items-center space-x-2 bg-gray-800/60 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 border border-gray-800">
                            <Sparkles className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300 text-sm font-medium">
                Powered by Advanced AI
              </span>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-thin text-white mb-6 leading-tight tracking-tight">
                        Artificial
                        <br />
                        <span className="font-light text-gray-200">Intelligence</span>
                    </h1>

                    {/* Rotating Subheading */}
                    <div className="min-h-[3rem] sm:min-h-[4rem] mb-6 sm:mb-8 flex items-center justify-center">
                        <p className="text-lg sm:text-2xl md:text-3xl text-gray-400 font-light transition-all duration-700">
                            {rotatingTexts[currentText]}
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                        We build AI systems that understand, learn, and adapt. From
                        computer vision to intelligent automation, our technology
                        transforms how businesses operate.
                    </p>

                    {/* CTA Button */}
                    <div className="mb-12 sm:mb-16">
                        <button
                            onClick={handleExploreClick}
                            className="group bg-white text-black px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto"
                            aria-label="Explore More"
                        >
                            <span>Explore More</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Particle Animation */}
            <style jsx>{`
        @keyframes particleFlow {
          0% {
            opacity: 0.2;
            transform: translateX(-20px) translateY(0px);
          }
          50% {
            opacity: 0.8;
            transform: translateX(20px) translateY(-10px);
          }
          100% {
            opacity: 0.2;
            transform: translateX(60px) translateY(0px);
          }
        }
      `}</style>
        </section>
    );
};