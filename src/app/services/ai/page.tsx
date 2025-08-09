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
    question: "What types of AI projects do you handle?",
    answer:
      "We develop predictive systems, vision models, language AI, automation bots, and end-to-end enterprise AI platforms. Each project is tailored to business needs.",
  },
  {
    question: "How much do AI solutions cost?",
    answer:
      "Pricing depends on complexity and scale. We offer packages from MVPs for startups to enterprise-grade deployments, optimized for value and ROI.",
  },
  {
    question: "Can your AI integrate with existing apps?",
    answer:
      "Yes. We provide seamless AI integration with web, mobile, CRMs, ERPs, cloud platforms like AWS, Azure, and more.",
  },
  {
    question: "Do you use custom AI or third-party APIs?",
    answer:
      "Both. We train models with PyTorch, TensorFlow, etc., and can also integrate APIs like GPT-4, Claude, or Gemini — depending on the use-case.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We implement GDPR-compliant protocols, encrypted data pipelines, and NDA-bound confidentiality on every project.",
  },
  {
    question: "Do you support the AI after deployment?",
    answer:
      "Yes, we provide post-deployment support, monitoring, model retraining, and optimization through MLOps pipelines.",
  },
];

const services = [
  {
    title: "Machine Learning & Deep Learning",
    text:
      "From anomaly detection to sales forecasting, our ML/DL services build real-time intelligent models that drive business growth. We specialize in scalable, high-performance solutions across healthcare, fintech, and logistics.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753343999/ml_gy19pd.jpg",
    list: [
      "Custom AI models: CNNs, RNNs, GANs, Transformers",
      "Real-time predictions & fraud detection systems",
      "Edge AI deployment (Jetson, Coral)",
      "TensorFlow, PyTorch, ONNX & cloud-ready ML pipelines",
    ],
  },
  {
    title: "Natural Language Processing (NLP)",
    text:
      "We build NLP solutions like chatbots, language classifiers, document analyzers, and fine-tuned LLMs. Our stack includes OpenAI, HuggingFace, and RAG pipelines to extract meaning from complex texts.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344002/nlp_m7gf4f.webp",
    list: [
      "Chatbots, RAG systems, summarization engines",
      "Multilingual support, NER, classification",
      "LLM fine-tuning (OpenAI, Claude, LLaMA)",
      "Private document QA and enterprise NLP",
    ],
  },
  {
    title: "Computer Vision",
    text:
      "SmartKode builds vision systems that can see, understand, and act — in real time. Ideal for manufacturing, retail, medtech, and surveillance.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344005/vision_xuuohx.jpg",
    list: [
      "Face recognition, OCR, license plate readers",
      "Quality inspection using high-speed cameras",
      "Retail analytics, footfall tracking, object detection",
      "Video stream processing, AR/VR visual input",
    ],
  },
];

export default function AiServicePage() {
  return (
    <div className="bg-black text-white px-6 md:px-16 py-16">
      <Head>
        <title>AI Development Services | SmartKode</title>
        <meta
          name="description"
          content="SmartKode offers scalable AI solutions in Machine Learning, NLP, and Computer Vision. Build intelligent, secure, and cost-efficient AI systems tailored to your industry."
        />
        <meta
          name="keywords"
          content="AI development, NLP, machine learning, deep learning, computer vision, chatbots, SmartKode, AI Pakistan, OpenAI integration, TensorFlow, PyTorch"
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
          AI Development Services
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          Build intelligent systems with SmartKode. From ML pipelines to
          vision AI and LLMs — we deliver future-ready solutions for real-world
          impact.
        </p>
      </motion.div>

      {/* AI Services */}
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
