"use client";

import { useEffect, useRef } from "react";
import { LegalPageData } from "@/components/legal/legal.types";

interface LegalPageTemplateProps {
    data: LegalPageData;
}

// Converts section title to anchor id — must match layout.tsx section ids
const slugify = (title: string) =>
    title
        .toLowerCase()
        .replace(/^\d+\.\s*/, "")
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

export default function LegalPageTemplate({ data }: LegalPageTemplateProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    /* ── Full-page animated stars ── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        const dots: {
            x: number; y: number;
            vx: number; vy: number;
            r: number; alpha: number;
        }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const init = () => {
            dots.length = 0;
            const count = Math.floor((canvas.width * canvas.height) / 9000);
            for (let i = 0; i < count; i++) {
                dots.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    r: Math.random() * 1.5 + 0.4,
                    alpha: Math.random() * 0.28 + 0.05,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dots.forEach((d) => {
                d.x += d.vx;
                d.y += d.vy;
                if (d.x < 0) d.x = canvas.width;
                if (d.x > canvas.width) d.x = 0;
                if (d.y < 0) d.y = canvas.height;
                if (d.y > canvas.height) d.y = 0;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${d.alpha})`;
                ctx.fill();
            });
            animId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", () => { resize(); init(); });
        resize();
        init();
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", () => { resize(); init(); });
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">

            {/* Stars — fixed behind everything, text always on top */}
            <canvas
                ref={canvasRef}
                aria-hidden
                className="pointer-events-none fixed inset-0 w-full h-full z-0"
            />

            {/* Content layer */}
            <div className="relative z-10">

                {/* Hero */}
                <section className="flex flex-col items-center justify-center text-center px-5 pt-28 pb-20 border-b border-white/[0.06]">
                    <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 bg-white/[0.04] backdrop-blur-sm mb-7">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white/50">
              Legal
            </span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.06] mb-6 max-w-3xl">
                        {data.title}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-white/50 leading-relaxed max-w-xl mb-5">
                        {data.subtitle}
                    </p>

                    <p className="text-sm text-white/25">
                        Last updated{" "}
                        <span className="text-white/45 font-medium">{data.lastUpdated}</span>
                    </p>
                </section>

                {/* Sections */}
                <div className="w-full max-w-2xl mx-auto px-5 sm:px-8 py-16">
                    {data.sections.map((section, i) => {
                        const cleanTitle = section.title.replace(/^\d+\.\s*/, "");
                        const anchorId = slugify(section.title);

                        return (
                            <section
                                key={i}
                                id={anchorId}
                                className="scroll-mt-24 py-10 border-b border-white/[0.05] last:border-b-0"
                            >
                                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-mono text-xs text-white/20 tabular-nums w-6 shrink-0 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                                    <h2 className="text-xl sm:text-2xl font-semibold text-white/90 leading-snug">
                                        {cleanTitle}
                                    </h2>
                                </div>

                                <div className="pl-10">
                                    {Array.isArray(section.content) ? (
                                        <ul className="space-y-4">
                                            {section.content.map((item, j) => (
                                                <li
                                                    key={j}
                                                    className="flex gap-3 text-white/55 text-base sm:text-[17px] leading-relaxed"
                                                >
                                                    <span className="mt-[10px] shrink-0 w-1 h-1 rounded-full bg-white/25" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-white/55 text-base sm:text-[17px] leading-relaxed">
                                            {section.content}
                                        </p>
                                    )}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* Contact strip */}
                <div className="w-full max-w-2xl mx-auto px-5 sm:px-8 pb-28">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
                                backgroundSize: "22px 22px",
                            }}
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background:
                                    "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.92) 100%)",
                            }}
                        />
                        <div className="relative z-10 flex flex-col items-center text-center gap-5 px-6 py-14 sm:py-16">
                            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/30">
                                Still have questions?
                            </p>
                            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight max-w-sm">
                                We're happy to clarify anything.
                            </h3>
                            <p className="text-base text-white/40 max-w-sm leading-relaxed">
                                If something in this document is unclear, reach out and we'll respond promptly.
                            </p>
                            <a
                                href="mailto:info@smartkode.co"
                                className="group inline-flex items-center gap-2.5 bg-white text-black text-sm font-bold px-7 py-3.5 rounded-xl hover:bg-white/90 active:scale-95 transition-all duration-200 mt-1"
                            >
                                info@smartkode.co
                                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden
                                     className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                                          stroke="currentColor" strokeWidth="1.6"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}