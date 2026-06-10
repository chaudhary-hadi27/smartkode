import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

interface PrivacyLayoutProps {
  children: ReactNode;
}

export default function PrivacyLayout({ children }: PrivacyLayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  );
}