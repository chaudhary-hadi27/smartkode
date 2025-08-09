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
    question: "What tools do you use for UI/UX design?",
    answer:
      "We use Figma, Adobe XD, Sketch, and InVision to create interactive and pixel-perfect designs that follow modern UI/UX principles.",
  },
  {
    question: "Do you provide both design and development?",
    answer:
      "Yes. We offer full-stack service — from wireframes and prototypes to responsive frontend development in React, Next.js, and Tailwind CSS.",
  },
  {
    question: "Can you improve our existing UI/UX?",
    answer:
      "Absolutely. We conduct audits and usability testing to refine your product's interface, user journey, and overall experience.",
  },
  {
    question: "Do you follow accessibility standards?",
    answer:
      "Yes. We follow WCAG and ADA accessibility guidelines to ensure inclusive, barrier-free user experiences across all devices.",
  },
  {
    question: "How do you handle revisions and feedback?",
    answer:
      "We work collaboratively via Figma and Slack/Notion, and offer multiple review cycles to ensure you’re fully satisfied with the result.",
  },
  {
    question: "Can you build clickable prototypes?",
    answer:
      "Yes. We create interactive Figma prototypes that simulate real product flows before a single line of code is written.",
  },
];

const services = [
  {
    title: "User Interface Design",
    text:
      "Craft sleek, intuitive, and visually engaging UI that aligns with your brand and engages your users on every screen size.",
    image:
      "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753949910/ui_hcp1ci.png",
    list: [
      "Mobile-first & responsive design",
      "Design systems & UI kits",
      "Dark/light mode support",
      "Component-based Figma structures",
    ],
  },
  {
    title: "User Experience Strategy",
    text:
      "We analyze user journeys and pain points to design experiences that feel seamless, natural, and result in higher engagement.",
    image:
      "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753950009/ues_lzwgvd.avif",
    list: [
      "Persona creation & journey mapping",
      "UX audits & heuristic evaluations",
      "Information architecture design",
      "Conversion-focused layouts",
    ],
  },
  {
    title: "Prototyping & Interaction",
    text:
      "Bring your ideas to life with interactive prototypes. Test, validate, and iterate before development begins.",
    image:
      "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753950075/pat_hqeyzs.jpg",
    list: [
      "Interactive Figma/InVision prototypes",
      "Microinteractions & motion design",
      "Usability testing & feedback loops",
      "Stakeholder demo-ready flows",
    ],
  },
];

export default function UIUXPage() {
  return (
    <div className="bg-black text-white px-6 md:px-16 py-16">
      <Head>
        <title>UI/UX Design Services | SmartKode</title>
        <meta
          name="description"
          content="SmartKode designs intuitive, engaging UI/UX experiences. From wireframes to interactive prototypes, we craft user-centered digital products that convert and delight."
        />
        <meta
          name="keywords"
          content="UI UX design, Figma, UX strategy, mobile design, prototype, accessibility, web app design, SmartKode"
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
          UI/UX Design Services
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          Elevate your digital product with pixel-perfect UI and smooth, human-centered UX — all designed by our expert team.
        </p>
      </motion.div>

      {/* UI/UX Services */}
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
      <section id="faq" className="max-w-4xl mx-auto mt-20">
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
