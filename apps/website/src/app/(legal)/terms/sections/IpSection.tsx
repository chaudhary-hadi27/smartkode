import { Lock, Users } from 'lucide-react';
import TermsSection from '../components/TermsSection';

interface IpSectionProps {
  companyName?: string;
}

export default function IpSection({ companyName = "SmartKode" }: IpSectionProps) {
  const smartKodeRights = [
    'Protected by copyright, trade secret, and IP laws',
    'No copying, modifying, or creating derivative works',
    'Limited license granted only as explicitly stated'
  ];

  return (
    <TermsSection
      id="ip"
      title="Intellectual Property Rights"
      description="Ownership and usage rights"
      icon={Lock}
      gradient="from-purple-500 to-indigo-600"
    >
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
            <Lock className="w-5 h-5 mr-2 text-purple-400" />
            {companyName}&apos;s Intellectual Property
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            {companyName} retains all rights, title, and interest in our AI models, algorithms, software, and proprietary technologies.
          </p>
          <div className="space-y-2">
            {smartKodeRights.map((right, index) => (
              <div key={index} className="flex items-start space-x-3 group">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                <span className="text-gray-300 text-sm leading-relaxed">{right}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-2xl p-6 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-400" />
            Your Content & Data
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            You retain ownership of your content and data. We process it solely to provide our services with strict privacy safeguards.
          </p>
          <div className="bg-blue-900/40 rounded-lg p-4 border border-blue-500/20 hover:border-blue-500/40 transition-colors duration-300">
            <p className="text-blue-200 text-sm leading-relaxed">
              Anonymized, aggregated data may be used to improve our AI models, but your specific confidential information is protected.
            </p>
          </div>
        </div>
      </div>
            
      <div className="mt-8 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-4 text-white">License Grant</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Subject to these Terms, {companyName} grants you a limited, non-exclusive, non-transferable, revocable license to use our Services solely for your intended business purposes.
        </p>
        <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
          <p className="text-yellow-200 text-sm">
            <strong>Important:</strong> This license does not grant you any ownership rights in our intellectual property or the right to sublicense our services to third parties.
          </p>
        </div>
      </div>
    </TermsSection>
  );
}