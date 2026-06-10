import { AlertTriangle, Shield, AlertCircle } from 'lucide-react';
import TermsSection from '../components/TermsSection';

interface LiabilitySectionProps {
  companyName?: string;
}

export default function LiabilitySection({ companyName = "SmartKode" }: LiabilitySectionProps) {
  const warrantyDisclaimers = [
    'No warranties of merchantability or fitness for purpose',
    'AI-generated results not guaranteed for accuracy',
    'Services provided without guarantees of availability',
    'You use our AI tools at your own risk and judgment'
  ];

  const liabilityLimits = [
    'Total liability limited to fees paid in past 12 months',
    'No liability for indirect or consequential damages',
    'No liability for business losses or lost profits',
    'Legal action must be brought within one year'
  ];

  return (
    <TermsSection
      id="liability"
      title="Limitation of Liability"
      description="Legal disclaimers and limitations"
      icon={AlertTriangle}
      gradient="from-red-500 to-pink-600"
    >
      <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-2xl p-8 border border-red-500/30 hover:border-red-500/50 transition-all duration-300">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-red-300 mb-3">Important Legal Notice</h3>
            <p className="text-gray-300 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, {companyName.toUpperCase()} PROVIDES SERVICES &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND.
            </p>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-white flex items-center">
              <Shield className="w-4 h-4 mr-2 text-red-400" />
              Warranty Disclaimers
            </h4>
            {warrantyDisclaimers.map((disclaimer, index) => (
              <div key={index} className="flex items-start space-x-3 group hover:bg-red-900/10 p-2 rounded-lg transition-colors duration-200">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                <span className="text-gray-300 text-sm leading-relaxed">{disclaimer}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-white flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-red-400" />
              Liability Limits
            </h4>
            {liabilityLimits.map((limit, index) => (
              <div key={index} className="flex items-start space-x-3 group hover:bg-red-900/10 p-2 rounded-lg transition-colors duration-200">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                <span className="text-gray-300 text-sm leading-relaxed">{limit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-red-900/30 rounded-xl p-6 border border-red-500/30">
          <h4 className="font-semibold text-red-300 mb-3">AI-Specific Disclaimers</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• AI models may produce inaccurate, biased, or inappropriate outputs</p>
            <p>• Users must validate AI-generated content before use in critical applications</p>
            <p>• {companyName} is not liable for decisions made based on AI recommendations</p>
            <p>• Continuous improvement efforts do not guarantee perfect accuracy</p>
          </div>
        </div>
      </div>
    </TermsSection>
  );
}