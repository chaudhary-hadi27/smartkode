"use client";

import { motion } from "framer-motion";
import Head from "next/head";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const features = [
  {
    title: "AI-first Engineering",
    description:
      "We create intelligent systems with precision — merging design, data, and automation.",
  },
  {
    title: "Scalable Platforms",
    description:
      "From MVPs to enterprise systems — we build tech that evolves with your business.",
  },
  {
    title: "Clean Architecture",
    description:
      "We write systems like we mean it: clean, modular, and built for the long run.",
  },
  {
    title: "Human-Centered UX",
    description:
      "We care about elegance — blending usability, accessibility, and performance.",
  },
];

export default function MissionPage() {
  return (
    <>
      <Head>
        <title>Our Mission | SmartKode</title>
        <meta
          name="description"
          content="At SmartKode, our mission is to empower innovation by building intelligent, scalable, and elegant systems for startups and enterprises."
        />
        <meta property="og:title" content="Our Mission | SmartKode" />
        <meta
          property="og:description"
          content="We craft scalable, AI-driven systems for startups and enterprises. Learn about our mission and what drives our engineering culture."
        />
        <meta property="og:url" content="https://smartkode.io/about/mission" />
        <meta property="og:type" content="website" />
        {/* You can add og:image when ready */}
        <link rel="canonical" href="https://smartkode.io/about/mission" />
      </Head>

      <div className="bg-black text-white font-sans">
        {/* Hero Section */}
        <section className="relative px-6 md:px-16 py-24 text-center overflow-hidden">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Our Mission
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              At{" "}
              <span className="text-white font-semibold">SmartKode</span>, we
              build systems that empower people and simplify complexity —
              blending automation, design, and intelligence.
            </p>
          </motion.div>
        </section>

        {/* Core Philosophy */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 md:px-16 py-20 border-t border-gray-800"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Why We Exist</h3>
            <p className="text-gray-400 leading-relaxed">
              We exist to turn ideas into intelligent systems — using clean
              code, AI, and creativity. We don&apos;t just ship features — we craft
              enduring software.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Who We Serve
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Startups, agencies, and enterprises looking to build scalable tech
              — from zero to launch and beyond. We&apos;re not your vendor — we&apos;re
              your partner.
            </p>
          </div>
        </motion.section>

        {/* Feature Highlights */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="bg-[#0a0a0a] px-6 md:px-16 py-20 border-t border-gray-800"
        >
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">How We Think</h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              SmartKode isn&apos;t just a team of developers — we&apos;re systems
              thinkers, product collaborators, and code architects.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map(({ title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-[#111] p-6 rounded-xl border border-gray-800 shadow-md hover:shadow-xl transition"
              >
                <h4 className="text-xl font-semibold mb-2 text-white">
                  {title}
                </h4>
                <p className="text-gray-400 text-sm">{description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA to Vision & Values */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="px-6 md:px-16 py-24 text-center border-t border-gray-800"
        >
          <h3 className="text-3xl font-bold mb-4">Driven by Principles</h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            At the core of every system we build lies a clear vision and set of
            values that guide our work and relationships. Dive deeper into what
            shapes us.
          </p>
          <a
            href="/about/vision"
            className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Explore Vision & Values
          </a>
        </motion.section>
      </div>
    </>
  );
}