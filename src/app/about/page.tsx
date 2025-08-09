"use client";

import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeInVariant = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const techStack = [
  { name: "SQL", logo: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345302/sql_nrxvnk.png" },
  { name: "Python", logo: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345328/python_m330ds.svg" },
  { name: "OpenAI", logo: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345359/gpt_ovguag.png" },
  { name: "OpenCV", logo: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345368/opencv_gkee83.png" },
  { name: "Pytorch", logo: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345382/pytorch_kedo8g.png" },
  { name: "Tensorflow", logo: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345390/tensorflow_zwpx8s.png" },
  { name: "AWS", logo: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345406/aws_oqxaxl.png" },
  { name: "Seaborn", logo: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345417/seaborn_hkqzol.png" },
  { name: "HuggingFace", logo: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345433/hugging-face_pix9sx.png" },
  { name: "Nextjs", logo: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753345440/nextjs_jevpfr.jpg" },
];

export default function AboutPage() {
  return (
    <>
      {/* SEO Meta */}
      <Head>
        <title>About Us | SmartKode</title>
        <meta
          name="description"
          content="Learn about SmartKode’s mission to build intelligent, scalable systems powered by AI. Meet the founder and explore our technologies."
        />
        <meta property="og:title" content="About Us | SmartKode" />
        <meta
          property="og:description"
          content="Explore SmartKode’s mission, vision, principles, and AI-powered technology stack that shapes future-ready solutions."
        />
        <meta property="og:url" content="https://smartkode.io/about" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344831/hadi_olqyan.jpg"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://smartkode.io/about" />
        <meta charSet="UTF-8" />
        <meta name="author" content="SmartKode" />
      </Head>

      {/* Main Page Content */}
      <div id="about" className="bg-black text-white px-6 md:px-16 py-20 font-sans">
        {/* Hero + Founder */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInVariant}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-24"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            Powering Innovation. Delivering Intelligence.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mt-2 mb-10">
            At <span className="text-white font-semibold">SmartKode</span>, we design intelligent systems that transform industries — driven by purpose, engineered with precision.
          </p>

          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-4">
            <Image
              src="https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344831/hadi_olqyan.jpg"
              alt="Hadi – Founder of SmartKode"
              width={256}
              height={256}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
          <h3 className="text-xl font-semibold">Hadi</h3>
          <p className="text-gray-400 text-sm">Founder & AI Architect</p>
          <p className="text-gray-500 text-sm mt-2 max-w-md">
            Building intelligent software with clean code, scalable systems, and meaningful innovation in AI and data.
          </p>
        </motion.section>

        <div className="border-t border-gray-800 my-16 w-full max-w-5xl mx-auto" />

        {/* Mission & Vision */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInVariant}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 mb-24"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To build AI-first, scalable solutions that simplify complexity and empower businesses through smart automation, web, and data.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              We envision a world where intelligent systems empower every idea with clean architecture, ethical AI, and impactful outcomes.
            </p>
          </div>
        </motion.section>

        <div className="border-t border-gray-800 my-16 w-full max-w-5xl mx-auto" />

        {/* Core Principles */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInVariant}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-24"
        >
          <h3 className="text-2xl font-bold mb-10 text-center">Our Core Principles</h3>
          <div className="grid md:grid-cols-3 gap-12 text-gray-400 text-sm leading-relaxed">
            <div>
              <h4 className="text-white font-semibold text-lg mb-2">Integrity</h4>
              <p>Transparent communication and quality-first execution in every solution.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg mb-2">Precision</h4>
              <p>We build tech with thoughtful design, clean architecture, and scalability in mind.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg mb-2">Innovation</h4>
              <p>We embrace evolving technologies with curiosity, discipline, and experimentation.</p>
            </div>
          </div>
        </motion.section>

        <div className="border-t border-gray-800 my-16 w-full max-w-5xl mx-auto" />

        {/* Tech Stack */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInVariant}
          transition={{ duration: 0.6 }}
          className="max-w-[1100px] mx-auto text-center mb-24 px-4"
        >
          <h3 className="text-2xl font-bold mb-6">Tech Stack</h3>
          <p className="text-gray-400 mb-10 text-sm">The technologies that shape our platforms.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.07 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex flex-col items-center bg-[#111] p-4 rounded-xl shadow-lg w-full hover:shadow-white/10"
              >
                <div className="w-14 h-14 relative mb-2">
                  <Image
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-300 mt-2">{tech.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInVariant}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mt-20"
        >
          <h3 className="text-2xl font-bold mb-4">Explore Our Mission</h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            See how our systems-thinking approach, clean architecture, and AI-first mindset help businesses scale meaningfully.
          </p>
          <a
            href="/about/mission"
            className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Visit Mission Page
          </a>
        </motion.section>
      </div>
    </>
  );
}
