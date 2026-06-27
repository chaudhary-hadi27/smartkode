import SidebarLayout from "@/components/layouts/page";

// ids MUST match the slugify() output from LegalPageTemplate
// slugify: lowercase, strip leading "N. ", spaces → hyphens
const termsSections = [
  { id: "/",                       label: "Overview" },
  { id: "about-smartkode",         label: "About SmartKode" },
  { id: "services",                label: "Services" },
  { id: "client-responsibilities", label: "Client Responsibilities" },
  { id: "payment-terms",           label: "Payment Terms" },
  { id: "intellectual-property",   label: "Intellectual Property" },
  { id: "confidentiality",         label: "Confidentiality" },
  { id: "warranties-liability",    label: "Warranties & Liability" },
  { id: "third-party-services",    label: "Third-Party Services" },
  { id: "termination",             label: "Termination" },
  { id: "governing-law",           label: "Governing Law" },
  { id: "changes-to-these-terms",  label: "Changes" },
  { id: "contact",                 label: "Contact" },
];

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
      <SidebarLayout
          title="Terms of Service — SmartKode"
          description="Read the terms and conditions that govern SmartKode's services."
          sections={termsSections}
          basePath="legal/terms"
      >
        {children}
      </SidebarLayout>
  );
}