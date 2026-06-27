import SidebarLayout from "@/components/layouts/page";

// ids MUST match the slugify() output from LegalPageTemplate
const privacySections = [
  { id: "/",                        label: "Overview" },
  { id: "who-we-are",               label: "Who We Are" },
  { id: "information-we-collect",   label: "Information We Collect" },
  { id: "how-we-use-your-information", label: "How We Use It" },
  { id: "(legal)-basis-for-processing", label: "Legal Basis" },
  { id: "sharing-your-information", label: "Sharing" },
  { id: "data-retention",           label: "Data Retention" },
  { id: "your-rights",              label: "Your Rights" },
  { id: "cookies",                  label: "Cookies" },
  { id: "security",                 label: "Security" },
  { id: "changes-to-this-policy",   label: "Changes" },
  { id: "contact",                  label: "Contact" },
];

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
      <SidebarLayout
          title="Privacy Policy — SmartKode"
          description="Learn how SmartKode collects, uses, and protects your personal information."
          sections={privacySections}
          basePath="legal/privacy"
      >
        {children}
      </SidebarLayout>
  );
}