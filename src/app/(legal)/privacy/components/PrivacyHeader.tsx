import React from 'react';
import { Shield } from 'lucide-react';

interface PrivacyHeaderProps {
  lastUpdated: string;
}

const PrivacyHeader: React.FC<PrivacyHeaderProps> = ({ lastUpdated }) => {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 sm:mb-8 border border-white/20">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light px-4">
            Transparency and trust form the foundation of our relationship with you
          </p>
          <div className="mt-6 sm:mt-8 inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <span className="text-xs sm:text-sm text-gray-400">Last updated: {lastUpdated}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PrivacyHeader;