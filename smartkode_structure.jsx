import { useState } from "react";

const C = {
  bg: "#0a0a0a", surface: "#111", border: "#1e1e1e", border2: "#2a2a2a",
  text: "#fff", muted: "#666", dim: "#333",
  green: "#22c55e", blue: "#3b82f6", purple: "#a855f7",
  amber: "#f59e0b", red: "#ef4444", teal: "#14b8a6", orange: "#f97316",
};

const STRUCTURE = {
  name: "smartkode/",
  type: "root",
  desc: "Monorepo root — one repo, everything separated",
  color: C.text,
  children: [
    {
      name: "apps/",
      type: "workspace",
      desc: "Every deployable app lives here — totally independent",
      color: C.blue,
      children: [
        {
          name: "website/",
          type: "app",
          desc: "Public marketing site — completely separate Next.js app. Zero system logic here. Ultra fast, static.",
          color: C.teal,
          deploy: "Vercel — separate project",
          stack: "Next.js 16 + Tailwind",
          db: "None",
          children: [
            { name: "app/", desc: "Pages: /, /about, /contact, /pricing" },
            { name: "components/", desc: "Landing page UI only" },
            { name: "public/", desc: "Images, logos, static assets" },
            { name: "package.json", desc: "Independent dependencies — no system imports" },
            { name: "next.config.ts", desc: "" },
          ]
        },
        {
          name: "admin/",
          type: "app",
          desc: "Admin portal — your command center. Full access to everything. Includes CRM-like views but built for YOUR system.",
          color: C.amber,
          deploy: "Vercel — separate project",
          stack: "Next.js 16 + Prisma + shadcn/ui",
          db: "Supabase (PostgreSQL)",
          children: [
            { name: "app/", desc: "App Router pages" },
            { name: "app/(auth)/", desc: "Login with Passkey + fallback" },
            { name: "app/(dashboard)/", desc: "Protected admin routes" },
            { name: "app/(dashboard)/overview/", desc: "Revenue, profits, active projects" },
            { name: "app/(dashboard)/agencies/", desc: "All agencies, commission, activate/deactivate" },
            { name: "app/(dashboard)/clients/", desc: "All clients, encrypted contact, lifetime value" },
            { name: "app/(dashboard)/tech/", desc: "Tech companies, availability, assign project" },
            { name: "app/(dashboard)/projects/", desc: "All projects, status pipeline, full detail" },
            { name: "app/(dashboard)/invoices/", desc: "All invoices, splits, payment status" },
            { name: "app/(dashboard)/payments/", desc: "Payment records, methods, currencies" },
            { name: "app/(dashboard)/retention/", desc: "Follow-up logs, conversion tracking" },
            { name: "app/(dashboard)/bot-logs/", desc: "QA bot history, pass/fail, AI notes" },
            { name: "app/(dashboard)/analytics/", desc: "Charts — revenue, profit trend, agency perf" },
            { name: "app/(dashboard)/settings/", desc: "Profit % splits, payment config" },
            { name: "app/(dashboard)/audit/", desc: "Immutable system audit log" },
            { name: "components/", desc: "Admin-specific UI components" },
            { name: "package.json", desc: "Independent — imports from packages/ only" },
          ]
        },
        {
          name: "agency-portal/",
          type: "app",
          desc: "Agency portal — client-giving companies login here. Submit clients, track commission. Zero access to client contact.",
          color: C.teal,
          deploy: "Vercel — separate project",
          stack: "Next.js 16 + Prisma",
          db: "Supabase (read scoped via RLS)",
          children: [
            { name: "app/(auth)/", desc: "Passkey login scoped to AGENCY role" },
            { name: "app/(dashboard)/submit-client/", desc: "Main form — submit new qualified client" },
            { name: "app/(dashboard)/my-clients/", desc: "Their submitted clients — status only" },
            { name: "app/(dashboard)/commission/", desc: "Earnings tracker — total, per project, pending" },
            { name: "app/(dashboard)/invoices/", desc: "Their commission invoices only" },
            { name: "app/(dashboard)/profile/", desc: "Company info + payment method for payout" },
            { name: "components/", desc: "Agency-specific UI only" },
            { name: "package.json", desc: "" },
          ]
        },
        {
          name: "client-portal/",
          type: "app",
          desc: "Client portal — end clients login here. See their project, milestones, pay invoices, download deliverables, approve project.",
          color: C.blue,
          deploy: "Vercel — separate project",
          stack: "Next.js 16 + Prisma",
          db: "Supabase (read scoped via RLS)",
          children: [
            { name: "app/(auth)/", desc: "Passkey login scoped to CLIENT role" },
            { name: "app/(dashboard)/projects/", desc: "Their projects, status, timeline" },
            { name: "app/(dashboard)/milestones/", desc: "Payment stages, % complete" },
            { name: "app/(dashboard)/deliverables/", desc: "File downloads — only clean+QA-passed" },
            { name: "app/(dashboard)/invoices/", desc: "Their invoices — amount + status (no splits)" },
            { name: "app/(dashboard)/pay/", desc: "Payment screen — method selector, currency, IBAN/crypto" },
            { name: "app/(dashboard)/approve/", desc: "Formal project approval — triggers payment release" },
            { name: "app/(dashboard)/feedback/", desc: "Rate project, leave testimonial" },
            { name: "app/(dashboard)/profile/", desc: "Contact info, preferred payment, currency" },
            { name: "components/", desc: "Client-specific UI only" },
            { name: "package.json", desc: "" },
          ]
        },
        {
          name: "tech-portal/",
          type: "app",
          desc: "Tech company portal — receive project briefs, upload deliverables, see QA feedback, track payment, toggle availability.",
          color: C.purple,
          deploy: "Vercel — separate project",
          stack: "Next.js 16 + Prisma",
          db: "Supabase (read scoped via RLS)",
          children: [
            { name: "app/(auth)/", desc: "Passkey login scoped to TECH role" },
            { name: "app/(dashboard)/projects/", desc: "Assigned projects + P1 brief" },
            { name: "app/(dashboard)/upload/", desc: "File upload per project — triggers auto pipeline" },
            { name: "app/(dashboard)/qa-feedback/", desc: "Bot QA results — PASS/FAIL + AI notes" },
            { name: "app/(dashboard)/payments/", desc: "Their payment status — pending vs released" },
            { name: "app/(dashboard)/availability/", desc: "Toggle AVAILABLE | BUSY | ON_LEAVE" },
            { name: "app/(dashboard)/profile/", desc: "Company info, specialization, payment method" },
            { name: "components/", desc: "Tech-specific UI only" },
            { name: "package.json", desc: "" },
          ]
        },
        {
          name: "invoice-engine/",
          type: "app",
          desc: "Standalone invoice microservice. ONLY responsible for: generating PDF invoices, calculating splits, sending via email. Nothing else touches this.",
          color: C.orange,
          deploy: "Vercel serverless functions",
          stack: "Node.js + PDF-lib + DeepSeek + Resend",
          db: "Supabase (invoice + payment tables only)",
          children: [
            { name: "api/generate/", desc: "POST — generate invoice PDF from project data" },
            { name: "api/send/", desc: "POST — send invoice PDF via Resend email" },
            { name: "api/splits/", desc: "POST — calculate agency/tech/admin splits" },
            { name: "api/convert-currency/", desc: "GET — PKR equivalent via exchangerate-api" },
            { name: "lib/pdf-generator.ts", desc: "PDF-lib template for invoice" },
            { name: "lib/deepseek-invoice.ts", desc: "AI-generated invoice content via DeepSeek" },
            { name: "package.json", desc: "" },
          ]
        },
        {
          name: "ai-engine/",
          type: "app",
          desc: "All AI logic in one place. QA bot, brief generator, retention messages. Completely isolated — other apps call this via API.",
          color: C.purple,
          deploy: "Vercel serverless functions",
          stack: "Node.js + LangChain + Groq + Gemini + DeepSeek",
          db: "Supabase (reads project + deliverable tables)",
          children: [
            { name: "api/generate-brief/", desc: "POST — generates P1 brief from client + project info (Groq)" },
            { name: "api/qa-check/", desc: "POST — checks deliverable against P1 brief (Groq LLaMA)" },
            { name: "api/retention-message/", desc: "POST — generates follow-up message (Gemini)" },
            { name: "api/upsell-message/", desc: "POST — generates 30-day upsell message (Gemini)" },
            { name: "lib/groq-client.ts", desc: "Groq API setup + LLaMA config" },
            { name: "lib/gemini-client.ts", desc: "Gemini 2.0 Flash setup" },
            { name: "lib/deepseek-client.ts", desc: "DeepSeek v3 setup" },
            { name: "lib/langchain-orchestrator.ts", desc: "Multi-step AI flow coordination" },
            { name: "package.json", desc: "" },
          ]
        },
      ]
    },
    {
      name: "packages/",
      type: "workspace",
      desc: "Shared code — imported by all apps. Never deployed alone.",
      color: C.green,
      children: [
        {
          name: "database/",
          type: "package",
          desc: "Single source of truth for ALL database logic. One Prisma schema, one DB client. ALL apps import from here.",
          color: C.green,
          children: [
            { name: "prisma/schema.prisma", desc: "ALL 11 tables — User, Agency, Client, TechCompany, Project, Milestone, Invoice, Payment, Deliverable, RetentionLog, AuditLog" },
            { name: "prisma/migrations/", desc: "All DB migrations — version controlled" },
            { name: "prisma/seed.ts", desc: "Seed admin user + default ProfitSettings" },
            { name: "src/client.ts", desc: "Prisma client singleton — imported everywhere" },
            { name: "src/types.ts", desc: "All TypeScript types from Prisma models" },
            { name: "src/queries/agencies.ts", desc: "Reusable agency queries" },
            { name: "src/queries/clients.ts", desc: "Reusable client queries" },
            { name: "src/queries/projects.ts", desc: "Reusable project queries" },
            { name: "src/queries/invoices.ts", desc: "Reusable invoice queries" },
            { name: "src/audit.ts", desc: "AuditLog middleware — auto-writes on every mutation" },
            { name: "package.json", desc: "name: @smartkode/database" },
          ]
        },
        {
          name: "auth/",
          type: "package",
          desc: "Shared auth config for all 4 portals. One NextAuth setup, role-scoped per app.",
          color: C.red,
          children: [
            { name: "src/config.ts", desc: "NextAuth v5 config — Passkey + email/password" },
            { name: "src/passkey.ts", desc: "WebAuthn / Passkey implementation" },
            { name: "src/middleware.ts", desc: "Role-based route protection" },
            { name: "src/session.ts", desc: "Session types — includes user role" },
            { name: "package.json", desc: "name: @smartkode/auth" },
          ]
        },
        {
          name: "ui/",
          type: "package",
          desc: "Shared UI components used across all portals. shadcn/ui base + SmartKode custom components.",
          color: C.blue,
          children: [
            { name: "src/components/", desc: "Button, Input, Card, Table, Badge, Modal, Sidebar, etc" },
            { name: "src/components/data-table.tsx", desc: "Reusable table with sort/filter/pagination" },
            { name: "src/components/status-badge.tsx", desc: "Project/invoice status badges" },
            { name: "src/components/currency-display.tsx", desc: "Shows PKR + foreign currency equivalent" },
            { name: "tailwind.config.ts", desc: "Shared design tokens — colors, fonts" },
            { name: "package.json", desc: "name: @smartkode/ui" },
          ]
        },
        {
          name: "validators/",
          type: "package",
          desc: "All Zod validation schemas. Used in both frontend forms AND backend API routes.",
          color: C.amber,
          children: [
            { name: "src/agency.schema.ts", desc: "Agency creation + update validation" },
            { name: "src/client.schema.ts", desc: "Client submission form validation" },
            { name: "src/project.schema.ts", desc: "Project creation + assignment validation" },
            { name: "src/payment.schema.ts", desc: "Payment method + amount validation" },
            { name: "src/invoice.schema.ts", desc: "Invoice generation input validation" },
            { name: "package.json", desc: "name: @smartkode/validators" },
          ]
        },
        {
          name: "config/",
          type: "package",
          desc: "Shared config — TypeScript, ESLint, Tailwind base. All apps extend from here.",
          color: C.muted,
          children: [
            { name: "typescript/base.json", desc: "Base tsconfig" },
            { name: "eslint/base.js", desc: "Base ESLint rules" },
            { name: "tailwind/base.ts", desc: "Shared Tailwind tokens" },
          ]
        },
      ]
    },
    {
      name: "infra/",
      type: "config",
      desc: "Infrastructure config — deployment, environment, DB setup docs.",
      color: C.muted,
      children: [
        { name: "supabase/", desc: "Supabase config — RLS policies, storage buckets, edge functions" },
        { name: "supabase/rls-policies.sql", desc: "Row Level Security — each role sees only their data" },
        { name: "supabase/storage-buckets.sql", desc: "Deliverables bucket setup" },
        { name: "vercel/", desc: "Vercel deployment configs per app" },
        { name: "env-templates/", desc: ".env.example for every app — what variables needed" },
      ]
    },
    {
      name: "docs/",
      type: "config",
      desc: "Internal docs — system architecture, API contracts, deployment guides.",
      color: C.muted,
      children: [
        { name: "architecture.md", desc: "Full system overview — this document in text form" },
        { name: "db-schema.md", desc: "All tables, fields, relations documented" },
        { name: "api-contracts.md", desc: "Every API endpoint across all apps" },
        { name: "automation-flows.md", desc: "All 9 automation triggers documented" },
        { name: "deployment.md", desc: "Step by step deploy guide for each app" },
      ]
    },
    {
      name: "package.json",
      type: "file",
      desc: "Root package.json — pnpm workspaces config. Manages all apps + packages together.",
      color: C.muted,
    },
    {
      name: "pnpm-workspace.yaml",
      type: "file",
      desc: "Declares all workspace paths for pnpm",
      color: C.muted,
    },
    {
      name: "turbo.json",
      type: "file",
      desc: "Turborepo config — parallel builds, smart caching. Makes builds 10x faster.",
      color: C.muted,
    },
  ]
};

