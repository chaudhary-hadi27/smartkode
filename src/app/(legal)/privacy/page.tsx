import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { privacyData } from "@/data/privacy/privacy.data";

export const metadata = {
  title: "Privacy Policy | SmartKode",
  description:
    "Learn how SmartKode collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return <LegalPageTemplate data={privacyData} />;
}
