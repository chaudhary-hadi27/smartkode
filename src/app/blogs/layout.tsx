"use client";

import { ReactNode } from "react";
import SidebarLayout from "@/components/layouts/page"; // adjust path as needed

export default function blogsLayout({ children }: { children: ReactNode }) {
  const sections = [
    { id: "", label: "All Products" },
  ];

  return (
    <SidebarLayout
      title="Blogs – SmartKode"
      description="Explore our latest Blogs"
      sections={sections}
      basePath="blogs"
    >
      {children}
    </SidebarLayout>
  );
}
