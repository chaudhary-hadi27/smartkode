"use client";

import { useState } from "react";
import { MessageCircle, Mail, MapPin, Zap, Send } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const data = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      token: captcha,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      setLoading(false);

      if (res.ok) {
        setFormData({ name: "", email: "", message: "" });
        setCaptcha(null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch {
      setLoading(false);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-16 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <header className="text-center mb-16 sm:mb-20 lg:mb-24 max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 sm:mb-8 leading-tight tracking-tight">
            Get In Touch
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto px-4">
            Ready to transform your business with cutting-edge technology? Let&apos;s
            discuss your project and explore how we can help you achieve your goals.
          </p>
        </header>

        {/* Main Contact Section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24">
          {/* Left Side - Contact Information */}
          <div className="space-y-8 lg:space-y-12">
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center mr-6 text-white shadow-xl border border-zinc-700/50">
                  <MessageCircle className="w-8 h-8" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Let&apos;s Build Something Amazing Together
              </h2>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                Have questions about AI solutions or want to start a project with us?
                Drop us a message and we&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-900/30 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-zinc-600/50">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email Us</h3>
                  <a
                    href="mailto:info@smartkode.io"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    info@smartkode.io
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-900/30 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-zinc-600/50">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Location</h3>
                  <p className="text-gray-300">Islamabad, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-900/30 transition-colors duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-zinc-600/50">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">WhatsApp</h3>
                  <a
                    href="https://wa.me/+9203004479894"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    +92 300 4479894
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/chaudharyhadi-ai-engineer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl border border-zinc-800">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-gray-400 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block mr-2"></span>
                We typically respond within 24 hours
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 text-left">
              <div>
                <label htmlFor="name" className="sr-only">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-sm sm:text-base"
                  disabled={loading}
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-sm sm:text-base"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white outline-none transition-all resize-vertical text-sm sm:text-base"
                  disabled={loading}
                ></textarea>
              </div>

              {/* reCAPTCHA would go here in production */}
              <div className="pt-2 flex justify-center">
                <div className="text-gray-500 text-sm text-center">
                  reCAPTCHA verification would be enabled in production
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-white text-black px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              {success && (
                <div className="text-center p-4 bg-green-900/20 border border-green-700/50 rounded-xl">
                  <p className="text-green-400 font-medium">
                    Message sent successfully! We&apos;ll get back to you soon.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Contact Options */}
            <div className="mt-10 pt-8 border-t border-zinc-700/50">
              <p className="text-gray-400 text-sm mb-4 text-center">
                Or reach out directly:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:info@smartkode.io"
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800/30 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
                <a
                  href="https://wa.me/+9203004479894"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800/30 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional CTA Section */}
        <section className="max-w-6xl mx-auto mt-20 sm:mt-24 lg:mt-32 text-center">
          <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-zinc-800">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
              Join hundreds of satisfied clients who have transformed their businesses
              with our technology solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/+9203004479894"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-white to-gray-100 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
              >
                <Zap className="w-5 h-5 mr-2" />
                Quick Chat
                <div className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
