// components/TermsNavigation.tsx
'use client';
import React from 'react';
import type { NavItem, ScrollState } from '../types';

interface TermsNavigationProps {
  navItems: NavItem[];
  scrollState: ScrollState;
  navContainerRef: React.RefObject<HTMLDivElement>;
  onSectionClick: (sectionId: string) => void;
  onKeyDown: (event: React.KeyboardEvent, sectionId: string) => void;
}

export default function TermsNavigation({
  navItems,
  scrollState,
  navContainerRef,
  onSectionClick,
  onKeyDown
}: TermsNavigationProps) {
  return (
    <nav
      className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10"
      role="navigation"
      aria-label="Terms of Service sections"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-center">
          <div
            ref={navContainerRef}
            className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto scrollbar-hide scroll-smooth max-w-full"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = scrollState.activeSection === item.id;
              return (
                <button
                  key={item.id}
                  data-section={item.id}
                  onClick={() => onSectionClick(item.id)}
                  onKeyDown={(e) => onKeyDown(e, item.id)}
                  className={`group relative whitespace-nowrap px-3 sm:px-4 py-2.5 transition-all duration-300 hover:text-white border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black rounded-sm ${
                    isActive
                      ? 'text-white border-blue-500 bg-blue-500/10'
                      : 'text-gray-400 border-transparent hover:border-gray-600 hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${item.label} section`}
                  title={item.description}
                  type="button"
                >
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 transition-all duration-200 ${
                      isActive ? 'text-blue-400 scale-110' : 'text-gray-500 group-hover:text-gray-300'
                    }`} />
                    <span className="hidden sm:inline font-medium">{item.label}</span>
                  </div>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-sm -z-10 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}