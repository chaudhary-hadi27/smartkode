// src/data/careers/careersData.ts
import {
    Briefcase,
    TrendingUp,
    Users,
    Target,
    Zap,
    Shield,
    DollarSign,
    Award,
    type LucideIcon,
} from 'lucide-react';

export interface CareerSection {
    id: string;
    icon: LucideIcon;
    heading: string;
    description: string;
}

export interface CareerBenefit {
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface Position {
    id: string;
    title: string;
    department: string;
    type: 'full-time' | 'contract' | 'internship';
    location: string;
    description: string;
    requirements: string[];
}

export interface CareerPageData {
    title: string;
    subtitle: string;
    heroDescription: string;
    sections?: CareerSection[];
    benefits?: CareerBenefit[];
    positions?: Position[];
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

export const careerPagesData: Record<string, CareerPageData> = {
    main: {
        title: 'Join SmartKode',
        subtitle: 'Build the Future with Us',
        heroDescription: 'We are building intelligent systems that transform businesses. Join a team of innovators, engineers, and problem-solvers shaping the future of AI and technology.',
        sections: [
            {
                id: 'culture',
                icon: Users,
                heading: 'Our Culture',
                description: 'We foster a culture of ownership, excellence, and continuous learning. Every team member contributes to innovation and has the autonomy to lead initiatives.',
            },
            {
                id: 'growth',
                icon: TrendingUp,
                heading: 'Career Growth',
                description: 'We invest in your professional development through mentorship, training, and exposure to cutting-edge technologies. Your growth is our priority.',
            },
            {
                id: 'impact',
                icon: Target,
                heading: 'Real Impact',
                description: 'Work on projects that matter. From AI solutions to enterprise platforms, your work directly influences businesses and creates measurable value.',
            },
        ],
        benefits: [
            {
                title: 'Competitive Compensation',
                description: 'Performance-based salary structure with transparent growth paths and regular reviews.',
                icon: DollarSign,
            },
            {
                title: 'Flexible Work',
                description: 'Remote-first culture with flexible hours. Work from anywhere and maintain work-life balance.',
                icon: Zap,
            },
            {
                title: 'Learning & Development',
                description: 'Access to courses, conferences, and certifications. Continuous investment in your skills.',
                icon: Award,
            },
            {
                title: 'Health & Wellness',
                description: 'Comprehensive health benefits and wellness programs for you and your family.',
                icon: Shield,
            },
        ],
        cta: {
            title: 'Ready to Make an Impact?',
            description: 'Explore open positions and join our team of innovators building the future of intelligent systems.',
            buttonText: 'View Open Positions',
            buttonLink: '/careers/positions',
        },
        seo: {
            title: 'Careers at SmartKode | Join Our Team',
            description: 'Join SmartKode and build intelligent AI solutions. Explore career opportunities in a culture of innovation, growth, and impact.',
            keywords: 'SmartKode careers, AI jobs, software engineer jobs, remote work, tech careers',
        },
    },

    compensation: {
        title: 'Compensation Model',
        subtitle: 'Transparent & Performance-Based',
        heroDescription: 'We believe in rewarding performance and impact. Our compensation model is designed to align your success with company growth.',
        sections: [
            {
                id: 'base-salary',
                icon: DollarSign,
                heading: 'Base Salary',
                description: 'Competitive market-rate salaries based on role, experience, and skills. Regular reviews ensure your compensation grows with your contributions.',
            },
            {
                id: 'performance',
                icon: TrendingUp,
                heading: 'Performance Incentives',
                description: 'Project-based bonuses and performance incentives tied to individual and team achievements. Exceptional work deserves exceptional rewards.',
            },
            {
                id: 'equity',
                icon: Award,
                heading: 'Growth Participation',
                description: 'Senior roles include equity participation and profit-sharing opportunities. Grow with the company and share in our collective success.',
            },
        ],
        cta: {
            title: 'Explore Opportunities',
            description: 'See how your skills and experience translate into competitive compensation at SmartKode.',
            buttonText: 'View Open Positions',
            buttonLink: '/careers/positions',
        },
        seo: {
            title: 'Compensation & Benefits | SmartKode Careers',
            description: 'Transparent, performance-based compensation model with competitive salaries, bonuses, and growth incentives.',
            keywords: 'SmartKode compensation, salary model, tech salaries, performance bonuses',
        },
    },

    positions: {
        title: 'Open Positions',
        subtitle: 'Find Your Next Role',
        heroDescription: 'We are looking for talented individuals to join our team. Explore current opportunities and apply today.',
        positions: [
            {
                id: 'senior-ai-engineer',
                title: 'Senior AI Engineer',
                department: 'Engineering',
                type: 'full-time',
                location: 'Remote',
                description: 'Lead AI/ML initiatives and build scalable intelligent systems using cutting-edge technologies.',
                requirements: [
                    '5+ years in AI/ML engineering',
                    'Expertise in PyTorch, TensorFlow, or similar',
                    'Experience with production ML systems',
                    'Strong Python and software engineering skills',
                ],
            },
            {
                id: 'full-stack-developer',
                title: 'Full-Stack Developer',
                department: 'Engineering',
                type: 'full-time',
                location: 'Remote',
                description: 'Build modern web applications using Next.js, React, and Node.js. Work on end-to-end features.',
                requirements: [
                    '3+ years full-stack development',
                    'React, Next.js, TypeScript expertise',
                    'Backend experience (Node.js, Python)',
                    'Strong problem-solving skills',
                ],
            },
            {
                id: 'devops-engineer',
                title: 'DevOps Engineer',
                department: 'Infrastructure',
                type: 'full-time',
                location: 'Remote',
                description: 'Build and maintain CI/CD pipelines, cloud infrastructure, and deployment automation.',
                requirements: [
                    '4+ years DevOps experience',
                    'AWS, GCP, or Azure expertise',
                    'Kubernetes, Docker, Terraform',
                    'Strong scripting skills (Bash, Python)',
                ],
            },
            {
                id: 'product-designer',
                title: 'Product Designer',
                department: 'Design',
                type: 'full-time',
                location: 'Remote',
                description: 'Design intuitive user experiences for AI-powered products. Own the design process from research to delivery.',
                requirements: [
                    '3+ years product design',
                    'Figma expertise',
                    'UX research experience',
                    'Portfolio showcasing shipped products',
                ],
            },
            {
                id: 'ai-intern',
                title: 'AI Engineering Intern',
                department: 'Engineering',
                type: 'internship',
                location: 'Remote',
                description: '6-month internship working on real AI projects with mentorship from senior engineers.',
                requirements: [
                    'CS/AI background (pursuing degree)',
                    'Python programming skills',
                    'Familiarity with ML concepts',
                    'Passion for AI and learning',
                ],
            },
        ],
        cta: {
            title: 'Don\'t See Your Role?',
            description: 'We are always looking for exceptional talent. Send us your resume and let us explore opportunities.',
            buttonText: 'General Application',
            buttonLink: '/careers/apply',
        },
        seo: {
            title: 'Open Positions | SmartKode Careers',
            description: 'Explore current job openings at SmartKode. Join our team building intelligent AI solutions.',
            keywords: 'SmartKode jobs, AI engineer jobs, full-stack developer, DevOps jobs, remote positions',
        },
    },

    apply: {
        title: 'Apply to SmartKode',
        subtitle: 'Start Your Journey',
        heroDescription: 'Ready to join our team? Submit your application and we will review it within 3-5 business days.',
        cta: {
            title: 'Questions?',
            description: 'Have questions about the application process or specific roles? Reach out to our team.',
            buttonText: 'Contact Careers Team',
            buttonLink: 'mailto:careers@smartkode.io',
        },
        seo: {
            title: 'Apply Now | SmartKode Careers',
            description: 'Apply to join SmartKode. Submit your application and start building intelligent systems with us.',
            keywords: 'SmartKode application, apply jobs, career application, join SmartKode',
        },
    },
};

export const getCareerPageData = (page: string): CareerPageData | null => {
    return careerPagesData[page] || null;
};