export interface TermsOfServiceProps {
  companyName?: string;
  contactEmail?: string;
  supportEmail?: string;
  lastUpdated?: string;
  jurisdiction?: string;
  domain?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

export interface ScrollState {
  activeSection: string;
  isScrolling: boolean;
}

export interface SectionProps {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  children: React.ReactNode;
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'address';
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}