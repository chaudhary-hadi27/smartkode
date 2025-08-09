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
    question: "What types of chatbots do you build?",
    answer:
      "We build custom AI chatbots for customer support, lead generation, education, healthcare, HR, and more — powered by LLMs or rule-based logic.",
  },
  {
    question: "Can your chatbot work on our website or app?",
    answer:
      "Yes. We can deploy chatbots on websites, mobile apps, WhatsApp, Facebook Messenger, Slack, and even custom enterprise systems.",
  },
  {
    question: "Do you train chatbots on our internal documents?",
    answer:
      "Absolutely. We specialize in document-based training using RAG pipelines and vector databases — so the chatbot understands your business deeply.",
  },
  {
    question: "What technologies do you use for chatbot development?",
    answer:
      "We use GPT APIs, LangChain, Pinecone, Whisper, Dialogflow, Rasa, and more — tailored to your project’s requirements, privacy needs, and budget.",
  },
  {
    question: "Can the chatbot speak or convert voice to text?",
    answer:
      "Yes. We integrate text-to-speech and speech-to-text systems, enabling full voice-based AI assistants for support, kiosks, or apps.",
  },
];

const sections = [
  {
    title: "AI Chatbots for Customer Support",
    text:
      "Build powerful LLM-based chatbots that handle customer queries 24/7, provide instant answers, and reduce support costs drastically.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344323/chatbot_fkrokf.avif",
    list: [
      "OpenAI, Claude, Gemini API integration",
      "Retrieval-Augmented Generation (RAG)",
      "Multi-language and tone adaptation",
      "Zendesk, Intercom, and custom widget support",
    ],
  },
  {
    title: "Conversational AI for Internal Use",
    text:
      "Empower your employees with chatbots that can answer HR questions, onboard team members, or automate ticketing systems.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344327/internal_vnsd9k.webp",
    list: [
      "Knowledge-based bots with PDF ingestion",
      "Authentication and access control",
      "Slack, Teams, and internal tool integration",
      "Private cloud or on-prem hosting options",
    ],
  },
  {
    title: "Voice & Multimodal AI Assistants",
    text:
      "Create interactive assistants that can hear, speak, see, and understand — ideal for kiosks, e-learning, or accessibility apps.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344330/voice_qc4lwx.jpg",
    list: [
      "Speech-to-text (Whisper, Google STT)",
      "Voice cloning and TTS integration",
      "Camera + CV-based chatbot input",
      "Frontend UI and animations with WebRTC",
    ],
  },
];

export default function ChatbotServicesPage() {
  return (
    <div className="bg-black text-white px-6 md:px-16 py-16">
      <Head>
        <title>Chatbot Development Services | SmartKode</title>
        <meta
          name="description"
          content="SmartKode builds intelligent AI chatbots and assistants for customer support, lead generation, internal tools, and voice-based interaction."
        />
        <meta
          name="keywords"
          content="AI chatbot, GPT chatbot, voice assistant, LLM chatbot, SmartKode, Chatbot services, WhatsApp bot, Web chat, LangChain bots"
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
          Chatbot Development Services
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          Build next-gen conversational AI with SmartKode — from LLM chatbots and support agents to voice-powered virtual assistants.
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
