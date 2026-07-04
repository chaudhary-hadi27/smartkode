"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
    const mobileNavRef = useRef<HTMLDivElement>(null);

    const [navOpen, setNavOpen] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [progress, setProgress] = useState(0);

    const sections = data.sections.map((section) => ({
        ...section,
        cleanTitle: section.title.replace(/^\d+\.\s*/, ""),
        anchorId: slugify(section.title),
    }));

    /* ── Full-page animated stars ── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        let animId = 0;
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
                    vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.35,
                    vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.35,
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
            if (!prefersReducedMotion) {
                animId = requestAnimationFrame(draw);
            }
        };

        // Named handler so add/remove reference the same function
        // (the original code lost this listener on cleanup).
        const handleResize = () => {
            resize();
            init();
        };

        resize();
        init();
        draw();
        window.addEventListener("resize", handleResize);

        return () => {
            if (animId) cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    /* ── Reading-progress bar ── */
    useEffect(() => {
        let ticking = false;

        const updateProgress = () => {
            const doc = document.documentElement;
            const scrollable = doc.scrollHeight - doc.clientHeight;
            const pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
            setProgress(pct);
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        };

        updateProgress();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ── Scrollspy: highlight the section currently in view ── */
    useEffect(() => {
        const elements = sections
            .map((s) => document.getElementById(s.anchorId))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.sections.length]);

    /* ── Close the mobile quick-links dropdown on outside click / Escape ── */
    useEffect(() => {
        if (!navOpen) return;

        const handleClick = (e: MouseEvent) => {
            if (
                mobileNavRef.current &&
                !mobileNavRef.current.contains(e.target as Node)
            ) {
                setNavOpen(false);
            }
        };
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setNavOpen(false);
        };

        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, [navOpen]);

    const handleJump = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        el.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
        });
        setNavOpen(false);
    }, []);

    return (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">

            {/* Reading progress */}
            <div
                aria-hidden
                className="fixed top-0 left-0 h-[2px] bg-white z-50 transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />

            {/* Stars — fixed behind everything, text always on top */}
            <canvas
                ref={canvasRef}
                aria-hidden
                className="pointer-events-none fixed inset-0 w-full h-full z-0"
            />

            {/* ── Quick links: desktop persistent side nav ── */}
            {sections.length > 1 && (
                <nav
                    aria-label="On this page"
                    className="hidden lg:flex flex-col fixed top-32 right-8 xl:right-14 z-30 w-56"
                >
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/60 mb-4 pl-4">
                        On this page
                    </span>
                    <ul className="flex flex-col gap-0.5 border-l border-white/15">
                        {sections.map((s) => {
                            const isActive = activeId === s.anchorId;
                            return (
                                <li key={s.anchorId}>
                                    <a
                                        href={`#${s.anchorId}`}
                                        aria-current={isActive ? "location" : undefined}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleJump(s.anchorId);
                                        }}
                                        className={`block pl-4 pr-2 py-1.5 -ml-px border-l text-[13px] leading-snug transition-colors duration-150 ${
                                            isActive
                                                ? "border-white text-white font-medium"
                                                : "border-transparent text-white/65 hover:text-white hover:border-white/40"
                                        }`}
                                    >
                                        {s.cleanTitle}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            )}

            {/* ── Quick links: mobile/tablet dropdown ── */}
            {sections.length > 1 && (
                <div ref={mobileNavRef} className="lg:hidden fixed top-5 right-5 z-30">
                    <button
                        type="button"
                        onClick={() => setNavOpen((v) => !v)}
                        aria-expanded={navOpen}
                        aria-controls="legal-quick-links-panel"
                        aria-label="Jump to section"
                        className="flex items-center gap-2 border border-white/20 bg-black/70 backdrop-blur-md rounded-full pl-3.5 pr-3 py-2 text-xs font-medium text-white/85 hover:text-white hover:border-white/40 active:scale-95 transition-all duration-150"
                    >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path d="M3 4h10M3 8h10M3 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Contents
                    </button>

                    {navOpen && (
                        <div
                            id="legal-quick-links-panel"
                            role="menu"
                            className="absolute right-0 mt-2 w-64 max-h-[70vh] overflow-y-auto border border-white/15 bg-black/95 backdrop-blur-md rounded-xl p-2 shadow-2xl shadow-black/50"
                        >
                            {sections.map((s, i) => {
                                const isActive = activeId === s.anchorId;
                                return (
                                    <a
                                        key={s.anchorId}
                                        href={`#${s.anchorId}`}
                                        role="menuitem"
                                        aria-current={isActive ? "location" : undefined}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleJump(s.anchorId);
                                        }}
                                        className={`flex items-baseline gap-2.5 px-3 py-2.5 rounded-lg text-[13px] leading-snug transition-colors duration-150 ${
                                            isActive
                                                ? "bg-white/15 text-white font-medium"
                                                : "text-white/70 hover:bg-white/10 hover:text-white"
                                        }`}
                                    >
                                        <span className="font-mono text-[10px] text-white/40 shrink-0">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span>{s.cleanTitle}</span>
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Content layer */}
            <div className="relative z-10">

                {/* Hero */}
                <section className="flex flex-col items-center justify-center text-center px-5 pt-28 pb-20 border-b border-white/10">
                    <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 bg-white/[0.06] backdrop-blur-sm mb-7">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white/70">
              Legal
            </span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.06] mb-6 max-w-3xl">
                        {data.title}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mb-5">
                        {data.subtitle}
                    </p>

                    <p className="text-sm text-white/45">
                        Last updated{" "}
                        <span className="text-white/75 font-medium">{data.lastUpdated}</span>
                    </p>
                </section>

                {/* Sections */}
                <div className="w-full max-w-2xl mx-auto px-5 sm:px-8 py-16">
                    {sections.map((section, i) => {
                        const isActive = activeId === section.anchorId;
                        return (
                            <section
                                key={section.anchorId}
                                id={section.anchorId}
                                className="scroll-mt-24 py-10 border-b border-white/10 last:border-b-0"
                            >
                                <div className="flex items-baseline gap-4 mb-5">
                  <span
                      className={`font-mono text-xs tabular-nums w-6 shrink-0 select-none transition-colors duration-200 ${
                          isActive ? "text-white/75" : "text-white/35"
                      }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                                    <h2 className="text-xl sm:text-2xl font-semibold text-white leading-snug">
                                        {section.cleanTitle}
                                    </h2>
                                </div>

                                <div className="pl-10">
                                    {Array.isArray(section.content) ? (
                                        <ul className="space-y-4">
                                            {section.content.map((item, j) => (
                                                <li
                                                    key={j}
                                                    className="flex gap-3 text-white/80 text-base sm:text-[17px] leading-relaxed"
                                                >
                                                    <span className="mt-[10px] shrink-0 w-1 h-1 rounded-full bg-white/45" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-white/80 text-base sm:text-[17px] leading-relaxed">
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
                    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04]">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
                                backgroundSize: "22px 22px",
                            }}
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background:
                                    "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.9) 100%)",
                            }}
                        />
                        <div className="relative z-10 flex flex-col items-center text-center gap-5 px-6 py-14 sm:py-16">
                            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">
                                Still have questions?
                            </p>
                            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight max-w-sm">
                                We're happy to clarify anything.
                            </h3>
                            <p className="text-base text-white/65 max-w-sm leading-relaxed">
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