import { Zap, Database, Globe } from 'lucide-react';
import TermsSection from '../components/TermsSection';
import { AI_SERVICES, DEVELOPMENT_SERVICES } from '../data/termsData';

export default function ServicesSection() {
  const services = [
    {
      title: "AI Tools & Models",
      icon: Database,
      gradient: "from-purple-900/30 to-purple-800/30",
      border: "border-purple-500/30",
      iconColor: "text-purple-400",
      items: AI_SERVICES
    },
    {
      title: "Development Services",
      icon: Globe,
      gradient: "from-blue-900/30 to-blue-800/30",
      border: "border-blue-500/30",
      iconColor: "text-blue-400",
      items: DEVELOPMENT_SERVICES
    }
  ];

  return (
    <TermsSection
      id="services"
      title="Our Services"
      description="Comprehensive AI and development solutions"
      icon={Zap}
      gradient="from-purple-500 to-pink-600"
    >
      <div className="grid sm:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={index} className="space-y-6">
            <div className={`bg-gradient-to-br ${service.gradient} rounded-2xl p-6 border ${service.border} hover:scale-105 transition-all duration-300 group`}>
              <div className="flex items-center mb-4">
                <service.icon className={`w-6 h-6 ${service.iconColor} mr-3 group-hover:scale-110 transition-transform duration-200`} />
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <div className={`w-1.5 h-1.5 ${service.iconColor.replace('text-', 'bg-')} rounded-full mt-2 flex-shrink-0`} />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </TermsSection>
  );
}