"use client";

import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const services = [
  {
    title: "SEO & Content Marketing",
    text:
      "Boost your visibility with tailored SEO strategies, keyword-optimized content, and on-page/off-page SEO. We create authoritative content that ranks and converts.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753948822/marketing_b6288a.png",
    list: [
      "Technical SEO audits & site optimization",
      "Blog & landing page content creation",
      "Backlink building strategies",
      "Local SEO & voice search optimization",
    ],
  },
  {
    title: "Social Media Marketing",
    text:
      "Engage your audience on platforms that matter. We craft platform-specific content and run targeted campaigns to grow your brand and drive engagement.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753947946/social-media_buvcnd.jpg",
    list: [
      "Instagram, Facebook, LinkedIn strategy",
      "Ad creatives, reels, stories, carousel design",
      "Influencer collaborations & UGC campaigns",
      "Social analytics and sentiment tracking",
    ],
  },
  {
    title: "Performance Ads & PPC",
    text:
      "Drive ROI with data-driven ads across Google, Meta, LinkedIn, and more. From keyword research to A/B testing, we optimize every dollar spent.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753948910/Ads_l7w8ut.png",
    list: [
      "Google Ads, Meta Ads, YouTube, TikTok",
      "Keyword research & intent targeting",
      "Landing page optimization (CRO)",
      "Realtime reporting dashboards",
    ],
  },
];

const faqs = [
  {
    question: "How do you measure digital marketing success?",
    answer:
      "We track KPIs like traffic, leads, engagement, conversion rate, CAC, and ROI. Dashboards and monthly reports ensure transparency and impact.",
  },
  {
    question: "Which platforms do you run ads on?",
    answer:
      "We run performance ads across Google, Facebook, Instagram, LinkedIn, YouTube, TikTok, and Twitter/X — based on your target audience.",
  },
  {
    question: "Do you offer content creation too?",
    answer:
      "Yes. We design creatives, write copy, produce blogs, videos, ads, and interactive posts that match your brand voice.",
  },
  {
    question: "Can you manage my brand's social media?",
    answer:
      "Absolutely. We provide end-to-end management — content calendars, posting, comments handling, DMs, and performance insights.",
  },
  {
    question: "Is SEO still important in 2025?",
    answer:
      "Yes. SEO is evolving but remains essential. We adapt strategies using AI tools, voice optimization, E-E-A-T principles, and modern link-building.",
  },
];

export default function DigitalMarketingPage() {
  return (
    <div className="bg-black text-white px-6 md:px-16 py-16">
      <Head>
        <title>Digital Marketing Services | SmartKode</title>
        <meta
          name="description"
          content="SmartKode offers advanced digital marketing services — SEO, PPC, Social Media, and performance marketing that drives business growth."
        />
        <meta
          name="keywords"
          content="digital marketing, SEO, PPC, social media marketing, content strategy, SmartKode marketing, Google Ads, Meta Ads, Pakistan marketing agency"
        />
      </Head>

      {/* Hero Section */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        whileInView="whileInView"
        transition={fadeIn.transition}
        className="text-center mb-12 max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Digital Marketing Services
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          Reach, engage, and convert your audience. SmartKode delivers modern
          marketing that’s data-driven, creative, and ROI-focused.
        </p>
      </motion.div>

      {/* Services */}
      {services.map((section, index) => (
        <section
          key={index}
          className={`flex flex-col md:flex-row ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          } items-center gap-10 mb-24`}
        >
          <motion.div
            initial={{ opacity: 0, x: index % 2 !== 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <Image
              src={section.image}
              alt={section.title}
              width={600}
              height={400}
              className="rounded-xl object-cover shadow-xl"
              loading="lazy"
            />
          </motion.div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
            <p className="text-gray-300 mb-4">{section.text}</p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              {section.list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto mt-20">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-10 text-center"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4 divide-y divide-gray-800">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-black text-white rounded-xl p-6 cursor-pointer group open:bg-gray-900"
            >
              <summary className="flex justify-between items-center font-medium text-lg marker:hidden">
                {faq.question}
                <span className="transform transition-transform duration-300 group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-3 text-gray-400 text-base leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
