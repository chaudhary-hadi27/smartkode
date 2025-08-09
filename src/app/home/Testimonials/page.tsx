"use client";
import Image from "next/image";
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
  Briefcase
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
      content: "SmartKode transformed our entire digital infrastructure with their AI-powered solutions. The predictive analytics they implemented increased our operational efficiency by 300%. Their team's expertise in machine learning is absolutely phenomenal.",
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
      content: "Working with SmartKode was a game-changer for our fintech platform. Their custom software development and DevOps implementation reduced our deployment time from weeks to hours. The security measures they implemented are military-grade.",
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
      content: "The computer vision and NLP solutions SmartKode developed for our healthcare platform are revolutionary. Their chatbot handles 80% of patient inquiries automatically, and the diagnostic accuracy has improved by 40%.",
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
      content: "SmartKode's big data analytics and machine learning algorithms revolutionized our customer experience. Sales increased by 250% after implementing their recommendation engine. Their UI/UX design is world-class.",
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
      content: "The predictive modeling and IoT integration SmartKode delivered exceeded all expectations. Equipment downtime reduced by 60%, and maintenance costs dropped significantly. Their team understands complex industrial requirements perfectly.",
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
      content: "SmartKode's omnichannel digital marketing strategy and custom software solutions transformed our retail operations. Customer engagement increased by 180%, and our mobile app now has 5-star ratings consistently.",
      project: "Omnichannel Retail Platform",
      result: "180% engagement boost",
      industry: "Retail",
      location: "Toronto, Canada",
      highlight: "Customer Experience"
    }
  ], []);

  // Handle mobile detection - Now properly using isMobile
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for visibility
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

  // Auto-play testimonials - adjusted timing for mobile
  useEffect(() => {
    if (isPlaying) {
      const interval = isMobile ? 8000 : 6000; // Longer on mobile for better UX
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
    <section 
      ref={sectionRef} 
      className="relative py-16 md:py-20 lg:py-24 xl:py-28 bg-black overflow-hidden"
      role="region"
      aria-label="Client Testimonials"
    >
      <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Responsive for mobile */}
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-4">
            <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wider uppercase border border-gray-700">
              Client Success Stories
            </span>
          </div>

          <h2 className={`font-black mb-4 tracking-tight leading-tight ${
            isMobile ? 'text-2xl' : 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
          }`}>
            <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              What Our
            </span>
            <br />
            <span className="text-gray-700 font-black">CLIENTS SAY</span>
          </h2>
          
          <p className={`text-gray-400 max-w-3xl mx-auto leading-relaxed ${
            isMobile ? 'text-base px-4' : 'text-lg'
          }`}>
            See how SmartKode has transformed businesses across industries 
            with cutting-edge AI, web development, and data solutions.
          </p>
        </div>

        {/* Main Testimonial - Mobile-optimized layout */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`gap-8 lg:gap-10 items-start max-w-5xl mx-auto ${
            isMobile ? 'space-y-6' : 'grid lg:grid-cols-5'
          }`}>
            {/* Client Info */}
            <div className={`order-2 lg:order-1 ${isMobile ? '' : 'lg:col-span-2'}`}>
              <div className={`bg-gray-800 rounded-2xl p-6 border border-gray-800 text-center ${
                isMobile ? '' : 'lg:sticky lg:top-8'
              }`}>
                <div className="relative mb-6">
                  <Image
                    src={currentData.image}
                    alt={`${currentData.name} - ${currentData.role}`}
                    width={96}
                    height={96}
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-full mx-auto border-4 border-gray-800 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white text-black p-1.5 rounded-full">
                    <Building className="w-4 h-4" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">{currentData.name}</h3>
                <p className="text-gray-400 font-semibold mb-1 text-sm">{currentData.role}</p>
                <p className="text-gray-500 mb-4 text-sm">{currentData.company}</p>
                
                <div className="flex justify-center mb-4">
                  {Array.from({ length: currentData.rating }, (_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className={`space-y-3 ${isMobile ? 'grid grid-cols-3 gap-3' : ''}`}>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="text-gray-400 text-xs mb-1 flex items-center justify-center">
                      <Briefcase className="w-3 h-3 mr-1" />
                      Industry
                    </div>
                    <div className="text-white font-semibold text-sm">{currentData.industry}</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="text-gray-400 text-xs mb-1 flex items-center justify-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      Location
                    </div>
                    <div className="text-white font-semibold text-sm">{currentData.location}</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="text-gray-400 text-xs mb-1 flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Result
                    </div>
                    <div className="text-white font-semibold text-sm">{currentData.result}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className={`order-1 lg:order-2 ${isMobile ? '' : 'lg:col-span-3'}`}>
              <div className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-800 relative">
                
                <div className="mb-6 pt-8">
                  <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {currentData.highlight}
                  </span>
                </div>

                <blockquote className={`text-white leading-relaxed font-medium mb-6 relative z-10 ${
                  isMobile ? 'text-base' : 'text-lg lg:text-xl'
                }`}>
                  &quot;{currentData.content}&quot;
                </blockquote>

                <div className="mb-6">
                  <h4 className={`font-bold text-white mb-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
                    Project: {currentData.project}
                  </h4>
                  <div className="flex items-center text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Result: {currentData.result}</span>
                  </div>
                </div>

                {/* Navigation - Mobile-optimized */}
                <div className={`flex items-center justify-between gap-4 ${
                  isMobile ? 'flex-col space-y-4' : 'flex-col sm:flex-row'
                }`}>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={prevTestimonial}
                      className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      aria-label="Previous testimonial"
                      type="button"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button 
                      onClick={toggleAutoplay}
                      className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
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
                      className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      aria-label="Next testimonial"
                      type="button"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 ${
                          index === currentTestimonial ? 'bg-white' : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                        type="button"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;