const DB_DECISION = [
  { name: "Supabase", use: "PRIMARY — all 11 tables", why: "PostgreSQL + RLS + Storage + Realtime. Free tier: 500MB DB, 1GB storage. One DB = one source of truth.", color: C.green, verdict: "USE THIS" },
  { name: "Neon", use: "BACKUP only", why: "Same PostgreSQL — use as read replica or backup. Free tier available. Switch connection string if Supabase has issues.", color: C.blue, verdict: "STANDBY" },
  { name: "Firebase", use: "DO NOT USE", why: "NoSQL — no relations, no joins. Your entire system is built on relations. Firebase would break everything.", color: C.red, verdict: "SKIP" },
  { name: "MongoDB Atlas", use: "DO NOT USE", why: "Same as Firebase — document DB, no real relations. Your Prisma schema cannot work here properly.", color: C.red, verdict: "SKIP" },
  { name: "Redis (Upstash)", use: "CACHING only", why: "Cache rate limits, session data, frequent queries. Free tier: 10k commands/day. Not a main DB.", color: C.amber, verdict: "OPTIONAL" },
];

const CRMS_DECISION = [
  { q: "NextCRM ka kya karein?", a: "Sirf reference ke taur pe dekho. Iska invoicing logic, Prisma schema structure, aur shadcn/ui dashboard layout dekho — copy mat karo, seekho. Phir apna banao. Zip wala approach galat tha — NextCRM ek alag standalone app hai, tera system mein inject nahi hota." },
  { q: "CRM admin ka hissa hai ya alag?", a: "Admin portal ka ek section hai — alag app nahi. Admin portal ke andar /clients aur /agencies routes hi tera CRM hai. Koi separate CRM app nahi chahiye." },
  { q: "Website pe load kyun nahi aana chahiye?", a: "website/ app ka apna Vercel project hai — koi database connection nahi, koi auth nahi, sirf static pages. Admin/client/agency/tech portals alag Vercel projects hain. Zero shared load." },
];

