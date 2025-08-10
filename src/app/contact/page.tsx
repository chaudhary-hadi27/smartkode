"use client";

import { useState, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
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
        toast.success("Message sent!");
        form.reset();
        setCaptcha(null);
        setSuccess(true);
      } else {
        toast.error("Failed to send. Try again.");
      }
    } catch {
      setLoading(false);
      toast.error("Network error. Please try later.");
    }
  };

  return (
    <div
      id="contact"
      className="min-h-screen bg-black text-white px-6 md:px-12 py-12 flex flex-col justify-center"
    >
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 divide-gray-800 divide-y md:divide-y-0">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 md:pr-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            Have questions about AI solutions or want to start a project with us? Drop us a message and we&#39;ll get back to you within 24 hours.
          </p>

          <div className="space-y-4 text-gray-400 text-sm max-w-xs">
            <p className="flex items-center gap-3">
              <Mail size={20} className="text-white" />
              <a
                href="mailto:info@smartkode.io"
                className="hover:text-gray-300 transition"
              >
                info@smartkode.io
              </a>
            </p>
            <p className="flex items-center gap-3">
              <MapPin size={20} className="text-white" />
              Islamabad, Pakistan
            </p>
          </div>

          <div className="pt-6 flex gap-8 text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-300 transition font-medium"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-300 transition font-medium"
            >
              X
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-300 transition font-medium"
            >
              GitHub
            </a>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-12 md:pt-0 space-y-6 max-w-md"
        >
          <input
            name="name"
            required
            placeholder="Your Name"
            className="w-full p-4 bg-black text-white rounded-xl border border-gray-800 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition shadow-sm"
            autoComplete="name"
            aria-label="Your Name"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Your Email"
            className="w-full p-4 bg-black text-white rounded-xl border border-gray-800 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition shadow-sm"
            autoComplete="email"
            aria-label="Your Email"
          />
          <textarea
            name="message"
            required
            placeholder="Your Message"
            rows={5}
            className="w-full p-4 bg-black text-white rounded-xl border border-gray-800 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition shadow-sm resize-none"
            aria-label="Your Message"
          />

          <div className="pt-2 flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              theme="dark"
              onChange={(token) => setCaptcha(token)}
            />
          </div>

          <button
            type="submit"
            disabled={!captcha || loading}
            className={`w-full px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl
              hover:bg-gray-700 active:bg-gray-600 transition shadow-md
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-gray-400 text-center font-medium mt-2">
              Thank you for reaching out! We will get back to you soon.
            </p>
          )}
        </motion.form>
      </div>
    </div>
  );
}
