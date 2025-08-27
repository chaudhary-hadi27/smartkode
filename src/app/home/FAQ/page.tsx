"use client";

import React, { useState, useCallback } from "react";
import {
  Code,
  Shield,
  MessageCircle,
  Zap,
  DollarSign,
  Users,
  Lightbulb,
  Send,
  MessageSquare,
  LucideIcon,
} from "lucide-react";

// ✅ TypeScript Interface for FAQ Items
interface FAQ {
  id: number;
  question: string;
  answer: string;
  icon: LucideIcon;
}

// ✅ Props Interface for FAQCard
interface FAQCardProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

// ✅ FAQ Data (Service-focused only)
const faqs: FAQ[] = [
  {
    id: 1,
    question: "What does SmartKode offer?",
    answer:
      "SmartKode is a service-based AI and software company. We design and develop custom solutions — from AI-powered chatbots to full-stack web and mobile applications — to help businesses grow, automate, and scale.",
    icon: Lightbulb,
  },
  {
    id: 3,
    question: "How do I get started with a project?",
    answer:
      "Just reach out with your idea or business challenge. Our team will schedule a discovery call, understand your requirements, and propose a tailored solution as a service.",
    icon: Send,
  },
  {
    id: 4,
    question: "What technologies do you use?",
    answer:
      "We deliver next-generation AI, data, web, and cloud solutions—powered by GPT, PyTorch, LangChain, React, Node.js, AWS, and more.",
    icon: Code,
  },
  {
    id: 5,
    question: "What are your pricing plans?",
    answer:
      "Our pricing is service-based and depends on the scope, timeline, and technologies used in your project. We don’t offer fixed packages — each quote is personalized.",
    icon: DollarSign,
  },
  {
    id: 6,
    question: "Do you offer support after delivering a service?",
    answer:
      "Yes! We provide post-launch support, maintenance, and updates. Businesses can also opt for extended support and scaling services.",
    icon: MessageCircle,
  },
  {
    id: 7,
    question: "Is SmartKode suitable for startups or small businesses?",
    answer:
      "Absolutely! Whether you need an MVP, process automation, or full-scale digital transformation, we adapt our services to startups, SMEs, and enterprises alike.",
    icon: Users,
  },
  {
    id: 8,
    question: "Do you ensure privacy and security?",
    answer:
      "Yes. We follow best practices for security including authentication layers, data encryption, GDPR-compliant storage, and NDAs when required.",
    icon: Shield,
  },
  {
    id: 9,
    question: "What makes SmartKode different from other service providers?",
    answer:
      "We don’t just deliver code — we build smart, AI-driven services that solve real business challenges, drive automation, and scale with your growth.",
    icon: Zap,
  },
  {
    id: 10,
    question: "How do I contact you for collaboration?",
    answer:
      "You can connect with us through our website, email, or social channels. A dedicated expert will reach out to guide you on the next steps.",
    icon: MessageSquare,
  },
];

// ✅ FAQ Card Component
const FAQCard: React.FC<FAQCardProps> = ({ faq, isOpen, onToggle }) => {
  const Icon = faq.icon;

  return (
    <div className="overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between p-5 text-left transition 
          ${isOpen ? "bg-gray-800" : "bg-black"}`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isOpen ? "bg-white" : "bg-gray-800"}`}>
            <Icon className={`w-5 h-5 ${isOpen ? "text-black" : "text-white"}`} />
          </div>
          <span
            className={`text-lg sm:text-xl font-medium ${
              isOpen ? "text-gray-300" : "text-white"
            }`}
          >
            {faq.question}
          </span>
        </div>
        <span className="text-xl text-white">{isOpen ? "−" : "+"}</span>
      </button>

      <div
        className={`transition-all duration-300 px-6 overflow-hidden ${
          isOpen ? "py-4 max-h-[1000px]" : "max-h-0 py-0"
        }`}
      >
        <p className="text-gray-400 text-base leading-relaxed">{faq.answer}</p>
      </div>

      <hr className="border-gray-700 my-2" />
    </div>
  );
};

// ✅ Main FAQ Section Component
const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = useCallback((id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section className="bg-black text-white py-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-2">
          {faqs.map((faq) => (
            <FAQCard
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
