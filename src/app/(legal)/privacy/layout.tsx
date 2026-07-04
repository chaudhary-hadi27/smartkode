import SidebarLayout from "@/components/layouts/page";

const privacySections = [
  { id: "/", label: "Privacy" },
];

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
      <SidebarLayout
          title="Privacy Policy — SmartKode"
          description="Learn how SmartKode collects, uses, and protects your personal information."
          sections={privacySections}
          basePath="privacy"
      >
        {children}
      </SidebarLayout>
  );
}