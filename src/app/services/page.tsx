"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { 
  Brain, 
  Code, 
  BarChart3, 
  Zap, 
  MessageCircle,
  ArrowRight,
  TrendingUp,
  Server,
  Palette
} from 'lucide-react';

// Type definitions
interface MousePosition {
  x: number;
  y: number;
}

interface Service {
  id: string;
  label: string;
  description: string;
  image: string;
  highlights: string[];
  icon: React.ReactElement;
}

interface TechLogo {
  name: string;
  image: string;
}

// Constants
const MOBILE_BREAKPOINT = 768;

const ServicesPage: React.FC = () => {
  // State management
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // Memoized services data
  const services = useMemo<Service[]>(() => [
    {
      id: "ai",
      label: "AI Development",
      description: "Custom AI models that solve real business challenges. From machine learning to computer vision, we build intelligent systems that work.",
      image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343879/ai_j8vo7b.jpg",
      highlights: [
        "Custom Machine Learning Models",
        "Computer Vision & NLP",
        "AI Model Deployment"
      ],
      icon: <Brain className="w-5 h-5" />
    },
    {
      id: "web",
      label: "Web Development",
      description: "High-performance web platforms built with modern frameworks. Fast, responsive, and designed to scale with your business.",
      image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343887/web_hlmskm.jpg",
      highlights: [
        "Next.js & React Applications",
        "Full-Stack Development",
        "Performance Optimization"
      ],
      icon: <Code className="w-5 h-5" />
    },
    {
      id: "chatbot",
      label: "Chatbot Development",
      description: "Intelligent chatbots that engage customers 24/7. Deploy across web, WhatsApp, and messaging platforms.",
      image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343734/chatbot_pd1xt8.jpg",
      highlights: [
        "GPT-Powered Chatbots",
        "Multi-Platform Integration",
        "Natural Conversations"
      ],
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      id: "automation",
      label: "Automation Services",
      description: "Automate repetitive tasks and streamline workflows. Focus on what matters while we handle the routine work.",
      image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343696/automation_hq82sz.jpg",
      highlights: [
        "Process Automation",
        "Workflow Integration",
        "Custom Bot Development"
      ],
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: "data",
      label: "Data Analytics",
      description: "Transform data into actionable insights. We build dashboards and analytics systems that help you make better decisions.",
      image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343587/data_sa6wwg.jpg",
      highlights: [
        "Real-Time Dashboards",
        "Business Intelligence",
        "Predictive Analytics"
      ],
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "marketing",
      label: "Digital Marketing",
      description: "Strategic digital marketing campaigns that drive growth. From social media to SEO, we help you reach your target audience effectively.",
      image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753903869/digital-marketing_u4rd2a.webp",
      highlights: [
        "Social Media Marketing",
        "SEO & Content Strategy",
        "PPC Campaign Management"
      ],
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: "devops",
      label: "DevOps",
      description: "Streamline your development pipeline with modern DevOps practices. Deploy faster, scale better, and maintain reliability.",
      image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753904008/devops_ybbrwv.jpg",
      highlights: [
        "CI/CD Pipeline Setup",
        "Cloud Infrastructure",
        "Monitoring & Deployment"
      ],
      icon: <Server className="w-5 h-5" />
    },
    {
      id: "uiux",
      label: "UI/UX Design",
      description: "Create intuitive and beautiful user experiences. We design interfaces that users love and businesses need.",
      image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753903709/UI-UX_tp8ivo.webp",
      highlights: [
        "User Experience Research",
        "Interface Design",
        "Prototyping & Testing"
      ],
      icon: <Palette className="w-5 h-5" />
    }
  ], []);

  // Memoized tech logos data
  const techLogos = useMemo<TechLogo[]>(() => [
    { name: "OpenAI GPT", image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345359/gpt_ovguag.png" },
    { name: "PyTorch", image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345382/pytorch_kedo8g.png" },
    { name: "Hugging Face", image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345433/hugging-face_pix9sx.png" },
    { name: "OpenCV", image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345368/opencv_gkee83.png" },
    { name: "Next.js", image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345440/nextjs_jevpfr.jpg" },
    { name: "SQL", image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345302/sql_nrxvnk.png" }
  ], []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse position tracking (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Render hero section
  const renderHeroSection = (): React.ReactElement => (
    <section 
      id="hero"
      data-animate
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Mouse follower effect */}
      {!isMobile && (
        <div 
          className="absolute pointer-events-none w-96 h-96 rounded-full bg-gradient-to-r from-white/5 to-gray-300/10 blur-3xl transition-all duration-700 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          aria-hidden="true"
        />
      )}

      {/* Animated background particles */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-gray-400/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-gray-300/25 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        </div>
      )}

      <div className={`relative z-10 max-w-4xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="inline-block mb-6">
          <span className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase border border-gray-700">
            Enterprise Solutions
          </span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-8">
          <span className="text-white">Enterprise AI Solutions.</span>
          <br />
          <span className="text-gray-400">Engineered for Impact.</span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
          We help ambitious companies transform with intelligent software, AI automation, and future-ready platforms.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => {
              const servicesSection = document.getElementById('service-0');
              servicesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center text-lg hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Tech logos section */}
      <div className={`relative z-10 w-full max-w-5xl mt-20 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="text-sm text-gray-400 uppercase tracking-widest mb-8 text-center">
          Trusted Technologies
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 items-center justify-items-center">
          {techLogos.map((tech) => (
            <div 
              key={tech.name}
              className="group relative"
            >
              <Image 
                src={tech.image} 
                alt={tech.name}
                width={64}
                height={64}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain opacity-60 hover:opacity-100 transition-all duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Render service section
  const renderServiceSection = (service: Service, index: number): React.ReactElement => {
    const isVisible = visibleSections.has(`service-${index}`);
    const isReversed = index % 2 === 1;

    return (
      <section
        key={service.id}
        id={`service-${index}`}
        data-animate
        className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
            
            {/* Content */}
            <div className={`${isReversed ? 'lg:col-start-2' : ''} ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                {service.label}
              </h2>
              
              <p className="text-gray-300 text-xl mb-8 leading-relaxed">
                {service.description}
              </p>

              {/* Highlights */}
              <div className="space-y-4 mb-10">
                {service.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center text-gray-200 group">
                    <div className="w-2 h-2 bg-white rounded-full mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="text-lg font-medium group-hover:text-white transition-colors duration-300">{highlight}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {
                  // Navigate to service detail on same page
                  window.location.href = `/services/${service.id}`;
                }}
                className="bg-gradient-to-r from-white to-gray-100 text-black px-8 py-4 rounded-lg font-semibold hover:from-gray-100 hover:to-white transition-all duration-300 flex items-center text-lg hover:scale-105 shadow-lg hover:shadow-xl transform-gpu"
              >
                Learn More <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Image */}
            <div className={`${isReversed ? 'lg:col-start-1' : ''} ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image
                  src={service.image}
                  alt={service.label}
                  width={600}
                  height={400}
                  className="relative w-full h-80 lg:h-96 object-cover rounded-2xl shadow-2xl border border-gray-700 group-hover:scale-105 transition-all duration-500 group-hover:border-gray-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl group-hover:from-black/20 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="bg-black text-white overflow-hidden min-h-screen">
      {/* Hero Section */}
      {renderHeroSection()}
      
      {/* Services Sections */}
      {services.map((service, index) => renderServiceSection(service, index))}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;