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

export interface TestimonialImage {
    id: number;
    image: string;
}

export const testimonialImages: TestimonialImage[] = [
    {
        id: 1,
        image: 'https://res.cloudinary.com/my5r7e4y/image/upload/v1783160462/WhatsApp_Image_2026-07-04_at_3.18.23_PM_oaekzy.jpg?w=300&h=400&fit=crop&crop=face',
    },
    {
        id: 2,
        image: 'https://res.cloudinary.com/my5r7e4y/image/upload/v1783160809/WhatsApp_Image_2026-07-04_at_3.25.59_PM_ypcmqc.jpg?w=300&h=400&fit=crop&crop=face',
    },
    {
        id: 3,
        image: 'https://res.cloudinary.com/my5r7e4y/image/upload/v1783161964/WhatsApp_Image_2026-07-04_at_3.45.48_PM_dnan8x.jpg?w=300&h=400&fit=crop&crop=face',
    },
    {
        id: 4,
        image: 'https://res.cloudinary.com/my5r7e4y/image/upload/v1783161705/WhatsApp_Image_2026-07-04_at_3.41.03_PM_ziogly.jpg?w=300&h=400&fit=crop&crop=face',
    },
    {
        id: 5,
        image: 'https://res.cloudinary.com/my5r7e4y/image/upload/v1783161479/WhatsApp_Image_2026-07-04_at_3.35.48_PM_tjqxor.jpg?w=300&h=400&fit=crop&crop=face',
    },
    {
        id: 6,
        image: 'https://res.cloudinary.com/my5r7e4y/image/upload/v1783161171/WhatsApp_Image_2026-07-04_at_3.32.12_PM_k9fzng.jpg?w=300&h=400&fit=crop&crop=face',
    },
    // Add more images below — they will auto-fill into the bell arc:
    // { id: 7, image: 'https://...' },
    // { id: 8, image: 'https://...' },
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

