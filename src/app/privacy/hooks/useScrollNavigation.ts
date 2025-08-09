import { useState, useEffect, useRef, useCallback } from 'react';
import { NavItem } from '../types/privacy.types';

export const useScrollNavigation = (navItems: NavItem[]) => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isScrolling, setIsScrolling] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Auto-scroll navigation to active item on smaller screens
  const scrollToActiveNavItem = useCallback((sectionId: string) => {
    if (!navContainerRef.current) return;
    
    const navContainer = navContainerRef.current;
    const activeButton = navContainer.querySelector(`[data-section="${sectionId}"]`) as HTMLElement;
    
    if (activeButton) {
      const containerRect = navContainer.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      const isOutsideLeft = buttonRect.left < containerRect.left;
      const isOutsideRight = buttonRect.right > containerRect.right;
      
      if (isOutsideLeft || isOutsideRight) {
        const scrollLeft = activeButton.offsetLeft - (navContainer.clientWidth / 2) + (activeButton.clientWidth / 2);
        
        navContainer.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth'
        });
      }
    }
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsScrolling(true);
      const navHeight = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - navHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
      scrollToActiveNavItem(sectionId);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }, [scrollToActiveNavItem]);

  // Improved scroll detection using Intersection Observer
  useEffect(() => {
    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-100px 0px -50% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return;

      let mostVisibleSection = '';
      let maxVisibilityRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxVisibilityRatio) {
          maxVisibilityRatio = entry.intersectionRatio;
          mostVisibleSection = entry.target.id;
        }
      });

      // Special handling for the last section (contact)
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const windowHeight = window.innerHeight;
        
        if (window.scrollY + windowHeight >= document.documentElement.scrollHeight - 100) {
          mostVisibleSection = 'contact';
        }
      }

      if (mostVisibleSection && mostVisibleSection !== activeSection) {
        setActiveSection(mostVisibleSection);
        scrollToActiveNavItem(mostVisibleSection);
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activeSection, isScrolling, navItems, scrollToActiveNavItem]);

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      scrollToActiveNavItem(activeSection);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection, scrollToActiveNavItem]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    activeSection,
    navContainerRef,
    scrollToSection,
    isScrolling
  };
};