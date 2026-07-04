import SidebarLayout from "@/components/layouts/page";

const termsSections = [
  { id: "/", label: "Terms of Service" },
];

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
      <SidebarLayout
          title="Terms of Service — SmartKode"
          description="Read the terms and conditions that govern SmartKode's services."
          sections={termsSections}
          basePath="terms"
      >
        {children}
      </SidebarLayout>
  );
}