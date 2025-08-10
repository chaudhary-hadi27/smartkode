"use client";
import Image from "next/image";
import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause,
  Building,
  TrendingUp,
  MapPin,
  Briefcase,
  Quote
} from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  content: string;
  project: string;
  result: string;
  industry: string;
  location: string;
  highlight: string;
}

// SEO Component for meta tags
const TestimonialsSEO: React.FC = () => (
  <Head>
    <title>Client Testimonials - SmartKode.io Success Stories | Professional AI & Web Development</title>
    <meta 
      name="description" 
      content="Read authentic client testimonials from SmartKode.io. Discover how our professional AI solutions and web development services have delivered measurable results with efficiency increases up to 300%." 
    />
    <meta 
      name="keywords" 
      content="SmartKode testimonials, professional web development, AI development services, client reviews, business transformation, enterprise solutions" 
    />
    <meta name="author" content="SmartKode.io" />
    <meta name="robots" content="index, follow" />
    
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Professional Client Testimonials - SmartKode.io" />
    <meta property="og:description" content="Authentic testimonials showcasing SmartKode.io's professional development services and proven business results." />
    <meta property="og:site_name" content="SmartKode.io" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Client Success Stories - SmartKode.io" />
    <meta name="twitter:description" content="Professional testimonials from satisfied clients worldwide." />
    
    <link rel="canonical" href="https://smartkode.io/testimonials" />
    <meta name="theme-color" content="#000000" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  </Head>
);

