// src/data/about/aboutData.ts
import {
    Lightbulb,
    Target,
    Users,
    TrendingUp,
    Shield,
    Zap,
    ChartColumnIncreasing,
    type LucideIcon
} from 'lucide-react';

export interface AboutSection {
    id: string;
    icon: LucideIcon;
    heading: string;
    description: string;
    gradient?: string;
}

export interface AboutFeature {
    title: string;
    description: string;
}

export interface FounderInfo {
    name: string;
    role: string;
    image: string;
    description: string;
}

export interface AboutPageData {
    title: string;
    subtitle: string;
    heroDescription: string;
    founder?: FounderInfo;
    sections: AboutSection[];
    features?: AboutFeature[];
    techStack?: { name: string; logo: string }[];
    cta?: {
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
    };
    seo: {
        title: string;
        description: string;
        keywords: string;
    };
}

export const aboutPagesData: Record<string, AboutPageData> = {
    main: {
        title: 'Powering Innovation. Delivering Intelligence.',
        subtitle: '',
        heroDescription: 'At SmartKode, we design intelligent systems that transform industries — driven by purpose, engineered with precision.',
        founder: {
            name: 'Hadi',
            role: 'Founder & AI Architect',
            image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1769090723/hadi_atnqgp.jpg',
            description: 'Building intelligent software with clean code, scalable systems, and meaningful innovation in AI and data.',
        },

        sections: [
            {
                id: 'mission',
                icon: Target,
                heading: 'Mission',
                description: 'To build AI-first, scalable solutions that simplify complexity and empower businesses through smart automation, web, and data.',
                gradient: 'from-blue-500 to-purple-600',
            },
            {
                id: 'vision',
                icon: ChartColumnIncreasing,
                heading: 'Vision',
                description: 'We envision a world where intelligent systems empower every idea with clean architecture, ethical AI, and impactful outcomes.',
                gradient: 'from-purple-500 to-pink-600',
            },
        ],
        features: [
            {
                title: 'Integrity',
                description: 'Transparent communication and quality-first execution in every solution.',
            },
            {
                title: 'Precision',
                description: 'We build tech with thoughtful design, clean architecture, and scalability in mind.',
            },
            {
                title: 'Innovation',
                description: 'We embrace evolving technologies with curiosity, discipline, and experimentation.',
            },
        ],
        cta: {
            title: 'Explore Our Mission',
            description: 'See how our systems-thinking approach, clean architecture, and AI-first mindset help businesses scale meaningfully.',
            buttonText: 'Visit Mission Page',
            buttonLink: '/about/mission',
        },
        seo: {
            title: 'About SmartKode | AI & Technology Solutions',
            description: 'SmartKode builds intelligent, scalable systems powered by AI. Meet our team and explore our mission, vision, and innovative technology stack.',
            keywords: 'SmartKode, AI company, technology solutions, about us, mission, vision, AI development',
        },
    },

    mission: {
        title: 'Our Mission',
        subtitle: '',
        heroDescription: 'At SmartKode, we build systems that empower people and simplify complexity — blending automation, design, and intelligence.',
        sections: [
            {
                id: 'why',
                icon: Lightbulb,
                heading: 'Why We Exist',
                description: 'We exist to turn ideas into intelligent systems — using clean code, AI, and creativity. We don\'t just ship features — we craft enduring software.',
                gradient: 'from-blue-500 to-cyan-600',
            },
            {
                id: 'who',
                icon: Users,
                heading: 'Who We Serve',
                description: 'Startups, agencies, and enterprises looking to build scalable tech — from zero to launch and beyond. We\'re not your vendor — we\'re your partner.',
                gradient: 'from-green-500 to-teal-600',
            },
        ],
        features: [
            {
                title: 'AI-first Engineering',
                description: 'We create intelligent systems with precision — merging design, data, and automation.',
            },
            {
                title: 'Scalable Platforms',
                description: 'From MVPs to enterprise systems — we build tech that evolves with your business.',
            },
            {
                title: 'Clean Architecture',
                description: 'We write systems like we mean it: clean, modular, and built for the long run.',
            },
            {
                title: 'Human-Centered UX',
                description: 'We care about elegance — blending usability, accessibility, and performance.',
            },
        ],
        cta: {
            title: 'Driven by Principles',
            description: 'At the core of every system we build lies a clear vision and set of values that guide our work and relationships. Dive deeper into what shapes us.',
            buttonText: 'Explore Vision & Values',
            buttonLink: '/about/vision',
        },
        seo: {
            title: 'Our Mission | SmartKode',
            description: 'SmartKode\'s mission is to build intelligent, scalable solutions that empower businesses through AI, automation, and clean architecture.',
            keywords: 'SmartKode mission, AI development, scalable solutions, technology mission',
        },
    },

    vision: {
        title: 'Vision & Values',
        subtitle: '',
        heroDescription: 'Our north star is clear — to build intelligent, ethical systems that elevate industries and empower people through simplicity, automation, and trust.',
        sections: [
            {
                id: 'vision-detail',
                icon: ChartColumnIncreasing,
                heading: 'Our Vision',
                description: 'At SmartKode, we envision a world where software isn\'t just a tool — it\'s a trusted partner in decision-making, creativity, and scale. We build AI-first, data-driven platforms with precision and ethical design at the core. Our goal is to reduce operational friction and unlock the full potential of businesses — using intelligent automation, clean interfaces, and systems that scale with integrity.',
                gradient: 'from-purple-500 to-pink-600',
            },
        ],
        features: [
            {
                title: 'Ethical Engineering',
                description: 'We write code with intention and build systems that respect users, data, and society.',
            },
            {
                title: 'Simplicity by Design',
                description: 'Less noise. More clarity. Every interface and backend is structured for ease and scale.',
            },
            {
                title: 'Scalable Architecture',
                description: 'We build for today and engineer for tomorrow — always ready for growth and change.',
            },
            {
                title: 'Transparency & Trust',
                description: 'Every interaction — internal or external — is shaped by honesty and accountability.',
            },
            {
                title: 'Performance as Priority',
                description: 'Clean code, fast load times, modular services — we optimize at every layer.',
            },
            {
                title: 'Innovation Through Curiosity',
                description: 'We explore, prototype, and iterate with discipline to stay ahead of change.',
            },
        ],
        cta: {
            title: 'Our People Make It Possible',
            description: 'Behind every system, there\'s a dedicated team. Get to know the minds and hearts shaping our vision every day.',
            buttonText: 'Company Culture & Values',
            buttonLink: '/about/culture',
        },
        seo: {
            title: 'Vision & Values | SmartKode',
            description: 'SmartKode\'s vision and core values drive our ethical AI engineering and scalable, intelligent systems.',
            keywords: 'SmartKode vision, company values, ethical AI, scalable systems',
        },
    },

    culture: {
        title: 'Our Culture',
        subtitle: '',
        heroDescription: 'At SmartKode, our culture is a strategic foundation that informs every initiative, decision, and collaboration. It is shaped by principles that foster responsibility, innovation, and meaningful impact.',
        sections: [
            {
                id: 'ownership',
                icon: Users,
                heading: 'Culture of Ownership',
                description: 'Every team member is encouraged to take full responsibility and initiative. We value autonomy backed by accountability and believe in empowering individuals to lead and contribute beyond defined roles.',
                gradient: 'from-blue-500 to-cyan-600',
            },
            {
                id: 'excellence',
                icon: Shield,
                heading: 'Commitment to Excellence',
                description: 'We emphasize precision, clarity, and efficiency in every deliverable. Whether it\'s code, design, or communication — we strive for high standards and continuous refinement in our work.',
                gradient: 'from-green-500 to-teal-600',
            },
            {
                id: 'learning',
                icon: Lightbulb,
                heading: 'Continuous Learning',
                description: 'Curiosity and professional growth are embedded in our workflow. Through ongoing learning, team-driven discussions, and exposure to new technologies, we build both expertise and adaptability.',
                gradient: 'from-purple-500 to-pink-600',
            },
            {
                id: 'collaboration',
                icon: Users,
                heading: 'People-Centric Collaboration',
                description: 'We prioritize clarity, respect, and alignment over rigid structures. Our collaborative culture promotes openness, fast decision-making, and synergy across departments.',
                gradient: 'from-orange-500 to-red-600',
            },
        ],
        cta: {
            title: 'Culture That Reflects Excellence and Integrity',
            description: 'SmartKode\'s culture is the foundation of everything we build. Dive deeper into the principles and impact that drive our team forward.',
            buttonText: 'Discover Our Impact',
            buttonLink: '/about/impact',
        },
        seo: {
            title: 'Our Culture | SmartKode',
            description: 'SmartKode\'s culture is rooted in ownership, excellence, learning, and people-first collaboration.',
            keywords: 'SmartKode culture, company culture, team values, collaboration',
        },
    },

    impact: {
        title: 'Impact & Innovation',
        subtitle: '',
        heroDescription: 'At SmartKode, impact is measured not just by results, but by how those results are achieved — through innovation, intelligence, and intentional design. We build solutions that scale, inspire, and evolve.',
        sections: [
            {
                id: 'acceleration',
                icon: Zap,
                heading: 'Technological Acceleration',
                description: 'We invest in emerging technologies to accelerate transformation and drive measurable outcomes. Our solutions are engineered for performance, reliability, and continuous scalability across industries.',
                gradient: 'from-blue-500 to-purple-600',
            },
            {
                id: 'ai-intelligence',
                icon: Lightbulb,
                heading: 'AI-Powered Intelligence',
                description: 'Artificial Intelligence is central to our innovation strategy. From predictive systems to intelligent automation, we apply data-driven intelligence to create smarter user experiences and operational efficiency.',
                gradient: 'from-purple-500 to-pink-600',
            },
            {
                id: 'problem-solving',
                icon: Target,
                heading: 'Global Problem Solving',
                description: 'Our work addresses real-world challenges — from sustainability and cybersecurity to healthcare and digital equity. We believe that meaningful impact is achieved when innovation is aligned with global responsibility.',
                gradient: 'from-green-500 to-teal-600',
            },
            {
                id: 'value-creation',
                icon: TrendingUp,
                heading: 'Measurable Value Creation',
                description: 'Every initiative at SmartKode is built with purpose and measurable outcomes in mind. We continuously optimize systems, workflows, and strategies to maximize value for clients, stakeholders, and users.',
                gradient: 'from-orange-500 to-red-600',
            },
        ],
        cta: {
            title: 'Innovation with Purpose. Impact with Precision.',
            description: 'Partner with SmartKode to deliver solutions that are future-ready, data-informed, and designed to make a difference. Innovation is not an option — it\'s our responsibility.',
            buttonText: 'Contact Us',
            buttonLink: '/contact',
        },
        seo: {
            title: 'Impact & Innovation | SmartKode',
            description: 'SmartKode drives impact through technological acceleration, AI-powered intelligence, and global innovation.',
            keywords: 'SmartKode impact, innovation, AI intelligence, technology acceleration',
        },
    },
};

export const getAboutPageData = (page: string): AboutPageData | null => {
    return aboutPagesData[page] || null;
};