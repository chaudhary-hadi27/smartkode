"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { TestimonialImage } from "@/data/home/homeData";

interface HomeTestimonialsProps {
    testimonialImages: TestimonialImage[];
}

// ── Bell-arc slot definitions ────────────────────────────────────────────────
type PhotoSlot = {
    col: "A" | "B" | "C" | "D";
    top: number;
    w: number;
    h: number;
    rotate: number;
};

// Desktop: 520px tall container, 300px side panels
const CONTAINER_H = 520;

const SLOTS: PhotoSlot[] = [
    { col: "A", top:  60, w: 118, h: 148, rotate: -5 },
    { col: "A", top: 220, w: 126, h: 158, rotate: -3 },
    { col: "A", top: 370, w: 112, h: 140, rotate: -4 },
    { col: "B", top:  10, w: 120, h: 152, rotate:  3 },
    { col: "B", top: 180, w: 114, h: 144, rotate:  2 },
    { col: "C", top:  10, w: 120, h: 152, rotate: -3 },
    { col: "C", top: 180, w: 114, h: 144, rotate: -2 },
    { col: "D", top:  60, w: 118, h: 148, rotate:  5 },
    { col: "D", top: 220, w: 126, h: 158, rotate:  3 },
    { col: "D", top: 370, w: 112, h: 140, rotate:  4 },
];

const COL_OFFSET: Record<PhotoSlot["col"], number> = {
    A:   0,
    B: 138,
    C: 138,
    D:   0,
};

// ── Mobile bell: scaled to 58% ───────────────────────────────────────────────
// Each bell "page" is two side panels (no center gap — text is fixed overlay)
// Side panel width: 175px  (fits 2 cols: outer ~68px + inner offset 80px + inner ~70px)
const MOBILE_SCALE   = 0.58;
const MOBILE_H       = Math.round(CONTAINER_H * MOBILE_SCALE); // ~301
const MOBILE_SIDE_W  = 175; // one side panel (left OR right) per bell half
const MOBILE_BELL_W  = MOBILE_SIDE_W * 2; // one full bell = 350px

const MOBILE_COL_OFFSET: Record<PhotoSlot["col"], number> = {
    A:  0,
    B:  Math.round(COL_OFFSET.B * MOBILE_SCALE), // ~80
    C:  Math.round(COL_OFFSET.C * MOBILE_SCALE),
    D:  0,
};

// Scale slot sizes
const mobileScale = (s: PhotoSlot): PhotoSlot => ({
    ...s,
    top: Math.round(s.top * MOBILE_SCALE),
    w:   Math.round(s.w   * MOBILE_SCALE),
    h:   Math.round(s.h   * MOBILE_SCALE),
});

const M_SLOTS = SLOTS.map(mobileScale);

