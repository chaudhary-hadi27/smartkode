import React from 'react';
import { NavItem } from '../types/privacy.types';

interface PrivacyNavigationProps {
  navItems: readonly NavItem[];
  activeSection: string;
  navContainerRef: React.RefObject<HTMLDivElement>;
  scrollToSection: (sectionId: string) => void;
}

const PrivacyNavigation: React.FC<PrivacyNavigationProps> = ({
  navItems,
  activeSection,
  navContainerRef,
  scrollToSection
}) => {
  const scrollbarHideStyles: React.CSSProperties = {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-center">
          <div 
            ref={navContainerRef}
            className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 text-xs sm:text-sm overflow-x-auto scrollbar-hide scroll-smooth"
            style={scrollbarHideStyles}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                data-section={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`whitespace-nowrap px-2 sm:px-3 py-2 transition-all duration-300 hover:text-white border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black rounded-sm ${
                  activeSection === item.id 
                    ? 'text-white border-blue-500' 
                    : 'text-gray-400 border-transparent hover:border-gray-600'
                }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PrivacyNavigation;