"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Users,
  Briefcase,
  FileText,
  CreditCard,
  MessageSquareText,
  Repeat,
  BarChart,
  Settings,
  ShieldAlert,
  Network,
} from "lucide-react";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/overview",   label: "Dashboard",     icon: LayoutDashboard },
      { href: "/system-map", label: "System Map",    icon: Network         },
      { href: "/analytics",  label: "Analytics",     icon: BarChart        },
    ],
  },
  {
    label: "CRM",
    items: [
      { href: "/agencies",   label: "Agencies",      icon: Building2       },
      { href: "/clients",    label: "Clients",       icon: Users           },
      { href: "/tech",       label: "Tech Partners", icon: Briefcase       },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/projects",   label: "Projects",      icon: FileText        },
      { href: "/invoices",   label: "Invoices",      icon: FileText        },
      { href: "/payments",   label: "Payments",      icon: CreditCard      },
      { href: "/bot-logs",   label: "Bot Logs",      icon: MessageSquareText },
      { href: "/retention",  label: "Retention",     icon: Repeat          },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/settings",   label: "Settings",      icon: Settings        },
      { href: "/audit",      label: "Audit Log",     icon: ShieldAlert     },
    ],
  },
];

/* ─── Desktop sidebar (always visible on lg+, hidden on mobile) ─── */
function SidebarContent({
  closeSidebar,
}: {
  closeSidebar: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 pt-8 pb-6 shrink-0">
        <Image
          src="/logo.png"
          alt="SmartKode"
          width={26}
          height={26}
          priority
          className="w-[26px] h-[26px] object-contain shrink-0"
        />
        <span translate="no" className="text-[15px] font-bold tracking-wide text-white leading-tight truncate">
          SmartKode
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-6 flex flex-col gap-6" role="navigation">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.15em] mb-2">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
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
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 shrink-0">
        <div className="flex items-center gap-3 rounded px-2 py-2 hover:bg-gray-800 transition-colors duration-200 cursor-default">
          <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
            A
          </div>
          <div className="overflow-hidden min-w-0">
            <p className="text-sm font-semibold text-white truncate">Admin</p>
            <p className="text-xs text-gray-500 truncate">admin@smartkode.co</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminSidebar({
  isOpen,
  closeSidebar,
}: {
  isOpen: boolean;
  closeSidebar: () => void;
}) {
  return (
    <>
      {/* Desktop static sidebar (lg+) */}
      <aside
        id="admin-sidebar"
        aria-label="Admin navigation"
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white shadow-lg z-40 transition-transform duration-500 ease-in-out hidden lg:block ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent closeSidebar={closeSidebar} />
      </aside>

      {/* Mobile animated sidebar + overlay (AnimatePresence like website) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="admin-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
              onClick={closeSidebar}
              aria-hidden="true"
            />
            <motion.aside
              key="admin-mobile-sidebar"
              id="admin-sidebar-mobile"
              role="dialog"
              aria-modal="true"
              aria-label="Admin navigation"
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
