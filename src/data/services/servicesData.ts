// ============================================
// ALL SERVICES DATA - Single Source of Truth
// ============================================
import {
    Brain,
    Code,
    BarChart3,
    Zap,
    MessageCircle,
    TrendingUp,
    Server,
    Palette,
    type LucideIcon,
} from 'lucide-react';

export interface FAQ {
    question: string
    answer: string
}

export interface ServiceSection {
    title: string
    text: string
    image: string
    list: string[]
}

export interface ServiceCard {
    id: string;
    title: string;
    description: string;
    image: string;
    features: string[];
    icon: LucideIcon;
    seoKeywords: string[];
    route: string;
}

export interface ServiceData {
    id: string
    title: string
    description: string
    sections: ServiceSection[]
    faqs: FAQ[]
    seo: {
        title: string
        description: string
        keywords: string
    }
}


export const serviceCards: ServiceCard[] = [
    {
        id: 'ai',
        title: 'AI Development',
        description:
            'Custom AI models that solve real business challenges. From machine learning to computer vision, we build intelligent systems that work.',
        image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343879/ai_j8vo7b.jpg',
        features: [
            'Custom Machine Learning Models',
            'Computer Vision & NLP',
            'AI Model Deployment',
        ],
        icon: Brain,
        seoKeywords: ['AI development', 'machine learning', 'computer vision', 'NLP'],
        route: '/services/ai',
    },
    {
        id: 'web',
        title: 'Web Development',
        description:
            'High-performance web platforms built with modern frameworks. Fast, responsive, and designed to scale with your business.',
        image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343887/web_hlmskm.jpg',
        features: [
            'Next.js & React Applications',
            'Full-Stack Development',
            'Performance Optimization',
        ],
        icon: Code,
        seoKeywords: ['web development', 'Next.js', 'React', 'full-stack'],
        route: '/services/web',
    },
    {
        id: 'chatbot',
        title: 'Chatbot Development',
        description:
            'Intelligent chatbots that engage customers 24/7. Deploy across web, WhatsApp, and messaging platforms.',
        image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343734/chatbot_pd1xt8.jpg',
        features: [
            'GPT-Powered Chatbots',
            'Multi-Platform Integration',
            'Natural Conversations',
        ],
        icon: MessageCircle,
        seoKeywords: ['chatbot development', 'GPT chatbots', 'WhatsApp bot'],
        route: '/services/chatbot',
    },
    {
        id: 'automation',
        title: 'Automation Services',
        description:
            'Automate repetitive tasks and streamline workflows. Focus on what matters while we handle the routine work.',
        image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343696/automation_hq82sz.jpg',
        features: [
            'Process Automation',
            'Workflow Integration',
            'Custom Bot Development',
        ],
        icon: Zap,
        seoKeywords: ['process automation', 'workflow automation', 'RPA'],
        route: '/services/automation',
    },
    {
        id: 'data',
        title: 'Data Analytics',
        description:
            'Transform data into actionable insights. We build dashboards and analytics systems that help you make better decisions.',
        image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343587/data_sa6wwg.jpg',
        features: [
            'Real-Time Dashboards',
            'Business Intelligence',
            'Predictive Analytics',
        ],
        icon: BarChart3,
        seoKeywords: ['data analytics', 'business intelligence', 'dashboards'],
        route: '/services/data',
    },
    {
        id: 'marketing',
        title: 'Digital Marketing',
        description:
            'Strategic digital marketing campaigns that drive growth. From social media to SEO, we help you reach your target audience effectively.',
        image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753903869/digital-marketing_u4rd2a.webp',
        features: [
            'Social Media Marketing',
            'SEO & Content Strategy',
            'PPC Campaign Management',
        ],
        icon: TrendingUp,
        seoKeywords: ['digital marketing', 'SEO services', 'social media marketing'],
        route: '/services/marketing',
    },
    {
        id: 'devops',
        title: 'DevOps',
        description:
            'Streamline your development pipeline with modern DevOps practices. Deploy faster, scale better, and maintain reliability.',
        image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753904008/devops_ybbrwv.jpg',
        features: [
            'CI/CD Pipeline Setup',
            'Cloud Infrastructure',
            'Monitoring & Deployment',
        ],
        icon: Server,
        seoKeywords: ['DevOps services', 'CI/CD', 'cloud infrastructure'],
        route: '/services/devops',
    },
    {
        id: 'uiux',
        title: 'UI/UX Design',
        description:
            'Create intuitive and beautiful user experiences. We design interfaces that users love and businesses need.',
        image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753903709/UI-UX_tp8ivo.webp',
        features: [
            'User Experience Research',
            'Interface Design',
            'Prototyping & Testing',
        ],
        icon: Palette,
        seoKeywords: ['UI/UX design', 'user experience', 'interface design'],
        route: '/services/uiux',
    },
];


