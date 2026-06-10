import { useState } from "react";

// ─────────────────────────────────────────────
// SMARTKODE — MASTER SYSTEM DOCUMENT
// Black BG · White Text · Future-Proof
// ─────────────────────────────────────────────

const C = {
  bg: "#0a0a0a",
  surface: "#111111",
  border: "#1e1e1e",
  border2: "#2a2a2a",
  text: "#ffffff",
  muted: "#888888",
  dim: "#444444",
  green: "#22c55e",
  blue: "#3b82f6",
  purple: "#a855f7",
  amber: "#f59e0b",
  red: "#ef4444",
  teal: "#14b8a6",
  orange: "#f97316",
};

const tag = (color, text) => (
  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, border: `1px solid ${color}40`, color, background: `${color}12`, whiteSpace: "nowrap" }}>
    {text}
  </span>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: 14, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
      {title}
    </div>
    {children}
  </div>
);

const Card = ({ children, accent, style = {} }) => (
  <div style={{ background: C.surface, border: `1px solid ${accent || C.border}`, borderRadius: 10, padding: "14px 16px", ...style }}>
    {children}
  </div>
);

const Row = ({ label, value, auto, private: priv }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${C.border}` }}>
    <span style={{ fontFamily: "monospace", fontSize: 11, color: C.text, width: 200, flexShrink: 0 }}>{label}</span>
    <span style={{ fontFamily: "monospace", fontSize: 10, color: C.muted, flex: 1 }}>{value}</span>
    {auto && <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 10, background: `${C.green}20`, color: C.green, border: `1px solid ${C.green}30` }}>AUTO</span>}
    {priv && <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 10, background: `${C.red}20`, color: C.red, border: `1px solid ${C.red}30` }}>PRIVATE</span>}
  </div>
);

// ─── ALL DATA ────────────────────────────────

const STACK = [
  { label: "Frontend", color: C.blue, items: ["Next.js 16.2.6 (App Router)", "TypeScript (strict)", "Tailwind CSS v4", "shadcn/ui components", "Zustand (global state)", "React Hook Form + Zod"] },
  { label: "Backend / API", color: C.green, items: ["Next.js API Routes (serverless)", "Prisma ORM v6", "PostgreSQL via Supabase (free)", "NextAuth.js v5 (Passkey + fallback)", "Resend API (transactional emails)", "Zod (input validation)"] },
  { label: "AI — All Free Tier", color: C.purple, items: ["Groq + LLaMA 3.3 — System Bot (fast QA)", "Gemini 2.0 Flash — Retention messages", "DeepSeek v3 — Invoice generation", "LangChain.js — AI orchestration", "Exchangerate-API — Currency conversion"] },
  { label: "Payments — Local (Pakistan)", color: C.amber, items: ["Easypaisa API (mobile wallet, PKR)", "JazzCash API (mobile wallet, PKR)", "HBL PayConnect (bank, PKR)", "Direct IBAN bank transfer (any PK bank)"] },
  { label: "Payments — International", color: C.orange, items: ["Wise API (IBAN worldwide, USD/EUR/GBP)", "2Checkout (card payments, USD/EUR)", "Payoneer (digital wallet, USD)", "NsavePay (USD/PKR)", "ElevatePay (USD/PKR)", "USDT TRC20 (crypto)", "USDC (crypto)", "Bitcoin BTC (crypto)"] },
  { label: "Storage & Infrastructure", color: C.teal, items: ["Supabase Storage (files, deliverables)", "Vercel (deployment, free tier)", "GitHub (code + client file backup)", "VirusTotal API (file scanning, free)"] },
  { label: "Auth — All 4 Portals", color: C.red, items: ["Passkey / WebAuthn — PRIMARY login", "Email + Password — FALLBACK only", "NextAuth.js v5 (built-in WebAuthn)", "Role-scoped sessions (ADMIN|AGENCY|CLIENT|TECH)", "JWT tokens per portal", "CSRF protection built-in"] },
];

const DB_TABLES = [
  {
    name: "User",
    color: C.blue,
    purpose: "Central authentication table. Every person across all 4 portals is a User. Role field determines which portal they access and what data they can see.",
    fields: [
      { label: "id", value: "uuid PRIMARY KEY", auto: true },
      { label: "email", value: "varchar(255) UNIQUE NOT NULL" },
      { label: "role", value: "enum: ADMIN | AGENCY | CLIENT | TECH" },
      { label: "passkey_credential", value: "jsonb (WebAuthn credential data)", auto: true },
      { label: "password_hash", value: "varchar nullable (fallback only)" },
      { label: "is_active", value: "boolean DEFAULT true" },
      { label: "last_login_at", value: "timestamp", auto: true },
      { label: "created_at", value: "timestamp DEFAULT now()", auto: true },
      { label: "updated_at", value: "timestamp AUTO", auto: true },
    ],
    relations: [
      "→ Agency (1:1) — if role = AGENCY",
      "→ Client (1:1) — if role = CLIENT",
      "→ TechCompany (1:1) — if role = TECH",
      "Admin has no sub-table — uses User directly",
    ],
    privacy: "All users see only their own User record. Admin sees all.",
    automation: "created_at, updated_at, last_login_at all auto-set by system.",
  },
  {
    name: "ProfitSettings",
    color: "#888888",
    purpose: "Admin-controlled global profit split defaults. Every new Project reads these values on creation. Admin can change anytime — affects all future projects immediately.",
    fields: [
      { label: "id", value: "uuid PRIMARY KEY", auto: true },
      { label: "agency_default_percent", value: "float DEFAULT 10.0" },
      { label: "tech_default_percent", value: "float DEFAULT 40.0" },
      { label: "admin_profit_percent", value: "float AUTO = 100 - agency% - tech%", auto: true },
      { label: "updated_by", value: "uuid FK → User (admin only)", auto: true },
      { label: "updated_at", value: "timestamp AUTO", auto: true },
    ],
    relations: [
      "← Admin updates via Settings panel",
      "→ Project reads on creation (agency_cut, tech_cut auto-calculated)",
      "→ Agency.commission_percent reads default from here",
      "→ TechCompany.tech_cut_percent reads default from here",
    ],
    privacy: "Admin only. No other portal can see or touch this table.",
    automation: "admin_profit_percent auto-calculated. Any change here flows to all new projects.",
  },
  {
    name: "Agency",
    color: C.teal,
    purpose: "Client-giving companies. Many agencies exist. Each linked to a User account. They submit qualified clients and earn a one-time finder fee per project — never recurring.",
    fields: [
      { label: "id", value: "uuid PRIMARY KEY", auto: true },
      { label: "user_id", value: "uuid FK → User UNIQUE", auto: true },
      { label: "company_name", value: "varchar(255) NOT NULL" },
      { label: "country", value: "varchar(100)" },
      { label: "commission_percent", value: "float (inherited from ProfitSettings, overrideable)", auto: true },
      { label: "total_clients_sent", value: "int AUTO-COUNT", auto: true },
      { label: "total_earned", value: "float AUTO-SUM from Invoices", auto: true },
      { label: "is_active", value: "boolean DEFAULT true" },
      { label: "joined_at", value: "timestamp DEFAULT now()", auto: true },
    ],
    relations: [
      "→ User (1:1) — authentication",
      "→ Project (1:many) — all projects this agency sourced",
      "← ProfitSettings — reads commission_percent default",
      "Cannot access: Client contact, TechCompany data, other agency data",
    ],
    privacy: "Agency sees ONLY their own submitted clients and commission. Zero access to client WhatsApp/email. Zero access to tech company details.",
    automation: "total_clients_sent and total_earned auto-calculated from Project + Invoice tables via DB triggers.",
  },
  {
    name: "Client",
    color: C.green,
    purpose: "End clients who need work done. Submitted by agencies initially. After first project, client contact belongs to Admin forever — agency fee drops to zero for repeat work.",
    fields: [
      { label: "id", value: "uuid PRIMARY KEY", auto: true },
      { label: "user_id", value: "uuid FK → User UNIQUE", auto: true },
      { label: "agency_id", value: "uuid FK → Agency (source — first submission)", auto: true },
      { label: "full_name", value: "varchar(255) NOT NULL" },
      { label: "company_name", value: "varchar(255) nullable" },
      { label: "whatsapp", value: "varchar ENCRYPTED — ADMIN ONLY", private: true },
      { label: "email", value: "varchar ENCRYPTED — ADMIN ONLY", private: true },
      { label: "country", value: "varchar(100)" },
      { label: "client_type", value: "enum: LOCAL | INTERNATIONAL" },
      { label: "preferred_currency", value: "enum: PKR | USD | EUR | USDT | BTC" },
      { label: "preferred_payment", value: "enum: EASYPAISA | JAZZCASH | IBAN | WISE | CRYPTO | etc" },
      { label: "is_direct", value: "boolean DEFAULT false — AUTO true after project 1", auto: true },
      { label: "lifetime_value", value: "float AUTO-SUM all project values", auto: true },
      { label: "total_projects", value: "int AUTO-COUNT", auto: true },
      { label: "created_at", value: "timestamp DEFAULT now()", auto: true },
    ],
    relations: [
      "→ User (1:1) — authentication",
      "→ Agency (many:1) — source agency (first project only)",
      "→ Project (1:many) — all their projects",
      "→ RetentionLog (1:many) — all follow-up messages",
    ],
    privacy: "Client sees only their own portal: projects, milestones, invoices, deliverables. WhatsApp and email are ENCRYPTED in DB — only Admin can decrypt. Agency can NEVER access client contact.",
    automation: "is_direct auto-set to true after first project completes. lifetime_value and total_projects auto-updated via triggers.",
  },
  {
    name: "TechCompany",
    color: C.purple,
    purpose: "Tech team(s) that execute projects. Can be multiple. Admin assigns each project to one tech company based on availability. Payment released only after client approval.",
    fields: [
      { label: "id", value: "uuid PRIMARY KEY", auto: true },
      { label: "user_id", value: "uuid FK → User UNIQUE", auto: true },
      { label: "company_name", value: "varchar(255) NOT NULL" },
      { label: "specialization", value: "varchar (e.g. AI, Web, Mobile, Automation)" },
      { label: "tech_cut_percent", value: "float (from ProfitSettings, overrideable)", auto: true },
      { label: "availability_status", value: "enum: AVAILABLE | BUSY | ON_LEAVE" },
      { label: "total_projects_done", value: "int AUTO-COUNT", auto: true },
      { label: "total_paid", value: "float AUTO-SUM", auto: true },
      { label: "rating", value: "float AUTO-AVG from project ratings", auto: true },
      { label: "joined_at", value: "timestamp DEFAULT now()", auto: true },
    ],
    relations: [
      "→ User (1:1) — authentication",
      "→ Project (1:many) — all assigned projects",
      "→ Deliverable (1:many via Project) — uploads",
      "← ProfitSettings — reads tech_cut_percent default",
      "Cannot access: Client data, Agency data, other tech company data",
    ],
    privacy: "Tech sees only assigned project brief (P1), their deliverable upload, QA bot feedback, and payment status. Cannot see client contact, agency commission, or admin profit.",
    automation: "total_projects_done, total_paid, rating all auto-calculated. availability_status checked automatically on project assignment.",
  },
  {
    name: "Project",
    color: C.amber,
    purpose: "The core table. Everything connects here. One project links one Agency + one Client + one TechCompany. All money math happens here automatically.",
    fields: [
      { label: "id", value: "uuid PRIMARY KEY", auto: true },
      { label: "agency_id", value: "uuid FK → Agency (source)", auto: true },
      { label: "client_id", value: "uuid FK → Client", auto: true },
      { label: "tech_id", value: "uuid FK → TechCompany (assigned)", auto: true },
      { label: "title", value: "varchar(500) NOT NULL" },
      { label: "description", value: "text" },
      { label: "type", value: "enum: LARGE | SMALL" },
      { label: "status", value: "enum: INTAKE → ASSIGNED → IN_DEV → QA → DELIVERED → APPROVED → CLOSED" },
      { label: "total_value", value: "float NOT NULL (what client pays)" },
      { label: "agency_cut", value: "float AUTO = total_value × agency_percent", auto: true },
      { label: "tech_cut", value: "float AUTO = total_value × tech_percent", auto: true },
      { label: "admin_profit", value: "float AUTO = total_value − agency_cut − tech_cut", auto: true },
      { label: "agency_percent_used", value: "float snapshot from ProfitSettings at creation", auto: true },
      { label: "tech_percent_used", value: "float snapshot from ProfitSettings at creation", auto: true },
      { label: "p1_brief", value: "text AI-GENERATED by DeepSeek/Groq from client info", auto: true },
      { label: "client_approved", value: "boolean DEFAULT false" },
      { label: "tech_rating", value: "int 1-5 (admin rates tech after delivery)" },
      { label: "deadline", value: "timestamp" },
      { label: "created_at", value: "timestamp DEFAULT now()", auto: true },
      { label: "closed_at", value: "timestamp AUTO on CLOSED status", auto: true },
    ],
    relations: [
      "→ Agency (many:1) — source",
      "→ Client (many:1) — recipient",
      "→ TechCompany (many:1) — executor",
      "→ Milestone (1:many) — payment stages for LARGE projects",
      "→ Invoice (1:many) — billing records",
      "→ Deliverable (1:many) — files from tech",
      "→ RetentionLog (1:many) — follow-up messages after close",
      "← ProfitSettings — reads % at creation time (snapshot stored)",
    ],
    privacy: "Admin sees everything. Agency sees: title, status, their commission. Client sees: status, milestones, deliverables, invoices (not splits). Tech sees: P1 brief, QA feedback, payment status only.",
    automation: "agency_cut, tech_cut, admin_profit auto-calculated on save. p1_brief AI-generated on creation. closed_at auto-set. status changes trigger downstream automation.",
  },
  {
    name: "Milestone",
    color: C.red,
    purpose: "Payment stages for LARGE projects only. Each milestone auto-triggers an Invoice when status changes to INVOICED. Small projects skip milestones — go straight to Invoice.",
    fields: [
      { label: "id", value: "uuid PRIMARY KEY", auto: true },
      { label: "project_id", value: "uuid FK → Project", auto: true },
      { label: "title", value: "varchar (e.g. Design Phase, Backend, Testing)" },
      { label: "order_index", value: "int (1, 2, 3...)", auto: true },
      { label: "percent_due", value: "float (e.g. 10, 25, 10)" },
      { label: "amount_due", value: "float AUTO = project.total_value × percent_due/100", auto: true },
      { label: "status", value: "enum: PENDING | INVOICED | PAID" },
      { label: "due_date", value: "timestamp" },
      { label: "invoice_id", value: "uuid FK → Invoice (AUTO-linked on trigger)", auto: true },
      { label: "completed_at", value: "timestamp AUTO on PAID", auto: true },
    ],
    relations: [
      "→ Project (many:1) — parent project",
      "→ Invoice (1:1) — auto-created when status = INVOICED",
    ],
    privacy: "Admin sees all. Client sees milestone title, percent, status. Tech sees milestone names only. Agency sees nothing.",
    automation: "amount_due auto-calculated. When status → INVOICED: Invoice record auto-created, PDF generated, sent to client automatically.",
  },
  {
    name: "Invoice",
    color: "#d97706",
    purpose: "Auto-generated billing record. Created on every Milestone completion (LARGE) or project delivery (SMALL). Contains full money split breakdown. PDF stored in Supabase.",
    fields: [
      { label: "id", value: "uuid PRIMARY KEY", auto: true },
      { label: "project_id", value: "uuid FK → Project", auto: true },
      { label: "milestone_id", value: "uuid FK → Milestone (nullable — null for SMALL)", auto: true },
      { label: "invoice_number", value: "varchar AUTO-GEN (e.g. INV-2025-0042)", auto: true },
      { label: "amount", value: "float NOT NULL" },
      { label: "agency_share", value: "float AUTO = amount × agency_percent", auto: true },
      { label: "tech_share", value: "float AUTO = amount × tech_percent", auto: true },
      { label: "admin_share", value: "float AUTO = amount − agency_share − tech_share", auto: true },
      { label: "currency", value: "enum: PKR | USD | EUR | USDT | BTC" },
      { label: "converted_amount_pkr", value: "float AUTO via exchange rate API", auto: true },
      { label: "pdf_url", value: "varchar (Supabase Storage link)", auto: true },
      { label: "status", value: "enum: DRAFT | SENT | PAID | OVERDUE" },
      { label: "payment_method", value: "enum: EASYPAISA | JAZZCASH | IBAN | WISE | CRYPTO | etc" },
      { label: "sent_at", value: "timestamp AUTO", auto: true },
      { label: "paid_at", value: "timestamp AUTO on payment confirmation", auto: true },
    ],
    relations: [
      "→ Project (many:1) — parent",
      "→ Milestone (1:1 nullable) — trigger source",
      "→ Payment (1:1) — payment record",
    ],
    privacy: "Admin sees full split breakdown. Client sees invoice amount + status only (not splits). Agency sees only their share. Tech sees only their share.",
    automation: "invoice_number auto-generated. All shares auto-calculated. PDF auto-generated by DeepSeek. sent_at auto-stamped. paid_at auto-stamped on payment webhook.",
  },
  {
    name: "Payment",
    color: C.orange,
    purpose: "Tracks actual money movement. Supports both local PK and international methods. Currency auto-converted. IBAN, mobile, or crypto wallet stored based on method chosen.",
    fields: [
      { label: "id", value: "uuid PRIMARY KEY", auto: true },
      { label: "invoice_id", value: "uuid FK → Invoice", auto: true },
      { label: "payer_id", value: "uuid FK → User (client)", auto: true },
      { label: "method", value: "enum: EASYPAISA | JAZZCASH | IBAN | WISE | PAYONEER | NSAVE | ELEVATE | USDT | USDC | BTC | TWOCHECKOUT" },
      { label: "currency_paid", value: "enum: PKR | USD | EUR | USDT | USDC | BTC" },
      { label: "amount_paid", value: "float (in currency_paid)" },
      { label: "amount_pkr_equiv", value: "float AUTO via exchange rate API", auto: true },
      { label: "iban_number", value: "varchar ENCRYPTED (nullable — used if IBAN method)", private: true },
      { label: "mobile_number", value: "varchar ENCRYPTED (nullable — Easypaisa/JazzCash)", private: true },
      { label: "crypto_wallet", value: "varchar (nullable — crypto payments)" },
      { label: "transaction_ref", value: "varchar (gateway reference)", auto: true },
      { label: "status", value: "enum: PENDING | CONFIRMED | FAILED | REFUNDED" },
      { label: "confirmed_at", value: "timestamp AUTO on confirmation", auto: true },
    ],
    relations: [
      "→ Invoice (1:1) — billing source",
      "→ User/Client (many:1) — payer",
    ],
    privacy: "IBAN and mobile number ENCRYPTED in DB. Admin sees all. Client sees their own payment status. Agency/Tech see only their share was released.",
    automation: "amount_pkr_equiv auto-converted. transaction_ref auto-filled by payment gateway webhook. confirmed_at auto-stamped.",
  },
  {
    name: "Deliverable",
    color: C.purple,
    purpose: "Files uploaded by tech team. Every file goes through virus scan AND AI QA check before client can see it. GitHub URL stored if code is pushed there.",
    fields: [
      { label: "id", value: "uuid PRIMARY KEY", auto: true },
      { label: "project_id", value: "uuid FK → Project", auto: true },
      { label: "uploaded_by", value: "uuid FK → User (tech)", auto: true },
      { label: "file_name", value: "varchar NOT NULL" },
      { label: "file_url", value: "varchar (Supabase Storage URL)", auto: true },
      { label: "file_size_mb", value: "float AUTO", auto: true },
      { label: "github_url", value: "varchar nullable (if code repo)" },
      { label: "virus_scan_status", value: "enum: PENDING | CLEAN | INFECTED", auto: true },
      { label: "virus_scan_result", value: "jsonb (VirusTotal raw response)", auto: true },
      { label: "bot_qa_status", value: "enum: PENDING | PASS | FAIL", auto: true },
      { label: "bot_qa_notes", value: "text AI-GENERATED (shown to tech on FAIL)", auto: true },
      { label: "visible_to_client", value: "boolean AUTO true only if CLEAN + PASS", auto: true },
      { label: "uploaded_at", value: "timestamp DEFAULT now()", auto: true },
    ],
    relations: [
      "→ Project (many:1) — parent",
      "→ User/TechCompany (many:1) — uploader",
    ],
    privacy: "Tech uploads only. Client sees file only if virus_scan=CLEAN AND bot_qa=PASS. Admin sees everything including scan results. Agency sees nothing.",
    automation: "On upload: virus scan triggered automatically → if CLEAN, bot QA triggered → if PASS, visible_to_client = true → project status auto-moves to DELIVERED.",
  },
  {
    name: "RetentionLog",
    color: C.green,
    purpose: "Auto-scheduled follow-up messages after every project delivery. Ensures no client goes silent. Gemini AI writes personalized messages based on project context.",
    fields: [
      { label: "id", value: "uuid PRIMARY KEY", auto: true },
      { label: "client_id", value: "uuid FK → Client", auto: true },
      { label: "project_id", value: "uuid FK → Project", auto: true },
      { label: "type", value: "enum: FOLLOWUP_48H | FOLLOWUP_30D | UPSELL | TESTIMONIAL | REACTIVATION" },
      { label: "message_sent", value: "text GEMINI-GENERATED", auto: true },
      { label: "channel", value: "enum: EMAIL | WHATSAPP | BOTH" },
      { label: "scheduled_at", value: "timestamp AUTO (+48h or +30d from delivery)", auto: true },
      { label: "sent_at", value: "timestamp AUTO", auto: true },
      { label: "opened", value: "boolean DEFAULT false (email tracking)" },
      { label: "response_received", value: "boolean DEFAULT false" },
      { label: "response_text", value: "text nullable" },
      { label: "converted_to_project", value: "boolean DEFAULT false (upsell success flag)" },
    ],
    relations: [
      "→ Client (many:1) — recipient",
      "→ Project (many:1) — context source",
    ],
    privacy: "Admin only. Client is unaware of the log (they just receive the message). Agency/Tech cannot see any retention data.",
    automation: "On Project → CLOSED: two RetentionLog records auto-created (48H and 30D). Gemini generates message using project title + client name. Resend API sends email. WhatsApp optional via Twilio.",
  },
  {
    name: "AuditLog",
    color: "#555555",
    purpose: "Immutable log of every important action in the system. Who did what, when. Used for disputes, debugging, and security. Cannot be deleted.",
    fields: [
      { label: "id", value: "uuid PRIMARY KEY", auto: true },
      { label: "user_id", value: "uuid FK → User (actor)", auto: true },
      { label: "action", value: "varchar (e.g. PROJECT_CREATED, INVOICE_SENT)", auto: true },
      { label: "entity_type", value: "varchar (e.g. Project, Invoice)", auto: true },
      { label: "entity_id", value: "uuid (the affected record)", auto: true },
      { label: "old_value", value: "jsonb snapshot before change", auto: true },
      { label: "new_value", value: "jsonb snapshot after change", auto: true },
      { label: "ip_address", value: "varchar (security)", auto: true },
      { label: "created_at", value: "timestamp DEFAULT now()", auto: true },
    ],
    relations: ["→ User (many:1) — actor"],
    privacy: "Admin only. Immutable — no update or delete allowed. Every status change, payment, login, and setting update is logged.",
    automation: "100% automatic. No manual entry ever. Prisma middleware auto-writes on every model mutation.",
  },
];

const PORTALS = [
  {
    name: "Admin Portal",
    role: "ADMIN",
    color: C.amber,
    icon: "👑",
    who: "You (SmartKode owner). Single account. Highest privilege. This is your command center — everything is visible and controllable from here.",
    route: "/admin",
    auth: "Passkey PRIMARY + Email/Password fallback",
    sidebar: [
      { icon: "📊", label: "Dashboard", desc: "Revenue overview, active projects count, profit this month, pending approvals" },
      { icon: "🏢", label: "Agencies", desc: "All agencies list, commission rates, total clients sent, activate/deactivate" },
      { icon: "👤", label: "Clients", desc: "All clients, contact info (decrypted), lifetime value, direct/agency status" },
      { icon: "⚙️", label: "Tech Companies", desc: "All tech teams, availability status, assign to project, rating history" },
      { icon: "📁", label: "Projects", desc: "All projects across all stages, full detail view, approve/reject, assign tech" },
      { icon: "📄", label: "Invoices", desc: "All invoices, full split breakdown, payment status, download PDF" },
      { icon: "💳", label: "Payments", desc: "All payment records, method breakdown, crypto + local + international" },
      { icon: "🤖", label: "Bot Logs", desc: "QA bot pass/fail history, AI-generated notes, deliverable review logs" },
      { icon: "🔁", label: "Retention", desc: "All follow-up logs, message history, conversion tracking" },
      { icon: "📈", label: "Analytics", desc: "Monthly revenue, profit trend, agency performance, tech team comparison" },
      { icon: "⚙️", label: "Settings", desc: "Profit % splits (agency/tech), payment method config, system preferences" },
      { icon: "🔐", label: "Audit Log", desc: "Full immutable history of every action in system" },
    ],
    sees: ["Everything in all tables", "Decrypted client contact (WhatsApp, email)", "Full money splits (agency cut, tech cut, admin profit)", "Bot QA logs", "All audit logs", "All payment transaction refs"],
    cannot: ["Nothing is hidden from admin"],
    uniqueFeatures: [
      "Edit profit % splits globally (ProfitSettings table)",
      "Override % per individual project",
      "Approve/reject project before tech assignment",
      "View and compare multiple agencies",
      "Decrypt client private contact fields",
      "Release payment after client approval",
      "Rate tech company per project",
    ],
  },
  {
    name: "Agency Portal",
    role: "AGENCY",
    color: C.teal,
    icon: "🏢",
    who: "Client-giving companies. Many agencies exist in system. Each has their own isolated account. They submit qualified clients and track their commission.",
    route: "/agency",
    auth: "Passkey PRIMARY + Email/Password fallback",
    sidebar: [
      { icon: "➕", label: "Submit Client", desc: "Form to submit new qualified client: name, project type, budget, timeline, description" },
      { icon: "📋", label: "My Clients", desc: "All clients they submitted — name, project status, commission earned per client" },
      { icon: "💰", label: "Commission", desc: "Total earned, per-project breakdown, pending vs paid" },
      { icon: "📄", label: "Invoices", desc: "Their commission invoices only — not full project invoice" },
      { icon: "👤", label: "Profile", desc: "Company info, payment method (where to receive commission)" },
    ],
    sees: ["Their own submitted clients (name + project status only)", "Their own commission amounts", "Their own invoices", "Project status (not details)"],
    cannot: ["Client WhatsApp or email — NEVER", "Tech company identity or cost", "Admin profit margin", "Other agencies' data", "Full invoice breakdown (only their share)", "Deliverable files"],
    uniqueFeatures: [
      "Submit client form (fills Client + Project intake in DB)",
      "Real-time commission tracker",
      "Cannot contact client directly through system",
      "Payment method stored for commission payout",
    ],
  },
  {
    name: "Client Portal",
    role: "CLIENT",
    color: C.blue,
    icon: "👤",
    who: "End clients who need work done. They submitted by agency initially. After first project, they interact with SmartKode directly — agency is no longer in the loop.",
    route: "/client",
    auth: "Passkey PRIMARY + Email/Password fallback",
    sidebar: [
      { icon: "📁", label: "My Projects", desc: "All their projects, current status, timeline view" },
      { icon: "📦", label: "Milestones", desc: "Payment stages, completion %, upcoming milestones" },
      { icon: "⬇️", label: "Deliverables", desc: "Download files (only after virus scan CLEAN + bot QA PASS)" },
      { icon: "📄", label: "Invoices", desc: "Their invoices, amounts, payment status, download PDF" },
      { icon: "💳", label: "Pay Now", desc: "Payment screen — choose method (local PK or international), currency selector" },
      { icon: "✅", label: "Approve Project", desc: "Formal approval button — triggers payment release to tech + retention log" },
      { icon: "💬", label: "Feedback", desc: "Rate project, leave testimonial (fed into RetentionLog)" },
      { icon: "👤", label: "Profile", desc: "Contact info, preferred payment method, currency preference" },
    ],
    sees: ["Their own projects", "Milestone status", "Clean + QA-passed deliverables only", "Their invoices (amount + status, not split breakdown)", "Payment history"],
    cannot: ["Agency name or commission", "Tech company identity", "Admin profit margin", "Other clients' data", "Unscanned or QA-failed files", "Any system internals"],
    uniqueFeatures: [
      "Multi-currency payment (PKR local, USD/EUR international, crypto)",
      "IBAN field for international bank transfer",
      "Crypto wallet address input for USDT/BTC",
      "Formal project approval (triggers payment release)",
      "File download only after double security check",
    ],
  },
  {
    name: "Tech Company Portal",
    role: "TECH",
    color: C.purple,
    icon: "⚙️",
    who: "Tech team(s) that execute the actual project. Multiple tech companies can exist. Admin assigns projects based on availability. They deliver, system validates, payment released.",
    route: "/tech",
    auth: "Passkey PRIMARY + Email/Password fallback",
    sidebar: [
      { icon: "📋", label: "Assigned Projects", desc: "All projects assigned to them, with P1 brief, deadline, requirements" },
      { icon: "⬆️", label: "Upload Deliverable", desc: "File upload per project — triggers auto virus scan + bot QA" },
      { icon: "🤖", label: "QA Feedback", desc: "Bot QA results — PASS or FAIL with detailed AI-written notes" },
      { icon: "💰", label: "My Payments", desc: "Payment status per project — pending vs released" },
      { icon: "🔄", label: "Availability", desc: "Toggle: AVAILABLE | BUSY | ON_LEAVE — admin sees this for assignment" },
      { icon: "👤", label: "Profile", desc: "Company info, specialization, payment method for receiving payment" },
    ],
    sees: ["Only their assigned projects", "P1 brief (AI-generated from client info)", "QA bot feedback on their deliverables", "Their payment amount and status"],
    cannot: ["Client identity, WhatsApp, email — NEVER", "Agency identity or commission", "Admin profit margin", "Other tech companies' projects", "Full invoice (only their share)", "System settings"],
    uniqueFeatures: [
      "Availability toggle (prevents wrong assignment)",
      "P1 brief auto-generated — no briefing meetings needed",
      "Upload triggers automatic QA pipeline",
      "QA FAIL shows exactly what to fix (AI-written)",
      "Payment released automatically after client approval",
    ],
  },
];

const AUTOMATION_CHAIN = [
  { step: 1, trigger: "Agency submits client form", actions: ["Client record created in DB", "User account created with role=CLIENT", "agency_id auto-linked to Client", "Admin notified of new intake"], color: C.teal },
  { step: 2, trigger: "Admin reviews + creates project", actions: ["Project record created", "agency_cut, tech_cut, admin_profit AUTO-CALCULATED from ProfitSettings", "p1_brief AI-GENERATED by Groq from client info", "System checks TechCompany.availability_status", "Project assigned to AVAILABLE tech team", "TechCompany.availability_status → BUSY", "Tech portal shows new project brief"], color: C.amber },
  { step: 3, trigger: "Project type = LARGE → Milestones created", actions: ["Admin creates milestone stages (e.g. 10%, 25%, 10%)", "amount_due AUTO-CALCULATED per milestone", "Milestone statuses set to PENDING"], color: C.orange },
  { step: 4, trigger: "Milestone status → INVOICED", actions: ["Invoice record AUTO-CREATED", "invoice_number AUTO-GENERATED", "All shares AUTO-CALCULATED (agency/tech/admin)", "Currency conversion AUTO via exchange rate API", "PDF AUTO-GENERATED by DeepSeek", "Invoice AUTO-SENT to client via Resend email", "Client portal shows new invoice with Pay Now button"], color: "#d97706" },
  { step: 5, trigger: "Client pays invoice", actions: ["Payment record created", "amount_pkr_equiv AUTO-CONVERTED", "transaction_ref AUTO-filled by payment gateway", "Invoice.status → PAID", "Admin notified"], color: C.green },
  { step: 6, trigger: "Tech uploads deliverable", actions: ["Deliverable record created", "VirusTotal scan AUTO-TRIGGERED", "If CLEAN → Bot QA AUTO-TRIGGERED (Groq)", "Bot compares file against P1 brief", "If PASS → visible_to_client = true", "Project.status → DELIVERED", "Client portal shows download button", "If FAIL → bot_qa_notes sent to tech, status stays IN_DEV"], color: C.blue },
  { step: 7, trigger: "Client clicks Approve Project", actions: ["client_approved = true", "Payment splits RELEASED to agency + tech accounts", "Agency.total_earned AUTO-UPDATED", "TechCompany.total_paid AUTO-UPDATED", "TechCompany.availability_status → AVAILABLE", "Project.status → APPROVED", "Two RetentionLog records AUTO-CREATED (+48h, +30d)", "Client.lifetime_value AUTO-UPDATED", "If project 1: Client.is_direct → true"], color: C.purple },
  { step: 8, trigger: "RetentionLog scheduled_at reached", actions: ["Gemini generates personalized message using project + client context", "Message AUTO-SENT via Resend (email) + optional WhatsApp", "sent_at AUTO-STAMPED", "Admin sees in Retention dashboard", "If client responds + new project: converted_to_project = true → no agency fee"], color: C.green },
  { step: 9, trigger: "Any DB mutation (any table)", actions: ["AuditLog record AUTO-CREATED", "Stores: who, what action, old value, new value, IP, timestamp", "Immutable — cannot be edited or deleted", "Admin can search full history anytime"], color: "#555555" },
];

const PRIVACY_MATRIX = [
  { field: "Client WhatsApp/email", admin: "✅ Full", agency: "❌ Never", client: "✅ Own only", tech: "❌ Never" },
  { field: "Agency commission amount", admin: "✅ Full", agency: "✅ Own only", client: "❌ Never", tech: "❌ Never" },
  { field: "Tech cost / cut", admin: "✅ Full", agency: "❌ Never", client: "❌ Never", tech: "✅ Own only" },
  { field: "Admin profit margin", admin: "✅ Full", agency: "❌ Never", client: "❌ Never", tech: "❌ Never" },
  { field: "Full invoice split", admin: "✅ Full", agency: "Own share", client: "Amount only", tech: "Own share" },
  { field: "Other agency data", admin: "✅ Full", agency: "❌ Never", client: "❌ Never", tech: "❌ Never" },
  { field: "Other client data", admin: "✅ Full", agency: "❌ Never", client: "❌ Never", tech: "❌ Never" },
  { field: "P1 project brief", admin: "✅ Full", agency: "❌ Never", client: "❌ Never", tech: "✅ Assigned only" },
  { field: "QA bot logs", admin: "✅ Full", agency: "❌ Never", client: "❌ Never", tech: "✅ Own only" },
  { field: "Deliverable files", admin: "✅ Full", agency: "❌ Never", client: "Clean+QA only", tech: "✅ Own only" },
  { field: "Retention messages", admin: "✅ Full", agency: "❌ Never", client: "❌ Never", tech: "❌ Never" },
  { field: "Audit log", admin: "✅ Full", agency: "❌ Never", client: "❌ Never", tech: "❌ Never" },
  { field: "ProfitSettings", admin: "✅ Edit", agency: "❌ Never", client: "❌ Never", tech: "❌ Never" },
  { field: "Payment IBAN/mobile", admin: "✅ Encrypted view", agency: "Own only", client: "Own only", tech: "Own only" },
];

const ROADMAP = [
  { phase: "Phase 1", weeks: "Week 1–2", title: "Foundation", color: C.green, items: ["Next.js 16.2.6 project setup with TypeScript", "Supabase project + PostgreSQL database", "Full Prisma schema — all 11 tables with relations", "NextAuth.js v5 with Passkey (WebAuthn) for all 4 portals", "4 route groups: /admin /agency /client /tech", "Role-based middleware (redirect wrong role to correct portal)", "AuditLog middleware (auto-writes on every Prisma mutation)"] },
  { phase: "Phase 2", weeks: "Week 3–4", title: "All 4 Portals — Core UI", color: C.blue, items: ["Admin: sidebar nav + dashboard overview + agency/client/tech management", "Agency: submit client form + commission tracker", "Client: project status view + milestone + invoice + pay now button", "Tech: assigned projects + file upload + availability toggle", "All sidebars responsive (mobile, tablet, desktop)", "Shared component library (shadcn/ui themed)"] },
  { phase: "Phase 3", weeks: "Week 5–6", title: "AI Automation Layer", color: C.purple, items: ["Groq integration — QA bot (checks deliverable vs P1 brief)", "DeepSeek integration — Invoice PDF generation", "Gemini integration — Retention message generation", "LangChain orchestration for multi-step AI flows", "P1 brief auto-generation on project creation", "Bot QA pipeline: upload → virus scan → QA → status update"] },
  { phase: "Phase 4", weeks: "Week 7–8", title: "Payments + Splits", color: C.amber, items: ["Easypaisa API integration (local PKR)", "JazzCash API integration (local PKR)", "Wise API integration (international IBAN)", "Crypto payment flow (USDT TRC20, BTC, USDC)", "2Checkout for international cards", "Exchangerate-API for currency conversion", "Auto payment split logic on client_approved = true", "ProfitSettings admin panel — live % editing"] },
  { phase: "Phase 5", weeks: "Week 9–10", title: "Security + Polish", color: C.red, items: ["Field-level encryption for client WhatsApp/email/IBAN (using Supabase Vault or custom AES)", "VirusTotal API integration for all uploads", "Rate limiting on all API routes (upstash/ratelimit)", "CSRF protection (built into NextAuth v5)", "Row Level Security (RLS) on Supabase tables", "Error boundaries + fallback UI", "Loading skeletons for all data fetches", "Full mobile responsiveness audit"] },
  { phase: "Phase 6", weeks: "Week 11–12", title: "Retention + Deploy", color: C.teal, items: ["Retention scheduler (node-cron or Vercel cron jobs)", "Resend email integration for all notifications", "Optional WhatsApp via Twilio API", "Analytics dashboard (Recharts — revenue, profit, agency performance)", "Vercel production deployment", "Environment variables audit (no secrets exposed)", "Real first client test run", "Admin Settings panel finalized"] },
];

// ─── MAIN COMPONENT ──────────────────────────

export default function SmartKodeMaster() {
  const [tab, setTab] = useState("overview");
  const [expandedTable, setExpandedTable] = useState(null);
  const [expandedPortal, setExpandedPortal] = useState("Admin Portal");

  const tabs = [
    { id: "overview", label: "System Overview" },
    { id: "stack", label: "Tech Stack" },
    { id: "portals", label: "4 Portals" },
    { id: "database", label: "Database" },
    { id: "automation", label: "Automation Chain" },
    { id: "privacy", label: "Privacy Matrix" },
    { id: "payments", label: "Payments" },
    { id: "roadmap", label: "Roadmap" },
  ];

  const s = { color: C.text, fontFamily: "'Inter', sans-serif", background: C.bg, minHeight: "100vh", padding: 20 };

  return (
    <div style={s}>

      {/* HEADER */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", marginBottom: 4 }}>
          SmartKode — Master System Document
        </div>
        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
          Next.js 16.2.6 · Passkey all portals · Pakistan + International payments · AI-automated · Future-proof · v3.0 FINAL
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          {[["4 Portals", C.blue], ["11 DB Tables", C.green], ["9 AI Automations", C.purple], ["12 Payment Methods", C.amber], ["Zero Manual Invoicing", C.teal]].map(([l, c]) => (
            <span key={l} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, border: `1px solid ${c}40`, color: c, background: `${c}10` }}>{l}</span>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: 4, marginBottom: 28, flexWrap: "wrap", borderBottom: `1px solid ${C.border}`, paddingBottom: 12 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            fontSize: 11, padding: "5px 12px", borderRadius: 8, border: `1px solid ${tab === t.id ? C.text : C.border}`,
            background: tab === t.id ? C.text : "transparent",
            color: tab === t.id ? C.bg : C.muted, cursor: "pointer", transition: "all 0.15s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {tab === "overview" && (
        <div>
          <Section title="What This System Is">
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, maxWidth: 680 }}>
              SmartKode is a fully automated business operating system — not a collection of web portals, but a single unified platform where agencies submit clients, admin routes work to tech teams, AI validates quality, payments split automatically, and clients are retained long-term. Admin (you) focuses only on growth. Everything else is automated.
            </div>
          </Section>
          <Section title="Business Model">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              {[
                { label: "Agency sends client", desc: "Qualified, ready-to-pay. One-time finder fee.", color: C.teal, icon: "🏢" },
                { label: "You receive + route", desc: "Assign to tech. AI generates brief. Zero meetings.", color: C.amber, icon: "👑" },
                { label: "Tech executes", desc: "Works from AI brief. Uploads. Bot validates.", color: C.purple, icon: "⚙️" },
                { label: "Client pays", desc: "Local PKR or international. Crypto or bank.", color: C.blue, icon: "👤" },
                { label: "Splits auto-released", desc: "Agency 10%, Tech 40%, You keep 50%.", color: C.green, icon: "💰" },
                { label: "Client retained forever", desc: "Follow-ups automated. Repeat = no agency fee.", color: C.red, icon: "🔁" },
              ].map(c => (
                <Card key={c.label} accent={`${c.color}40`}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{c.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{c.desc}</div>
                </Card>
              ))}
            </div>
          </Section>
          <Section title="Portal Relationship Map">
            <Card>
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 2 }}>
                <div>🏢 <span style={{ color: C.teal }}>Agency</span> → submits Client → visible to <span style={{ color: C.amber }}>Admin</span> only</div>
                <div>👑 <span style={{ color: C.amber }}>Admin</span> → creates Project → assigns to <span style={{ color: C.purple }}>Tech</span></div>
                <div>⚙️ <span style={{ color: C.purple }}>Tech</span> → uploads Deliverable → auto QA → visible to <span style={{ color: C.blue }}>Client</span></div>
                <div>👤 <span style={{ color: C.blue }}>Client</span> → pays + approves → triggers payment splits → triggers retention</div>
                <div>🔁 Retention bot → messages <span style={{ color: C.blue }}>Client</span> directly → repeat project → <span style={{ color: C.amber }}>Admin</span> routes again (no agency fee)</div>
                <div style={{ marginTop: 8, padding: "8px 12px", background: `${C.red}10`, border: `1px solid ${C.red}20`, borderRadius: 8 }}>
                  🔒 Agency can NEVER contact Client directly. Client contact encrypted in DB — Admin eyes only.
                </div>
              </div>
            </Card>
          </Section>
        </div>
      )}

      {/* ── STACK ── */}
      {tab === "stack" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {STACK.map(s => (
            <Card key={s.label}>
              <div style={{ fontSize: 10, color: s.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{s.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {s.items.map(i => (
                  <span key={i} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, border: `1px solid ${s.color}30`, color: s.color, background: `${s.color}08` }}>{i}</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── PORTALS ── */}
      {tab === "portals" && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {PORTALS.map(p => (
              <button key={p.name} onClick={() => setExpandedPortal(p.name)} style={{
                display: "flex", alignItems: "center", gap: 6, fontSize: 11, padding: "6px 14px", borderRadius: 8,
                border: `1px solid ${expandedPortal === p.name ? p.color : C.border}`,
                background: expandedPortal === p.name ? `${p.color}15` : "transparent",
                color: expandedPortal === p.name ? p.color : C.muted, cursor: "pointer",
              }}>{p.icon} {p.name}</button>
            ))}
          </div>
          {PORTALS.filter(p => p.name === expandedPortal).map(p => (
            <div key={p.name}>
              <Card accent={`${p.color}50`} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 28 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: p.color }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>Route: <span style={{ fontFamily: "monospace", color: C.text }}>{p.route}</span> · Role: <span style={{ fontFamily: "monospace", color: C.text }}>{p.role}</span></div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: 10 }}>{p.who}</div>
                <div style={{ fontSize: 11, padding: "6px 10px", background: `${p.color}10`, border: `1px solid ${p.color}20`, borderRadius: 6, color: p.color }}>
                  🔑 {p.auth}
                </div>
              </Card>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <Card>
                  <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Sidebar Navigation</div>
                  {p.sidebar.map(s => (
                    <div key={s.label} style={{ display: "flex", gap: 10, marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>
                      <span style={{ fontSize: 16 }}>{s.icon}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: C.text, marginBottom: 2 }}>{s.label}</div>
                        <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </Card>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <Card>
                    <div style={{ fontSize: 10, color: C.green, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>✅ Can See</div>
                    {p.sees.map(s => <div key={s} style={{ fontSize: 11, color: C.muted, padding: "3px 0", borderBottom: `1px solid ${C.border}` }}>{s}</div>)}
                  </Card>
                  <Card>
                    <div style={{ fontSize: 10, color: C.red, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>❌ Cannot See</div>
                    {p.cannot.map(s => <div key={s} style={{ fontSize: 11, color: C.muted, padding: "3px 0", borderBottom: `1px solid ${C.border}` }}>{s}</div>)}
                  </Card>
                  <Card>
                    <div style={{ fontSize: 10, color: p.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>⚡ Unique Features</div>
                    {p.uniqueFeatures.map(s => <div key={s} style={{ fontSize: 11, color: C.muted, padding: "3px 0", borderBottom: `1px solid ${C.border}` }}>{s}</div>)}
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── DATABASE ── */}
      {tab === "database" && (
        <div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 16, lineHeight: 1.6 }}>
            11 tables. Every relation is intentional. <span style={{ color: C.green }}>AUTO</span> = system fills automatically. <span style={{ color: C.red }}>PRIVATE</span> = encrypted, admin-only decrypt. Click any table to expand.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {DB_TABLES.map(t => (
              <div key={t.name}>
                <div onClick={() => setExpandedTable(expandedTable === t.name ? null : t.name)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: C.surface, border: `1px solid ${expandedTable === t.name ? t.color : C.border}`, borderRadius: expandedTable === t.name ? "10px 10px 0 0" : 10, cursor: "pointer" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: t.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600, color: C.text, width: 160, flexShrink: 0 }}>{t.name}</span>
                  <span style={{ fontSize: 11, color: C.muted, flex: 1 }}>{t.purpose.slice(0, 80)}...</span>
                  <span style={{ fontSize: 10, color: C.dim }}>{expandedTable === t.name ? "▲" : "▼"}</span>
                </div>
                {expandedTable === t.name && (
                  <div style={{ background: C.surface, border: `1px solid ${t.color}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: 16 }}>
                    <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: 14 }}>{t.purpose}</div>
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 10, color: t.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Fields</div>
                      {t.fields.map(f => <Row key={f.label} label={f.label} value={f.value} auto={f.auto} private={f.private} />)}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <div style={{ fontSize: 10, color: C.blue, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Relations</div>
                        {t.relations.map(r => <div key={r} style={{ fontSize: 11, color: C.muted, padding: "3px 0", borderBottom: `1px solid ${C.border}`, fontFamily: "monospace" }}>{r}</div>)}
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: C.amber, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Automation</div>
                        <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{t.automation}</div>
                        <div style={{ fontSize: 10, color: C.red, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, marginTop: 10 }}>Privacy</div>
                        <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{t.privacy}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── AUTOMATION ── */}
      {tab === "automation" && (
        <div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 20, lineHeight: 1.6 }}>
            9 automation triggers. One action cascades through the entire system automatically. Admin touches only what requires human judgment.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {AUTOMATION_CHAIN.map((a, i) => (
              <div key={a.step} style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 32, flexShrink: 0 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: a.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#000", flexShrink: 0 }}>{a.step}</div>
                  {i < AUTOMATION_CHAIN.length - 1 && <div style={{ width: 1, flex: 1, background: C.border, margin: "4px 0" }} />}
                </div>
                <div style={{ paddingBottom: 20, flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: a.color, marginBottom: 8 }}>TRIGGER: {a.trigger}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {a.actions.map(act => (
                      <div key={act} style={{ display: "flex", gap: 8, fontSize: 11, color: C.muted }}>
                        <span style={{ color: C.dim, flexShrink: 0 }}>→</span>
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PRIVACY MATRIX ── */}
      {tab === "privacy" && (
        <div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>Who can see what. Every field. Every portal. No ambiguity.</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr>
                  {["Field / Data", "Admin 👑", "Agency 🏢", "Client 👤", "Tech ⚙️"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 12px", borderBottom: `1px solid ${C.border2}`, color: C.muted, fontWeight: 500, fontSize: 10, letterSpacing: "0.06em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRIVACY_MATRIX.map((r, i) => (
                  <tr key={r.field} style={{ background: i % 2 === 0 ? C.surface : "transparent" }}>
                    <td style={{ padding: "8px 12px", color: C.text, fontWeight: 500 }}>{r.field}</td>
                    {[r.admin, r.agency, r.client, r.tech].map((v, j) => (
                      <td key={j} style={{ padding: "8px 12px", color: v.includes("✅") ? C.green : v.includes("❌") ? C.red : C.amber }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── PAYMENTS ── */}
      {tab === "payments" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card accent={`${C.green}40`}>
            <div style={{ fontSize: 11, color: C.green, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>🇵🇰 Local — Pakistan</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
              {[
                { name: "Easypaisa", field: "Mobile number", currency: "PKR" },
                { name: "JazzCash", field: "Mobile number", currency: "PKR" },
                { name: "HBL PayConnect", field: "IBAN", currency: "PKR" },
                { name: "Bank IBAN", field: "IBAN + bank name", currency: "PKR" },
              ].map(p => (
                <div key={p.name} style={{ background: C.bg, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: C.green }}>{p.currency}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>Field: {p.field}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card accent={`${C.blue}40`}>
            <div style={{ fontSize: 11, color: C.blue, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>🌍 International</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
              {[
                { name: "Wise", field: "IBAN / account", currency: "USD/EUR/GBP" },
                { name: "Payoneer", field: "Email / account ID", currency: "USD" },
                { name: "2Checkout", field: "Card details", currency: "USD/EUR" },
                { name: "NsavePay", field: "Account number", currency: "USD/PKR" },
                { name: "ElevatePay", field: "Account number", currency: "USD/PKR" },
              ].map(p => (
                <div key={p.name} style={{ background: C.bg, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: C.blue }}>{p.currency}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>Field: {p.field}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card accent={`${C.purple}40`}>
            <div style={{ fontSize: 11, color: C.purple, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>₿ Crypto</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
              {[
                { name: "USDT TRC20", field: "Wallet address", currency: "USDT" },
                { name: "USDC", field: "Wallet address", currency: "USDC" },
                { name: "Bitcoin (BTC)", field: "Wallet address", currency: "BTC" },
              ].map(p => (
                <div key={p.name} style={{ background: C.bg, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: C.purple }}>{p.currency}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>Field: {p.field}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: 11, color: C.amber, marginBottom: 8, fontWeight: 600 }}>How currency conversion works</div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.7 }}>
              Client selects currency → Payment.currency_paid saved → exchangerate-api.com converts to PKR equivalent → Payment.amount_pkr_equiv auto-stored. Admin always sees PKR value. Invoice PDF shows client's currency. All accounting done in PKR on backend.
            </div>
          </Card>
        </div>
      )}

      {/* ── ROADMAP ── */}
      {tab === "roadmap" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ROADMAP.map(r => (
            <Card key={r.phase} accent={`${r.color}30`}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: r.color, marginBottom: 2 }}>{r.phase}</div>
                  <div style={{ fontSize: 10, color: C.muted, whiteSpace: "nowrap" }}>{r.weeks}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>{r.title}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {r.items.map(item => (
                      <div key={item} style={{ display: "flex", gap: 8, fontSize: 11, color: C.muted }}>
                        <span style={{ color: r.color, flexShrink: 0 }}>·</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
}
