import { AlertCircle, Users, Shield, Download, Database } from 'lucide-react';
import TermsSection from '../components/TermsSection';

interface TerminationSectionProps {
  companyName?: string;
}

export default function TerminationSection({ companyName = "SmartKode" }: TerminationSectionProps) {
  const terminationReasons = [
    'Breach of Terms or Acceptable Use Policy',
    'Non-payment of fees',
    'Illegal activities or service abuse',
    'Security threats or compromised accounts'
  ];

  const effectsOfTermination = [
    {
      icon: AlertCircle,
      color: "red",
      title: "Immediate Cessation",
      description: "Access to Services stops immediately upon termination"
    },
    {
      icon: Download,
      color: "blue",
      title: "Data Export",
      description: "30-day window to request data export after termination"
    },
    {
      icon: Database,
      color: "yellow",
      title: "Data Deletion",
      description: "Data may be deleted per retention policies after export period"
    }
  ];

  return (
    <TermsSection
      id="termination"
      title="Termination"
      description="How services may be terminated"
      icon={AlertCircle}
      gradient="from-orange-500 to-yellow-600"
    >
      <div className="space-y-8">
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-2xl p-6 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
              <Users className="w-5 h-5 mr-3 text-blue-400" />
              Termination by You
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              You may terminate your account at any time by contacting our support team or using account management tools.
            </p>
            <div className="bg-blue-900/40 rounded-lg p-4 border border-blue-500/20 hover:border-blue-500/40 transition-colors duration-300">
              <p className="text-blue-200 text-sm leading-relaxed">
                You remain responsible for all fees incurred up to the termination date.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 rounded-2xl p-6 border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
              <Shield className="w-5 h-5 mr-3 text-orange-400" />
              Termination by {companyName}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may terminate or suspend access immediately for violations or security concerns.
            </p>
            <div className="space-y-2">
              {terminationReasons.map((reason, index) => (
                <div key={index} className="flex items-start space-x-3 group hover:bg-orange-900/10 p-1 rounded transition-colors duration-200">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                  <span className="text-gray-300 text-sm leading-relaxed">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-6 text-white">Effect of Termination</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {effectsOfTermination.map((item, index) => (
              <div key={index} className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                <div className={`w-12 h-12 bg-${item.color}-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                </div>
                <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-white">Governing Law</h3>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              These Terms are governed by the laws of Delaware, United States without regard to conflict of law principles.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2 text-sm">Dispute Resolution</h4>
              <div className="space-y-1 text-xs text-gray-400">
                <p>1. Informal resolution through our legal team</p>
                <p>2. Mediation if informal resolution fails</p>
                <p>3. Binding arbitration for final disputes</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-white">Changes to Terms</h3>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              {companyName} reserves the right to modify these Terms with notice of material changes.
            </p>
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <p className="text-blue-200 text-xs leading-relaxed">
                Continued use after changes constitutes acceptance. Discontinue use if you disagree with updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </TermsSection>
  );
}