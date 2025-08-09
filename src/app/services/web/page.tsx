"use client";

import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const faqs = [
  {
    question: "What web technologies do you use?",
    answer:
      "We specialize in modern frameworks like Next.js, React, Tailwind CSS, Node.js, Express, and scalable deployment via Vercel, AWS, or Docker-based environments.",
  },
  {
    question: "Do you build both frontend and backend?",
    answer:
      "Yes. We offer full-stack development including API design, admin dashboards, authentication systems, and scalable databases (SQL, MongoDB).",
  },
  {
    question: "Can you redesign or optimize my existing website?",
    answer:
      "Absolutely. We offer redesigns, performance tuning, accessibility improvements, and SEO optimization to boost conversions and UX.",
  },
  {
    question: "Do you provide e-commerce or CMS solutions?",
    answer:
      "Yes, we develop custom e-commerce platforms, Shopify/Stripe integrations, and headless CMS setups using Sanity, Contentful, or Strapi.",
  },
  {
    question: "Is the website mobile responsive and SEO-optimized?",
    answer:
      "Every project we deliver is fully responsive, fast-loading, and SEO-optimized — ensuring high visibility and usability across devices.",
  },
];

const sections = [
  {
    title: "Custom Web Applications",
    text:
      "From internal business tools to consumer-facing portals, we develop fast, secure, and scalable web apps tailored to your exact needs.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344610/web-app_sphdeh.jpg",
    list: [
      "Next.js, React, Tailwind, TypeScript",
      "Real-time systems with WebSockets or Firebase",
      "Authentication, role management, dashboard design",
      "API-first development and third-party integrations",
    ],
  },
  {
    title: "Business & Portfolio Websites",
    text:
      "We design high-impact websites that reflect your brand and engage users. Ideal for agencies, startups, and growing companies.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344606/portfolio_o199zf.avif",
    list: [
      "Fast-loading and SEO-optimized pages",
      "Animations and transitions (Framer Motion)",
      "CMS integration for dynamic content",
      "Analytics, blog, and newsletter support",
    ],
  },
  {
    title: "E-Commerce & Payment Integration",
    text:
      "Launch a modern e-commerce platform with seamless checkout, product filtering, inventory tracking, and responsive design.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344602/ecommerce_kfxbj7.png",
    list: [
      "Custom carts and product management",
      "Stripe, PayPal, Razorpay integrations",
      "Order tracking & admin dashboard",
      "Secure user authentication",
    ],
  },
];

export default function WebDevPage() {
  return (
    <div className="bg-black text-white px-6 md:px-16 py-16">
      <Head>
        <title>Web Development Services | SmartKode</title>
        <meta
          name="description"
          content="SmartKode offers full-stack web development using Next.js, React, and modern tools. Build blazing-fast websites, web apps, and e-commerce platforms."
        />
        <meta
          name="keywords"
          content="Web development, Next.js, React, E-commerce, CMS, SmartKode, Portfolio Websites, SEO optimized web apps"
        />
      </Head>

      {/* Hero */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        whileInView="whileInView"
        transition={fadeIn.transition}
        className="text-center mb-12 max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Web Development Services
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          We build modern websites and full-stack web applications using the
          latest frameworks — crafted for performance, SEO, and user experience.
        </p>
      </motion.div>

      {/* Sections */}
      {sections.map((section, index) => (
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

      {/* FAQ */}
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
                <span className="transform transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
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