// ── Render one full mobile bell (left + right panels side by side) ───────────
// imgSet: 10 images mapped to the 10 slots (A×3, B×2, C×2, D×3)
function MobileBell({
                        imgSet,
                        isVisible,
                        delayOffset = 0,
                    }: {
    imgSet: TestimonialImage[];
    isVisible: boolean;
    delayOffset?: number;
}) {
    const withImgs = M_SLOTS.map((s, i) => ({
        ...s,
        img: imgSet[i % imgSet.length],
    }));

    const leftSlots  = withImgs.filter(s => s.col === "A" || s.col === "B");
    const rightSlots = withImgs.filter(s => s.col === "C" || s.col === "D");

    const card = (
        s: (typeof withImgs)[0],
        i: number,
        pos: React.CSSProperties,
        delay: number
    ) => (
        <div
            key={i}
            className="absolute overflow-hidden rounded-xl border border-white/10 transition-all duration-700"
            style={{
                ...pos,
                width:  s.w,
                height: s.h,
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                    ? `rotate(${s.rotate}deg) translateY(0px)`
                    : `rotate(${s.rotate}deg) translateY(30px)`,
                transitionDelay: `${delay}ms`,
                boxShadow: "0 6px 24px rgba(0,0,0,0.65), 0 2px 6px rgba(0,0,0,0.4)",
            }}
        >
            <Image
                src={s.img.image}
                alt={`Client ${s.img.id}`}
                fill
                className="object-cover"
                sizes="100px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
    );

    return (
        // One bell = left panel + right panel, no center gap (text overlays that space)
        <div
            className="relative flex-shrink-0"
            style={{ width: MOBILE_BELL_W, height: MOBILE_H }}
        >
            {/* LEFT panel */}
            <div className="absolute" style={{ left: 0, top: 0, width: MOBILE_SIDE_W, height: MOBILE_H, position: "relative" }}>
                <div style={{ position: "relative", width: MOBILE_SIDE_W, height: MOBILE_H }}>
                    {leftSlots.map((s, i) =>
                        card(s, i, {
                            top:  s.top,
                            left: s.col === "A" ? MOBILE_COL_OFFSET.A : MOBILE_COL_OFFSET.B,
                        }, delayOffset + i * 70)
                    )}
                </div>
            </div>

            {/* RIGHT panel */}
            <div className="absolute" style={{ right: 0, top: 0, width: MOBILE_SIDE_W, height: MOBILE_H }}>
                <div style={{ position: "relative", width: MOBILE_SIDE_W, height: MOBILE_H }}>
                    {rightSlots.map((s, i) =>
                        card(s, i, {
                            top:   s.top,
                            right: s.col === "D" ? MOBILE_COL_OFFSET.D : MOBILE_COL_OFFSET.C,
                        }, delayOffset + (i + 5) * 70)
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Main component ───────────────────────────────────────────────────────────
export const HomeTestimonials: React.FC<HomeTestimonialsProps> = ({ testimonialImages }) => {
    const sectionRef  = useRef<HTMLElement>(null);
    const scrollRef   = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.08 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Snap-scroll: show scroll hint dots
    const [activeBell, setActiveBell] = useState(0);
    const BELL_COUNT = 3; // 3 independent bell "pages"

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const onScroll = () => {
            const idx = Math.round(el.scrollLeft / MOBILE_BELL_W);
            setActiveBell(Math.min(idx, BELL_COUNT - 1));
        };
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    // Desktop slots
    const slots      = SLOTS.map((s, i) => ({ ...s, img: testimonialImages[i % testimonialImages.length] }));
    const leftSlots  = slots.filter(s => s.col === "A" || s.col === "B");
    const rightSlots = slots.filter(s => s.col === "C" || s.col === "D");

    // Shuffle image sets slightly for each bell so they look different
    const bellImgSets = Array.from({ length: BELL_COUNT }, (_, b) => {
        const offset = b * 3;
        return Array.from({ length: 10 }, (_, i) =>
            testimonialImages[(i + offset) % testimonialImages.length]
        );
    });

    return (
        <section
            ref={sectionRef}
            className="relative bg-black overflow-hidden py-20 md:py-28 lg:py-32"
        >
            {/* Dot-grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />
            {/* Radial vignette */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, black 100%)",
                }}
            />

            {/* ══════════ DESKTOP lg+ ══════════ */}
            <div className="relative z-10 hidden lg:block max-w-7xl mx-auto px-6">
                <div
                    className="grid items-center"
                    style={{ gridTemplateColumns: "300px 1fr 300px", minHeight: CONTAINER_H }}
                >
                    {/* LEFT bell */}
                    <div className="relative" style={{ height: CONTAINER_H }}>
                        {leftSlots.map((s, i) => (
                            <div
                                key={i}
                                className="absolute overflow-hidden rounded-2xl border border-white/10 transition-all duration-700"
                                style={{
                                    top: s.top,
                                    left: s.col === "A" ? COL_OFFSET.A : COL_OFFSET.B,
                                    width: s.w, height: s.h,
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible
                                        ? `rotate(${s.rotate}deg) translateY(0px)`
                                        : `rotate(${s.rotate}deg) translateY(40px)`,
                                    transitionDelay: `${i * 90}ms`,
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
                                }}
                            >
                                <Image src={s.img.image} alt={`Client ${s.img.id}`} fill className="object-cover" sizes="160px" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                        ))}
                    </div>

                    {/* CENTER text */}
                    <div
                        className="text-center flex flex-col items-center gap-5 px-6 transition-all duration-1000"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0px)" : "translateY(24px)",
                            transitionDelay: "200ms",
                            paddingTop: "60px",
                        }}
                    >
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-gray-400 text-xs tracking-widest uppercase font-medium">
              Testimonials
            </span>
                        <h2 className="text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-white">
                            Trusted by leaders
                            <br />
                            <span className="text-gray-500 font-normal">from various industries</span>
                        </h2>
                        {/*<p className="text-gray-400 text-base leading-relaxed max-w-xs">*/}
                        {/*    Learn why professionals trust our solutions to complete their customer journeys.*/}
                        {/*</p>*/}
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 mt-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors duration-200 group"
                        >
                            Let's Connect
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </Link>
                    </div>

                    {/* RIGHT bell */}
                    <div className="relative" style={{ height: CONTAINER_H }}>
                        {rightSlots.map((s, i) => (
                            <div
                                key={i}
                                className="absolute overflow-hidden rounded-2xl border border-white/10 transition-all duration-700"
                                style={{
                                    top: s.top,
                                    right: s.col === "D" ? COL_OFFSET.D : COL_OFFSET.C,
                                    width: s.w, height: s.h,
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible
                                        ? `rotate(${s.rotate}deg) translateY(0px)`
                                        : `rotate(${s.rotate}deg) translateY(40px)`,
                                    transitionDelay: `${(i + 5) * 90}ms`,
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
                                }}
                            >
                                <Image src={s.img.image} alt={`Client ${s.img.id}`} fill className="object-cover" sizes="160px" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════════ MOBILE < lg ══════════ */}
            <div className="lg:hidden relative z-10 flex flex-col items-center">

                {/* 1 ── "Testimonials" badge — fixed at very top, never scrolls */}
                <div
                    className="mb-6 transition-all duration-700"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(-12px)",
                        transitionDelay: "80ms",
                    }}
                >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-gray-400 text-xs tracking-widest uppercase font-medium">
            Testimonials
          </span>
                </div>

                {/* 2 ── Scrollable bell strip + fixed text overlay ── */}
                <div
                    className="relative w-full"
                    style={{ height: MOBILE_H }}
                >
                    {/* Horizontally scrollable bell images */}
                    <div
                        ref={scrollRef}
                        className="absolute inset-0 overflow-x-auto overflow-y-hidden"
                        style={{
                            scrollSnapType: "x mandatory",
                            WebkitOverflowScrolling: "touch",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {/* Inner track: all bells side-by-side */}
                        <div
                            className="flex"
                            style={{ width: MOBILE_BELL_W * BELL_COUNT, height: MOBILE_H }}
                        >
                            {bellImgSets.map((imgSet, b) => (
                                <div
                                    key={b}
                                    style={{
                                        width: MOBILE_BELL_W,
                                        height: MOBILE_H,
                                        scrollSnapAlign: "start",
                                        flexShrink: 0,
                                    }}
                                >
                                    <MobileBell
                                        imgSet={imgSet}
                                        isVisible={isVisible}
                                        delayOffset={b * 40}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Fixed text overlay — centered over bell, doesn't scroll ── */}
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none"
                        style={{ paddingBottom: 24, zIndex: 10 }}
                    >
                        {/* Semi-transparent backdrop so text reads over any images */}
                        <div
                            className="flex flex-col items-center gap-3 px-6 py-5 rounded-3xl pointer-events-auto"
                            style={{
                                background: "radial-gradient(ellipse 120% 100% at 50% 100%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
                                opacity: isVisible ? 1 : 0,
                                transition: "opacity 0.8s ease 0.4s",
                            }}
                        >
                            <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-white text-center">
                                Trusted by leaders
                                <br />
                                <span className="text-gray-400 font-normal">from various industries</span>
                            </h2>
                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[220px] text-center">
                                Learn why professionals trust our solutions to complete their customer journeys.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-1.5 bg-white text-black px-5 py-2 rounded-full text-xs font-semibold hover:bg-gray-100 transition-colors duration-200 group"
                            >
                                Read Success Stories
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                            </Link>
                        </div>
                    </div>

                    {/* Left/right edge fades — hint that images are scrollable */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent z-20" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent z-20" />
                </div>

                {/* 3 ── Dot indicators — show which bell page is active ── */}
                <div
                    className="flex gap-2 mt-5 transition-all duration-700"
                    style={{ opacity: isVisible ? 1 : 0, transitionDelay: "600ms" }}
                >
                    {Array.from({ length: BELL_COUNT }).map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Bell page ${i + 1}`}
                            onClick={() => {
                                scrollRef.current?.scrollTo({
                                    left: i * MOBILE_BELL_W,
                                    behavior: "smooth",
                                });
                            }}
                            style={{
                                width:  i === activeBell ? 20 : 6,
                                height: 6,
                                borderRadius: 3,
                                background: i === activeBell ? "#ffffff" : "rgba(255,255,255,0.25)",
                                transition: "all 0.3s ease",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                            }}
                        />
                    ))}
                </div>
            </div>

            <style>{`
        /* Hide scrollbar on mobile bell strip */
        .lg\\:hidden div::-webkit-scrollbar { display: none; }
      `}</style>
        </section>
    );
};
