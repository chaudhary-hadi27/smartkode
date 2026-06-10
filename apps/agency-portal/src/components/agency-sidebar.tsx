"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";

const navItems = [
  { href: "/overview", label: "Dashboard"      },
  { href: "/intake",   label: "Submit Lead"    },
  { href: "/projects", label: "Projects"       },
  { href: "/payouts",  label: "Commission Log" },
  { href: "/settings", label: "Payout Settings"},
];

function SidebarContent({ closeSidebar }: { closeSidebar: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userInitial = session?.user?.email ? session.user.email[0].toUpperCase() : "A";
  const userEmail = session?.user?.email || "agency@smartkode.co";

  return (
    <div className="flex flex-col h-full p-6">
      {/* Brand — logo only, no text below */}
      <div className="flex items-center gap-3 shrink-0 mb-8">
        <Image
          src="/logo.png"
          alt="SmartKode"
          width={28}
          height={28}
          priority
          className="w-7 h-7 object-contain shrink-0"
        />
        <span className="text-[15px] font-bold tracking-wide text-white leading-tight truncate">
          SmartKode
        </span>
      </div>

      {/* Nav — centred vertically like website (mt-auto on both sides) */}
      <div className="flex-1 flex items-center">
        <nav className="w-full flex flex-col gap-1" role="navigation">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (typeof window !== "undefined" && window.innerWidth < 1024) closeSidebar();
                }}
                aria-current={isActive ? "page" : undefined}
                className={`block px-3 py-1.5 text-sm text-left rounded transition-all duration-300 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer account row */}
      <div className="shrink-0 mt-8 space-y-2">
        <div className="flex items-center justify-between w-full rounded px-2 py-2 hover:bg-gray-800 transition-colors duration-200 cursor-default">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
              {userInitial}
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-sm font-semibold text-white truncate">Agency Portal</p>
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
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

export function AgencySidebar({
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
        id="agency-sidebar"
        aria-label="Agency navigation"
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
              key="agency-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
              onClick={closeSidebar}
              aria-hidden="true"
            />
            <motion.aside
              key="agency-mobile-sidebar"
              role="dialog"
              aria-modal="true"
              aria-label="Agency navigation"
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
