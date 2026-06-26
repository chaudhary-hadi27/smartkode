"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, LayoutDashboard, FolderKanban, Receipt, Settings } from "lucide-react";

const navItems = [
  { href: "/overview",  label: "Dashboard",  icon: LayoutDashboard },
  { href: "/projects",  label: "Projects",   icon: FolderKanban },
  { href: "/invoices",  label: "Invoices",   icon: Receipt },
  { href: "/settings",  label: "Settings",   icon: Settings },
];

function SidebarContent({ closeSidebar }: { closeSidebar: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userEmail   = session?.user?.email    || "client@smartkode.co";
  const userInitial = userEmail[0].toUpperCase();

  return (
    <div className="flex flex-col h-full p-6">
      {/* Brand */}
      <div className="flex items-center gap-3 shrink-0 mb-8">
        <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0">
          <span className="text-black font-black text-xs">SK</span>
        </div>
        <span className="text-[15px] font-bold tracking-wide text-white leading-tight truncate">
          SmartKode
        </span>
      </div>

      {/* Nav */}
      <div className="flex-1 flex items-center">
        <nav className="w-full flex flex-col gap-1" role="navigation" aria-label="Client navigation">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => {
                  if (typeof window !== "undefined" && window.innerWidth < 1024) closeSidebar();
                }}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                  isActive
                    ? "text-white font-semibold bg-gray-800"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer account row */}
      <div className="shrink-0 mt-8">
        <div className="flex items-center justify-between w-full rounded-md px-2 py-2 hover:bg-gray-800 transition-colors duration-200">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
              {userInitial}
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-sm font-semibold text-white truncate">Client Portal</p>
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "http://localhost:3005/login" })}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ClientSidebar({
  isOpen,
  closeSidebar,
}: {
  isOpen: boolean;
  closeSidebar: () => void;
}) {
  return (
    <>
      {/* Desktop static sidebar */}
      <aside
        id="client-sidebar"
        aria-label="Client navigation"
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white shadow-lg z-40 transition-transform duration-500 ease-in-out hidden lg:block ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent closeSidebar={closeSidebar} />
      </aside>

      {/* Mobile animated sidebar + overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="client-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
              onClick={closeSidebar}
              aria-hidden="true"
            />
            <motion.aside
              key="client-mobile-sidebar"
              role="dialog"
              aria-modal="true"
              aria-label="Client navigation"
              initial={{ x: -264, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -264, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-64 bg-black text-white shadow-lg z-40 lg:hidden"
            >
              <SidebarContent closeSidebar={closeSidebar} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