function FileTree({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const indent = depth * 16;

  const typeIcon = {
    root: "📦", workspace: "📂", app: "🚀", package: "📦", config: "⚙️", file: "📄"
  }[node.type] || "📁";

  return (
    <div>
      <div
        onClick={() => hasChildren && setOpen(!open)}
        style={{
          display: "flex", alignItems: "flex-start", gap: 8,
          padding: "4px 8px", marginLeft: indent,
          cursor: hasChildren ? "pointer" : "default",
          borderRadius: 6,
          background: "transparent",
        }}
        onMouseEnter={e => e.currentTarget.style.background = C.surface}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        <span style={{ fontSize: 12, flexShrink: 0, marginTop: 1 }}>
          {hasChildren ? (open ? "▼" : "▶") : "·"}
        </span>
        <span style={{ fontSize: 12, flexShrink: 0 }}>{typeIcon}</span>
        <span style={{ fontFamily: "monospace", fontSize: 12, color: node.color || C.muted, fontWeight: depth <= 1 ? 600 : 400, flexShrink: 0 }}>
          {node.name}
        </span>
        {node.desc && (
          <span style={{ fontSize: 11, color: C.dim, marginLeft: 4, lineHeight: 1.4 }}>— {node.desc}</span>
        )}
        {node.deploy && (
          <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 10, background: `${C.teal}15`, color: C.teal, border: `1px solid ${C.teal}30`, marginLeft: 4, flexShrink: 0 }}>{node.deploy}</span>
        )}
      </div>
      {open && hasChildren && (
        <div style={{ borderLeft: `1px solid ${C.border}`, marginLeft: indent + 16 }}>
          {node.children.map((child, i) => (
            <FileTree key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SmartKodeStructure() {
  const [tab, setTab] = useState("structure");

  const tabs = [
    { id: "structure", label: "📁 Folder Structure" },
    { id: "db", label: "🗄️ Database Decision" },
    { id: "apps", label: "🚀 App Breakdown" },
    { id: "crm", label: "❓ CRM Decision" },
    { id: "antigravity", label: "🤖 Antigravity Brief" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: 20, color: C.text, fontFamily: "sans-serif" }}>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>SmartKode — Monorepo Structure</div>
        <div style={{ fontSize: 11, color: C.muted }}>pnpm workspaces + Turborepo · 4 portals fully isolated · 1 DB · Clean paths · Antigravity-ready</div>
      </div>

      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 24, borderBottom: `1px solid ${C.border}`, paddingBottom: 12 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            fontSize: 11, padding: "5px 12px", borderRadius: 8,
            border: `1px solid ${tab === t.id ? C.text : C.border}`,
            background: tab === t.id ? C.text : "transparent",
            color: tab === t.id ? C.bg : C.muted, cursor: "pointer",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── STRUCTURE ── */}
      {tab === "structure" && (
        <div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
            Click any folder to expand/collapse. Every app is independent — its own Next.js instance, own Vercel deploy, own routes.
          </div>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 8px" }}>
            <FileTree node={STRUCTURE} depth={0} />
          </div>
        </div>
      )}

      {/* ── DB DECISION ── */}
      {tab === "db" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: `${C.amber}10`, border: `1px solid ${C.amber}30`, borderRadius: 10, padding: "10px 14px", fontSize: 11, color: C.amber, marginBottom: 8 }}>
            ⚠️ Multiple DBs simultaneously = data inconsistency + sync nightmare + debugging hell. One DB, one truth. Scale later by switching connection string — Prisma makes it one line change.
          </div>
          {DB_DECISION.map(d => (
            <div key={d.name} style={{ background: C.surface, border: `1px solid ${d.color}30`, borderRadius: 10, padding: "12px 14px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8, background: `${d.color}15`, color: d.color, flexShrink: 0, marginTop: 2 }}>{d.verdict}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 2 }}>{d.name}</div>
                <div style={{ fontSize: 11, color: d.color, marginBottom: 4 }}>{d.use}</div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{d.why}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── APP BREAKDOWN ── */}
      {tab === "apps" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {STRUCTURE.children[0].children.map(app => (
            <div key={app.name} style={{ background: C.surface, border: `1px solid ${app.color}30`, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>🚀</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: app.color, fontFamily: "monospace" }}>apps/{app.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 3, lineHeight: 1.5 }}>{app.desc}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {app.deploy && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: `${C.teal}15`, color: C.teal, border: `1px solid ${C.teal}30` }}>🌐 {app.deploy}</span>}
                {app.stack && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: `${C.blue}15`, color: C.blue, border: `1px solid ${C.blue}30` }}>⚡ {app.stack}</span>}
                {app.db && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: `${C.green}15`, color: C.green, border: `1px solid ${C.green}30` }}>🗄️ {app.db}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CRM DECISION ── */}
      {tab === "crm" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CRMS_DECISION.map((c, i) => (
            <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.amber, marginBottom: 8 }}>Q: {c.q}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>{c.a}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── ANTIGRAVITY BRIEF ── */}
      {tab === "antigravity" && (
        <div>
          <div style={{ background: C.surface, border: `1px solid ${C.purple}40`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.purple, marginBottom: 16 }}>📋 Antigravity Ko Dene Wala Brief</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.9 }}>
              <div style={{ color: C.text, fontWeight: 600, marginBottom: 8 }}>Project: SmartKode — Business Automation System</div>

              <div style={{ color: C.amber, marginBottom: 4, marginTop: 12 }}>Repository Setup:</div>
              <div>• Initialize pnpm monorepo with Turborepo</div>
              <div>• Create workspace structure: apps/ and packages/ directories</div>
              <div>• Configure pnpm-workspace.yaml and turbo.json</div>
              <div>• Root package.json with workspace scripts</div>

              <div style={{ color: C.amber, marginBottom: 4, marginTop: 12 }}>Apps to scaffold (each independent Next.js 16.2.6 app):</div>
              <div>• apps/website/ — public marketing site, no DB, no auth, static</div>
              <div>• apps/admin/ — ADMIN role portal, full access dashboard</div>
              <div>• apps/agency-portal/ — AGENCY role portal, scoped access</div>
              <div>• apps/client-portal/ — CLIENT role portal, scoped access</div>
              <div>• apps/tech-portal/ — TECH role portal, scoped access</div>
              <div>• apps/invoice-engine/ — standalone PDF + payment split API</div>
              <div>• apps/ai-engine/ — standalone AI API (Groq, Gemini, DeepSeek)</div>

              <div style={{ color: C.amber, marginBottom: 4, marginTop: 12 }}>Shared packages to create:</div>
              <div>• packages/database/ — Prisma schema (11 tables) + client + queries</div>
              <div>• packages/auth/ — NextAuth v5 + Passkey for all 4 portals</div>
              <div>• packages/ui/ — shadcn/ui shared components + design tokens</div>
              <div>• packages/validators/ — Zod schemas for all forms + APIs</div>
              <div>• packages/config/ — shared tsconfig, eslint, tailwind</div>

              <div style={{ color: C.amber, marginBottom: 4, marginTop: 12 }}>Database:</div>
              <div>• Single Supabase project (PostgreSQL)</div>
              <div>• Prisma schema with all 11 tables and relations</div>
              <div>• Row Level Security (RLS) policies — each role sees only their data</div>
              <div>• Supabase Storage bucket for deliverable files</div>
              <div>• AuditLog Prisma middleware (auto on every mutation)</div>

              <div style={{ color: C.amber, marginBottom: 4, marginTop: 12 }}>Auth (all 4 portals):</div>
              <div>• NextAuth v5 with WebAuthn/Passkey as PRIMARY</div>
              <div>• Email + password as fallback</div>
              <div>• Role-scoped middleware — wrong role redirected to correct portal</div>
              <div>• JWT session includes user role</div>

              <div style={{ color: C.amber, marginBottom: 4, marginTop: 12 }}>Device compatibility:</div>
              <div>• All portals fully responsive — mobile, tablet, desktop</div>
              <div>• Tailwind CSS v4 with mobile-first breakpoints</div>
              <div>• Touch-friendly UI for Passkey on mobile</div>

              <div style={{ color: C.amber, marginBottom: 4, marginTop: 12 }}>Deployment (each app = separate Vercel project):</div>
              <div>• apps/website → vercel (no env vars)</div>
              <div>• apps/admin → vercel (SUPABASE_URL, NEXTAUTH_SECRET, AI keys)</div>
              <div>• apps/agency-portal → vercel (scoped env)</div>
              <div>• apps/client-portal → vercel (scoped env)</div>
              <div>• apps/tech-portal → vercel (scoped env)</div>
              <div>• apps/invoice-engine → vercel (PDF-lib, DeepSeek, Resend keys)</div>
              <div>• apps/ai-engine → vercel (Groq, Gemini, DeepSeek keys)</div>

              <div style={{ color: C.red, marginBottom: 4, marginTop: 12 }}>Do NOT:</div>
              <div>• Mix portal code — each portal is fully isolated</div>
              <div>• Put business logic in website/ app</div>
              <div>• Use multiple databases — Supabase only</div>
              <div>• Import directly between apps — only via packages/</div>
              <div>• Merge NextCRM code — reference only, do not copy-paste</div>
            </div>
          </div>
          <div style={{ background: `${C.green}10`, border: `1px solid ${C.green}30`, borderRadius: 10, padding: "12px 14px", fontSize: 11, color: C.green }}>
            ✅ Is brief ke saath Antigravity ko puri clarity hai — kya banana hai, kahan banana hai, kaise banana hai. Koi confusion nahi.
          </div>
        </div>
      )}

    </div>
  );
}
