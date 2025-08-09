"use client";
import React, { useState } from 'react';
import {
  Code,
  Shield,
  MessageCircle,
  Zap,
  DollarSign,
  Users,
  Lightbulb,
  ClipboardList,
  Send,
  MessageSquare,
  LucideIcon,
} from 'lucide-react';

// ✅ TypeScript Interface for FAQ Items
interface FAQ {
  id: number;
  question: string;
  answer: string;
  icon: LucideIcon;
}

// ✅ FAQ Data
const faqs: FAQ[] = [
  {
    id: 1,
    question: 'What does SmartKode offer?',
    answer:
      'SmartKode is an AI-powered company providing both digital products and custom services. From AI chatbot integrations to full-stack web and mobile applications, we help automate, optimize, and transform businesses.',
    icon: Lightbulb,
  },
  {
    id: 2,
    question: 'Do you provide only services or sell ready-made products too?',
    answer:
      'We offer both! SmartKode delivers ready-to-use AI tools and software products, as well as custom development services tailored to your business needs.',
    icon: ClipboardList,
  },
  {
    id: 3,
    question: 'How do I get started with a project?',
    answer:
      'Simply reach out to us with your idea or business challenge. Our team will set up a discovery call, understand your requirements, and propose a tailored solution.',
    icon: Send,
  },
  {
    id: 4,
    question: 'What technologies do you use?',
    answer:
      'We use React, Next.js, Node.js, Python, FastAPI, Firebase, MongoDB, PostgreSQL, LangChain, HuggingFace, OpenAI, Groq, and more cutting-edge AI and full-stack tools.',
    icon: Code,
  },
  {
    id: 5,
    question: 'What are your pricing plans?',
    answer:
      'Pricing depends entirely on the scope, timeline, and technology used in your project. We don’t follow fixed pricing. Contact us for a personalized quote based on your exact requirements.',
    icon: DollarSign,
  },
  {
    id: 6,
    question: 'Do you offer after-sale support or updates?',
    answer:
      'Yes! We provide post-launch support, maintenance, and updates. You can also opt into our extended support or scaling plans as your product grows.',
    icon: MessageCircle,
  },
  {
    id: 7,
    question: 'Is SmartKode suitable for startups or small businesses?',
    answer:
      'Absolutely! We’ve helped startups, small businesses, and enterprise teams. Whether it’s an MVP, automation, or scaling your tech — we adapt to your needs.',
    icon: Users,
  },
  {
    id: 8,
    question: 'Do you ensure privacy and security?',
    answer:
      'Yes. We implement security best practices like API tokenization, encryption, authentication layers, GDPR-compliant storage, and NDAs when necessary.',
    icon: Shield,
  },
  {
    id: 9,
    question: 'What makes SmartKode different from other companies?',
    answer:
      'We don’t just build software — we build smart, AI-driven systems that scale. We combine deep tech knowledge with real-world problem solving and automation.',
    icon: Zap,
  },
  {
    id: 10,
    question: 'How do I contact you for collaboration?',
    answer:
      'You can contact us via our website, social media, or email. A dedicated expert will get in touch to understand your idea and guide you through next steps.',
    icon: MessageSquare,
  },
];

// ✅ FAQ Card Component
const FAQCard: React.FC<{
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ faq, isOpen, onToggle }) => {
  const Icon = faq.icon;

  return (
    <div className="overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between p-5 text-left transition 
            ${isOpen ? 'bg-gray-800' : 'bg-black'}`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isOpen ? 'bg-white' : 'bg-gray-800'}`}>
            <Icon className={`w-5 h-5 ${isOpen ? 'text-black' : 'text-white'}`} />
          </div>
          <span
            className={`text-lg sm:text-xl font-medium ${
              isOpen ? 'text-gray-300' : 'text-white'
            }`}
          >
            {faq.question}
          </span>
        </div>
        <span className="text-xl text-white">{isOpen ? '−' : '+'}</span>
      </button>

      <div
        className={`transition-all duration-300 px-6 overflow-hidden ${
          isOpen ? 'py-4 max-h-[1000px]' : 'max-h-0 py-0'
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

  const toggleFAQ = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

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
