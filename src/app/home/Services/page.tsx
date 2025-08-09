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
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
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

  // Memoized service details data
  const serviceDetails = useMemo<ServiceDetails>(() => ({
    'AI Development': {
      description: 'At SmartKode, we offer comprehensive AI Development services that transform your business operations. Our AI solutions encompass Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, Big Data Analytics, and Predictive Modeling to automate processes, enhance decision-making, and drive innovation across your organization.',
      keyFeatures: ['Machine Learning & Deep Learning', 'Computer Vision', 'Natural Language Processing', 'Big Data Analytics', 'Predictive Modeling', 'Neural Networks', 'AI Model Training', 'Automated Systems'],
      benefits: [
        {
          title: 'Intelligent Automation',
          description: 'Our comprehensive AI solutions enable businesses to automate complex processes across multiple domains, reducing manual effort and increasing operational efficiency through advanced algorithms.',
          icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Data-Driven Insights',
          description: 'Leverage Machine Learning and Big Data Analytics to extract valuable insights from your data, enabling predictive modeling and enhanced decision-making capabilities.',
          icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Computer Vision Solutions',
          description: 'Implement advanced computer vision systems for image processing, object detection, quality control, and visual data analysis across various industries.',
          icon: <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Scalable AI Architecture',
          description: 'Our AI systems are designed to grow with your business, providing scalable solutions that adapt to changing requirements and increasing data volumes.',
          icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'Web Development': {
      description: 'SmartKode delivers modern, responsive web development solutions that create powerful online experiences. Our web development services include frontend development, backend systems, full-stack applications, e-commerce platforms, and progressive web apps that drive business growth and user engagement.',
      keyFeatures: ['Frontend Development (React, Vue, Angular)', 'Backend Development (Node.js, Python, PHP)', 'Full-Stack Applications', 'E-commerce Development', 'Progressive Web Apps (PWA)', 'API Development & Integration', 'Database Design & Management', 'Responsive Design'],
      benefits: [
        {
          title: 'Modern Web Technologies',
          description: 'Build cutting-edge web applications using the latest technologies like React, Vue.js, Node.js, and modern frameworks for superior performance and user experience.',
          icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Responsive & Mobile-First',
          description: 'Create fully responsive websites that work seamlessly across all devices, from desktop to mobile, ensuring optimal user experience everywhere.',
          icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Performance Optimization',
          description: 'Develop fast-loading, SEO-optimized websites with excellent performance scores and user experience metrics for better search rankings.',
          icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Scalable Architecture',
          description: 'Build web applications with scalable architecture that can handle growing traffic and evolving business requirements efficiently.',
          icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'Chatbot Development': {
      description: 'SmartKode specializes in creating intelligent AI chatbots and conversational AI solutions, including ChatGPT integrations. Our chatbot solutions provide 24/7 customer support, streamline communication, and enhance user experience across multiple platforms with advanced natural language understanding.',
      keyFeatures: ['AI Chatbot Development', 'ChatGPT Integration', 'Natural Language Understanding', 'Multi-Platform Integration', 'Conversation Flow Design', 'Analytics Dashboard', 'Voice Assistant Integration', 'Customer Support Automation'],
      benefits: [
        {
          title: '24/7 Customer Support',
          description: 'Our AI chatbots provide round-the-clock customer service with ChatGPT integration, ensuring your customers get intelligent responses anytime, anywhere.',
          icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Advanced AI Integration',
          description: 'Seamlessly integrate ChatGPT and other advanced language models to create more natural and engaging conversational experiences.',
          icon: <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Multi-Platform Deployment',
          description: 'Deploy chatbots across websites, mobile apps, social media platforms, and messaging services for consistent customer experience.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Continuous Learning',
          description: 'Our chatbots continuously learn from interactions, improving their responses and becoming more effective over time through advanced AI algorithms.',
          icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'Automation Services': {
      description: 'SmartKode provides comprehensive automation services that streamline business processes, reduce manual work, and increase operational efficiency. Our automation solutions include workflow automation, business process automation, robotic process automation (RPA), and custom automation tools tailored to your specific needs.',
      keyFeatures: ['Business Process Automation (BPA)', 'Robotic Process Automation (RPA)', 'Workflow Automation', 'Task Scheduling & Management', 'Document Processing Automation', 'Email & Communication Automation', 'Data Entry Automation', 'Custom Automation Tools'],
      benefits: [
        {
          title: 'Process Efficiency',
          description: 'Automate repetitive tasks and complex workflows to significantly improve operational efficiency and reduce human error in business processes.',
          icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Cost Reduction',
          description: 'Reduce operational costs by automating manual processes, allowing your team to focus on higher-value strategic activities and innovation.',
          icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Scalable Solutions',
          description: 'Implement automation solutions that scale with your business growth, handling increased workloads without proportional increases in resources.',
          icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Quality & Consistency',
          description: 'Ensure consistent, error-free execution of business processes through automated systems that maintain quality standards 24/7.',
          icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'Data Analytics': {
      description: 'SmartKode transforms your data into actionable business intelligence through comprehensive data analytics services. We provide data visualization, business intelligence, statistical analysis, predictive analytics, and real-time reporting solutions that drive informed decision-making and strategic growth.',
      keyFeatures: ['Business Intelligence (BI)', 'Data Visualization & Dashboards', 'Statistical Analysis', 'Predictive Analytics', 'Real-time Reporting', 'Data Mining & Processing', 'Performance Metrics & KPIs', 'Advanced Analytics Tools'],
      benefits: [
        {
          title: 'Actionable Insights',
          description: 'Transform raw data into meaningful insights and actionable recommendations that drive strategic business decisions and operational improvements.',
          icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Real-time Monitoring',
          description: 'Monitor key performance indicators and business metrics in real-time with interactive dashboards and automated reporting systems.',
          icon: <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Predictive Intelligence',
          description: 'Leverage predictive analytics and statistical modeling to forecast trends, identify opportunities, and mitigate potential risks.',
          icon: <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Data-Driven Growth',
          description: 'Make informed decisions based on comprehensive data analysis, leading to improved performance and sustainable business growth.',
          icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'Digital Marketing': {
      description: 'SmartKode&#39;s Digital Marketing services combine data analytics with creative strategies to maximize your online presence. We help businesses reach their target audience effectively through SEO, social media marketing, content strategy, PPC advertising, and comprehensive digital campaigns that achieve measurable growth.',
      keyFeatures: ['SEO & SEM Optimization', 'Social Media Marketing', 'Content Strategy & Creation', 'PPC Advertising', 'Email Marketing', 'Performance Analytics', 'Brand Development', 'Conversion Optimization'],
      benefits: [
        {
          title: 'Data-Driven Strategies',
          description: 'Implement comprehensive marketing strategies based on data analysis, consumer behavior insights, and market research across all digital channels.',
          icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Multi-Channel Approach',
          description: 'Reach your audience across search engines, social media, email, and content marketing for maximum exposure and engagement.',
          icon: <Megaphone className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'ROI Optimization',
          description: 'Maximize return on investment through targeted campaigns, A/B testing, and continuous performance optimization across all marketing channels.',
          icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Brand Growth',
          description: 'Build strong brand presence and recognition in the digital marketplace through strategic marketing initiatives and consistent messaging.',
          icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'DevOps': {
      description: 'SmartKode&#39;s DevOps services streamline your development and operations processes through automation, continuous integration, deployment practices, and infrastructure management. We help organizations achieve faster delivery cycles, improved software quality, and enhanced collaboration between development and operations teams.',
      keyFeatures: ['CI/CD Pipelines', 'Infrastructure as Code', 'Container Orchestration', 'Cloud Migration', 'Monitoring & Logging', 'Security Integration', 'Performance Optimization', 'Automated Testing'],
      benefits: [
        {
          title: 'Automated Deployment',
          description: 'Accelerate software delivery through automated CI/CD pipelines, infrastructure as code, and streamlined development processes.',
          icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Enhanced Collaboration',
          description: 'Foster better collaboration between development and operations teams through DevOps practices and automated workflow integration.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Quality Assurance',
          description: 'Implement automated testing, monitoring, and quality checks to ensure reliable and bug-free software releases with continuous feedback.',
          icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Infrastructure Optimization',
          description: 'Optimize cloud infrastructure management, resource utilization, and cost efficiency through automation and continuous monitoring.',
          icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    'UI/UX Design': {
      description: 'SmartKode creates exceptional user experiences through innovative UI/UX design services. We combine user research, creative design, prototyping, and usability testing to deliver interfaces that delight users, improve conversion rates, and drive business success across web and mobile platforms.',
      keyFeatures: ['User Experience Research', 'UI/UX Design', 'Wireframing & Prototyping', 'Usability Testing', 'Mobile App Design', 'Web Design', 'Design Systems', 'Accessibility Design'],
      benefits: [
        {
          title: 'User-Centered Design',
          description: 'Design intuitive interfaces based on comprehensive user research, behavior analysis, and usability testing for optimal user experience across all platforms.',
          icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Conversion Optimization',
          description: 'Create designs that guide users toward desired actions, improve user engagement, and increase conversion rates through strategic UX design.',
          icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Responsive Design',
          description: 'Develop responsive designs that work seamlessly across desktop, tablet, and mobile devices while maintaining consistent brand identity.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Accessibility Focus',
          description: 'Design inclusive interfaces that are accessible to all users, regardless of their abilities or devices, following WCAG guidelines and best practices.',
          icon: <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
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
    setShowMobileMenu(false);
    setExpandedBenefits({});
  };

  const toggleBenefit = (index: number): void => {
    setExpandedBenefits(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleMobileMenu = (): void => {
    setShowMobileMenu(prev => !prev);
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

  // Render mobile service button
  const renderMobileServiceButton = (): React.ReactElement => (
    <div className="mb-6">
      <button
        onClick={toggleMobileMenu}
        className="w-full bg-black rounded-xl p-4 border border-gray-700 flex items-center justify-between text-white transition-all duration-300 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
        aria-expanded={showMobileMenu}
        aria-controls="mobile-services-menu"
        aria-label="Select service"
      >
        <div className="flex items-center">
          <div className="p-2 bg-gray-800 rounded-lg mr-3 transition-colors duration-300">
            {activeServiceIcon}
          </div>
          <span className="font-semibold text-sm">{activeService}</span>
        </div>
        {showMobileMenu ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {showMobileMenu && (
        <div 
          id="mobile-services-menu"
          className="mt-2 bg-black rounded-xl border border-gray-700 overflow-hidden animate-fade-in"
          role="menu"
        >
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => handleServiceSelect(service.name)}
              className={`w-full p-4 text-left border-b border-gray-700 last:border-b-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                activeService === service.name
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
              }`}
              role="menuitem"
              aria-label={`Select ${service.name}`}
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                  activeService === service.name 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {service.icon}
                </div>
                <span className="font-semibold text-sm">{service.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
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
              Comprehensive AI, web development, and digital solutions engineered to transform your business
            </p>
          </header>

          {/* Mobile Service Selector */}
          {isMobile && renderMobileServiceButton()}

          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Desktop Services Grid */}
            {!isMobile && renderDesktopServicesGrid()}

            {/* Service Details - Full width on mobile */}
            {renderServiceDetails()}
          </div>
        </div>
      </section>
    </>
  );
}
export default ServicesSection;