"use client";
import React, { useState, useEffect, useMemo } from 'react';
import {
  Brain,
  MessageCircle,
  Code,
  Megaphone,
  Settings,
  Palette,
  ArrowRight,
  Zap,
  Shield,
  Target,
  ChevronDown,
  ChevronUp,
  Eye,
  BarChart3,
  TrendingUp
} from 'lucide-react';

// Type definitions
interface MousePosition {
  x: number;
  y: number;
}

interface Service {
  name: string;
  icon: React.ReactElement;
  bgColor: string;
}

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactElement;
}

interface ServiceDetail {
  description: string;
  keyFeatures: string[];
  benefits: Benefit[];
}

interface ServiceDetails {
  [key: string]: ServiceDetail;
}

interface ExpandedBenefits {
  [key: number]: boolean;
}

// Constants
const MOBILE_BREAKPOINT = 1024;
const MOUSE_FOLLOWER_SIZE = 500;
const MOUSE_FOLLOWER_OFFSET = 250;

const ServicesSection: React.FC = () => {
  // State management
  const [activeService, setActiveService] = useState<string>('AI Development');
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [expandedBenefits, setExpandedBenefits] = useState<ExpandedBenefits>({});

  // Memoized services data
  const services = useMemo<Service[]>(() => [
    { name: 'AI Development', icon: <Brain className="w-4 h-4 sm:w-5 sm:h-5" />, bgColor: 'bg-black' },
    { name: 'Web Development', icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />, bgColor: 'bg-black' },
    { name: 'Chatbot Development', icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />, bgColor: 'bg-black' },
    { name: 'Automation Services', icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />, bgColor: 'bg-black' },
    { name: 'Data Analytics', icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />, bgColor: 'bg-black' },
    { name: 'Digital Marketing', icon: <Megaphone className="w-4 h-4 sm:w-5 sm:h-5" />, bgColor: 'bg-black' },
    { name: 'DevOps', icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />, bgColor: 'bg-black' },
    { name: 'UI/UX Design', icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5" />, bgColor: 'bg-black' }
  ], []);

  // Memoized service details data - shorter, benefit-first copy, trimmed lists
  const serviceDetails = useMemo<ServiceDetails>(() => ({
    'AI Development': {
      description: 'Stop guessing and start knowing. We build AI that turns your data into decisions, automatically.',
      keyFeatures: ['Machine Learning', 'Computer Vision', 'NLP', 'Predictive Models'],
      benefits: [
        {
          title: 'Work Gets Done Without You',
          description: 'Repetitive decisions get handled automatically, so your team spends time on what actually needs a human.',
          icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'See What\u2019s Coming Next',
          description: 'Predictive models flag risks and opportunities before your competitors notice them.',
          icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'Web Development': {
      description: 'Your website is the first impression you make. We make sure it\u2019s the one people remember.',
      keyFeatures: ['React / Next.js', 'Node.js Backend', 'E-commerce', 'API Integration'],
      benefits: [
        {
          title: 'Built to Convert Visitors',
          description: 'Every page is designed around one question: what makes someone stay, trust you, and act.',
          icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Fast Enough to Keep People',
          description: 'A site that loads slow loses customers before they even see what you offer. Ours doesn\u2019t.',
          icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'Chatbot Development': {
      description: 'Never leave a customer waiting again. Round-the-clock support that actually feels human.',
      keyFeatures: ['ChatGPT Integration', 'Natural Language', 'Multi-Platform', 'Live Analytics'],
      benefits: [
        {
          title: 'Always On, Never Tired',
          description: 'Your customers get an answer at 2am the same way they would at 2pm.',
          icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Gets Smarter Over Time',
          description: 'Every conversation teaches it something, so answers keep improving without extra work from you.',
          icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'Automation Services': {
      description: 'Give your team back their time. We automate the busywork so people can focus on what grows the business.',
      keyFeatures: ['RPA', 'Workflow Automation', 'Document Processing', 'Task Scheduling'],
      benefits: [
        {
          title: 'Fewer Mistakes, Less Stress',
          description: 'Manual, repetitive tasks are where errors creep in. Automating them removes the guesswork.',
          icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Do More Without Hiring More',
          description: 'Handle a growing workload without growing your headcount at the same pace.',
          icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'Data Analytics': {
      description: 'See what others miss. We turn scattered numbers into decisions you can actually trust.',
      keyFeatures: ['BI Dashboards', 'Predictive Analytics', 'Real-time Reporting', 'KPI Tracking'],
      benefits: [
        {
          title: 'Answers, Not Just Charts',
          description: 'Dashboards that tell you what to do next, not just what already happened.',
          icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Catch Problems Early',
          description: 'Real-time reporting means you notice a dip in performance the day it happens, not the month after.',
          icon: <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'Digital Marketing': {
      description: 'Get found by people already looking for you, then turn that attention into paying customers.',
      keyFeatures: ['SEO / SEM', 'Social Media', 'Paid Ads', 'Conversion Optimization'],
      benefits: [
        {
          title: 'Every Dollar Justifies Itself',
          description: 'Campaigns are tracked and optimized against real results, not vanity metrics.',
          icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Show Up Where They\u2019re Looking',
          description: 'A presence across search, social, and email, so you\u2019re never the brand people forget existed.',
          icon: <Megaphone className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'DevOps': {
      description: 'Ship faster, break less. We build the pipeline so releases stop keeping you up at night.',
      keyFeatures: ['CI/CD Pipelines', 'Infrastructure as Code', 'Cloud Migration', 'Monitoring'],
      benefits: [
        {
          title: 'Releases Without the Dread',
          description: 'Automated pipelines catch problems before they reach your customers, not after.',
          icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Infrastructure That Just Works',
          description: 'Less time firefighting servers, more time building the product people pay for.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'UI/UX Design': {
      description: 'First impressions are made in seconds. We design experiences people actually want to use.',
      keyFeatures: ['User Research', 'Prototyping', 'Design Systems', 'Accessibility'],
      benefits: [
        {
          title: 'Designed Around Real Behavior',
          description: 'Decisions come from watching how people actually use your product, not guesswork.',
          icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Easy Feels Effortless',
          description: 'When something is intuitive, people don\u2019t notice the design. That\u2019s the goal.',
          icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    }
  }), []);

  // Mobile detection and responsive handling
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
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

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

  // Event handlers
  const handleServiceSelect = (serviceName: string): void => {
    setActiveService(serviceName);
    setExpandedBenefits({});
  };

  const toggleBenefit = (index: number): void => {
    setExpandedBenefits(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Computed values
  const currentServiceData = useMemo<ServiceDetail>(() =>
          serviceDetails[activeService] || serviceDetails['AI Development'],
      [activeService, serviceDetails]
  );

  const activeServiceIcon = useMemo(() =>
          services.find(s => s.name === activeService)?.icon,
      [services, activeService]
  );

  // Render mobile service selector - a visible, scrollable row of chips.
  // No hidden menu to discover: every option is on screen and obviously tappable.
  const renderMobileServiceSelector = (): React.ReactElement => (
      <div className="mb-6 -mx-4 sm:-mx-6">
        <div
            className="flex gap-2 overflow-x-auto no-scrollbar px-4 sm:px-6 pb-1"
            role="tablist"
            aria-label="Select service"
        >
          {services.map((service, index) => {
            const isActive = activeService === service.name;
            return (
                <button
                    key={index}
                    onClick={() => handleServiceSelect(service.name)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Select ${service.name}`}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border shrink-0 whitespace-nowrap transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                        isActive
                            ? 'bg-white text-black border-white shadow-lg'
                            : 'bg-black text-gray-400 border-gray-700 hover:text-white hover:border-gray-500'
                    }`}
                >
                  <span className={isActive ? 'text-black' : 'text-gray-400'}>{service.icon}</span>
                  <span className="text-xs font-semibold">{service.name}</span>
                </button>
            );
          })}
        </div>
      </div>
  );

  // Render desktop services grid
  const renderDesktopServicesGrid = (): React.ReactElement => (
      <div className="lg:col-span-2">
        <div className="sticky top-8">
          <div className="bg-black rounded-2xl p-6 border border-gray-700 backdrop-blur-sm shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse" aria-hidden="true"></span>
              Select Service
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {services.map((service, index) => (
                  <button
                      key={index}
                      onClick={() => handleServiceSelect(service.name)}
                      className={`group relative p-4 rounded-xl transition-all duration-500 text-left overflow-hidden border focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                          activeService === service.name
                              ?'bg-gray-800 text-white shadow-xl scale-105 border-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-900 border-gray-700 hover:border-gray-600'
                      }`}
                      aria-current={activeService === service.name ? 'true' : 'false'}
                      aria-label={`Select ${service.name} service`}
                  >
                    <div className="relative flex items-center">
                      <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                          activeService === service.name
                              ? 'bg-gray-800 text-white'
                              : 'bg-gray-700 text-gray-300 group-hover:bg-gray-600 group-hover:text-white'
                      }`}>
                        {service.icon}
                      </div>
                      <div className="flex-1">
                    <span className="font-semibold text-sm block leading-tight">
                      {service.name}
                    </span>
                      </div>
                      {activeService === service.name && (
                          <ArrowRight className="w-4 h-4 ml-2 animate-pulse text-white" aria-hidden="true" />
                      )}
                    </div>
                  </button>
              ))}
            </div>
          </div>
        </div>
      </div>
  );

  // Render service details
  const renderServiceDetails = (): React.ReactElement => (
      <div className={isMobile ? 'col-span-1' : 'lg:col-span-3'}>
        <div className="bg-black rounded-2xl border border-gray-700 overflow-hidden backdrop-blur-sm shadow-xl">
          {/* Service Header */}
          <div className="p-4 sm:p-6 pb-0">
            <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
              <div className="flex items-center">
                <div className="p-3 bg-white text-black rounded-lg mr-4">
                  {activeServiceIcon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{activeService}</h3>
              </div>
            </div>
            <p className="text-gray-400 text-base sm:text-lg mb-4 leading-relaxed">
              {currentServiceData.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {currentServiceData.keyFeatures.map((feature, index) => (
                  <span
                      key={index}
                      className="text-xs sm:text-sm px-3 py-1 bg-gray-900 text-gray-200 rounded-full border border-gray-700 transition-colors duration-300 hover:bg-gray-800"
                  >
                {feature}
              </span>
              ))}
            </div>
          </div>

          {/* Benefits List */}
          <div className="border-t border-gray-700 divide-y divide-gray-700">
            {currentServiceData.benefits.map((benefit, index) => (
                <div
                    key={index}
                    className="p-4 sm:p-6 group hover:bg-gray-900/30 transition-all duration-300 cursor-pointer focus-within:bg-gray-900/30"
                    onClick={() => toggleBenefit(index)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={expandedBenefits[index] || false}
                    aria-label={`Toggle ${benefit.title} details`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleBenefit(index);
                      }
                    }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-900 rounded-lg text-white transition-colors duration-300 group-hover:bg-gray-800">
                        {benefit.icon}
                      </div>
                      <h4 className="text-white text-sm sm:text-base font-semibold">{benefit.title}</h4>
                    </div>
                    <div>
                      {expandedBenefits[index] ? (
                          <ChevronUp className="w-4 h-4 text-gray-400 transition-transform duration-300" />
                      ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-300" />
                      )}
                    </div>
                  </div>
                  {expandedBenefits[index] && (
                      <div className="mt-3 animate-fade-in">
                        <p className="text-gray-300 text-sm sm:text-base transition-all duration-300 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                  )}
                </div>
            ))}
          </div>
        </div>
      </div>
  );

  return (
      <>
        <section
            className="relative bg-black overflow-hidden py-12 sm:py-16 lg:py-20"
            role="region"
            aria-label="Our Services"
        >
          {/* Enhanced Animated Background Grid - Hidden on mobile for performance */}
          {!isMobile && (
              <div className="absolute inset-0 opacity-20 lg:opacity-30" aria-hidden="true">
                <div
                    className="absolute inset-0 grid-animation"
                />
              </div>
          )}

          {/* Enhanced Mouse Follower Effect - Desktop only */}
          {!isMobile && (
              <div
                  className="absolute pointer-events-none transition-all duration-500 ease-out mouse-follower"
                  style={{
                    left: mousePosition.x - MOUSE_FOLLOWER_OFFSET,
                    top: mousePosition.y - MOUSE_FOLLOWER_OFFSET,
                    width: `${MOUSE_FOLLOWER_SIZE}px`,
                    height: `${MOUSE_FOLLOWER_SIZE}px`,
                  }}
                  aria-hidden="true"
              />
          )}

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Responsive Section Header */}
            <header className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-block mb-3 sm:mb-4">
              <span className="bg-gray-800 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase border border-gray-700">
                Our Expertise
              </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
              <span className="text-white">
                Services We
              </span>
                <br />
                <span className="text-gray-700 font-black">OFFER</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
                Real solutions, built around what your business actually needs.
              </p>
            </header>

            {/* Mobile Service Selector */}
            {isMobile && renderMobileServiceSelector()}

            <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
              {/* Desktop Services Grid */}
              {!isMobile && renderDesktopServicesGrid()}

              {/* Service Details - Full width on mobile */}
              {renderServiceDetails()}
            </div>
          </div>
        </section>

        <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      </>
  );
}
export default ServicesSection;