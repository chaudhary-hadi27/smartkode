"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { FaBolt, FaGlobe, FaBrain, FaChartLine } from "react-icons/fa";

const fadeInStagger = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.3,
    },
  },
};

export default function ImpactInnovationPage() {
  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>Impact & Innovation | SmartKode</title>
        <meta
          name="description"
          content="Discover how SmartKode drives impact through technological acceleration, AI-powered intelligence, and global innovation."
        />
        <meta property="og:title" content="Impact & Innovation | SmartKode" />
        <meta
          property="og:description"
          content="Discover how SmartKode drives impact through technological acceleration, AI-powered intelligence, and global innovation."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smartkode.io/about/impact" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SmartKode" />
        <meta charSet="UTF-8" />
        <link rel="canonical" href="https://smartkode.io/about/impact" />
      </Head>

      {/* Page Content */}
      <div id="impact" className="bg-black text-white font-sans">
        {/* Hero Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInStagger}
          className="px-6 md:px-16 py-24 text-center"
        >
          <motion.h1
            variants={fadeInStagger}
            className="text-5xl font-extrabold mb-6 leading-tight tracking-tight"
          >
            Impact & Innovation
          </motion.h1>
          <motion.p
            variants={fadeInStagger}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto"
          >
            At <span className="text-white font-semibold">SmartKode</span>,
            impact is measured not just by results, but by how those results are
            achieved — through innovation, intelligence, and intentional design.
            We build solutions that scale, inspire, and evolve.
          </motion.p>
        </motion.section>

        {/* Key Pillars */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInStagger}
          className="px-6 md:px-16 py-20 max-w-5xl mx-auto border-t border-gray-800 space-y-16"
        >
          <motion.div variants={fadeInStagger}>
            <h3 className="text-3xl font-semibold mb-4 flex items-center gap-2">
              <FaBolt className="text-white" aria-hidden="true" />
              Technological Acceleration
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              We invest in emerging technologies to accelerate transformation
              and drive measurable outcomes. Our solutions are engineered for
              performance, reliability, and continuous scalability across
              industries.
            </p>
          </motion.div>

          <motion.div variants={fadeInStagger}>
            <h3 className="text-3xl font-semibold mb-4 flex items-center gap-2">
              <FaBrain className="text-white" aria-hidden="true" />
              AI-Powered Intelligence
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Artificial Intelligence is central to our innovation strategy.
              From predictive systems to intelligent automation, we apply
              data-driven intelligence to create smarter user experiences and
              operational efficiency.
            </p>
          </motion.div>

          <motion.div variants={fadeInStagger}>
            <h3 className="text-3xl font-semibold mb-4 flex items-center gap-2">
              <FaGlobe className="text-white" aria-hidden="true" />
              Global Problem Solving
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Our work addresses real-world challenges — from sustainability and
              cybersecurity to healthcare and digital equity. We believe that
              meaningful impact is achieved when innovation is aligned with
              global responsibility.
            </p>
          </motion.div>

          <motion.div variants={fadeInStagger}>
            <h3 className="text-3xl font-semibold mb-4 flex items-center gap-2">
              <FaChartLine className="text-white" aria-hidden="true" />
              Measurable Value Creation
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Every initiative at SmartKode is built with purpose and measurable
              outcomes in mind. We continuously optimize systems, workflows, and
              strategies to maximize value for clients, stakeholders, and users.
            </p>
          </motion.div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInStagger}
          className="px-6 md:px-16 py-24 text-center border-t border-gray-800"
        >
          <motion.h3
            variants={fadeInStagger}
            className="text-3xl font-bold mb-4"
          >
            Innovation with Purpose. Impact with Precision.
          </motion.h3>
          <motion.p
            variants={fadeInStagger}
            className="text-gray-300 text-lg max-w-2xl mx-auto mb-8"
          >
            Partner with SmartKode to deliver solutions that are future-ready,
            data-informed, and designed to make a difference. Innovation is not
            an option — it’s our responsibility. Learn more on our{" "}
            <a href="/about" className="underline hover:text-white">
              About page
            </a>
            .
          </motion.p>
          <motion.a
            variants={fadeInStagger}
            href="/contact"
            className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Contact Us
          </motion.a>
        </motion.section>
      </div>
    </>
  );
}
