import SidebarLayout from "@/components/layouts/page";

const careerSections = [
    { id: "/", label: "Overview" },
    { id: "compensation", label: "Compensation" },
    { id: "positions", label: "Open Positions" },
    { id: "apply", label: "Apply" },
];

export default function CareersLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarLayout
            title="Join SmartKode - Careers"
            description="Build the future with us. Explore career opportunities at SmartKode."
            sections={careerSections}
            basePath="careers"
        >
            {children}
        </SidebarLayout>
    );
}