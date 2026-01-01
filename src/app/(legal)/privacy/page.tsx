import { Metadata } from 'next';
import PrivacyPolicyClient from './components/PrivacyPolicyClient';
import { privacyConfig } from './config/privacy-config';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Privacy Policy - SmartKode | AI Development Platform',
  description: 'Comprehensive privacy policy for SmartKode AI development platform. Learn how we collect, use, and protect your data with transparency and trust.',
  keywords: [
    'privacy policy',
    'data protection',
    'AI privacy',
    'SmartKode privacy',
    'data security',
    'GDPR compliance',
    'user rights',
    'data collection',
    'artificial intelligence privacy'
  ],
  authors: [{ name: 'SmartKode Team' }],
  creator: 'SmartKode',
  publisher: 'SmartKode',
  openGraph: {
    title: 'Privacy Policy - SmartKode',
    description: 'Transparency and trust form the foundation of our relationship with you. Learn about our privacy practices.',
    url: 'https://smartkode.io/privacy',
    siteName: 'SmartKode',
    type: 'website',
    images: [
      {
        url: '/images/privacy-og.png',
        width: 1200,
        height: 630,
        alt: 'SmartKode Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - SmartKode',
    description: 'Comprehensive privacy policy for SmartKode AI development platform.',
    images: ['/images/privacy-twitter.png'],
    creator: '@smartkode',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://smartkode.io/privacy',
  },
  category: 'Legal',
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy',
  description: 'SmartKode Privacy Policy - How we collect, use, and protect your data',
  url: 'https://smartkode.io/privacy',
  mainEntity: {
    '@type': 'PrivacyPolicy',
    name: 'SmartKode Privacy Policy',
    description: 'Comprehensive privacy policy covering data collection, usage, sharing, and user rights',
    datePublished: '2025-08-02',
    dateModified: '2025-08-02',
    publisher: {
      '@type': 'Organization',
      name: 'SmartKode',
      url: 'https://smartkode.io',
    },
  },
};

export default function PrivacyPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Privacy Policy Component */}
      <PrivacyPolicyClient 
        companyName={privacyConfig.companyName}
        contactEmail={privacyConfig.contactEmail}
        urgentEmail={privacyConfig.urgentEmail}
        lastUpdated={privacyConfig.lastUpdated}
      />
    </>
  );
}