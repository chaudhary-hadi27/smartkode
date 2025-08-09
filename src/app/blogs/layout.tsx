"use client";

import { ReactNode } from "react";
import SidebarLayout from "@/components/layouts/page"; // adjust path as needed

export default function BlogsLayout({ children }: { children: ReactNode }) {
  const sections = [
    { id: "", label: "All Blogs" },
  ];

  return (
    <SidebarLayout
      title="Blogs – SmartKode"
      description="Explore our latest blogs and updates"
      sections={sections}
      basePath="blogs"
    >
      {children}
    </SidebarLayout>
  );
}
