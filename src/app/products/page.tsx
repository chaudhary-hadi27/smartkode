"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function AiProductsComingSoon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let stars: { x: number; y: number; size: number; speed: number }[] = [];
    let w: number, h: number, animationId: number;

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = Array.from({ length: 2000 }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.1,
        speed: 0.2 + Math.random() * 0.5,
      }));
    };

    const animate = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "white";
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        s.y += s.speed;
        if (s.y > h) s.y = 0;
      });
      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-4">
      {/* Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Centered Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative text-center space-y-4"
      >
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wide drop-shadow-lg">
          AI Products Coming Soon
        </h1>
        <p className="text-lg leading-relaxed drop-shadow-md">
          We’re about to launch something revolutionary in the world of AI! 🤖✨<br/>
          Smart tools designed to make your work faster, smarter, and easier.
        </p>
      </motion.div>
    </section>
  );
}

