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
    question: "What DevOps tools do you work with?",
    answer:
      "We use GitHub Actions, GitLab CI, Jenkins, Docker, Kubernetes, Terraform, Ansible, Prometheus, Grafana, and more.",
  },
  {
    question: "Do you support AWS, Azure, or GCP?",
    answer:
      "Yes. We deploy and manage DevOps solutions across all major cloud platforms including AWS, Microsoft Azure, and Google Cloud.",
  },
  {
    question: "Can you automate our deployment pipelines?",
    answer:
      "Absolutely. We specialize in setting up automated CI/CD workflows tailored to your development stack and infrastructure.",
  },
  {
    question: "How do you handle infrastructure security?",
    answer:
      "We use IaC with security modules, enforce role-based access, and integrate vulnerability scanning and auditing into CI/CD.",
  },
  {
    question: "Can you migrate our infrastructure to containers?",
    answer:
      "Yes, we help containerize legacy applications using Docker and orchestrate them using Kubernetes or ECS.",
  },
  {
    question: "Do you offer monitoring and alerting?",
    answer:
      "Yes. We set up full observability stacks using Prometheus, Grafana, ELK, and integrate alerts with Slack, PagerDuty, or email.",
  },
];

const services = [
  {
    title: "CI/CD Pipeline Automation",
    text:
      "Streamline your software delivery lifecycle with fully automated Continuous Integration and Continuous Deployment pipelines.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753949201/cicd_mab5ji.jpg",
    list: [
      "GitHub Actions, GitLab CI/CD, Jenkins, CircleCI",
      "Staging, production & rollback flows",
      "Auto testing, linting, and approvals",
      "Secure artifact & image deployments",
    ],
  },
  {
    title: "Infrastructure as Code (IaC)",
    text:
      "We codify your infrastructure using Terraform, Pulumi, or AWS CloudFormation, enabling reproducible, scalable, and secure deployments.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753949440/iac_f2oblr.jpg",
    list: [
      "Terraform modules & workspaces",
      "Pulumi for multi-cloud automation",
      "AWS CDK & CloudFormation stacks",
      "Drift detection & policy enforcement",
    ],
  },
  {
    title: "Kubernetes & Cloud Orchestration",
    text:
      "SmartKode builds secure, auto-scaling clusters with Helm, K8s, and ECS. From dev clusters to multi-region production environments.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753949734/kco_p8ssu9.png",
    list: [
      "Kubernetes on EKS, GKE, AKS, or on-prem",
      "Helm charts & secrets management",
      "Horizontal pod autoscaling (HPA)",
      "Load balancing & ingress controllers",
    ],
  },
];

export default function DevOpsPage() {
  return (
    <div className="bg-black text-white px-6 md:px-16 py-16">
      <Head>
        <title>DevOps Services | SmartKode</title>
        <meta
          name="description"
          content="SmartKode provides scalable DevOps and infrastructure automation services. Build CI/CD pipelines, manage Kubernetes, and deploy with security and speed."
        />
        <meta
          name="keywords"
          content="DevOps, CI/CD, Kubernetes, Docker, Terraform, GitHub Actions, Infrastructure as Code, SmartKode, CloudOps, AWS, Azure, GCP"
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
          DevOps & Infrastructure Automation
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          Automate deployments, manage cloud infrastructure, and enable high-velocity teams with scalable DevOps workflows.
        </p>
      </motion.div>

      {/* DevOps Services */}
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
