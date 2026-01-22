"use client";
"use client";

import React, { useState } from 'react';
import Head from "next/head";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Zap,
  GraduationCap,
  Globe,
  DollarSign,
  Clock,
  ChevronDown,
  Send,
  Mail,
  Shield,
  Lightbulb,
  CheckCircle,
  Users,
  TrendingUp,
  Target
} from 'lucide-react';

// Types
interface Position {
  id: string;
  title: string;
  type: "full-time" | "project" | "internship";
  experience: string;
  commission: string;
  description: string;
  skills: string[];
}

const fadeInVariant = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const positions: Position[] = [
  {
    id: "1",
    title: "AI/ML Developer",
    type: "full-time",
    experience: "2+ years",
    commission: "10-40%",
    description: "Build machine learning models and AI systems for production.",
    skills: ["Python", "TensorFlow", "PyTorch", "ML", "Deep Learning"]
  },
  {
    id: "2",
    title: "Full-Stack Developer",
    type: "project",
    experience: "1+ year",
    commission: "15-40%",
    description: "Develop end-to-end web applications with React and Node.js.",
    skills: ["React", "Node.js", "Next.js", "MongoDB", "PostgreSQL"]
  },
  {
    id: "3",
    title: "DevOps Engineer",
    type: "full-time",
    experience: "2+ years",
    commission: "10-35%",
    description: "Manage cloud infrastructure and deployment systems.",
    skills: ["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD"]
  }
];

