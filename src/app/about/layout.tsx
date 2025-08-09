import SidebarLayout from "@/components/layouts/page";

const aboutSections = [
  { id: "/", label: "About" },
  { id: "mission", label: "Our Mission" },
  { id: "vision", label: "Vision & Values" },
  { id: "culture", label: "Company Culture" },
  { id: "impact", label: "Impact & Innovation" },
];

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarLayout
      title="About SmartKode"
      description="Learn more about SmartKode – our mission, vision, culture, and the team behind our AI and tech innovations."
      sections={aboutSections}
      basePath="about"
    >
      {children}
    </SidebarLayout>
  );
}
