import React from 'react';
import { Eye, Database, Globe, Users, Lock, Shield, Mail, ArrowRight, AlertTriangle } from 'lucide-react';

interface PrivacyContentProps {
  companyName: string;
  contactEmail: string;
  urgentEmail: string;
}

const PrivacyContent: React.FC<PrivacyContentProps> = ({
  companyName,
  contactEmail,
  urgentEmail
}) => {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      
      {/* Introduction */}
      <section id="introduction" className="mb-16 sm:mb-24 scroll-mt-20" aria-labelledby="introduction-heading">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 sm:mb-12">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 id="introduction-heading" className="text-3xl sm:text-4xl font-bold mb-2">Introduction</h2>
            <p className="text-gray-400 text-base sm:text-lg">How we approach your privacy</p>
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed">
          <p className="text-gray-300">
            At {companyName}, we believe privacy is a fundamental right. This policy explains how we collect, use, and protect your information when you interact with our AI tools, APIs, and services.
          </p>
          <p className="text-gray-300">
            We&apos;re committed to being transparent about our data practices and giving you meaningful control over your information. As an AI company, we understand the unique privacy considerations that come with artificial intelligence and machine learning technologies.
          </p>
        </div>
      </section>

      {/* Information Collection */}
      <section id="collection" className="mb-16 sm:mb-24 scroll-mt-20" aria-labelledby="collection-heading">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 sm:mb-12">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
            <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 id="collection-heading" className="text-3xl sm:text-4xl font-bold mb-2">Information We Collect</h2>
            <p className="text-gray-400 text-base sm:text-lg">The data we gather to provide our services</p>
          </div>
        </div>
        
        <div className="space-y-12 sm:space-y-16">
          <div className="group">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-white flex items-center">
              Personal Information
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-3 text-gray-600 group-hover:text-white transition-colors duration-200" />
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
              <div className="space-y-4">
                <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-white/10 hover:border-white/20 transition-colors duration-200">
                  <h4 className="font-semibold text-white mb-3">Account Details</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Name, email, and contact information you provide when creating an account or reaching out for support.
                  </p>
                </div>
                <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-white/10 hover:border-white/20 transition-colors duration-200">
                  <h4 className="font-semibold text-white mb-3">Authentication</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Secure credentials and verification data to protect your account and verify identity.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-white/10 hover:border-white/20 transition-colors duration-200">
                  <h4 className="font-semibold text-white mb-3">Billing Information</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Payment details and transaction records necessary for service billing and account management.
                  </p>
                </div>
                <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-white/10 hover:border-white/20 transition-colors duration-200">
                  <h4 className="font-semibold text-white mb-3">Professional Profile</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Company, role, and industry information to better understand and serve your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="group">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-white flex items-center">
              Technical Data
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-3 text-gray-600 group-hover:text-white transition-colors duration-200" />
            </h3>
            <div className="text-gray-300 space-y-4 text-base sm:text-lg leading-relaxed">
              <p>We collect technical information to ensure our services work properly and securely. This includes API usage statistics, system performance metrics, and interaction logs that help us optimize your experience.</p>
              <p>Device information such as IP addresses, browser details, and system specifications are collected for compatibility and security purposes. We also gather analytics about how you use our platform to identify popular features and areas for improvement.</p>
            </div>
          </div>

          <div className="group">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-white flex items-center">
              AI-Related Data
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-3 text-gray-600 group-hover:text-white transition-colors duration-200" />
            </h3>
            <div className="text-gray-300 space-y-4 text-base sm:text-lg leading-relaxed">
              <p>When you use our AI services, we process the content you submit including text, images, and other data types. This processing enables us to provide AI-powered responses and recommendations.</p>
              <p>We may retain anonymized versions of AI interactions to improve our models, but we implement strict privacy safeguards to protect your individual information and maintain confidentiality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Use Information */}
      <section id="usage" className="mb-16 sm:mb-24 scroll-mt-20" aria-labelledby="usage-heading">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 sm:mb-12">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
            <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 id="usage-heading" className="text-3xl sm:text-4xl font-bold mb-2">How We Use Your Information</h2>
            <p className="text-gray-400 text-base sm:text-lg">Powering our services and your experience</p>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-2xl border border-blue-500/20 hover:border-blue-500/30 transition-colors duration-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">Service Delivery</h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Providing AI development tools, processing API requests, and delivering personalized experiences tailored to your needs.
            </p>
          </div>
          <div className="p-6 sm:p-8 bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-2xl border border-green-500/20 hover:border-green-500/30 transition-colors duration-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">AI Enhancement</h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Improving our AI models and developing new capabilities while maintaining strict privacy and anonymization standards.
            </p>
          </div>
          <div className="p-6 sm:p-8 bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/30 transition-colors duration-200 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">Business Operations</h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Managing accounts, processing payments, providing support, and ensuring platform security and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Data Sharing */}
      <section id="sharing" className="mb-16 sm:mb-24 scroll-mt-20" aria-labelledby="sharing-heading">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 sm:mb-12">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 id="sharing-heading" className="text-3xl sm:text-4xl font-bold mb-2">Data Sharing and Disclosure</h2>
            <p className="text-gray-400 text-base sm:text-lg">When and why we might share your information</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-2xl p-6 sm:p-8 border border-white/10 mb-8">
          <p className="text-lg sm:text-xl text-white mb-4 sm:mb-6 font-medium">
            We never sell your personal information. Period.
          </p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Your data may only be shared in specific circumstances with trusted partners under strict agreements, for legal compliance, or with your explicit consent.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-gray-300">
          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white mb-2">Service Providers</h4>
              <p>Trusted third parties who help deliver our services, such as cloud hosting and payment processing, under strict confidentiality agreements.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white mb-2">Legal Requirements</h4>
              <p>When required by law or to protect rights and safety, we may disclose information as legally mandated.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white mb-2">With Your Consent</h4>
              <p>Any other sharing occurs only with your explicit permission and clear understanding of the purpose.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="mb-16 sm:mb-24 scroll-mt-20" aria-labelledby="security-heading">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 sm:mb-12">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 id="security-heading" className="text-3xl sm:text-4xl font-bold mb-2">Security and Protection</h2>
            <p className="text-gray-400 text-base sm:text-lg">How we keep your data safe</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-6 sm:p-10 border border-white/10">
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white">Infrastructure Security</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  'End-to-end encryption',
                  'Multi-factor authentication',
                  'Regular security audits',
                  'Enterprise-grade protection'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-300 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white">AI-Specific Safeguards</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  'Isolated training environments',
                  'Data anonymization protocols',
                  'Secure API endpoints',
                  'Ethical AI compliance'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-300 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section id="rights" className="mb-16 sm:mb-24 scroll-mt-20" aria-labelledby="rights-heading">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 sm:mb-12">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 id="rights-heading" className="text-3xl sm:text-4xl font-bold mb-2">Your Privacy Rights</h2>
            <p className="text-gray-400 text-base sm:text-lg">Control over your personal information</p>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { title: "Access", desc: "View all data we have about you" },
            { title: "Correct", desc: "Update inaccurate information" },
            { title: "Delete", desc: "Remove your data from our systems" },
            { title: "Export", desc: "Download your data in a portable format" },
            { title: "Opt-out", desc: "Stop marketing communications" },
            { title: "Restrict", desc: "Limit how we process your data" },
            { title: "Object", desc: "Challenge automated decisions" },
            { title: "Withdraw", desc: "Remove consent for AI training" }
          ].map((right, index) => (
            <div key={index} className="p-4 sm:p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-200">
              <h4 className="font-semibold text-white mb-2">{right.title}</h4>
              <p className="text-gray-400 text-xs sm:text-sm">{right.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Sections */}
      <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-24">
        <section aria-labelledby="retention-heading">
          <h2 id="retention-heading" className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Data Retention</h2>
          <div className="space-y-4 text-gray-300">
            <p className="text-sm sm:text-base">We retain your information only as long as necessary for the purposes outlined in this policy.</p>
            <div className="bg-gray-900/50 rounded-xl p-4 sm:p-6 border border-white/10">
              <div className="space-y-3 text-xs sm:text-sm">
                {[
                  { label: 'Account Data', period: '30 days after deletion' },
                  { label: 'API Logs', period: '90 days' },
                  { label: 'Billing Records', period: '7 years' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.label}</span>
                    <span className="text-gray-400">{item.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="transfers-heading">
          <h2 id="transfers-heading" className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">International Transfers</h2>
          <div className="space-y-4 text-gray-300">
            <p className="text-sm sm:text-base">Your data may be processed globally with appropriate safeguards in place.</p>
            <div className="bg-gray-900/50 rounded-xl p-4 sm:p-6 border border-white/10">
              <p className="text-xs sm:text-sm">We use Standard Contractual Clauses and other approved mechanisms to ensure consistent protection standards worldwide.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Contact Section - Enhanced for better detection */}
      <section id="contact" className="mb-32 scroll-mt-20 min-h-[60vh]" aria-labelledby="contact-heading">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 sm:mb-12">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold mb-2">Get in Touch</h2>
            <p className="text-gray-400 text-base sm:text-lg">Questions about your privacy? We&apos;re here to help</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 sm:p-10 border border-white/10 mb-16">
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm sm:text-base">Email</p>
                    <a 
                      href={`mailto:${contactEmail}`}
                      className="text-gray-400 text-sm sm:text-base hover:text-blue-400 transition-colors duration-200"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm sm:text-base">Urgent Matters</p>
                    <a 
                      href={`mailto:${urgentEmail}`}
                      className="text-gray-400 text-sm sm:text-base hover:text-green-400 transition-colors duration-200"
                    >
                      {urgentEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white">Response Times</h3>
              <div className="space-y-4">
                <div className="p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="font-medium text-white mb-1 text-sm sm:text-base">General Inquiries</p>
                  <p className="text-gray-400 text-xs sm:text-sm">We respond within 3 days</p>
                </div>
                <div className="p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="font-medium text-white mb-1 text-sm sm:text-base">Urgent Privacy Matters</p>
                  <p className="text-gray-400 text-xs sm:text-sm">We respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyContent;