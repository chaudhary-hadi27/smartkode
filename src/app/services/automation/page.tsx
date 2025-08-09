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
    question: "What types of automation solutions do you offer?",
    answer:
      "We automate repetitive tasks across business functions — from RPA bots for operations to AI-powered workflows, APIs, and agent-based systems.",
  },
  {
    question: "Do you provide both no-code and code-based automation?",
    answer:
      "Yes. We support tools like Zapier, Make, and Power Automate as well as Python, Node.js, Selenium, Puppeteer, and custom scripts for enterprise-grade automation.",
  },
  {
    question: "Can you automate tasks across multiple apps?",
    answer:
      "Absolutely. We integrate with CRMs, spreadsheets, databases, APIs, email services, cloud storage, and more — ensuring seamless cross-platform automation.",
  },
  {
    question: "Is it possible to build smart AI agents?",
    answer:
      "Yes. We build AI agents that combine task automation with reasoning, planning, and decision-making — ideal for customer support, scheduling, and workflows.",
  },
  {
    question: "How secure is the automation process?",
    answer:
      "We follow strict security standards, encrypt sensitive credentials, use secure APIs, and ensure your business logic is fully protected and traceable.",
  },
];

const sections = [
  {
    title: "RPA & Workflow Automation",
    text:
      "Automate time-consuming, repetitive business processes using rule-based and AI-driven bots — freeing up your team for high-value work.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344168/rpa_y246cu.png",
    list: [
      "Robotic Process Automation (RPA)",
      "Data scraping, document processing",
      "Invoice, email, form automations",
      "Human-in-the-loop integrations",
    ],
  },
  {
    title: "Custom Scripting & Integrations",
    text:
      "Build custom scripts that automate everything from file handling and reporting to complex cross-system workflows using APIs and databases.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343887/web_hlmskm.jpg",
    list: [
      "Python, Node.js, Selenium, Puppeteer",
      "Automation with Google Sheets, CRMs",
      "Cloud task schedulers & triggers",
      "Secure execution environments",
    ],
  },
  {
    title: "AI-Powered Agents & Smart Workflows",
    text:
      "Leverage LLMs and intelligent agents that go beyond traditional rules — combining reasoning, API-calling, and prompt chaining for smarter execution.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344164/agents_ab8fij.jpg",
    list: [
      "LLM agents (OpenAI, LangChain, AutoGen)",
      "Customer support & HR automation",
      "Voice & text command execution",
      "Multi-step planning and task chaining",
    ],
  },
];

export default function AutomationServicesPage() {
  return (
    <div className="bg-black text-white px-6 md:px-16 py-16">
      <Head>
        <title>Automation Services | SmartKode</title>
        <meta
          name="description"
          content="SmartKode builds automation workflows, RPA bots, and AI agents to streamline operations, reduce cost, and boost productivity across systems."
        />
        <meta
          name="keywords"
          content="Automation, RPA, AI agents, workflow automation, smart bots, Python automation, SmartKode, business automation services"
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
          Automation Services
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          We help you automate repetitive tasks, streamline operations, and scale faster using smart bots, scripts, and AI agents.
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
