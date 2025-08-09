'use client';
import { Scale, Calendar, Download } from 'lucide-react';
import type { TermsOfServiceProps } from '../types';

interface TermsHeaderProps extends TermsOfServiceProps {
  // Add at least one property to make this interface meaningful
  className?: string;
}

export default function TermsHeader({ 
  companyName = "SmartKode",
  lastUpdated = "January 31, 2025",
  className
}: TermsHeaderProps) {
  return (
    <header className={`relative overflow-hidden bg-black ${className || ''}`}>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
            Terms of Service
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
            Legal framework governing your use of {companyName}&apos;s AI tools, APIs, and innovative services
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-sm text-gray-400">Last updated: {lastUpdated}</span>
            </div>
            <button 
              className="inline-flex items-center px-6 py-3 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300 group"
              onClick={() => window.print()}
              aria-label="Download Terms of Service as PDF"
              type="button"
            >
              <Download className="w-4 h-4 mr-2 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm text-blue-400">Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}