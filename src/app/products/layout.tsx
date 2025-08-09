"use client";

import { ReactNode } from "react";
import SidebarLayout from "@/components/layouts/page"; // adjust path as needed

export default function ProductsLayout({ children }: { children: ReactNode }) {
  const sections = [
    { id: "", label: "All Products" },
  ];

  return (
    <SidebarLayout
      title="Products – SmartKode"
      description="Explore our launched products"
      sections={sections}
      basePath="products"
    >
      {children}
    </SidebarLayout>
  );
}
