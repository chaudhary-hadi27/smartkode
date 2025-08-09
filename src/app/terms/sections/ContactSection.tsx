import { Mail, Users, Globe, Download } from 'lucide-react';
import TermsSection from '../components/TermsSection';

interface ContactSectionProps {
  contactEmail?: string;
  supportEmail?: string;
}

export default function ContactSection({ 
  contactEmail = "info@smartkode.io",
  supportEmail = "support@smartkode.io"
}: ContactSectionProps) {
  return (
    <TermsSection
      id="contact"
      title="Contact Information"
      description="Get in touch with our legal and support teams"
      icon={Mail}
      gradient="from-indigo-500 to-purple-600"
    >
      <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-400" />
                Support
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 group">
                  <Mail className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-200" />
                  <a 
                    href={`mailto:${supportEmail}`}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                  >
                    {supportEmail}
                  </a>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Globe className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-gray-300">24/7 Online Support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-400" />
                General Contact
              </h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors duration-300">
                <div className="flex items-center space-x-3 group">
                  <Mail className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform duration-200" />
                  <a 
                    href={`mailto:${contactEmail}`}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-400" />
                Online Resources
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 group">
                  <Globe className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                  <a 
                    href="https://smartkode.io"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    smartkode.io
                  </a>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Users className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-gray-300">Help Center Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              Response times: Legal matters within 48 hours, Support within 24 hours
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Quick actions:</span>
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-200 text-sm group"
              >
                <Download className="w-4 h-4 inline mr-1 group-hover:scale-110 transition-transform duration-200" />
                Download Terms PDF
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-indigo-900/20 rounded-xl p-6 border border-indigo-500/30">
          <h4 className="font-semibold text-indigo-300 mb-3">Emergency Contact</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            For urgent security issues or legal emergencies, contact us immediately:
          </p>
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-red-400" />
            <a 
              href="mailto:legal@smartkode.io"
              className="text-red-300 hover:text-red-400 transition-colors duration-200 text-sm"
            >
              legal@smartkode.io
            </a>
            <span className="text-gray-500 text-xs">• Priority Response</span>
          </div>
        </div>
      </div>
    </TermsSection>
  );
}