"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AgencySidebar } from "../../components/agency-sidebar";
import { useSession } from "next-auth/react";
import { Clock, AlertCircle } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: session } = useSession();
  const isActive = session?.user && (session.user as any).is_active;

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth >= 1024) setIsOpen(true);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      <AgencySidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />

      {/* Fixed top header — exact same as website */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black px-4 py-4 shadow-md transition-all duration-500 ease-in-out">
        <div className="flex items-center justify-between">
          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-5 pl-4">
            <div className="w-[160px] flex items-center">
              {scrolled ? (
                <Image
                  src="/logo.png"
                  alt="SmartKode Logo"
                  width={48}
                  height={48}
                  priority
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <h1 className="text-white text-2xl font-bold tracking-wide">SmartKode</h1>
              )}
            </div>

            {mounted && (
              <button
                type="button"
                aria-label="Toggle sidebar"
                aria-expanded={isOpen}
                aria-controls="agency-sidebar"
                onClick={toggleSidebar}
                className="w-6 h-6 rounded-lg border border-gray-600 flex items-center justify-center bg-transparent hover:scale-110 hover:shadow-lg hover:ring-2 hover:ring-white transition-all duration-500 ease-in-out"
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
              <Image
                src="/logo.png"
                alt="SmartKode Logo"
                width={40}
                height={40}
                priority
                className="w-9 h-9 object-contain"
              />
            ) : (
              <h1 className="text-white text-xl font-semibold tracking-wide">SmartKode</h1>
            )}

            {mounted && (
              <button
                type="button"
                aria-label="Toggle sidebar"
                aria-expanded={isOpen}
                aria-controls="agency-sidebar"
                onClick={toggleSidebar}
                className="w-6 h-6 rounded-lg border border-gray-600 flex items-center justify-center bg-transparent hover:scale-110 hover:shadow-lg hover:ring-2 hover:ring-white transition-all duration-500 ease-in-out"
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
          {!session ? (
            <div className="flex items-center justify-center h-[60vh]"><div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin" /></div>
          ) : isActive ? (
            children
          ) : (
            <div className="max-w-2xl mx-auto mt-20 p-8 md:p-12 rounded-3xl border border-gray-800 bg-gray-900/30 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center animate-pulse">
                <Clock className="w-10 h-10 text-gray-500" />
              </div>
              <h2 className="text-3xl font-bold text-white">Application Under Review</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Thank you for applying to be a SmartKode referral partner! Our team is currently reviewing your application.
              </p>
              <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 flex items-start gap-3 text-left">
                <AlertCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400 leading-relaxed">
                  We review all applications within 48 hours. Once approved, this dashboard will automatically unlock with your affiliate tracking tools and commission details.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
