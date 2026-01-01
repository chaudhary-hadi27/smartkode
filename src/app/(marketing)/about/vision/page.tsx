"use client";

import Head from "next/head";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function VisionPage() {
  return (
    <>
      {/* SEO HEAD */}
      <Head>
        <title>Vision & Values | SmartKode</title>
        <meta
          name="description"
          content="Discover the vision and core values that drive SmartKode — from ethical AI engineering to scalable, intelligent systems."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SmartKode" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content="Vision & Values | SmartKode" />
        <meta
          property="og:description"
          content="Explore our vision to empower businesses with ethical, scalable, AI-first solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.smartkode.io/about/vision" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.smartkode.io/about/vision" />
      </Head>

      {/* Main Page */}
      <div className="bg-black text-white font-sans">
        {/* Hero */}
        <section className="px-6 md:px-16 py-24 text-center border-b border-gray-800">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Vision & Values
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Our north star is clear — to build intelligent, ethical systems
              that elevate industries and empower people through simplicity,
              automation, and trust.
            </p>
          </motion.div>
        </section>

        {/* Vision */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="px-6 md:px-16 py-24 max-w-5xl mx-auto border-b border-gray-800"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Our Vision</h2>
          <p className="text-gray-400 text-base leading-relaxed space-y-4">
            <span>
              At SmartKode, we envision a world where software isn&apos;t just a
              tool — it&apos;s a trusted partner in decision-making, creativity, and
              scale. We build AI-first, data-driven platforms with precision and
              ethical design at the core.
            </span>
            <br />
            <span>
              Our goal is to reduce operational friction and unlock the full
              potential of businesses — using intelligent automation, clean
              interfaces, and systems that scale with integrity.
            </span>
          </p>
        </motion.section>

        {/* Values */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="bg-[#0a0a0a] px-6 md:px-16 py-24 border-b border-gray-800"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-12 text-center">
              What We Stand For
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-sm text-gray-300">
              {[
                {
                  title: "Ethical Engineering",
                  desc: "We write code with intention and build systems that respect users, data, and society.",
                },
                {
                  title: "Simplicity by Design",
                  desc: "Less noise. More clarity. Every interface and backend is structured for ease and scale.",
                },
                {
                  title: "Scalable Architecture",
                  desc: "We build for today and engineer for tomorrow — always ready for growth and change.",
                },
                {
                  title: "Transparency & Trust",
                  desc: "Every interaction — internal or external — is shaped by honesty and accountability.",
                },
                {
                  title: "Performance as Priority",
                  desc: "Clean code, fast load times, modular services — we optimize at every layer.",
                },
                {
                  title: "Innovation Through Curiosity",
                  desc: "We explore, prototype, and iterate with discipline to stay ahead of change.",
                },
              ].map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="bg-[#111] p-6 rounded-xl border border-gray-800 shadow hover:shadow-xl transition"
                >
                  <h4 className="text-white font-semibold text-lg mb-2">
                    {val.title}
                  </h4>
                  <p className="text-gray-400">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center px-6 md:px-16 py-24"
        >
          <h2 className="text-3xl font-bold mb-4">
            Our People Make It Possible
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
            Behind every system, there&apos;s a dedicated team. Get to know the
            minds and hearts shaping our vision every day.
          </p>
          <a
            href="/about/culture"
            className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Company Culture & Values
          </a>
        </motion.section>
      </div>
    </>
  );
}