"use client"

import Image from "next/image"
import Head from "next/head"
import { motion } from "framer-motion"
import type { ServiceData } from "@/data/services/servicesData"

const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
}

interface ServiceTemplateProps {
    data: ServiceData
}

export default function ServiceTemplate({ data }: ServiceTemplateProps) {
    return (
        <div className="bg-black text-white px-4 sm:px-6 md:px-16 py-12 sm:py-16">
            <Head>
                <title>{data.seo.title}</title>
                <meta name="description" content={data.seo.description} />
                <meta name="keywords" content={data.seo.keywords} />
            </Head>

            {/* Hero Section - Responsive */}
            <motion.div
                variants={fadeIn}
                initial="initial"
                whileInView="whileInView"
                transition={fadeIn.transition}
                className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto"
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                    {data.title}
                </h1>
                <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
                    {data.description}
                </p>
            </motion.div>

            {/* Service Sections - Alternating Layout */}
            {data.sections.map((section, index) => (
                <section
                    key={index}
                    className={`flex flex-col ${
                        index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
                    } items-center gap-6 sm:gap-8 md:gap-10 mb-16 sm:mb-20 md:mb-24`}
                >
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: index % 2 !== 0 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:w-1/2"
                    >
                        <Image
                            src={section.image}
                            alt={section.title}
                            width={600}
                            height={400}
                            className="rounded-xl object-cover shadow-xl w-full h-auto"
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                    </motion.div>

                    {/* Content */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                            {section.title}
                        </h2>
                        <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                            {section.text}
                        </p>
                        <ul className="list-disc list-inside text-gray-400 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                            {section.list.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            ))}

            {/* FAQ Section - Fully Responsive */}
            <section className="max-w-4xl mx-auto mt-12 sm:mt-16 md:mt-20">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 md:mb-10 text-center"
                >
                    Frequently Asked Questions
                </motion.h2>

                <div className="space-y-3 sm:space-y-4 divide-y divide-gray-800">
                    {data.faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="bg-black text-white rounded-xl p-4 sm:p-6 cursor-pointer group open:bg-gray-900"
                        >
                            <summary className="flex justify-between items-center font-medium text-base sm:text-lg marker:hidden">
                                <span className="pr-4">{faq.question}</span>
                                <span className="transform transition-transform duration-300 group-open:rotate-180 flex-shrink-0">
                  ▼
                </span>
                            </summary>
                            <p className="mt-3 text-gray-400 text-sm sm:text-base transition-all duration-300 leading-relaxed">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    )
}