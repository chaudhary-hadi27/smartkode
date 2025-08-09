// app/services/layout.tsx
import SidebarLayout from "@/components/layouts/page";

const services = [
  { id: "/", label: "All Services" },
  { id: "ai", label: "AI Development" },
  { id: "web", label: "Web Development" },
  { id: "chatbot", label: "Chatbot Development" },
  { id: "automation", label: "Automation Services" },
  { id: "data", label: "Data Analytics" },
  { id: "marketing", label: "Digital Marketing" },
  { id: "devops", label: "DevOps & Cloud" },
  { id: "uiux", label: "UI/UX Design" },

  
  
];

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarLayout
      title="Our Services"
      description="Explore the services we offer"
      sections={services}
      basePath="services"
    >
      {children}
    </SidebarLayout>
  );
}