const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = useMemo<Testimonial[]>(() => [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Chief Technology Officer",
      company: "TechCorp Industries",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "SmartKode.io transformed our entire digital infrastructure with their AI-powered solutions. The predictive analytics they implemented increased our operational efficiency by 300%. Their team's expertise in machine learning is absolutely phenomenal.",
      project: "AI-Powered Analytics Platform",
      result: "300% efficiency increase",
      industry: "Technology",
      location: "San Francisco, USA",
      highlight: "AI Innovation Leader"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Digital Innovation",
      company: "Global Finance Corp",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Working with SmartKode.io was a game-changer for our fintech platform. Their custom software development and DevOps implementation reduced our deployment time from weeks to hours. The security measures they implemented are military-grade.",
      project: "Fintech Platform Development",
      result: "95% faster deployment",
      industry: "Financial Services",
      location: "New York, USA",
      highlight: "Security Excellence"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "VP of Product Development",
      company: "HealthTech Solutions",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "The computer vision and NLP solutions SmartKode.io developed for our healthcare platform are revolutionary. Their chatbot handles 80% of patient inquiries automatically, and the diagnostic accuracy has improved by 40%.",
      project: "Healthcare AI Platform",
      result: "40% diagnostic improvement",
      industry: "Healthcare",
      location: "Boston, USA",
      highlight: "Healthcare Innovation"
    },
    {
      id: 4,
      name: "David Kumar",
      role: "CEO & Founder",
      company: "E-Commerce Plus",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "SmartKode.io's big data analytics and machine learning algorithms revolutionized our customer experience. Sales increased by 250% after implementing their recommendation engine. Their UI/UX design is world-class.",
      project: "E-Commerce ML Platform",
      result: "250% sales increase",
      industry: "E-Commerce",
      location: "London, UK",
      highlight: "Revenue Growth"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Chief Data Officer",
      company: "Manufacturing Pro",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "The predictive modeling and IoT integration SmartKode.io delivered exceeded all expectations. Equipment downtime reduced by 60%, and maintenance costs dropped significantly. Their team understands complex industrial requirements perfectly.",
      project: "Industrial IoT Platform",
      result: "60% downtime reduction",
      industry: "Manufacturing",
      location: "Germany",
      highlight: "Industrial Excellence"
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Digital Transformation Lead",
      company: "Retail Innovations",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "SmartKode.io's omnichannel digital marketing strategy and custom software solutions transformed our retail operations. Customer engagement increased by 180%, and our mobile app now has 5-star ratings consistently.",
      project: "Omnichannel Retail Platform",
      result: "180% engagement boost",
      industry: "Retail",
      location: "Toronto, Canada",
      highlight: "Customer Experience"
    }
  ], []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = isMobile ? 8000 : 6000;
      intervalRef.current = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, testimonials.length, isMobile]);

  const nextTestimonial = useCallback((): void => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback((): void => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const toggleAutoplay = useCallback((): void => {
    setIsPlaying(prev => !prev);
  }, []);

  const goToTestimonial = useCallback((index: number): void => {
    setCurrentTestimonial(index);
  }, []);

  const currentData: Testimonial = testimonials[currentTestimonial];

  return (
    <>
      <TestimonialsSEO />
      <section 
        ref={sectionRef} 
        className="relative py-16 md:py-20 lg:py-24 xl:py-28 bg-black overflow-hidden"
        role="region"
        aria-label="Client Testimonials"
        itemScope
        itemType="https://schema.org/TestimonialCollection"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div
            className={`text-center mb-12 md:mb-16 lg:mb-20 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block mb-6">
              <span className="bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wider uppercase border border-gray-700">
                Client Success Stories
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                What Our{" "}
                <span className="text-gray-700 font-black">CLIENTS SAY</span>
              </span>
            </h1>
            
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-0">
              Discover how SmartKode.io has transformed businesses worldwide 
              with professional AI solutions and enterprise-grade development services.
            </p>
          </div>

          {/* Testimonial Content - Consistent Layout */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-5xl mx-auto">
              
              {/* Main Testimonial Card */}
              <div 
                className="bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-800 relative shadow-2xl mx-2 sm:mx-0"
                itemScope
                itemType="https://schema.org/Review"
              >
                
                {/* Quote Icon */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 opacity-5">
                  <Quote className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white" />
                </div>

                {/* Client Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
                  
                  {/* Client Info */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={currentData.image}
                        alt={`${currentData.name}, ${currentData.role} at ${currentData.company}`}
                        width={80}
                        height={80}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full border-3 border-gray-700 object-cover"
                        loading="lazy"
                        itemProp="image"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-gray-700 text-white p-1.5 rounded-full">
                        <Building className="w-3 h-3" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1" itemProp="name">
                        {currentData.name}
                      </h3>
                      <p className="text-gray-400 font-semibold text-sm md:text-base" itemProp="jobTitle">
                        {currentData.role}
                      </p>
                      <p className="text-gray-500 text-sm md:text-base" itemProp="worksFor">
                        {currentData.company}
                      </p>
                    </div>
                  </div>

                  {/* Rating & Highlight */}
                  <div className="text-center md:text-right">
                    <div className="flex justify-center md:justify-end mb-3" role="img" aria-label={`${currentData.rating} out of 5 stars`}>
                      {Array.from({ length: currentData.rating }, (_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 text-white fill-current mr-1" 
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold border border-gray-700">
                      {currentData.highlight}
                    </span>
                  </div>
                </div>

                {/* Testimonial Text */}
                <blockquote 
                  className="text-white text-base sm:text-lg md:text-xl leading-relaxed font-medium mb-6 sm:mb-8 relative z-10 break-words"
                  itemProp="reviewBody"
                >
                  &quot;{currentData.content}&quot;
                </blockquote>

                {/* Project Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-700">
                    <div className="flex items-center text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
                      <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                      Project
                    </div>
                    <div className="text-white font-semibold text-sm sm:text-base leading-tight">
                      {currentData.project}
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-700">
                    <div className="flex items-center text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                      Result
                    </div>
                    <div className="text-white font-semibold text-sm sm:text-base leading-tight">
                      {currentData.result}
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-700">
                    <div className="flex items-center text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                      Location
                    </div>
                    <div className="text-white font-semibold text-sm sm:text-base leading-tight">
                      {isMobile ? currentData.location.split(',')[0] : currentData.location}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  
                  {/* Control Buttons */}
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={prevTestimonial}
                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 border border-gray-700"
                      aria-label="Previous testimonial"
                      type="button"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    
                    <button 
                      onClick={toggleAutoplay}
                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 border border-gray-700"
                      aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                      type="button"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white" />
                      )}
                    </button>
                    
                    <button 
                      onClick={nextTestimonial}
                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 border border-gray-700"
                      aria-label="Next testimonial"
                      type="button"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Pagination Dots */}
                  <div className="flex space-x-2" role="tablist" aria-label="Testimonial navigation">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToTestimonial(index)}
                        className={`
                          w-3 h-3 rounded-full transition-all duration-300 
                          focus:outline-none focus:ring-2 focus:ring-gray-600
                          ${index === currentTestimonial 
                            ? 'bg-white' 
                            : 'bg-gray-700 hover:bg-gray-600'
                          }
                        `}
                        aria-label={`Go to testimonial ${index + 1}`}
                        role="tab"
                        aria-selected={index === currentTestimonial}
                        type="button"
                      />
                    ))}
                  </div>


                </div>

                {/* Progress Bar - Removed */}

                {/* Schema.org structured data */}
                <meta itemProp="author" content={currentData.name} />
                <meta itemProp="reviewRating" content={currentData.rating.toString()} />
                <meta itemProp="itemReviewed" content="SmartKode.io Development Services" />
              </div>
            </div>
          </div>
        </div>

        {/* JSON-LD Structured Data for SEO */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SmartKode.io",
              "url": "https://smartkode.io",
              "description": "Professional AI and web development services",
              "review": testimonials.map(testimonial => ({
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": testimonial.name,
                  "jobTitle": testimonial.role,
                  "worksFor": {
                    "@type": "Organization",
                    "name": testimonial.company
                  }
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": testimonial.rating,
                  "bestRating": 5
                },
                "reviewBody": testimonial.content,
                "itemReviewed": {
                  "@type": "Service",
                  "name": "SmartKode.io Professional Development Services",
                  "provider": {
                    "@type": "Organization",
                    "name": "SmartKode.io",
                    "url": "https://smartkode.io"
                  }
                }
              })),
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 5,
                "reviewCount": testimonials.length,
                "bestRating": 5,
                "worstRating": 5
              }
            })
          }}
        />
      </section>
    </>
  );
};

export default TestimonialsSection;