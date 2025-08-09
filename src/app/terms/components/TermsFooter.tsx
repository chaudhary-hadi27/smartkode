import { Scale } from 'lucide-react';

interface TermsFooterProps {
  companyName?: string;
  lastUpdated?: string;
  jurisdiction?: string;
}

export default function TermsFooter({ 
  companyName = "SmartKode",
  lastUpdated = "January 31, 2025",
  jurisdiction = "Delaware, United States"
}: TermsFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">{companyName}</span>
          </div>
          <p className="text-gray-400 mb-4 text-lg">
            Building the future of AI with responsibility and innovation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
            <span>© 2025 {companyName}. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Last updated: {lastUpdated}</span>
            <span className="hidden sm:inline">•</span>
            <span>Governed by the laws of {jurisdiction}</span>
          </div>
          <div className="mt-4 text-xs text-gray-600">
            We&apos;ll notify you of material changes to these terms via email or through our platform.
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs">
            <a 
              href="/privacy"
              className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <span className="text-gray-700">•</span>
            <a 
              href="/cookies"
              className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
            >
              Cookie Policy
            </a>
            <span className="text-gray-700">•</span>
            <a 
              href="/acceptable-use"
              className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
            >
              Acceptable Use
            </a>
            <span className="text-gray-700">•</span>
            <a 
              href="/contact"
              className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}