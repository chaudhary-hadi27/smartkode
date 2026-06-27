import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { termsData } from "@/data/terms/terms.data";

export const metadata = {
  title: "Terms of Service | SmartKode",
  description:
    "Read the terms and conditions that govern SmartKode's services.",
};

export default function TermsPage() {
  return <LegalPageTemplate data={termsData} />;
}