export default function CareersPage() {
  const [expandedPosition, setExpandedPosition] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    position: "",
    experience: "",
    portfolio: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    alert("Application submitted! (Demo mode)");
    setFormState({
      fullName: "",
      email: "",
      position: "",
      experience: "",
      portfolio: "",
      message: ""
    });
  };

  const handleApplyClick = () => {
    const applySection = document.getElementById('apply');
    if (applySection) {
      const offset = 80;
      const elementPosition = applySection.offsetTop;
      const offsetPosition = elementPosition - offset - 20;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* SEO Meta */}
      <Head>
        <title>Careers | SmartKode</title>
        <meta
          name="description"
          content="Join SmartKode - Build AI solutions with flexible opportunities, transparent commission, and real growth potential."
        />
        <meta property="og:title" content="Careers | SmartKode" />
        <meta
          property="og:description"
          content="Explore career opportunities at SmartKode. Full-time, project-based, and internship positions available."
        />
        <meta property="og:url" content="https://smartkode.io/careers" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://smartkode.io/careers" />
      </Head>

      <div id="careers" className="bg-black text-white px-6 md:px-16 py-20 font-sans">
        <div className="max-w-4xl mx-auto space-y-24">
          
          {/* Overview Section */}
          <motion.section
            id="overview"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInVariant}
            transition={{ duration: 0.6 }}
            className="scroll-mt-20"
          >
            <div className="text-center mb-12">
              <h1 className="text-5xl font-black mb-4">Build Intelligence With Us</h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Join a team building AI solutions that transform businesses. Flexible work, transparent commission, real growth.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              {[
                { label: "Open Positions", value: "8+" },
                { label: "Commission Range", value: "10-40%" },
                { label: "Remote Ready", value: "100%" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Opportunities Section */}
          <motion.section
            id="opportunities"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInVariant}
            transition={{ duration: 0.6 }}
            className="scroll-mt-20"
          >
            <h2 className="text-3xl font-bold mb-8">Opportunity Types</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Briefcase, title: "Full-Time", desc: "Stable salary + 10% project commission" },
                { icon: Zap, title: "Project-Based", desc: "10-40% commission per project" },
                { icon: GraduationCap, title: "Internship", desc: "6-month mentorship + stipend" },
                { icon: Globe, title: "Freelance", desc: "Flexible per-project work" }
              ].map((opp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition"
                >
                  <opp.icon className="w-8 h-8 mb-4 text-white/60" />
                  <h3 className="text-xl font-bold mb-2">{opp.title}</h3>
                  <p className="text-gray-400">{opp.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Compensation Section */}
          <motion.section
            id="compensation"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInVariant}
            transition={{ duration: 0.6 }}
            className="scroll-mt-20"
          >
            <h2 className="text-3xl font-bold mb-8">Transparent Earning Model</h2>
            
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
              <h3 className="text-xl font-bold mb-6">Income Breakdown</h3>
              {[
                { label: "Project Commission", percent: 40 },
                { label: "Company Growth Reserve", percent: 50 },
                { label: "Income Backup", percent: 10 }
              ].map((item, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{item.label}</span>
                    <span className="text-xl font-bold">{item.percent}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percent}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="bg-white h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-lg font-bold mb-6">Example Earnings</h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: "$10K project:", value: "$1K-$4K" },
                  { label: "Monthly:", value: "$50K-$80K" },
                  { label: "Annual:", value: "$300K+" }
                ].map((ex, i) => (
                  <div key={i} className="text-center">
                    <p className="text-gray-400 text-sm mb-2">{ex.label}</p>
                    <p className="text-2xl font-bold">{ex.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Open Positions Section */}
          <motion.section
            id="positions"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInVariant}
            transition={{ duration: 0.6 }}
            className="scroll-mt-20"
          >
            <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
            <div className="space-y-4">
              {positions.map((position) => (
                <div key={position.id} className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setExpandedPosition(expandedPosition === position.id ? null : position.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition"
                  >
                    <div className="text-left flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold">{position.title}</h3>
                        <span className="px-3 py-1 bg-white/10 text-xs font-bold rounded-lg uppercase">
                          {position.type}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{position.description}</p>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform ${expandedPosition === position.id ? 'rotate-180' : ''}`} />
                  </button>

                  {expandedPosition === position.id && (
                    <div className="px-6 pb-6 border-t border-white/10 pt-6">
                      <div className="grid md:grid-cols-2 gap-8 mb-6">
                        <div>
                          <h4 className="font-bold mb-3 flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>Experience</span>
                          </h4>
                          <p className="text-gray-400">{position.experience}</p>
                        </div>
                        <div>
                          <h4 className="font-bold mb-3 flex items-center space-x-2">
                            <DollarSign className="w-4 h-4" />
                            <span>Commission</span>
                          </h4>
                          <p className="text-gray-400">{position.commission}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-bold mb-3">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {position.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-white/10 text-sm rounded-lg">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={handleApplyClick}
                        className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-white/90 transition"
                      >
                        Apply for this position
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Internship Section */}
          <motion.section
            id="internship"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInVariant}
            transition={{ duration: 0.6 }}
            className="scroll-mt-20"
          >
            <h2 className="text-3xl font-bold mb-8">Internship Program</h2>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Program Duration</h3>
                  <p className="text-4xl font-black mb-2">6 Months</p>
                  <p className="text-gray-400">Structured learning + real projects</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Monthly Stipend</h3>
                  <p className="text-4xl font-black mb-2">₹15K-30K</p>
                  <p className="text-gray-400">Performance-based increases</p>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-4">What You Get</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Mentorship from senior developers",
                  "Real-world AI & web projects",
                  "Portfolio building opportunities",
                  "Conversion to full-time potential",
                  "Certificate & recommendations",
                  "Learning resources & courses"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Culture Section */}
          <motion.section
            id="culture"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInVariant}
            transition={{ duration: 0.6 }}
            className="scroll-mt-20"
          >
            <h2 className="text-3xl font-bold mb-8">Culture & Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Lightbulb, title: "Innovation First", desc: "Experiment with cutting-edge AI" },
                { icon: Users, title: "Collaborative", desc: "Teamwork across time zones" },
                { icon: TrendingUp, title: "Growth Mindset", desc: "Continuous learning investment" },
                { icon: Shield, title: "Ownership", desc: "Take pride in quality delivery" },
                { icon: Zap, title: "Speed & Efficiency", desc: "Ship fast, iterate quickly" },
                { icon: Target, title: "Transparency", desc: "Clear goals, honest feedback" }
              ].map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition"
                >
                  <pillar.icon className="w-8 h-8 mb-4 text-white/60" />
                  <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                  <p className="text-gray-400">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Application Section */}
          <motion.section
            id="apply"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInVariant}
            transition={{ duration: 0.6 }}
            className="scroll-mt-20"
          >
            <h2 className="text-3xl font-bold mb-8">Apply Today</h2>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formState.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-white/30 outline-none transition"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-white/30 outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">Position *</label>
                  <select
                    value={formState.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-white/30 outline-none transition"
                  >
                    <option value="">Select position</option>
                    <option value="AI/ML Developer">AI/ML Developer</option>
                    <option value="Full-Stack Developer">Full-Stack Developer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-2">Experience *</label>
                  <select
                    value={formState.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-white/30 outline-none transition"
                  >
                    <option value="">Select experience</option>
                    <option value="Fresh">Fresh / 0-1 year</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="2-5 years">2-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">Portfolio/GitHub *</label>
                <input
                  type="url"
                  value={formState.portfolio}
                  onChange={(e) => handleInputChange('portfolio', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-white/30 outline-none transition"
                  placeholder="https://github.com/yourname"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Message (Optional)</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-white/30 outline-none transition resize-none"
                  placeholder="Tell us why you're a great fit..."
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-white text-black py-4 rounded-lg font-bold hover:bg-white/90 transition flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Submit Application</span>
              </button>

              <p className="text-center text-gray-500 text-sm">
                We'll review and respond within 3-5 business days
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">Have questions?</p>
              <a href="mailto:careers@smartkode.io" className="inline-flex items-center space-x-2 text-white hover:text-gray-300 font-semibold">
                <Mail className="w-5 h-5" />
                <span>careers@smartkode.io</span>
              </a>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}