'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { ScrollState } from '../types';
import { NAV_HEIGHT, SCROLL_OFFSET, SCROLL_TIMEOUT } from '../data/termsData';

interface UseTermsNavigationReturn {
  scrollState: ScrollState;
  navContainerRef: React.RefObject<HTMLDivElement | null>;
  scrollToSection: (sectionId: string) => void;
  handleKeyDown: (event: React.KeyboardEvent, sectionId: string) => void;
}

export function useTermsNavigation(navItems: Array<{ id: string }>): UseTermsNavigationReturn {
  const [scrollState, setScrollState] = useState<ScrollState>({
    activeSection: 'acceptance',
    isScrolling: false
  });

  const navContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const scrollToActiveNavItem = useCallback((sectionId: string) => {
    const navContainer = navContainerRef.current;
    if (!navContainer) return;
    
    const activeButton = navContainer.querySelector(`[data-section="${sectionId}"]`) as HTMLElement;
    if (!activeButton) return;

    const containerRect = navContainer.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    
    const isOutsideLeft = buttonRect.left < containerRect.left;
    const isOutsideRight = buttonRect.right > containerRect.right;
    
    if (isOutsideLeft || isOutsideRight) {
      const buttonCenter = activeButton.offsetLeft + (activeButton.clientWidth / 2);
      const containerCenter = navContainer.scrollLeft + (navContainer.clientWidth / 2);
      const scrollDistance = buttonCenter - containerCenter;
      
      navContainer.scrollBy({
        left: scrollDistance,
        behavior: 'smooth'
      });
    }
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    setScrollState(prev => ({ ...prev, isScrolling: true }));
    
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - NAV_HEIGHT - SCROLL_OFFSET;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    });
    
    setScrollState(prev => ({ ...prev, activeSection: sectionId }));
    scrollToActiveNavItem(sectionId);
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setScrollState(prev => ({ ...prev, isScrolling: false }));
    }, SCROLL_TIMEOUT);
  }, [scrollToActiveNavItem]);

  // Intersection Observer setup
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (scrollState.isScrolling) return;

      let visibleSection = '';
      let maxIntersectionRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
          maxIntersectionRatio = entry.intersectionRatio;
          visibleSection = entry.target.id;
        }
      });

      if (visibleSection && visibleSection !== scrollState.activeSection) {
        setScrollState(prev => ({ ...prev, activeSection: visibleSection }));
        scrollToActiveNavItem(visibleSection);
      }
    };

    const rootMargin = `-${NAV_HEIGHT + SCROLL_OFFSET}px 0px -${window.innerHeight - NAV_HEIGHT - 100}px 0px`;
    
    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
    });

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [navItems, scrollState.isScrolling, scrollState.activeSection, scrollToActiveNavItem]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, sectionId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToSection(sectionId);
    }
  }, [scrollToSection]);

  return {
    scrollState,
    navContainerRef,
    scrollToSection,
    handleKeyDown
  };
}