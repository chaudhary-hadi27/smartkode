// src/data/home/homeData.ts
import {
    Lightbulb,
    ClipboardList,
    LayoutTemplate,
    BrainCircuit,
    Rocket,
    Code,
    Shield,
    MessageCircle,
    Zap,
    Users,
    Globe,
    CreditCard,
    Mail,
    type LucideIcon,
} from 'lucide-react';

// Hero rotating texts
export const heroRotatingTexts = [
    'See the invisible',
    'Understand complexity',
    'Predict the future',
    'Transform data into insights',
];

// Approach Steps
export interface ApproachStep {
    id: number;
    step: string;
    heading: string;
    description: string;
    icon: LucideIcon;
}

export const approachSteps: ApproachStep[] = [
    {
        id: 1,
        step: 'Step 1',
        heading: 'Discover Key Insights',
        description: 'We begin by identifying key problems, opportunities, and goals.',
        icon: Lightbulb,
    },
    {
        id: 2,
        step: 'Step 2',
        heading: 'Organize Ideas Clearly',
        description: 'Ideas and feedback are structured into focused solutions.',
        icon: ClipboardList,
    },
    {
        id: 3,
        step: 'Step 3',
        heading: 'Design & Wireframe',
        description: 'We visualize interfaces and flows that align with the plan.',
        icon: LayoutTemplate,
    },
    {
        id: 4,
        step: 'Step 4',
        heading: 'Build the Solution',
        description: 'Our team develops the system with precision and adaptability.',
        icon: BrainCircuit,
    },
    {
        id: 5,
        step: 'Step 5',
        heading: 'Launch & Improve',
        description: 'Final product is deployed, monitored, and refined as needed.',
        icon: Rocket,
    },
];

// Testimonials
export interface Testimonial {
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

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Chief Technology Officer',
        company: 'TechCorp Industries',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        content: 'SmartKode.io transformed our entire digital infrastructure with their AI-powered solutions. The predictive analytics they implemented increased our operational efficiency by 300%. Their team\'s expertise in machine learning is absolutely phenomenal.',
        project: 'AI-Powered Analytics Platform',
        result: '300% efficiency increase',
        industry: 'Technology',
        location: 'San Francisco, USA',
        highlight: 'AI Innovation Leader',
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Head of Digital Innovation',
        company: 'Global Finance Corp',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        content: 'Working with SmartKode.io was a game-changer for our fintech platform. Their custom software development and DevOps implementation reduced our deployment time from weeks to hours. The security measures they implemented are military-grade.',
        project: 'Fintech Platform Development',
        result: '95% faster deployment',
        industry: 'Financial Services',
        location: 'New York, USA',
        highlight: 'Security Excellence',
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'VP of Product Development',
        company: 'HealthTech Solutions',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        content: 'The computer vision and NLP solutions SmartKode.io developed for our healthcare platform are revolutionary. Their chatbot handles 80% of patient inquiries automatically, and the diagnostic accuracy has improved by 40%.',
        project: 'Healthcare AI Platform',
        result: '40% diagnostic improvement',
        industry: 'Healthcare',
        location: 'Boston, USA',
        highlight: 'Healthcare Innovation',
    },
    {
        id: 4,
        name: 'David Kumar',
        role: 'CEO & Founder',
        company: 'E-Commerce Plus',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        content: 'SmartKode.io\'s big data analytics and machine learning algorithms revolutionized our customer experience. Sales increased by 250% after implementing their recommendation engine. Their UI/UX design is world-class.',
        project: 'E-Commerce ML Platform',
        result: '250% sales increase',
        industry: 'E-Commerce',
        location: 'London, UK',
        highlight: 'Revenue Growth',
    },
    {
        id: 5,
        name: 'Lisa Thompson',
        role: 'Chief Data Officer',
        company: 'Manufacturing Pro',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        content: 'The predictive modeling and IoT integration SmartKode.io delivered exceeded all expectations. Equipment downtime reduced by 60%, and maintenance costs dropped significantly. Their team understands complex industrial requirements perfectly.',
        project: 'Industrial IoT Platform',
        result: '60% downtime reduction',
        industry: 'Manufacturing',
        location: 'Germany',
        highlight: 'Industrial Excellence',
    },
    {
        id: 6,
        name: 'James Wilson',
        role: 'Digital Transformation Lead',
        company: 'Retail Innovations',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        content: 'SmartKode.io\'s omnichannel digital marketing strategy and custom software solutions transformed our retail operations. Customer engagement increased by 180%, and our mobile app now has 5-star ratings consistently.',
        project: 'Omnichannel Retail Platform',
        result: '180% engagement boost',
        industry: 'Retail',
        location: 'Toronto, Canada',
        highlight: 'Customer Experience',
    },
];

