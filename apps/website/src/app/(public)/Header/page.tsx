"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const next = !prev;
      document.body.classList.toggle("sidebar-open", next);
      return next;
    });
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        document.body.classList.remove("sidebar-open");
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/careers", label: "Careers" },
    // { href: "/products", label: "Products" },
    // { href: "/blogs", label: "Blogs" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <Head>
        <title>SmartKode - AI Solutions for Modern Businesses</title>
        <meta
          name="description"
          content="SmartKode provides cutting-edge AI solutions, automation services, and AI-based product development tailored for businesses."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* === Navbar === */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black px-4 py-4 shadow-md transition-all duration-500 ease-in-out">
        <div className="flex items-center justify-between">
          {/* Desktop: Logo + Toggle */}
          <div className="hidden md:flex items-center space-x-5 pl-4">
            {/* Fixed width container to prevent toggle shifting */}
            <div className="w-[160px] flex items-center">
              {scrolled ? (
                <Image
                  src="https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753342928/logo_diwh70.png"
                  alt="SmartKode Logo"
                  width={60}
                  height={60}
                  priority
                  className="w-12 h-12"
                />
              ) : (
                <h1 className="text-white text-2xl font-bold tracking-wide">
                  SmartKode
                </h1>
              )}
            </div>

            {mounted && (
              <button
                type="button"
                aria-label="Toggle sidebar"
                aria-expanded={isOpen}
                aria-controls="sidebar"
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

          {/* Mobile: Brand + Toggle */}
          <div className="flex md:hidden w-full items-center justify-between px-2">
            <h1 className="text-white text-xl font-semibold tracking-wide">
              SmartKode
            </h1>

            {mounted && (
              <button
                type="button"
                aria-label="Toggle sidebar"
                aria-expanded={isOpen}
                aria-controls="sidebar"
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

      {/* === Sidebar === */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
              onClick={toggleSidebar}
            />

            {/* Sidebar */}
            <motion.aside
              key="sidebar"
              id="sidebar"
              role="complementary"
              initial={{ x: -250, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -250, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-64 bg-black text-white p-6 shadow-lg z-40"
            >
              <nav className="flex flex-col gap-4 mt-32 lg:mt-64" role="navigation">
                {navLinks.map(({ href, label }) => {
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => {
                        router.push(href);
                        setIsOpen(false); // auto-close on click (mobile)
                        document.body.classList.remove("sidebar-open");
                      }}
                      className={`block px-2 py-1 rounded transition-all duration-300 ${
                        isActive
                          ? "text-white font-semibold"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
