export interface PrivacyPolicyProps {
  companyName?: string;
  contactEmail?: string;
  urgentEmail?: string;
  lastUpdated?: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface ScrollStyles extends React.CSSProperties {
  scrollbarWidth?: 'none' | 'thin' | 'auto';
  msOverflowStyle?: 'none' | 'auto' | 'scrollbar';
  WebkitScrollbar?: {
    display: string;
  };
}

export interface ObserverOptions {
  root: Element | null;
  rootMargin: string;
  threshold: number | number[];
}

export interface IntersectionEntry {
  target: Element;
  isIntersecting: boolean;
  intersectionRatio: number;
}