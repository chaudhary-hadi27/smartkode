"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const WhyChooseSmartKode = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const companies = [
    { name: "Microsoft", industry: "Technology", logo: "https://img.icons8.com/color/48/microsoft.png" },
    { name: "Google", industry: "Technology", logo: "https://img.icons8.com/color/48/google-logo.png" },
    { name: "Amazon", industry: "E-Commerce", logo: "https://img.icons8.com/color/48/amazon.png" },
    { name: "Meta", industry: "Social Media", logo: "https://img.icons8.com/color/48/meta.png" },
    { name: "Apple", industry: "Technology", logo: "https://img.icons8.com/color/48/mac-os.png" },
    { name: "Netflix", industry: "Streaming", logo: "https://img.icons8.com/color/48/netflix.png" },
    { name: "Spotify", industry: "Music", logo: "https://img.icons8.com/color/48/spotify.png" },
    { name: "Uber", industry: "Transportation", logo: "https://img.icons8.com/color/48/uber.png" },
    { name: "Airbnb", industry: "Hospitality", logo: "https://img.icons8.com/color/48/airbnb.png" },
    { name: "Tesla", industry: "Automotive", logo: "https://img.icons8.com/color/48/tesla-model-s.png" },
    { name: "Shopify", industry: "E-Commerce", logo: "https://img.icons8.com/color/48/shopify.png" },
    { name: "Slack", industry: "Communication", logo: "https://img.icons8.com/color/48/slack-new.png" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black py-16 sm:py-20 lg:py-24 overflow-hidden"
      role="region"
      aria-label="Why Choose SmartKode"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4 sm:mb-6">
            <span className="bg-gray-800 text-white px-6 sm:px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase border border-gray-700">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 tracking-tight leading-none">
            <span className="text-white">Why Choose</span>
            <br />
            <span className="text-gray-700 font-black">SMARTKODE</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            We don&apos;t just deliver solutions; we deliver success. Here&apos;s what sets us apart from the competition.
          </p>
        </div>

        {/* Trusted Companies Section */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Trusted by Global Leaders
            </h3>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Join the ranks of successful companies who have transformed their business with innovative solutions
            </p>
          </div>

          {/* Moving Companies Carousel */}
          <div className="relative overflow-hidden">
            {/* First Row - Moving Right */}
            <div className="mb-6 overflow-hidden">
              <div 
                className="flex space-x-6 animate-scroll-right"
                style={{ width: 'fit-content' }}
              >
                {[...companies, ...companies].map((company, index) => (
                  <div key={`row1-${index}`} className="flex-shrink-0 group">
                    <div className="w-48 sm:w-56 p-4 sm:p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center mr-3 overflow-hidden relative">
                          <Image 
                            src={company.logo} 
                            alt={`${company.name} logo`}
                            width={40}
                            height={40}
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                            onError={(e) => {
                              // Fallback to initials if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.parentNode?.querySelector('.fallback');
                              if (fallback) {
                                (fallback as HTMLElement).style.display = 'flex';
                              }
                            }}
                          />
                          <div className="fallback hidden absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-bold items-center justify-center">
                            {company.name.substring(0, 2).toUpperCase()}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-bold text-sm sm:text-base truncate">{company.name}</h4>
                          <p className="text-gray-400 text-xs sm:text-sm">{company.industry}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row - Moving Left */}
            <div className="overflow-hidden">
              <div 
                className="flex space-x-6 animate-scroll-left"
                style={{ width: 'fit-content' }}
              >
                {[...companies.slice().reverse(), ...companies.slice().reverse()].map((company, index) => (
                  <div key={`row2-${index}`} className="flex-shrink-0 group">
                    <div className="w-48 sm:w-56 p-4 sm:p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center mr-3 overflow-hidden relative">
                          <Image 
                            src={company.logo} 
                            alt={`${company.name} logo`}
                            width={40}
                            height={40}
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                            onError={(e) => {
                              // Fallback to initials if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.parentNode?.querySelector('.fallback');
                              if (fallback) {
                                (fallback as HTMLElement).style.display = 'flex';
                              }
                            }}
                          />
                          <div className="fallback hidden absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-bold items-center justify-center">
                            {company.name.substring(0, 2).toUpperCase()}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-bold text-sm sm:text-base truncate">{company.name}</h4>
                          <p className="text-gray-400 text-xs sm:text-sm">{company.industry}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fade edges */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes scroll-left {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-right,
          .animate-scroll-left {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseSmartKode;