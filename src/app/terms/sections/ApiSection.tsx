import { Globe, Database, Lock, Eye } from 'lucide-react';
import TermsSection from '../components/TermsSection';

export default function ApiSection() {
  const apiFeatures = [
    {
      icon: Database,
      color: "blue",
      title: "Rate Limits",
      description: "Fair usage policies apply to prevent system abuse"
    },
    {
      icon: Lock,
      color: "green",
      title: "API Security",
      description: "Keys must be kept secure and not shared"
    },
    {
      icon: Eye,
      color: "purple",
      title: "Monitoring",
      description: "Usage monitored for compliance and quality"
    }
  ];

  return (
    <TermsSection
      id="api"
      title="API Usage & Limitations"
      description="Technical terms and usage guidelines"
      icon={Globe}
      gradient="from-cyan-500 to-blue-600"
    >
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
        <h3 className="text-xl font-semibold mb-6 text-white">API Terms & Conditions</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          {apiFeatures.map((item, index) => (
            <div key={index} className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group">
              <div className={`w-12 h-12 bg-${item.color}-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <item.icon className={`w-6 h-6 text-${item.color}-400`} />
              </div>
              <h4 className="font-semibold text-white mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-cyan-900/20 rounded-xl p-6 border border-cyan-500/30">
          <h4 className="font-semibold text-cyan-300 mb-3 flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            API Guidelines
          </h4>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="space-y-2">
              <p>• Respect rate limits to maintain service quality</p>
              <p>• Use authentication tokens securely</p>
              <p>• Monitor your usage and costs regularly</p>
            </div>
            <div className="space-y-2">
              <p>• Report any security vulnerabilities immediately</p>
              <p>• Follow best practices for error handling</p>
              <p>• Cache responses appropriately to reduce calls</p>
            </div>
          </div>
        </div>
      </div>
    </TermsSection>
  );
}