// FAQ Data
export interface FAQ {
    id: number;
    question: string;
    answer: string;
    icon: LucideIcon;
}

export const faqs: FAQ[] = [
    {
        id: 1,
        question: 'What does SmartKode offer?',
        answer: 'SmartKode is a service-based AI and software company. We design and develop custom solutions — from AI-powered chatbots to full-stack web and mobile applications — to help businesses grow, automate, and scale.',
        icon: Lightbulb,
    },
    {
        id: 3,
        question: 'How do I get started with a project?',
        answer: 'Just reach out with your idea or business challenge. Our team will schedule a discovery call, understand your requirements, and propose a tailored solution as a service.',
        icon: Mail,
    },
    {
        id: 4,
        question: 'What technologies do you use?',
        answer: 'We deliver next-generation AI, data, web, and cloud solutions—powered by GPT, PyTorch, LangChain, React, Node.js, AWS, and more.',
        icon: Code,
    },
    {
        id: 5,
        question: 'What are your pricing plans?',
        answer: 'Our pricing is service-based and depends on the scope, timeline, and technologies used in your project. We don\'t offer fixed packages — each quote is personalized.',
        icon: CreditCard,
    },
    {
        id: 6,
        question: 'Do you offer support after delivering a service?',
        answer: 'Yes! We provide post-launch support, maintenance, and updates. Businesses can also opt for extended support and scaling services.',
        icon: MessageCircle,
    },
    {
        id: 7,
        question: 'Is SmartKode suitable for startups or small businesses?',
        answer: 'Absolutely! Whether you need an MVP, process automation, or full-scale digital transformation, we adapt our services to startups, SMEs, and enterprises alike.',
        icon: Users,
    },
    {
        id: 8,
        question: 'Do you ensure privacy and security?',
        answer: 'Yes. We follow best practices for security including authentication layers, data encryption, GDPR-compliant storage, and NDAs when required.',
        icon: Shield,
    },
    {
        id: 9,
        question: 'What makes SmartKode different from other service providers?',
        answer: 'We don\'t just deliver code — we build smart, AI-driven services that solve real business challenges, drive automation, and scale with your growth.',
        icon: Zap,
    },
    {
        id: 10,
        question: 'How do I contact you for collaboration?',
        answer: 'You can connect with us through our website, email, or social channels. A dedicated expert will reach out to guide you on the next steps.',
        icon: Globe,
    },
];

// Trusted Companies
export interface Company {
    name: string;
    industry: string;
    logo: {
        type: string;
        design: string;
        color: string;
    };
}

export const trustedCompanies: Company[] = [
    { name: 'SwiftCargo', industry: 'Logistics', logo: { type: 'shape', design: 'truck', color: 'from-blue-600 to-blue-800' } },
    { name: 'Vertex Consulting', industry: 'Business Advisory', logo: { type: 'geometric', design: 'hexagon', color: 'from-green-600 to-green-800' } },
    { name: 'CodeCraft Studios', industry: 'Software Development', logo: { type: 'tech', design: 'circuit', color: 'from-purple-600 to-purple-800' } },
    { name: 'BrandBoost Agency', industry: 'Marketing', logo: { type: 'marketing', design: 'megaphone', color: 'from-red-500 via-orange-500 to-yellow-500' } },
    { name: 'TechFlow Systems', industry: 'IT Solutions', logo: { type: 'grid', design: 'squares', color: 'from-indigo-600 to-indigo-800' } },
    { name: 'FlashDelivery', industry: 'Courier Services', logo: { type: 'speed', design: 'lightning', color: 'from-orange-600 to-orange-800' } },
    { name: 'MegaMart', industry: 'Retail Chain', logo: { type: 'shopping', design: 'cart', color: 'from-emerald-600 to-emerald-800' } },
    { name: 'StyleHub', industry: 'Fashion Retail', logo: { type: 'shopping', design: 'bag', color: 'from-pink-600 to-rose-600' } },
    { name: 'UrbanBuilders', industry: 'Construction', logo: { type: 'building', design: 'tower', color: 'from-yellow-600 to-yellow-800' } },
    { name: 'DevCore Technologies', industry: 'Software', logo: { type: 'code', design: 'brackets', color: 'from-cyan-600 to-cyan-800' } },
    { name: 'NexGen Solutions', industry: 'Consulting', logo: { type: 'puzzle', design: 'connect', color: 'from-teal-600 to-teal-800' } },
    { name: 'FreshMart Express', industry: 'Grocery Retail', logo: { type: 'shopping', design: 'store', color: 'from-green-500 to-lime-600' } },
];