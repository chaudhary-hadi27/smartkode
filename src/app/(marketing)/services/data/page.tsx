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
    question: "What types of data analytics services do you provide?",
    answer:
      "We offer business intelligence dashboards, predictive analytics models, ETL pipelines, data warehouse setup, and real-time reporting — all tailored to your specific business use-case.",
  },
  {
    question: "Which tools and technologies do you use?",
    answer:
      "We work with Python (Pandas, NumPy, Scikit-learn), SQL, Power BI, Tableau, Apache Airflow, DBT, AWS, GCP BigQuery, and more — depending on your tech stack and scalability needs.",
  },
  {
    question: "Can you clean and transform raw data?",
    answer:
      "Absolutely. Our data engineers handle messy, unstructured data and turn it into structured formats via automated pipelines using ETL/ELT processes.",
  },
  {
    question: "Do you build custom dashboards and reports?",
    answer:
      "Yes. We design interactive dashboards and real-time analytics views for KPIs, user behavior, sales trends, and operational metrics using tools like Power BI, Tableau, and custom React dashboards.",
  },
  {
    question: "Is my data secure with your team?",
    answer:
      "100%. We follow strict data governance, access control, and secure cloud protocols to ensure your data remains private and fully compliant.",
  },
];

const sections = [
  {
    title: "Business Intelligence & Dashboarding",
    text:
      "We build dynamic dashboards and visualization layers that provide real-time, data-driven insights across all departments — enabling faster, smarter decisions.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344464/bi_csywfd.avif",
    list: [
      "Power BI, Tableau, Looker Studio",
      "Custom React dashboards with APIs",
      "Interactive filtering & drill-downs",
      "Role-based access & secure embedding",
    ],
  },
  {
    title: "Data Engineering & Warehousing",
    text:
      "Set up robust, scalable data pipelines using modern cloud tools and infrastructure to consolidate, clean, and model your data for downstream analytics.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344489/etl_qmljpb.jpg",
    list: [
      "ETL/ELT with Airflow, DBT, Python",
      "Data lakes & cloud warehouses (BigQuery, Redshift)",
      "Structured & unstructured data handling",
      "Event-driven or batch pipeline support",
    ],
  },
  {
    title: "Predictive Analytics & ML Insights",
    text:
      "Leverage machine learning to forecast sales, churn, user behavior, and demand trends — helping you make strategic decisions powered by AI.",
    image: "https://res.cloudinary.com/dpvcr9xf6/image/upload/v1753344493/predictive_hfndmv.webp",
    list: [
      "Classification, regression, clustering",
      "Sales forecasting, customer segmentation",
      "Data science using Scikit-learn, XGBoost",
      "Model interpretation with SHAP & explainable AI",
    ],
  },
];

export default function DataAnalyticsPage() {
  return (
    <div className="bg-black text-white px-6 md:px-16 py-16">
      <Head>
        <title>Data Analytics Services | SmartKode</title>
        <meta
          name="description"
          content="SmartKode helps businesses unlock insights with predictive analytics, BI dashboards, data engineering pipelines and secure cloud data platforms."
        />
        <meta
          name="keywords"
          content="Data analytics, Business Intelligence, Power BI, ETL pipelines, SmartKode, Predictive analytics, Cloud data, Data engineering"
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
          Data Analytics Services
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          From dashboards to predictive modeling — we turn your raw data into powerful business intelligence and decisions.
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
