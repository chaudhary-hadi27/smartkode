import React from 'react';

interface PrivacyFooterProps {
  companyName: string;
  lastUpdated: string;
}

const PrivacyFooter: React.FC<PrivacyFooterProps> = ({ companyName, lastUpdated }) => {
  return (
    <footer className="border-t border-white/10 bg-gray-900/50 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <p className="text-gray-400 mb-4 text-sm sm:text-base">
            © 2025 {companyName}. Committed to protecting your privacy and building AI responsibly.
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            This policy was last updated on {lastUpdated}. We&apos;ll notify you of any material changes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PrivacyFooter;