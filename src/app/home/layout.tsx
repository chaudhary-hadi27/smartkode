// src/app/home/layout.tsx

"use client";

import SidebarLayout from "@/components/layouts/page";
import { ReactNode } from "react";

const navLinks = [
  { id: "/", label: "Home" },
  { id: "/services", label: "Services" },
  { id: "/projects", label: "Projects" },
  { id: "/about", label: "About" },
  { id: "/contact", label: "Contact" },
];

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <SidebarLayout
      title="SmartKode | Home"
      description="SmartKode is your AI-powered partner for building powerful products."
      sections={navLinks}
      basePath="" // not used for scroll-to-section
    >
      {children}
    </SidebarLayout>
  );
}
