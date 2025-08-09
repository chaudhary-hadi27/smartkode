"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { FaUserTie, FaTools, FaLightbulb, FaUsers } from "react-icons/fa";

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

export default function CulturePage() {
  return (
    <div className="bg-black text-white font-sans">
      {/* SEO Meta Tags */}
      <Head>
        <title>Our Culture | SmartKode</title>
        <meta
          name="description"
          content="Explore the foundational culture at SmartKode — rooted in ownership, excellence, learning, and people-first collaboration."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Our Culture | SmartKode" />
        <meta
          property="og:description"
          content="Explore how SmartKode fosters responsibility, innovation, and collaboration in every aspect of its company culture."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.smartkode.io/about/culture" />
      </Head>

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
          Our Culture
        </motion.h1>
        <motion.p
          variants={fadeInStagger}
          className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto"
        >
          At <span className="text-white font-semibold">SmartKode</span>, our culture is a strategic foundation that informs every initiative, decision, and collaboration. It is shaped by principles that foster responsibility, innovation, and meaningful impact.
        </motion.p>
      </motion.section>

      {/* Core Principles */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInStagger}
        className="px-6 md:px-16 py-20 max-w-4xl mx-auto border-t border-gray-800 space-y-16"
      >
        <motion.div variants={fadeInStagger}>
          <h3 className="text-3xl font-semibold mb-4 flex items-center gap-2">
            <FaUserTie className="text-white" /> Culture of Ownership
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Every team member is encouraged to take full responsibility and initiative. We value autonomy backed by accountability and believe in empowering individuals to lead and contribute beyond defined roles.
          </p>
        </motion.div>

        <motion.div variants={fadeInStagger}>
          <h3 className="text-3xl font-semibold mb-4 flex items-center gap-2">
            <FaTools className="text-white" /> Commitment to Excellence
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            We emphasize precision, clarity, and efficiency in every deliverable. Whether it&apos;s code, design, or communication — we strive for high standards and continuous refinement in our work.
          </p>
        </motion.div>

        <motion.div variants={fadeInStagger}>
          <h3 className="text-3xl font-semibold mb-4 flex items-center gap-2">
            <FaLightbulb className="text-white" /> Continuous Learning
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Curiosity and professional growth are embedded in our workflow. Through ongoing learning, team-driven discussions, and exposure to new technologies, we build both expertise and adaptability.
          </p>
        </motion.div>

        <motion.div variants={fadeInStagger}>
          <h3 className="text-3xl font-semibold mb-4 flex items-center gap-2">
            <FaUsers className="text-white" /> People-Centric Collaboration
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            We prioritize clarity, respect, and alignment over rigid structures. Our collaborative culture promotes openness, fast decision-making, and synergy across departments.
          </p>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
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
          Culture That Reflects Excellence and Integrity
        </motion.h3>
        <motion.p
          variants={fadeInStagger}
          className="text-gray-300 text-lg max-w-2xl mx-auto mb-8"
        >
          SmartKode&apos;s culture is the foundation of everything we build. Dive deeper into the principles and impact that drive our team forward.
        </motion.p>
        <motion.a
          variants={fadeInStagger}
          href="/about/impact"
          className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Discover Our Impact
        </motion.a>
      </motion.section>
    </div>
  );
}