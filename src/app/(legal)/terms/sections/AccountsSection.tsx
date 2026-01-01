import { Users, CheckCircle, Shield } from 'lucide-react';
import TermsSection from '../components/TermsSection';

export default function AccountsSection() {
  const accountSections = [
    {
      title: "Account Requirements",
      icon: CheckCircle,
      iconColor: "text-green-400",
      items: [
        'Must be at least 18 years old to create an account',
        'Provide accurate, current, and complete information',
        'Maintain and update account information as needed',
        'Responsible for maintaining credential confidentiality'
      ]
    },
    {
      title: "Account Security",
      icon: Shield,
      iconColor: "text-blue-400",
      items: [
        'Use strong passwords and enable two-factor authentication',
        'Notify us immediately of unauthorized access',
        'You are liable for all activities under your account',
        'We reserve the right to suspend accounts for security'
      ]
    }
  ];

  return (
    <TermsSection
      id="accounts"
      title="User Accounts"
      description="Registration and account management"
      icon={Users}
      gradient="from-green-500 to-teal-600"
    >
      <div className="grid sm:grid-cols-2 gap-8">
        {accountSections.map((section, index) => (
          <div key={index} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              <section.icon className={`w-5 h-5 mr-3 ${section.iconColor}`} />
              {section.title}
            </h3>
            <div className="space-y-4">
              {section.items.map((requirement, itemIndex) => (
                <div key={itemIndex} className="flex items-start space-x-3 group">
                  <div className={`w-2 h-2 ${section.iconColor.replace('text-', 'bg-')} rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200`} />
                  <span className="text-gray-300 text-sm leading-relaxed">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </TermsSection>
  );
}