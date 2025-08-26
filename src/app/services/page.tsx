"use client";
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha"; // ADD THIS IMPORT
import toast, { Toaster } from "react-hot-toast"; // ADD THIS IMPORT
import {
  Brain,
  Code,
  BarChart3,
  Zap,
  MessageCircle,
  TrendingUp,
  Server,
  Palette,
  LucideIcon,
} from "lucide-react";

// Type definitions for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      parameters?: Record<string, unknown>
    ) => void;
  }
}

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  icon: LucideIcon;
  seoKeywords: string[];
}

const ServicesPage: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>(null); // ADD CAPTCHA STATE
  const [success, setSuccess] = useState(false); // ADD SUCCESS STATE

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Enhanced services data with SEO keywords
  const services: Service[] = [
    {
      id: "ai",
      title: "AI Development",
      description:
        "Custom AI models that solve real business challenges. From machine learning to computer vision, we build intelligent systems that work.",
      image:
        "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343879/ai_j8vo7b.jpg",
      features: [
        "Custom Machine Learning Models",
        "Computer Vision & NLP",
        "AI Model Deployment",
      ],
      icon: Brain,
      seoKeywords: ["AI development", "machine learning", "computer vision", "NLP"],
    },
    {
      id: "web",
      title: "Web Development",
      description:
        "High-performance web platforms built with modern frameworks. Fast, responsive, and designed to scale with your business.",
      image:
        "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343887/web_hlmskm.jpg",
      features: [
        "Next.js & React Applications",
        "Full-Stack Development",
        "Performance Optimization",
      ],
      icon: Code,
      seoKeywords: ["web development", "Next.js", "React", "full-stack"],
    },
    {
      id: "chatbot",
      title: "Chatbot Development",
      description:
        "Intelligent chatbots that engage customers 24/7. Deploy across web, WhatsApp, and messaging platforms.",
      image:
        "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343734/chatbot_pd1xt8.jpg",
      features: [
        "GPT-Powered Chatbots",
        "Multi-Platform Integration",
        "Natural Conversations",
      ],
      icon: MessageCircle,
      seoKeywords: ["chatbot development", "GPT chatbots", "WhatsApp bot"],
    },
    {
      id: "automation",
      title: "Automation Services",
      description:
        "Automate repetitive tasks and streamline workflows. Focus on what matters while we handle the routine work.",
      image:
        "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343696/automation_hq82sz.jpg",
      features: [
        "Process Automation",
        "Workflow Integration",
        "Custom Bot Development",
      ],
      icon: Zap,
      seoKeywords: ["process automation", "workflow automation", "RPA"],
    },
    {
      id: "data",
      title: "Data Analytics",
      description:
        "Transform data into actionable insights. We build dashboards and analytics systems that help you make better decisions.",
      image:
        "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343587/data_sa6wwg.jpg",
      features: [
        "Real-Time Dashboards",
        "Business Intelligence",
        "Predictive Analytics",
      ],
      icon: BarChart3,
      seoKeywords: ["data analytics", "business intelligence", "dashboards"],
    },
    {
      id: "marketing",
      title: "Digital Marketing",
      description:
        "Strategic digital marketing campaigns that drive growth. From social media to SEO, we help you reach your target audience effectively.",
      image:
        "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753903869/digital-marketing_u4rd2a.webp",
      features: [
        "Social Media Marketing",
        "SEO & Content Strategy",
        "PPC Campaign Management",
      ],
      icon: TrendingUp,
      seoKeywords: ["digital marketing", "SEO services", "social media marketing"],
    },
    {
      id: "devops",
      title: "DevOps",
      description:
        "Streamline your development pipeline with modern DevOps practices. Deploy faster, scale better, and maintain reliability.",
      image:
        "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753904008/devops_ybbrwv.jpg",
      features: [
        "CI/CD Pipeline Setup",
        "Cloud Infrastructure",
        "Monitoring & Deployment",
      ],
      icon: Server,
      seoKeywords: ["DevOps services", "CI/CD", "cloud infrastructure"],
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      description:
        "Create intuitive and beautiful user experiences. We design interfaces that users love and businesses need.",
      image:
        "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753903709/UI-UX_tp8ivo.webp",
      features: [
        "User Experience Research",
        "Interface Design",
        "Prototyping & Testing",
      ],
      icon: Palette,
      seoKeywords: ["UI/UX design", "user experience", "interface design"],
    },
  ];

  // Enhanced intersection observer with better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // UPDATED SUBMIT HANDLER TO USE YOUR ACTUAL API
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    const data = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      token: captcha,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      setIsSubmitting(false);

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setCaptcha(null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      } else {
        const errorData = await res.json();
        console.error("Error response:", errorData);
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Network error:", error);
      toast.error("Network error. Please try again later.");
    }
  };

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Enterprise Technology Services",
    "description": "We build intelligent systems that transform businesses. From AI development to cloud infrastructure — we deliver scalable, secure, and future-ready solutions.",
    "serviceType": services.map(service => service.title),
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Technology Services",
      "itemListElement": services.map((service) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description
        }
      }))
    }
  };

  return (
    <>
      <Toaster position="top-right" /> {/* ADD TOAST CONTAINER */}
      
      {/* SEO Head - In a real Next.js app, this would go in the Head component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <div className="bg-black text-white min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-16 py-8 sm:py-12 lg:py-16">
          {/* Hero Section - Enhanced responsive design */}
          <header className="text-center mb-16 sm:mb-20 lg:mb-24 max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 sm:mb-8 leading-tight tracking-tight">
              Enterprise Technology Services
            </h1>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto px-4">
              We build intelligent systems that transform businesses. From AI
              development to cloud infrastructure — we deliver scalable, secure, and
              future-ready solutions.
            </p>
          </header>

          {/* Services Sections - Enhanced responsive layout */}
          <main>
            {services.map((service, index) => (
              <section
                key={service.id}
                id={`service-${index}`}
                data-animate
                className={`flex flex-col ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20 mb-20 sm:mb-24 lg:mb-32`}
                role="region"
                aria-labelledby={`${service.id}-heading`}
              >
                {/* Image Container - Optimized for all screen sizes */}
                <div
                  className={`w-full lg:w-1/2 transition-all duration-700 ease-out ${
                    visibleSections.has(`service-${index}`)
                      ? "opacity-100 translate-x-0"
                      : `opacity-0 ${
                          index % 2 !== 0 ? "translate-x-8 lg:translate-x-12" : "-translate-x-8 lg:-translate-x-12"
                        }`
                  }`}
                >
                  <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/20 via-transparent to-black/40 z-10 pointer-events-none"></div>
                    <picture>
                      <img
                        src={service.image}
                        alt={`${service.title} - Professional ${service.title.toLowerCase()} services`}
                        className={`w-full transition-all duration-700 group-hover:scale-105 ${
                          // Smaller heights for mobile to show text properly, larger for desktop
                          service.id === 'ai' || service.id === 'automation' || service.id === 'data' || service.id === 'uiux'
                            ? 'h-48 sm:h-64 md:h-80 lg:h-[420px] xl:h-[480px] object-cover'
                            : 'h-56 sm:h-72 md:h-88 lg:h-[450px] xl:h-[500px] object-cover'
                        }`}
                        loading={index < 2 ? "eager" : "lazy"}
                        decoding="async"
                        style={{
                          objectPosition: service.id === 'ai' ? 'center 20%' :
                                        service.id === 'web' ? 'center center' :
                                        service.id === 'chatbot' ? 'center center' :
                                        service.id === 'automation' ? 'center 70%' :
                                        service.id === 'data' ? 'center 30%' :
                                        service.id === 'marketing' ? 'center center' :
                                        service.id === 'devops' ? 'center center' :
                                        service.id === 'uiux' ? 'center 25%' : 'center center'
                        }}
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20"></div>
                  </div>
                </div>

                {/* Content - Enhanced typography and spacing */}
                <div
                  className={`w-full lg:w-1/2 transition-all duration-700 delay-200 ease-out ${
                    visibleSections.has(`service-${index}`)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="flex items-center mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center mr-6 text-white shadow-xl border border-zinc-700/50">
                      <service.icon className="w-8 h-8 sm:w-9 sm:h-9" />
                    </div>
                  </div>

                  <h2 
                    id={`${service.id}-heading`}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight tracking-tight"
                  >
                    {service.title}
                  </h2>

                  <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-4 mb-8 sm:mb-10" role="list">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-300">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 border border-zinc-600/50">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-sm sm:text-base md:text-lg leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      // In production, this would navigate to the service detail page
                      if (window.gtag) {
                        window.gtag('event', 'service_interest', {
                          service_name: service.title,
                          service_id: service.id
                        });
                      }
                      alert(`Navigating to ${service.title} details page...`);
                    }}
                    className="group bg-gradient-to-r from-white to-gray-100 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                    <div className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </button>
                </div>
              </section>
            ))}
          </main>

          {/* Contact CTA Section - NOW WORKING WITH YOUR API */}
          <section
            id="contact"
            className="max-w-6xl mx-auto mt-16 sm:mt-20 lg:mt-24 text-center bg-zinc-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-zinc-800"
            role="region"
            aria-labelledby="contact-heading"
          >
            <h2 id="contact-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed max-w-4xl mx-auto">
              Let&apos;s discuss how our technology solutions can accelerate your growth
              and streamline your operations.
            </p>
            <p className="text-sm text-gray-400 mb-6 sm:mb-8 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Trusted by businesses worldwide
            </p>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 text-left max-w-2xl mx-auto">
              <div>
                <label htmlFor="name" className="sr-only">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-sm sm:text-base"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="sr-only">Your Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-sm sm:text-base"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="sr-only">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all resize-vertical text-sm sm:text-base"
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* ADD RECAPTCHA HERE */}
              <div className="pt-2 flex justify-center">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  theme="dark"
                  onChange={(token) => setCaptcha(token)}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !captcha} // DISABLE UNTIL CAPTCHA IS SOLVED
                className="bg-white text-black px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Kickstart My Project
                  </>
                )}
              </button>

              {/* SUCCESS MESSAGE */}
              {success && (
                <div className="text-center p-4 bg-green-900/20 border border-green-700/50 rounded-xl">
                  <p className="text-green-400 font-medium">
                    Message sent successfully! We&apos;ll get back to you soon.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-sm sm:text-base">
              <a
                href="mailto:info@smartkode.io"
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800/30"
                aria-label="Send us an email"
              >
                <MessageCircle className="w-5 h-5" />
                Email Us
              </a>
              <a
                href="https://wa.me/+923004479894"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800/30"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;