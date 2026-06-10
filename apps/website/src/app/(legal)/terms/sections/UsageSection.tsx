import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import TermsSection from '../components/TermsSection';

export default function UsageSection() {
  const permittedUses = [
    'Use AI tools and APIs for legitimate business purposes',
    'Integrate our services into your applications and workflows',
    'Access development services for authorized projects',
    'Utilize automation tools to improve business efficiency'
  ];

  const prohibitedUses = [
    'Generate harmful, illegal, or malicious content',
    'Reverse engineer or extract proprietary algorithms',
    'Overwhelm systems with excessive requests',
    'Create competing AI platforms using our services',
    'Violate applicable laws or third-party rights',
    'Process copyrighted material without authorization',
    'Use for surveillance, harassment, or privacy violations',
    'Attempt unauthorized access to systems or accounts'
  ];

  return (
    <TermsSection
      id="usage"
      title="Acceptable Use Policy"
      description="Guidelines for responsible service usage"
      icon={Shield}
      gradient="from-orange-500 to-red-600"
    >
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-2xl p-8 border border-green-500/30 hover:border-green-500/50 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
            <CheckCircle className="w-6 h-6 mr-3 text-green-400 animate-pulse" />
            Permitted Uses
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {permittedUses.map((use, index) => (
              <div key={index} className="flex items-start space-x-3 group hover:bg-green-900/10 p-2 rounded-lg transition-colors duration-200">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                <span className="text-gray-300 leading-relaxed">{use}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-2xl p-8 border border-red-500/30 hover:border-red-500/50 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
            <AlertTriangle className="w-6 h-6 mr-3 text-red-400 animate-pulse" />
            Prohibited Uses
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {prohibitedUses.map((prohibition, index) => (
              <div key={index} className="flex items-start space-x-3 group hover:bg-red-900/10 p-2 rounded-lg transition-colors duration-200">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                <span className="text-gray-300 text-sm leading-relaxed">{prohibition}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TermsSection>
  );
}