export const servicesData: Record<string, ServiceData> = {
    ai: {
        id: 'ai',
        title: 'AI Development Services',
        description: 'Build intelligent systems with SmartKode. From ML pipelines to vision AI and LLMs — we deliver future-ready solutions for real-world impact.',
        sections: [
            {
                title: 'Machine Learning & Deep Learning',
                text: 'From anomaly detection to sales forecasting, our ML/DL services build real-time intelligent models that drive business growth. We specialize in scalable, high-performance solutions across healthcare, fintech, and logistics.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343999/ml_gy19pd.jpg',
                list: [
                    'Custom AI models: CNNs, RNNs, GANs, Transformers',
                    'Real-time predictions & fraud detection systems',
                    'Edge AI deployment (Jetson, Coral)',
                    'TensorFlow, PyTorch, ONNX & cloud-ready ML pipelines',
                ],
            },
            {
                title: 'Natural Language Processing (NLP)',
                text: 'We build NLP solutions like chatbots, language classifiers, document analyzers, and fine-tuned LLMs. Our stack includes OpenAI, HuggingFace, and RAG pipelines to extract meaning from complex texts.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344002/nlp_m7gf4f.webp',
                list: [
                    'Chatbots, RAG systems, summarization engines',
                    'Multilingual support, NER, classification',
                    'LLM fine-tuning (OpenAI, Claude, LLaMA)',
                    'Private document QA and enterprise NLP',
                ],
            },
            {
                title: 'Computer Vision',
                text: 'SmartKode builds vision systems that can see, understand, and act — in real time. Ideal for manufacturing, retail, medtech, and surveillance.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344005/vision_xuuohx.jpg',
                list: [
                    'Face recognition, OCR, license plate readers',
                    'Quality inspection using high-speed cameras',
                    'Retail analytics, footfall tracking, object detection',
                    'Video stream processing, AR/VR visual input',
                ],
            },
        ],
        faqs: [
            {
                question: 'What types of AI projects do you handle?',
                answer: 'We develop predictive systems, vision models, language AI, automation bots, and end-to-end enterprise AI platforms. Each project is tailored to business needs.',
            },
            {
                question: 'How much do AI solutions cost?',
                answer: 'Pricing depends on complexity and scale. We offer packages from MVPs for startups to enterprise-grade deployments, optimized for value and ROI.',
            },
            {
                question: 'Can your AI integrate with existing apps?',
                answer: 'Yes. We provide seamless AI integration with web, mobile, CRMs, ERPs, cloud platforms like AWS, Azure, and more.',
            },
            {
                question: 'Do you use custom AI or third-party APIs?',
                answer: 'Both. We train models with PyTorch, TensorFlow, etc., and can also integrate APIs like GPT-4, Claude, or Gemini — depending on the use-case.',
            },
            {
                question: 'Is my data secure?',
                answer: 'Absolutely. We implement GDPR-compliant protocols, encrypted data pipelines, and NDA-bound confidentiality on every project.',
            },
            {
                question: 'Do you support the AI after deployment?',
                answer: 'Yes, we provide post-deployment support, monitoring, model retraining, and optimization through MLOps pipelines.',
            },
        ],
        seo: {
            title: 'AI Development Services | SmartKode',
            description: 'SmartKode offers scalable AI solutions in Machine Learning, NLP, and Computer Vision. Build intelligent, secure, and cost-efficient AI systems tailored to your industry.',
            keywords: 'AI development, NLP, machine learning, deep learning, computer vision, chatbots, SmartKode, AI Pakistan, OpenAI integration, TensorFlow, PyTorch',
        },
    },

    web: {
        id: 'web',
        title: 'Web Development Services',
        description: 'We build modern websites and full-stack web applications using the latest frameworks — crafted for performance, SEO, and user experience.',
        sections: [
            {
                title: 'Custom Web Applications',
                text: 'From internal business tools to consumer-facing portals, we develop fast, secure, and scalable web apps tailored to your exact needs.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344610/web-app_sphdeh.jpg',
                list: [
                    'Next.js, React, Tailwind, TypeScript',
                    'Real-time systems with WebSockets or Firebase',
                    'Authentication, role management, dashboard design',
                    'API-first development and third-party integrations',
                ],
            },
            {
                title: 'Business & Portfolio Websites',
                text: 'We design high-impact websites that reflect your brand and engage users. Ideal for agencies, startups, and growing companies.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344606/portfolio_o199zf.avif',
                list: [
                    'Fast-loading and SEO-optimized pages',
                    'Animations and transitions (Framer Motion)',
                    'CMS integration for dynamic content',
                    'Analytics, blog, and newsletter support',
                ],
            },
            {
                title: 'E-Commerce & Payment Integration',
                text: 'Launch a modern e-commerce platform with seamless checkout, product filtering, inventory tracking, and responsive design.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344602/ecommerce_kfxbj7.png',
                list: [
                    'Custom carts and product management',
                    'Stripe, PayPal, Razorpay integrations',
                    'Order tracking & admin dashboard',
                    'Secure user authentication',
                ],
            },
        ],
        faqs: [
            {
                question: 'What web technologies do you use?',
                answer: 'We specialize in modern frameworks like Next.js, React, Tailwind CSS, Node.js, Express, and scalable deployment via Vercel, AWS, or Docker-based environments.',
            },
            {
                question: 'Do you build both frontend and backend?',
                answer: 'Yes. We offer full-stack development including API design, admin dashboards, authentication systems, and scalable databases (SQL, MongoDB).',
            },
            {
                question: 'Can you redesign or optimize my existing website?',
                answer: 'Absolutely. We offer redesigns, performance tuning, accessibility improvements, and SEO optimization to boost conversions and UX.',
            },
            {
                question: 'Do you provide e-commerce or CMS solutions?',
                answer: 'Yes, we develop custom e-commerce platforms, Shopify/Stripe integrations, and headless CMS setups using Sanity, Contentful, or Strapi.',
            },
            {
                question: 'Is the website mobile responsive and SEO-optimized?',
                answer: 'Every project we deliver is fully responsive, fast-loading, and SEO-optimized — ensuring high visibility and usability across devices.',
            },
        ],
        seo: {
            title: 'Web Development Services | SmartKode',
            description: 'SmartKode offers full-stack web development using Next.js, React, and modern tools. Build blazing-fast websites, web apps, and e-commerce platforms.',
            keywords: 'Web development, Next.js, React, E-commerce, CMS, SmartKode, Portfolio Websites, SEO optimized web apps',
        },
    },

    chatbot: {
        id: 'chatbot',
        title: 'Chatbot Development Services',
        description: 'Build next-gen conversational AI with SmartKode — from LLM chatbots and support agents to voice-powered virtual assistants.',
        sections: [
            {
                title: 'AI Chatbots for Customer Support',
                text: 'Build powerful LLM-based chatbots that handle customer queries 24/7, provide instant answers, and reduce support costs drastically.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344323/chatbot_fkrokf.avif',
                list: [
                    'OpenAI, Claude, Gemini API integration',
                    'Retrieval-Augmented Generation (RAG)',
                    'Multi-language and tone adaptation',
                    'Zendesk, Intercom, and custom widget support',
                ],
            },
            {
                title: 'Conversational AI for Internal Use',
                text: 'Empower your employees with chatbots that can answer HR questions, onboard team members, or automate ticketing systems.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344327/internal_vnsd9k.webp',
                list: [
                    'Knowledge-based bots with PDF ingestion',
                    'Authentication and access control',
                    'Slack, Teams, and internal tool integration',
                    'Private cloud or on-prem hosting options',
                ],
            },
            {
                title: 'Voice & Multimodal AI Assistants',
                text: 'Create interactive assistants that can hear, speak, see, and understand — ideal for kiosks, e-learning, or accessibility apps.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344330/voice_qc4lwx.jpg',
                list: [
                    'Speech-to-text (Whisper, Google STT)',
                    'Voice cloning and TTS integration',
                    'Camera + CV-based chatbot input',
                    'Frontend UI and animations with WebRTC',
                ],
            },
        ],
        faqs: [
            {
                question: 'What types of chatbots do you build?',
                answer: 'We build custom AI chatbots for customer support, lead generation, education, healthcare, HR, and more — powered by LLMs or rule-based logic.',
            },
            {
                question: 'Can your chatbot work on our website or app?',
                answer: 'Yes. We can deploy chatbots on websites, mobile apps, WhatsApp, Facebook Messenger, Slack, and even custom enterprise systems.',
            },
            {
                question: 'Do you train chatbots on our internal documents?',
                answer: 'Absolutely. We specialize in document-based training using RAG pipelines and vector databases — so the chatbot understands your business deeply.',
            },
            {
                question: 'What technologies do you use for chatbot development?',
                answer: 'We use GPT APIs, LangChain, Pinecone, Whisper, Dialogflow, Rasa, and more — tailored to your project requirements, privacy needs, and budget.',
            },
            {
                question: 'Can the chatbot speak or convert voice to text?',
                answer: 'Yes. We integrate text-to-speech and speech-to-text systems, enabling full voice-based AI assistants for support, kiosks, or apps.',
            },
        ],
        seo: {
            title: 'Chatbot Development Services | SmartKode',
            description: 'SmartKode builds intelligent AI chatbots and assistants for customer support, lead generation, internal tools, and voice-based interaction.',
            keywords: 'AI chatbot, GPT chatbot, voice assistant, LLM chatbot, SmartKode, Chatbot services, WhatsApp bot, Web chat, LangChain bots',
        },
    },

    automation: {
        id: 'automation',
        title: 'Automation Services',
        description: 'We help you automate repetitive tasks, streamline operations, and scale faster using smart bots, scripts, and AI agents.',
        sections: [
            {
                title: 'RPA & Workflow Automation',
                text: 'Automate time-consuming, repetitive business processes using rule-based and AI-driven bots — freeing up your team for high-value work.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344168/rpa_y246cu.png',
                list: [
                    'Robotic Process Automation (RPA)',
                    'Data scraping, document processing',
                    'Invoice, email, form automations',
                    'Human-in-the-loop integrations',
                ],
            },
            {
                title: 'Custom Scripting & Integrations',
                text: 'Build custom scripts that automate everything from file handling and reporting to complex cross-system workflows using APIs and databases.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343887/web_hlmskm.jpg',
                list: [
                    'Python, Node.js, Selenium, Puppeteer',
                    'Automation with Google Sheets, CRMs',
                    'Cloud task schedulers & triggers',
                    'Secure execution environments',
                ],
            },
            {
                title: 'AI-Powered Agents & Smart Workflows',
                text: 'Leverage LLMs and intelligent agents that go beyond traditional rules — combining reasoning, API-calling, and prompt chaining for smarter execution.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344164/agents_ab8fij.jpg',
                list: [
                    'LLM agents (OpenAI, LangChain, AutoGen)',
                    'Customer support & HR automation',
                    'Voice & text command execution',
                    'Multi-step planning and task chaining',
                ],
            },
        ],
        faqs: [
            {
                question: 'What types of automation solutions do you offer?',
                answer: 'We automate repetitive tasks across business functions — from RPA bots for operations to AI-powered workflows, APIs, and agent-based systems.',
            },
            {
                question: 'Do you provide both no-code and code-based automation?',
                answer: 'Yes. We support tools like Zapier, Make, and Power Automate as well as Python, Node.js, Selenium, Puppeteer, and custom scripts for enterprise-grade automation.',
            },
            {
                question: 'Can you automate tasks across multiple apps?',
                answer: 'Absolutely. We integrate with CRMs, spreadsheets, databases, APIs, email services, cloud storage, and more — ensuring seamless cross-platform automation.',
            },
            {
                question: 'Is it possible to build smart AI agents?',
                answer: 'Yes. We build AI agents that combine task automation with reasoning, planning, and decision-making — ideal for customer support, scheduling, and workflows.',
            },
            {
                question: 'How secure is the automation process?',
                answer: 'We follow strict security standards, encrypt sensitive credentials, use secure APIs, and ensure your business logic is fully protected and traceable.',
            },
        ],
        seo: {
            title: 'Automation Services | SmartKode',
            description: 'SmartKode builds automation workflows, RPA bots, and AI agents to streamline operations, reduce cost, and boost productivity across systems.',
            keywords: 'Automation, RPA, AI agents, workflow automation, smart bots, Python automation, SmartKode, business automation services',
        },
    },

    data: {
        id: 'data',
        title: 'Data Analytics Services',
        description: 'From dashboards to predictive modeling — we turn your raw data into powerful business intelligence and decisions.',
        sections: [
            {
                title: 'Business Intelligence & Dashboarding',
                text: 'We build dynamic dashboards and visualization layers that provide real-time, data-driven insights across all departments — enabling faster, smarter decisions.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344464/bi_csywfd.avif',
                list: [
                    'Power BI, Tableau, Looker Studio',
                    'Custom React dashboards with APIs',
                    'Interactive filtering & drill-downs',
                    'Role-based access & secure embedding',
                ],
            },
            {
                title: 'Data Engineering & Warehousing',
                text: 'Set up robust, scalable data pipelines using modern cloud tools and infrastructure to consolidate, clean, and model your data for downstream analytics.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344489/etl_qmljpb.jpg',
                list: [
                    'ETL/ELT with Airflow, DBT, Python',
                    'Data lakes & cloud warehouses (BigQuery, Redshift)',
                    'Structured & unstructured data handling',
                    'Event-driven or batch pipeline support',
                ],
            },
            {
                title: 'Predictive Analytics & ML Insights',
                text: 'Leverage machine learning to forecast sales, churn, user behavior, and demand trends — helping you make strategic decisions powered by AI.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344493/predictive_hfndmv.webp',
                list: [
                    'Classification, regression, clustering',
                    'Sales forecasting, customer segmentation',
                    'Data science using Scikit-learn, XGBoost',
                    'Model interpretation with SHAP & explainable AI',
                ],
            },
        ],
        faqs: [
            {
                question: 'What types of data analytics services do you provide?',
                answer: 'We offer business intelligence dashboards, predictive analytics models, ETL pipelines, data warehouse setup, and real-time reporting — all tailored to your specific business use-case.',
            },
            {
                question: 'Which tools and technologies do you use?',
                answer: 'We work with Python (Pandas, NumPy, Scikit-learn), SQL, Power BI, Tableau, Apache Airflow, DBT, AWS, GCP BigQuery, and more — depending on your tech stack and scalability needs.',
            },
            {
                question: 'Can you clean and transform raw data?',
                answer: 'Absolutely. Our data engineers handle messy, unstructured data and turn it into structured formats via automated pipelines using ETL/ELT processes.',
            },
            {
                question: 'Do you build custom dashboards and reports?',
                answer: 'Yes. We design interactive dashboards and real-time analytics views for KPIs, user behavior, sales trends, and operational metrics using tools like Power BI, Tableau, and custom React dashboards.',
            },
            {
                question: 'Is my data secure with your team?',
                answer: '100%. We follow strict data governance, access control, and secure cloud protocols to ensure your data remains private and fully compliant.',
            },
        ],
        seo: {
            title: 'Data Analytics Services | SmartKode',
            description: 'SmartKode helps businesses unlock insights with predictive analytics, BI dashboards, data engineering pipelines and secure cloud data platforms.',
            keywords: 'Data analytics, Business Intelligence, Power BI, ETL pipelines, SmartKode, Predictive analytics, Cloud data, Data engineering',
        },
    },

    marketing: {
        id: 'marketing',
        title: 'Digital Marketing Services',
        description: 'Reach, engage, and convert your audience. SmartKode delivers modern marketing that is data-driven, creative, and ROI-focused.',
        sections: [
            {
                title: 'SEO & Content Marketing',
                text: 'Boost your visibility with tailored SEO strategies, keyword-optimized content, and on-page/off-page SEO. We create authoritative content that ranks and converts.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753948822/marketing_b6288a.png',
                list: [
                    'Technical SEO audits & site optimization',
                    'Blog & landing page content creation',
                    'Backlink building strategies',
                    'Local SEO & voice search optimization',
                ],
            },
            {
                title: 'Social Media Marketing',
                text: 'Engage your audience on platforms that matter. We craft platform-specific content and run targeted campaigns to grow your brand and drive engagement.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753947946/social-media_buvcnd.jpg',
                list: [
                    'Instagram, Facebook, LinkedIn strategy',
                    'Ad creatives, reels, stories, carousel design',
                    'Influencer collaborations & UGC campaigns',
                    'Social analytics and sentiment tracking',
                ],
            },
            {
                title: 'Performance Ads & PPC',
                text: 'Drive ROI with data-driven ads across Google, Meta, LinkedIn, and more. From keyword research to A/B testing, we optimize every dollar spent.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753948910/Ads_l7w8ut.png',
                list: [
                    'Google Ads, Meta Ads, YouTube, TikTok',
                    'Keyword research & intent targeting',
                    'Landing page optimization (CRO)',
                    'Realtime reporting dashboards',
                ],
            },
        ],
        faqs: [
            {
                question: 'How do you measure digital marketing success?',
                answer: 'We track KPIs like traffic, leads, engagement, conversion rate, CAC, and ROI. Dashboards and monthly reports ensure transparency and impact.',
            },
            {
                question: 'Which platforms do you run ads on?',
                answer: 'We run performance ads across Google, Facebook, Instagram, LinkedIn, YouTube, TikTok, and Twitter/X — based on your target audience.',
            },
            {
                question: 'Do you offer content creation too?',
                answer: 'Yes. We design creatives, write copy, produce blogs, videos, ads, and interactive posts that match your brand voice.',
            },
            {
                question: 'Can you manage my brand social media?',
                answer: 'Absolutely. We provide end-to-end management — content calendars, posting, comments handling, DMs, and performance insights.',
            },
            {
                question: 'Is SEO still important in 2025?',
                answer: 'Yes. SEO is evolving but remains essential. We adapt strategies using AI tools, voice optimization, E-E-A-T principles, and modern link-building.',
            },
        ],
        seo: {
            title: 'Digital Marketing Services | SmartKode',
            description: 'SmartKode offers advanced digital marketing services — SEO, PPC, Social Media, and performance marketing that drives business growth.',
            keywords: 'digital marketing, SEO, PPC, social media marketing, content strategy, SmartKode marketing, Google Ads, Meta Ads, Pakistan marketing agency',
        },
    },

    devops: {
        id: 'devops',
        title: 'DevOps & Infrastructure Automation',
        description: 'Automate deployments, manage cloud infrastructure, and enable high-velocity teams with scalable DevOps workflows.',
        sections: [
            {
                title: 'CI/CD Pipeline Automation',
                text: 'Streamline your software delivery lifecycle with fully automated Continuous Integration and Continuous Deployment pipelines.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753949201/cicd_mab5ji.jpg',
                list: [
                    'GitHub Actions, GitLab CI/CD, Jenkins, CircleCI',
                    'Staging, production & rollback flows',
                    'Auto testing, linting, and approvals',
                    'Secure artifact & image deployments',
                ],
            },
            {
                title: 'Infrastructure as Code (IaC)',
                text: 'We codify your infrastructure using Terraform, Pulumi, or AWS CloudFormation, enabling reproducible, scalable, and secure deployments.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753949440/iac_f2oblr.jpg',
                list: [
                    'Terraform modules & workspaces',
                    'Pulumi for multi-cloud automation',
                    'AWS CDK & CloudFormation stacks',
                    'Drift detection & policy enforcement',
                ],
            },
            {
                title: 'Kubernetes & Cloud Orchestration',
                text: 'SmartKode builds secure, auto-scaling clusters with Helm, K8s, and ECS. From dev clusters to multi-region production environments.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753949734/kco_p8ssu9.png',
                list: [
                    'Kubernetes on EKS, GKE, AKS, or on-prem',
                    'Helm charts & secrets management',
                    'Horizontal pod autoscaling (HPA)',
                    'Load balancing & ingress controllers',
                ],
            },
        ],
        faqs: [
            {
                question: 'What DevOps tools do you work with?',
                answer: 'We use GitHub Actions, GitLab CI, Jenkins, Docker, Kubernetes, Terraform, Ansible, Prometheus, Grafana, and more.',
            },
            {
                question: 'Do you support AWS, Azure, or GCP?',
                answer: 'Yes. We deploy and manage DevOps solutions across all major cloud platforms including AWS, Microsoft Azure, and Google Cloud.',
            },
            {
                question: 'Can you automate our deployment pipelines?',
                answer: 'Absolutely. We specialize in setting up automated CI/CD workflows tailored to your development stack and infrastructure.',
            },
            {
                question: 'How do you handle infrastructure security?',
                answer: 'We use IaC with security modules, enforce role-based access, and integrate vulnerability scanning and auditing into CI/CD.',
            },
            {
                question: 'Can you migrate our infrastructure to containers?',
                answer: 'Yes, we help containerize legacy applications using Docker and orchestrate them using Kubernetes or ECS.',
            },
            {
                question: 'Do you offer monitoring and alerting?',
                answer: 'Yes. We set up full observability stacks using Prometheus, Grafana, ELK, and integrate alerts with Slack, PagerDuty, or email.',
            },
        ],
        seo: {
            title: 'DevOps Services | SmartKode',
            description: 'SmartKode provides scalable DevOps and infrastructure automation services. Build CI/CD pipelines, manage Kubernetes, and deploy with security and speed.',
            keywords: 'DevOps, CI/CD, Kubernetes, Docker, Terraform, GitHub Actions, Infrastructure as Code, SmartKode, CloudOps, AWS, Azure, GCP',
        },
    },

    uiux: {
        id: 'uiux',
        title: 'UI/UX Design Services',
        description: 'Elevate your digital product with pixel-perfect UI and smooth, human-centered UX — all designed by our expert team.',
        sections: [
            {
                title: 'User Interface Design',
                text: 'Craft sleek, intuitive, and visually engaging UI that aligns with your brand and engages your users on every screen size.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753949910/ui_hcp1ci.png',
                list: [
                    'Mobile-first & responsive design',
                    'Design systems & UI kits',
                    'Dark/light mode support',
                    'Component-based Figma structures',
                ],
            },
            {
                title: 'User Experience Strategy',
                text: 'We analyze user journeys and pain points to design experiences that feel seamless, natural, and result in higher engagement.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753950009/ues_lzwgvd.avif',
                list: [
                    'Persona creation & journey mapping',
                    'UX audits & heuristic evaluations',
                    'Information architecture design',
                    'Conversion-focused layouts',
                ],
            },
            {
                title: 'Prototyping & Interaction',
                text: 'Bring your ideas to life with interactive prototypes. Test, validate, and iterate before development begins.',
                image: 'https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753950075/pat_hqeyzs.jpg',
                list: [
                    'Interactive Figma/InVision prototypes',
                    'Microinteractions & motion design',
                    'Usability testing & feedback loops',
                    'Stakeholder demo-ready flows',
                ],
            },
        ],
        faqs: [
            {
                question: 'What tools do you use for UI/UX design?',
                answer: 'We use Figma, Adobe XD, Sketch, and InVision to create interactive and pixel-perfect designs that follow modern UI/UX principles.',
            },
            {
                question: 'Do you provide both design and development?',
                answer: 'Yes. We offer full-stack service — from wireframes and prototypes to responsive frontend development in React, Next.js, and Tailwind CSS.',
            },
            {
                question: 'Can you improve our existing UI/UX?',
                answer: 'Absolutely. We conduct audits and usability testing to refine your product interface, user journey, and overall experience.',
            },
            {
                question: 'Do you follow accessibility standards?',
                answer: 'Yes. We follow WCAG and ADA accessibility guidelines to ensure inclusive, barrier-free user experiences across all devices.',
            },
            {
                question: 'How do you handle revisions and feedback?',
                answer: 'We work collaboratively via Figma and Slack/Notion, and offer multiple review cycles to ensure you are fully satisfied with the result.',
            },
            {
                question: 'Can you build clickable prototypes?',
                answer: 'Yes. We create interactive Figma prototypes that simulate real product flows before a single line of code is written.',
            },
        ],
        seo: {
            title: 'UI/UX Design Services | SmartKode',
            description: 'SmartKode designs intuitive, engaging UI/UX experiences. From wireframes to interactive prototypes, we craft user-centered digital products that convert and delight.',
            keywords: 'UI UX design, Figma, UX strategy, mobile design, prototype, accessibility, web app design, SmartKode',
        },
    },
}

// Helper function to get service by ID
export const getServiceData = (id: string): ServiceData | null => {
    return servicesData[id] || null
}