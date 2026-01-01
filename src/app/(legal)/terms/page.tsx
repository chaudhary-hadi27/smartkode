import type { Metadata } from 'next';
import TermsOfServiceContainer from './components/TermsOfServiceContainer';

export const metadata: Metadata = {
  title: 'Terms of Service | SmartKode - AI Development & Solutions',
  description: 'Comprehensive Terms of Service for SmartKode\'s AI tools, APIs, web development, chatbot solutions, and automation services. Legal framework governing our innovative AI solutions.',
  keywords: 'SmartKode terms of service, AI tools terms, API usage policy, web development terms, chatbot legal, automation services agreement, AI development legal',
  authors: [{ name: 'SmartKode Legal Team', url: 'https://smartkode.io' }],
  publisher: 'SmartKode',
  robots: 'index, follow',
  openGraph: {
    title: 'Terms of Service | SmartKode AI Solutions',
    description: 'Legal terms governing SmartKode\'s AI tools, APIs, and development services. Understand your rights and responsibilities.',
    url: 'https://smartkode.io/terms',
    siteName: 'SmartKode',

    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://smartkode.io/terms',
  },
  other: {
    'article:author': 'SmartKode Legal Team',
    'article:section': 'Legal',
    'article:published_time': '2025-01-31',
    'article:modified_time': new Date().toISOString(),
  },
};

// JSON-LD structured data for better SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms of Service',
  description: 'SmartKode Terms of Service - Legal framework for AI tools and development services',
  url: 'https://smartkode.io/terms',
  isPartOf: {
    '@type': 'WebSite',
    name: 'SmartKode',
    url: 'https://smartkode.io',
  },
  about: {
    '@type': 'Organization',
    name: 'SmartKode',
    url: 'https://smartkode.io',
    description: 'AI development company providing cutting-edge artificial intelligence solutions',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@smartkode.io',
      contactType: 'Legal',
    },
  },
  datePublished: '2025-01-31',
  dateModified: new Date().toISOString(),
  inLanguage: 'en-US',
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TermsOfServiceContainer />
    </>
  );
}