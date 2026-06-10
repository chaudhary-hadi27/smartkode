'use client';

import TermsHeader from './TermsHeader';
import TermsNavigation from './TermsNavigation';
import TermsFooter from './TermsFooter';
import AcceptanceSection from '../sections/AcceptanceSection';
import ServicesSection from '../sections/ServicesSection';
import AccountsSection from '../sections/AccountsSection';
import UsageSection from '../sections/UsageSection';
import ApiSection from '../sections/ApiSection';
import IpSection from '../sections/IpSection';
import PaymentSection from '../sections/PaymentSection';
import LiabilitySection from '../sections/LiabilitySection';
import TerminationSection from '../sections/TerminationSection';
import ContactSection from '../sections/ContactSection';
import { useTermsNavigation } from '../hooks/useTermsNavigation';
import { NAV_ITEMS, COMPANY_INFO } from '../data/termsData';

export default function TermsOfServiceContainer() {
  const {
    scrollState,
    navContainerRef,
    scrollToSection,
    handleKeyDown,
  } = useTermsNavigation(NAV_ITEMS);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      <TermsHeader
        companyName={COMPANY_INFO.companyName}
        lastUpdated={COMPANY_INFO.lastUpdated}
      />

<TermsNavigation
  navItems={NAV_ITEMS}
  scrollState={scrollState}
  navContainerRef={navContainerRef as React.RefObject<HTMLDivElement>}
  onSectionClick={scrollToSection}
  onKeyDown={handleKeyDown}
/>


      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <AcceptanceSection companyName={COMPANY_INFO.companyName} />
        <ServicesSection />
        <AccountsSection />
        <UsageSection />
        <ApiSection />
        <IpSection companyName={COMPANY_INFO.companyName} />
        <PaymentSection companyName={COMPANY_INFO.companyName} />
        <LiabilitySection companyName={COMPANY_INFO.companyName} />
        <TerminationSection companyName={COMPANY_INFO.companyName} />
        <ContactSection
          contactEmail={COMPANY_INFO.contactEmail}
          supportEmail={COMPANY_INFO.supportEmail}
        />
      </main>

      <TermsFooter
        companyName={COMPANY_INFO.companyName}
        lastUpdated={COMPANY_INFO.lastUpdated}
        jurisdiction={COMPANY_INFO.jurisdiction}
      />

      {/* Custom Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        html {
          scroll-behavior: smooth;
        }

        button:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        @media print {
          .sticky {
            position: relative !important;
          }

          nav {
            display: none !important;
          }

          .bg-black {
            background-color: white !important;
            color: black !important;
          }

          .text-white {
            color: black !important;
          }

          .text-gray-300,
          .text-gray-400 {
            color: #4b5563 !important;
          }
        }
      `}</style>
    </div>
  );
}