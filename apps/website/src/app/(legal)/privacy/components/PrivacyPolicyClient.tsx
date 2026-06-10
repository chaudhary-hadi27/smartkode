"use client";
import React, { RefObject } from 'react';
import { PrivacyPolicyProps, NavItem } from '../types/privacy.types';
import { navItems } from '../config/privacy-config';
import { useScrollNavigation } from '../hooks/useScrollNavigation';
import PrivacyHeader from './PrivacyHeader';
import PrivacyNavigation from './PrivacyNavigation';
import PrivacyContent from './PrivacyContent';
import PrivacyFooter from './PrivacyFooter';

const PrivacyPolicyClient: React.FC<PrivacyPolicyProps> = ({
  companyName = "SmartKode",
  contactEmail = "info@smartkode.com",
  urgentEmail = "support@smartkode.com",
  lastUpdated = "August 02, 2025"
}) => {
  const { activeSection, navContainerRef, scrollToSection } = useScrollNavigation([...navItems] as NavItem[]);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Header */}
      <PrivacyHeader 
        lastUpdated={lastUpdated}
      />

      {/* Enhanced Navigation */}
      <PrivacyNavigation 
        navItems={navItems}
        activeSection={activeSection}
        navContainerRef={navContainerRef as RefObject<HTMLDivElement>}
        scrollToSection={scrollToSection}
      />

      {/* Main Content */}
      <PrivacyContent 
        companyName={companyName}
        contactEmail={contactEmail}
        urgentEmail={urgentEmail}
      />

      {/* Footer */}
      <PrivacyFooter 
        companyName={companyName}
        lastUpdated={lastUpdated}
      />

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicyClient;