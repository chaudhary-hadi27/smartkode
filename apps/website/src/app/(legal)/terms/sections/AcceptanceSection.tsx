import { FileText, CheckCircle, Scale } from 'lucide-react';
import TermsSection from '../components/TermsSection';

interface AcceptanceSectionProps {
  companyName?: string;
}

export default function AcceptanceSection({ companyName = "SmartKode" }: AcceptanceSectionProps) {
  return (
    <TermsSection
      id="acceptance"
      title="Acceptance of Terms"
      description="Your agreement to these terms"
      icon={FileText}
      gradient="from-blue-500 to-cyan-600"
    >
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-8 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Welcome to {companyName}</h3>
            <p className="text-gray-300 leading-relaxed">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of {companyName}&apos;s artificial intelligence tools, API-based models, web development services, chatbot solutions, automation services, data analytics, digital marketing, DevOps, and UI/UX design services.
            </p>
          </div>
        </div>
                
        <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/30 hover:border-blue-500/50 transition-colors duration-300">
          <h4 className="font-semibold text-blue-300 mb-3 flex items-center">
            <Scale className="w-4 h-4 mr-2" />
            Legal Agreement
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services. These Terms constitute a legally binding agreement between you and {companyName}.
          </p>
        </div>
      </div>
    </TermsSection>
  );
}