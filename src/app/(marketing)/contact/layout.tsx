import SidebarLayout from "@/components/layouts/page";

const contactSections = [
  { id: "/", label: "Contact Info" },
];

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarLayout
      title="Contact Us"
      description="Get in touch with our team"
      sections={contactSections}
      basePath="contact"
    >
      {children}
    </SidebarLayout>
  );
}
