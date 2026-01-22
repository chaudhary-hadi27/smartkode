import SidebarLayout from "@/components/layouts/page";

const careerSections = [
  { id: "/", label: "Overview" },
  { id: "opportunities", label: "Opportunities" },
  { id: "compensation", label: "Compensation" },
  { id: "positions", label: "Open Positions" },
  { id: "internship", label: "Internship" },
  { id: "culture", label: "Culture" },
  { id: "apply", label: "Apply" }
];

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarLayout
      title="Join SmartKode - Careers"
      description="Build intelligence with us. Flexible opportunities, transparent commission, real growth."
      sections={careerSections}
      basePath="careers"
    >
      {children}
    </SidebarLayout>
  );
}