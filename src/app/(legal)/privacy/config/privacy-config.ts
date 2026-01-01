export interface PrivacyConfig {
  companyName: string;
  contactEmail: string;
  urgentEmail: string;
  lastUpdated: string;
  website: string;
}

export const privacyConfig: PrivacyConfig = {
  companyName: "SmartKode",
  contactEmail: "info@smartkode.com",
  urgentEmail: "support@smartkode.com",
  lastUpdated: "August 02, 2025",
  website: "https://smartkode.com"
};

export const navItems = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'collection', label: 'Data Collection' },
  { id: 'usage', label: 'Usage' },
  { id: 'sharing', label: 'Sharing' },
  { id: 'security', label: 'Security' },
  { id: 'rights', label: 'Your Rights' },
  { id: 'contact', label: 'Contact' }
] as const;

export type NavItemId = typeof navItems[number]['id'];