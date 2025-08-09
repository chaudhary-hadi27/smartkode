import { CreditCard, AlertTriangle } from 'lucide-react';
import TermsSection from '../components/TermsSection';

interface PaymentSectionProps {
  companyName?: string;
}

export default function PaymentSection({ companyName = "SmartKode" }: PaymentSectionProps) {
  const paymentPolicies = [
    { label: 'Service Fees', desc: 'As described in your service plan or agreement' },
    { label: 'Billing Cycle', desc: 'Automatic billing applies to subscription services' },
    { label: 'Authorization', desc: 'You authorize charges to your payment method' },
    { label: 'Price Changes', desc: 'Require 30 days advance notice' }
  ];

  return (
    <TermsSection
      id="payment"
      title="Payment Terms & Billing"
      description="Fees, billing, and payment policies"
      icon={CreditCard}
      gradient="from-green-500 to-emerald-600"
    >
      <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-2xl p-8 border border-green-500/30 hover:border-green-500/50 transition-all duration-300">
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-green-400" />
              Payment Policies
            </h3>
            <div className="space-y-4">
              {paymentPolicies.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 group hover:bg-green-900/10 p-2 rounded-lg transition-colors duration-200">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                  <div>
                    <h4 className="font-medium text-white">{item.label}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
                    
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
              Refund Policy
            </h3>
            <div className="bg-yellow-900/20 rounded-lg p-6 border border-yellow-500/30 hover:border-yellow-500/50 transition-colors duration-300">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0 animate-pulse" />
                <div>
                  <h4 className="font-medium text-yellow-300 mb-2">Non-Refundable Policy</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    All fees paid to {companyName} are generally non-refundable unless otherwise specified in your service agreement. Termination for cause results in liability for all outstanding fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
                
        <div className="mt-8 bg-green-900/30 rounded-xl p-6 border border-green-500/30">
          <h4 className="font-semibold text-green-300 mb-3">Payment Methods & Security</h4>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="space-y-2">
              <p>• Major credit cards accepted</p>
              <p>• Secure payment processing via industry standards</p>
              <p>• Automatic billing for subscription services</p>
            </div>
            <div className="space-y-2">
              <p>• Failed payments may result in service suspension</p>
              <p>• Update payment information to avoid interruptions</p>
              <p>• Contact support for billing questions</p>
            </div>
          </div>
        </div>
      </div>
    </TermsSection>
  );
}