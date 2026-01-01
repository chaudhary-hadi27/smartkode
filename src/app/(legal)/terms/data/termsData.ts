import { 
  FileText, Zap, Shield, AlertTriangle, Users, Globe, CreditCard, 
  Lock, Mail, AlertCircle
} from 'lucide-react';
import type { NavItem, TermsOfServiceProps, ContactInfo } from '../types';

export const COMPANY_INFO: TermsOfServiceProps = {
  companyName: "SmartKode",
  contactEmail: "info@smartkode.io",
  supportEmail: "support@smartkode.io",
  lastUpdated: "January 31, 2025",
  jurisdiction: "Delaware, United States",
  domain: "smartkode.io"
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'acceptance', label: 'Acceptance', icon: FileText, description: 'Terms acceptance and legal agreement' },
  { id: 'services', label: 'Services', icon: Zap, description: 'Our AI tools and development services' },
  { id: 'accounts', label: 'Accounts', icon: Users, description: 'User registration and account management' },
  { id: 'usage', label: 'Usage Policy', icon: Shield, description: 'Acceptable use guidelines' },
  { id: 'api', label: 'API Terms', icon: Globe, description: 'API usage and technical limitations' },
  { id: 'ip', label: 'IP Rights', icon: Lock, description: 'Intellectual property and ownership' },
  { id: 'payment', label: 'Payment', icon: CreditCard, description: 'Billing and payment terms' },
  { id: 'liability', label: 'Liability', icon: AlertTriangle, description: 'Legal disclaimers and limitations' },
  { id: 'termination', label: 'Termination', icon: AlertCircle, description: 'Account termination policies' },
  { id: 'contact', label: 'Contact', icon: Mail, description: 'Legal and support contact information' }
];

export const CONTACT_METHODS: ContactInfo[] = [
  {
    type: 'email',
    label: 'General Inquiries',
    value: COMPANY_INFO.contactEmail!,
    icon: Mail
  },
  {
    type: 'email',
    label: 'Technical Support',
    value: COMPANY_INFO.supportEmail!,
    icon: Users
  }
];

export const AI_SERVICES = [
  'Custom AI development including machine learning and deep learning solutions',
  'API-based AI models for natural language processing and computer vision',
  'Cutting-edge AI algorithms and neural network implementations'
];

export const DEVELOPMENT_SERVICES = [
  'Full-stack web development using modern frameworks',
  'Intelligent chatbot development with advanced conversational AI',
  'Business process automation and data analytics solutions'
];

// SEO Keywords for SmartKode
export const SEO_KEYWORDS = [
  'SmartKode terms of service',
  'AI tools legal agreement',
  'API usage policy',
  'web development terms',
  'chatbot legal framework',
  'automation services agreement',
  'AI development legal',
  'machine learning terms',
  'artificial intelligence legal',
  'software development contract'
];

// Additional service categories
export const ADDITIONAL_SERVICES = [
  'Digital marketing and SEO optimization',
  'DevOps and cloud infrastructure management',
  'UI/UX design and user experience optimization',
  'Data analytics and business intelligence solutions'
];

// Navigation constants
export const NAV_HEIGHT = 80;
export const SCROLL_OFFSET = 20;
export const SCROLL_TIMEOUT = 1000;

// Legal constants
export const LEGAL_NOTICES = {
  COPYRIGHT: `© 2025 ${COMPANY_INFO.companyName}. All rights reserved.`,
  JURISDICTION: `Governed by the laws of ${COMPANY_INFO.jurisdiction}`,
  LAST_MODIFIED: COMPANY_INFO.lastUpdated,
  EFFECTIVE_DATE: COMPANY_INFO.lastUpdated
};

// Contact response times
export const RESPONSE_TIMES = {
  LEGAL: '48 hours',
  SUPPORT: '24 hours',
  EMERGENCY: '4 hours'
};

// Structured data for SEO
export const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms of Service',
  description: `${COMPANY_INFO.companyName} Terms of Service - Legal framework for AI tools and development services`,
  url: `https://${COMPANY_INFO.domain}/terms`,
  isPartOf: {
    '@type': 'WebSite',
    name: COMPANY_INFO.companyName,
    url: `https://${COMPANY_INFO.domain}`,
  },
  about: {
    '@type': 'Organization',
    name: COMPANY_INFO.companyName,
    url: `https://${COMPANY_INFO.domain}`,
    description: 'AI development company providing cutting-edge artificial intelligence solutions',
    contactPoint: {
      '@type': 'ContactPoint',
      email: COMPANY_INFO.contactEmail,
      contactType: 'Legal',
    },
  },
  datePublished: '2025-01-31',
  dateModified: new Date().toISOString(),
  inLanguage: 'en-US',
};