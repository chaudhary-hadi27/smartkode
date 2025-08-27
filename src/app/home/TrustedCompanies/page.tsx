'use client';

import React, { useState, useEffect, useRef, JSX } from 'react';

interface LogoDesign {
  type: string;
  design: string;
  color: string;
}

interface Company {
  name: string;
  industry: string;
  logo: LogoDesign;
}

const WhyChooseSmartKode: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const companies: Company[] = [
    { 
      name: 'SwiftCargo', 
      industry: 'Logistics', 
      logo: { type: 'shape', design: 'truck', color: 'from-blue-600 to-blue-800' }
    },
    { 
      name: 'Vertex Consulting', 
      industry: 'Business Advisory', 
      logo: { type: 'geometric', design: 'hexagon', color: 'from-green-600 to-green-800' }
    },
    { 
      name: 'CodeCraft Studios', 
      industry: 'Software Development', 
      logo: { type: 'tech', design: 'circuit', color: 'from-purple-600 to-purple-800' }
    },
    { 
      name: 'BrandBoost Agency', 
      industry: 'Marketing', 
      logo: { type: 'marketing', design: 'megaphone', color: 'from-red-500 via-orange-500 to-yellow-500' }
    },
    { 
      name: 'TechFlow Systems', 
      industry: 'IT Solutions', 
      logo: { type: 'grid', design: 'squares', color: 'from-indigo-600 to-indigo-800' }
    },
    { 
      name: 'FlashDelivery', 
      industry: 'Courier Services', 
      logo: { type: 'speed', design: 'lightning', color: 'from-orange-600 to-orange-800' }
    },
    { 
      name: 'MegaMart', 
      industry: 'Retail Chain', 
      logo: { type: 'shopping', design: 'cart', color: 'from-emerald-600 to-emerald-800' }
    },
    { 
      name: 'StyleHub', 
      industry: 'Fashion Retail', 
      logo: { type: 'shopping', design: 'bag', color: 'from-pink-600 to-rose-600' }
    },
    { 
      name: 'UrbanBuilders', 
      industry: 'Construction', 
      logo: { type: 'building', design: 'tower', color: 'from-yellow-600 to-yellow-800' }
    },
    { 
      name: 'DevCore Technologies', 
      industry: 'Software', 
      logo: { type: 'code', design: 'brackets', color: 'from-cyan-600 to-cyan-800' }
    },
    { 
      name: 'NexGen Solutions', 
      industry: 'Consulting', 
      logo: { type: 'puzzle', design: 'connect', color: 'from-teal-600 to-teal-800' }
    },
    { 
      name: 'FreshMart Express', 
      industry: 'Grocery Retail', 
      logo: { type: 'shopping', design: 'store', color: 'from-green-500 to-lime-600' }
    }
  ];

  const renderLogo = (logo: LogoDesign): JSX.Element => {
    const commonClasses = 'w-6 h-6 fill-current';
    
    switch(logo.design) {
      case 'truck':
        return (
          <svg viewBox="0 0 24 24" className={commonClasses}>
            <path d="M17 6H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h1.8a3 3 0 0 0 5.4 0h3.6a3 3 0 0 0 5.4 0H21a1 1 0 0 0 1-1v-5a1 1 0 0 0-.3-.7l-3-3A1 1 0 0 0 18 6h-1zM7.5 19a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm9 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
        );
      case 'hexagon':
        return (
          <svg viewBox="0 0 24 24" className={commonClasses}>
            <path d="M17.5 3.5L22 12l-4.5 8.5h-11L2 12l4.5-8.5h11z"/>
          </svg>
        );
      case 'circuit':
        return (
          <svg viewBox="0 0 24 24" className={commonClasses}>
            <circle cx="6" cy="6" r="2"/>
            <circle cx="18" cy="6" r="2"/>
            <circle cx="6" cy="18" r="2"/>
            <circle cx="18" cy="18" r="2"/>
            <path d="M8 6h8M6 8v8M16 8v8M8 18h8"/>
          </svg>
        );
      case 'megaphone':
        return (
          <svg viewBox="0 0 24 24" className={commonClasses}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.3-.11.59-.46.59-.82v-1.04c0-.83-.67-1.5-1.5-1.5-.17 0-.33.03-.5.08-.83.25-1.71.38-2.6.38-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8v.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V12c0-5.52-4.48-10-10-10zm0 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            <path d="M19 10v4l3-2-3-2z"/>
          </svg>
        );
      case 'squares':
        return (
          <svg viewBox="0 0 24 24" className={commonClasses}>
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
          </svg>
        );
      case 'lightning':
        return (
          <svg viewBox="0 0 24 24" className={commonClasses}>
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        );
      case 'cart':
        return (
          <svg viewBox="0 0 24 24" className={commonClasses}>
            <path d="M7 4V2a1 1 0 0 0-2 0v2H3a1 1 0 0 0 0 2h1.4l1.5 9.3A2 2 0 0 0 7.9 17H18a1 1 0 0 0 0-2H7.9l-.3-2H18a2 2 0 0 0 2-1.7l1-7A1 1 0 0 0 20 3H7zM19 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM9 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
          </svg>
        );
      case 'bag':
        return (
          <svg viewBox="0 0 24 24" className={commonClasses}>
            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z"/>
          </svg>
        );
      case 'store':
        return (
          <svg viewBox="0 0 24 24" className={commonClasses}>
            <path d="M21.9 8.4l-1.6-6.7A1 1 0 0 0 19.4 1H4.6a1 1 0 0 0-.9.7L2.1 8.4a3 3 0 0 0 2.9 3.6v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8a3 3 0 0 0 2.9-3.6zM6 20v-7h12v7H6z"/>
          </svg>
        );
      case 'tower':
        return (
          <svg viewBox="0 0 24 24" className={commonClasses}>
            <path d="M4 21V9l8-6 8 6v12H4zM9 21h6v-6H9v6z"/>
          </svg>
        );
      case 'brackets':
        return (
          <svg viewBox="0 0 24 24" className={commonClasses}>
            <path d="M16 4h2v16h-2M8 4H6v16h2M10 8h4M10 12h4M10 16h4"/>
          </svg>
        );
      case 'connect':
        return (
          <svg viewBox="0 0 24 24" className={commonClasses}>
            <circle cx="12" cy="5" r="3"/>
            <circle cx="12" cy="19" r="3"/>
            <circle cx="5" cy="12" r="3"/>
            <circle cx="19" cy="12" r="3"/>
            <path d="M12 8v8M8 12h8"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" className={commonClasses}>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
    }
  };

  const duplicatedCompanies = [...companies, ...companies];
  const reversedCompanies = [...companies.slice().reverse(), ...companies.slice().reverse()];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black py-16 sm:py-20 lg:py-24 overflow-hidden"
      role="region"
      aria-label="Why Choose SmartKode"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
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

        {/* Our Partners Section */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Growing Network
            </h3>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Proud to work with innovative businesses across various industries
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
                {duplicatedCompanies.map((company, index) => (
                  <div key={`row1-${index}`} className="flex-shrink-0 group">
                    <div className="w-48 sm:w-56 p-4 sm:p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center mb-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${company.logo.color} rounded-lg flex items-center justify-center mr-3 text-white shadow-lg`}>
                          {renderLogo(company.logo)}
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
                {reversedCompanies.map((company, index) => (
                  <div key={`row2-${index}`} className="flex-shrink-0 group">
                    <div className="w-48 sm:w-56 p-4 sm:p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center mb-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${company.logo.color} rounded-lg flex items-center justify-center mr-3 text-white shadow-lg`}>
                          {renderLogo(company.logo)}
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
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
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