"use client";

import { useEffect, useState, ReactNode } from "react";
import Image from "next/image";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface Section {
  id: string;
  label: string;
}

export default function SidebarLayout({
  children,
  sections,
  basePath,
  title,
  description,
}: {
  children: ReactNode;
  sections: Section[];
  basePath: string;
  title: string;
  description: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const next = !prev;
      document.body.classList.toggle("sidebar-open", next);
      return next;
    });
  };

  const closeSidebar = () => {
    setIsOpen(false);
    document.body.classList.remove("sidebar-open");
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/about-preview.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="fixed top-0 left-0 w-full z-50 bg-black px-4 py-4 shadow-md transition-all duration-500 ease-in-out">
        <div className="flex items-center justify-between">
          <div className="hidden md:flex items-center space-x-5 pl-4">
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
                <h1 className="text-white text-2xl font-bold tracking-wide">SmartKode</h1>
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

          <div className="flex md:hidden w-full items-center justify-between px-2">
            {scrolled ? (
              <Image
                src="https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753342928/logo_diwh70.png"
                alt="SmartKode Logo"
                width={60}
                height={60}
                priority
                className="w-10 h-10"
              />
            ) : (
              <h1 className="text-white text-xl font-semibold tracking-wide">SmartKode</h1>
            )}

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

      <div className="pt-20 min-h-screen bg-black text-white flex overflow-x-hidden">
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-black text-white p-6 shadow-lg z-40 transition-transform duration-500 ease-in-out hidden lg:block ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 id="sidebar-label" className="sr-only">
            Sidebar Navigation
          </h2>
          <nav className="flex flex-col gap-4 mt-32 lg:mt-64" role="navigation">
            <Link
              href="/"
              onClick={closeSidebar}
              className="block px-2 py-1 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition"
            >
              ← Back to Home
            </Link>

            {sections.map(({ id, label }) => {
              const href = id === "/" ? `/${basePath}` : `/${basePath}/${id}`;
              const isActive = pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

              return (
                <button
                  key={id}
                  onClick={() => {
                    if (pathname !== href) {
                      router.push(href);
                    }
                    if (window.innerWidth < 1024) {
                      closeSidebar();
                    }
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`block px-3 py-1 text-left rounded transition-all duration-300 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main
          className={`w-full px-4 py-6 break-words transition-all duration-500 ease-in-out ${
            isOpen ? "lg:ml-64" : "lg:ml-0"
          }`}
        >
          <div className="max-w-full">{children}</div>
        </main>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
              onClick={closeSidebar}
            />

            <motion.aside
              key="sidebar"
              id="sidebar"
              role="dialog"
              aria-modal="true"
              aria-labelledby="sidebar-label"
              initial={{ x: -250, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -250, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-64 bg-black text-white p-6 shadow-lg z-40 lg:hidden"
            >
              <h2 id="sidebar-label" className="sr-only">
                Sidebar Navigation
              </h2>
              <nav className="flex flex-col gap-4 mt-32" role="navigation">
                <Link
                  href="/"
                  onClick={closeSidebar}
                  className="block px-2 py-1 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition"
                >
                  ← Back to Home
                </Link>

                {sections.map(({ id, label }) => {
                  const href = id === "/" ? `/${basePath}` : `/${basePath}/${id}`;
                  const isActive = pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

                  return (
                    <button
                      key={id}
                      onClick={() => {
                        if (pathname !== href) {
                          router.push(href);
                        }
                        closeSidebar();
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={`block px-3 py-1 text-left rounded transition-all duration-300 ${
                        isActive
                          ? "text-white font-semibold"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      {label}
                    </button>
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
