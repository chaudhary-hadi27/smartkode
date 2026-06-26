"use client";

import { useState, useEffect } from "react";
import { ClientSidebar } from "../../components/client-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen]     = useState(false);
  const [mounted, setMounted]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth >= 1024) setIsOpen(true);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      <ClientSidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />

      {/* Fixed top header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-black px-4 py-4 transition-all duration-300 ${
          scrolled ? "shadow-md border-b border-gray-900" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-5 pl-4">
            <div className="w-[160px] flex items-center">
              {scrolled ? (
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                  <span className="text-black font-black text-xs">SK</span>
                </div>
              ) : (
                <h1 className="text-white text-2xl font-bold tracking-wide">SmartKode</h1>
              )}
            </div>

            {mounted && (
              <button
                type="button"
                aria-label="Toggle sidebar"
                aria-expanded={isOpen}
                aria-controls="client-sidebar"
                onClick={() => setIsOpen((p) => !p)}
                className="w-6 h-6 rounded-lg border border-gray-600 flex items-center justify-center bg-transparent hover:scale-110 hover:ring-2 hover:ring-white transition-all duration-300"
              >
                <div
                  className={`w-px h-3 transform transition-transform duration-300 bg-white ${
                    isOpen ? "translate-x-2" : "-translate-x-2"
                  }`}
                />
              </button>
            )}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden w-full items-center justify-between px-2">
            {scrolled ? (
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-black font-black text-xs">SK</span>
              </div>
            ) : (
              <h1 className="text-white text-xl font-semibold tracking-wide">SmartKode</h1>
            )}

            {mounted && (
              <button
                type="button"
                aria-label="Toggle sidebar"
                aria-expanded={isOpen}
                aria-controls="client-sidebar"
                onClick={() => setIsOpen((p) => !p)}
                className="w-6 h-6 rounded-lg border border-gray-600 flex items-center justify-center bg-transparent hover:scale-110 hover:ring-2 hover:ring-white transition-all duration-300"
              >
                <div
                  className={`w-px h-3 transform transition-transform duration-300 bg-white ${
                    isOpen ? "translate-x-2" : "-translate-x-2"
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        className={`pt-20 min-h-screen flex flex-col transition-all duration-500 ease-in-out ${
          isOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        <div className="flex-1 px-4 py-6 md:px-6 lg:px-10 bg-black overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
