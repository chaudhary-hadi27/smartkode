"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function AiProductsComingSoon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let nodes: { x: number; y: number; vx: number; vy: number; opacity: number }[] = [];
    let w: number, h: number, animationId: number;

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      // Create small transparent nodes
      nodes = Array.from({ length: 50 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: 0.2 + Math.random() * 0.3,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw and update nodes
      nodes.forEach((node) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));

        // Draw small transparent node
        ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative">
      <main className="min-h-screen bg-black transition-all duration-300 ease-in-out overflow-x-hidden flex items-center justify-center px-4">
        {/* Small transparent moving nodes */}
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Centered Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative text-center space-y-4 z-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wide text-white">
            AI Products Coming Soon
          </h1>
          <p className="text-lg leading-relaxed text-gray-300">
            We&#39;re about to launch something revolutionary in the world of AI! 🤖✨
            <br />
            Smart tools designed to make your work faster, smarter, and easier.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
