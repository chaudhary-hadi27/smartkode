"use client";

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   SmartKode Visual System Map
   A fully animated SVG wiring diagram of the entire platform:
   Agency → Client → Admin → Tech → Deliverable → Client
   With automated AI, invoice engine, and payment rails
──────────────────────────────────────────────────────────────── */

type NodeType = "agency" | "admin" | "client" | "tech" | "ai" | "invoice" | "payment" | "storage";

interface Node {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  type: NodeType;
  icon: string;
}

interface Connection {
  from: string;
  to: string;
  label: string;
  color: string;
  dashed?: boolean;
  offsetY?: number;
}

const NODES: Node[] = [
  // Row 1: Actors
  { id: "agency",   label: "Agency",       sublabel: "Lead Generator",    x: 80,   y: 80,  type: "agency",  icon: "🏢" },
  { id: "client",   label: "Client",       sublabel: "Project Requester", x: 460,  y: 80,  type: "client",  icon: "👤" },
  { id: "admin",    label: "SmartKode",    sublabel: "Admin HQ",          x: 840,  y: 80,  type: "admin",   icon: "👑" },
  { id: "tech",     label: "Tech Company", sublabel: "Delivery Partner",  x: 1220, y: 80,  type: "tech",    icon: "⚙️"  },

  // Row 2: Automation Layer
  { id: "ai",       label: "AI Engine",    sublabel: "Groq / Gemini / DeepSeek", x: 460,  y: 320, type: "ai",      icon: "🤖" },
  { id: "invoice",  label: "Invoice Engine", sublabel: "Auto PDF + Splits",      x: 840,  y: 320, type: "invoice", icon: "📄" },
  { id: "payment",  label: "Payment Rail", sublabel: "Multi-currency",           x: 1220, y: 320, type: "payment", icon: "💳" },

  // Row 3: Storage / Output
  { id: "storage",  label: "Supabase Storage", sublabel: "Deliverables + Virus Scan", x: 840, y: 540, type: "storage", icon: "🗄️" },
];

const CONNECTIONS: Connection[] = [
  // Agency → Client intake
  { from: "agency",  to: "client",  label: "Submits Client",      color: "#10b981" },
  // Client → Admin receives brief
  { from: "client",  to: "admin",   label: "Project Intake",      color: "#f59e0b" },
  // Admin → AI brief generation
  { from: "admin",   to: "ai",      label: "Generate P1 Brief",   color: "#8b5cf6", offsetY: -15 },
  // Admin → Tech assignment
  { from: "admin",   to: "tech",    label: "Assigns Project",     color: "#3b82f6" },
  // Tech → Storage upload
  { from: "tech",    to: "storage", label: "Uploads Deliverable", color: "#3b82f6" },
  // AI → Invoice (brief to invoice trigger)
  { from: "ai",      to: "invoice", label: "Triggers Invoice",    color: "#8b5cf6", dashed: true },
  // Invoice → Payment
  { from: "invoice", to: "payment", label: "Send to Client",      color: "#f59e0b" },
  // Payment → Admin (split)
  { from: "payment", to: "admin",   label: "10/40/50 Auto-Split", color: "#f59e0b", offsetY: 15 },
  // Storage → Client (delivered)
  { from: "storage", to: "client",  label: "File Released",       color: "#10b981", dashed: true },
  // AI retention loop
  { from: "admin",   to: "ai",      label: "Retention Trigger",   color: "#ef4444", dashed: true, offsetY: 15 },
];

const NODE_COLORS: Record<NodeType, string> = {
  agency:  "from-emerald-600  to-emerald-800  border-emerald-500",
  admin:   "from-amber-500    to-amber-700    border-amber-400",
  client:  "from-blue-600     to-blue-800     border-blue-500",
  tech:    "from-indigo-600   to-indigo-800   border-indigo-500",
  ai:      "from-purple-600   to-purple-800   border-purple-500",
  invoice: "from-orange-600   to-orange-800   border-orange-500",
  payment: "from-teal-600     to-teal-800     border-teal-500",
  storage: "from-slate-600    to-slate-800    border-slate-500",
};

const SVG_W = 1400;
const SVG_H = 660;
const NODE_W = 170;
const NODE_H = 72;

function nodeCenter(n: Node) {
  return { cx: n.x + NODE_W / 2, cy: n.y + NODE_H / 2 };
}

function findNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function AnimatedDot({ path, color, delay }: { path: string; color: string; delay: number }) {
  const [offset, setOffset] = useState(0);
  const raf = useRef<number>(0);
  const start = useRef<number | null>(null);
  const DURATION = 2200;

  useEffect(() => {
    const animate = (ts: number) => {
      if (start.current === null) start.current = ts - delay;
      const elapsed = (ts - start.current) % DURATION;
      setOffset(elapsed / DURATION);
      raf.current = requestAnimationFrame(animate);
    };
    const timer = setTimeout(() => {
      raf.current = requestAnimationFrame(animate);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf.current);
    };
  }, [delay]);

  return (
    <circle r={5} fill={color} opacity={0.9}>
      <animateMotion
        dur={`${DURATION}ms`}
        begin={`${delay}ms`}
        repeatCount="indefinite"
        path={path}
      />
    </circle>
  );
}

export function SystemMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  // Build SVG path between two nodes
  function buildPath(fromId: string, toId: string): string {
    const a = nodeCenter(findNode(fromId));
    const b = nodeCenter(findNode(toId));
    const mx = (a.cx + b.cx) / 2;
    const my = (a.cy + b.cy) / 2;
    // Bezier curve
    return `M ${a.cx} ${a.cy} Q ${mx} ${a.cy} ${mx} ${my} Q ${mx} ${b.cy} ${b.cx} ${b.cy}`;
  }

  return (
    <div className="relative w-full overflow-x-auto rounded-2xl border border-[#1e1e1e] bg-[#070707] p-4">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full min-w-[900px]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <defs>
          {/* Glow filters */}
          {(["amber", "emerald", "blue", "purple", "teal", "red"] as const).map((c) => {
            const color =
              c === "amber"   ? "#f59e0b" :
              c === "emerald" ? "#10b981" :
              c === "blue"    ? "#3b82f6" :
              c === "purple"  ? "#8b5cf6" :
              c === "teal"    ? "#14b8a6" :
                                "#ef4444";
            return (
              <filter key={c} id={`glow-${c}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            );
          })}
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#555" />
          </marker>
        </defs>

        {/* ── Grid Background ── */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a1a1a" strokeWidth="1" />
        </pattern>
        <rect width={SVG_W} height={SVG_H} fill="url(#grid)" />

        {/* ── Connections ── */}
        {CONNECTIONS.map((conn, i) => {
          const path = buildPath(conn.from, conn.to);
          return (
            <g key={i}>
              <path
                d={path}
                fill="none"
                stroke={conn.color}
                strokeWidth={2}
                strokeDasharray={conn.dashed ? "6 4" : undefined}
                opacity={0.5}
                markerEnd="url(#arrow)"
              />
              {/* Animated travelling dot */}
              <AnimatedDot path={path} color={conn.color} delay={i * 350} />
              {/* Connection label */}
              {(() => {
                const a = nodeCenter(findNode(conn.from));
                const b = nodeCenter(findNode(conn.to));
                const lx = (a.cx + b.cx) / 2;
                const ly = ((a.cy + b.cy) / 2) + (conn.offsetY || 0);
                return (
                  <text
                    x={lx} y={ly - 8}
                    textAnchor="middle"
                    fontSize={9}
                    fill={conn.color}
                    opacity={0.8}
                    fontWeight="600"
                  >
                    {conn.label}
                  </text>
                );
              })()}
            </g>
          );
        })}

        {/* ── Nodes ── */}
        {NODES.map((node) => {
          const isHovered = hovered === node.id;
          const BORDER_COLORS: Record<NodeType, string> = {
            agency:  "#10b981", admin: "#f59e0b", client: "#3b82f6",
            tech:    "#6366f1", ai:    "#8b5cf6", invoice: "#f97316",
            payment: "#14b8a6", storage: "#64748b",
          };
          const BG_COLORS: Record<NodeType, string> = {
            agency:  "#052e16", admin: "#451a03", client: "#0c1a2e",
            tech:    "#1e1b4b", ai:    "#2e1065", invoice: "#431407",
            payment: "#042f2e", storage: "#0f172a",
          };

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Card background */}
              <rect
                width={NODE_W}
                height={NODE_H}
                rx={12}
                fill={BG_COLORS[node.type]}
                stroke={BORDER_COLORS[node.type]}
                strokeWidth={isHovered ? 2 : 1}
                opacity={isHovered ? 1 : 0.9}
                filter={isHovered ? `url(#glow-amber)` : undefined}
              />
              {/* Icon */}
              <text x={16} y={38} fontSize={22}>{node.icon}</text>
              {/* Label */}
              <text x={46} y={30} fontSize={12} fontWeight="700" fill="#ffffff">{node.label}</text>
              {/* Sub-label */}
              <text x={46} y={46} fontSize={9} fill={BORDER_COLORS[node.type]} opacity={0.8}>
                {node.sublabel}
              </text>
              {/* Pulse dot */}
              <circle cx={NODE_W - 14} cy={14} r={4} fill={BORDER_COLORS[node.type]}>
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
