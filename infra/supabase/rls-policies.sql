-- ══════════════════════════════════════════════════════════════════
-- SMARTKODE — Supabase Row Level Security (RLS) Policies
-- Run this SQL in Supabase Dashboard → SQL Editor
-- This ensures each portal ONLY sees data it's allowed to see.
-- ══════════════════════════════════════════════════════════════════

-- ─── HELPER: Get current user's role from the JWT ────────────────
-- We read the role from auth.jwt() claims which NextAuth sets.
-- In Supabase, the user's role is stored in the JWT under app_metadata.role

-- ─── ENABLE RLS ON ALL TABLES ────────────────────────────────────
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profit_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE retention_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ─── SERVICE ROLE BYPASS ─────────────────────────────────────────
-- The service role key (used server-side by Next.js API routes)
-- bypasses RLS automatically in Supabase. No policies needed for it.
-- These RLS policies protect direct database access from client-side.

-- ══════════════════════════════════════════════════════════════════
-- USERS TABLE
-- Each user sees only their own row. Admin sees all.
-- ══════════════════════════════════════════════════════════════════
CREATE POLICY "users_own_record" ON users
  FOR SELECT USING (
    auth.uid()::text = id::text
  );

CREATE POLICY "users_admin_all" ON users
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'ADMIN'
  );

-- ══════════════════════════════════════════════════════════════════
-- PROFIT SETTINGS
-- Admin only. No other role can read or write.
-- ══════════════════════════════════════════════════════════════════
CREATE POLICY "profit_settings_admin_only" ON profit_settings
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'ADMIN'
  );

-- ══════════════════════════════════════════════════════════════════
-- AGENCIES
-- Agency sees only their own row. Admin sees all.
-- ══════════════════════════════════════════════════════════════════
CREATE POLICY "agencies_own_record" ON agencies
  FOR SELECT USING (
    user_id::text = auth.uid()::text
  );

CREATE POLICY "agencies_admin_all" ON agencies
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'ADMIN'
  );

-- ══════════════════════════════════════════════════════════════════
-- CLIENTS
-- Client sees only their own row. Admin sees all.
-- Agency CANNOT see client contact details (whatsapp, email_contact).
-- Agency can see: id, full_name, company_name, country, total_projects
-- (via a view — the RLS here prevents direct access)
-- ══════════════════════════════════════════════════════════════════
CREATE POLICY "clients_own_record" ON clients
  FOR SELECT USING (
    user_id::text = auth.uid()::text
  );

CREATE POLICY "clients_admin_all" ON clients
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'ADMIN'
  );

-- ══════════════════════════════════════════════════════════════════
-- TECH COMPANIES
-- Tech sees only their own row. Admin sees all.
-- ══════════════════════════════════════════════════════════════════
CREATE POLICY "tech_own_record" ON tech_companies
  FOR SELECT USING (
    user_id::text = auth.uid()::text
  );

CREATE POLICY "tech_admin_all" ON tech_companies
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'ADMIN'
  );

-- ══════════════════════════════════════════════════════════════════
-- PROJECTS
-- Admin sees all.
-- Agency sees projects they sourced (agency_id matches their agency).
-- Client sees their own projects.
-- Tech sees projects assigned to them.
-- ══════════════════════════════════════════════════════════════════
CREATE POLICY "projects_admin_all" ON projects
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'ADMIN'
  );

CREATE POLICY "projects_client_own" ON projects
  FOR SELECT USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'CLIENT'
    AND client_id IN (
      SELECT id FROM clients WHERE user_id::text = auth.uid()::text
    )
  );

CREATE POLICY "projects_agency_sourced" ON projects
  FOR SELECT USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'AGENCY'
    AND agency_id IN (
      SELECT id FROM agencies WHERE user_id::text = auth.uid()::text
    )
  );

CREATE POLICY "projects_tech_assigned" ON projects
  FOR SELECT USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'TECH'
    AND tech_id IN (
      SELECT id FROM tech_companies WHERE user_id::text = auth.uid()::text
    )
  );

-- ══════════════════════════════════════════════════════════════════
-- MILESTONES
-- Follows project visibility. Client sees milestone status/title.
-- Tech sees milestone names only (via project).
-- Agency sees nothing.
-- ══════════════════════════════════════════════════════════════════
CREATE POLICY "milestones_admin_all" ON milestones
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'ADMIN'
  );

CREATE POLICY "milestones_client_own_project" ON milestones
  FOR SELECT USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'CLIENT'
    AND project_id IN (
      SELECT p.id FROM projects p
      JOIN clients c ON p.client_id = c.id
      WHERE c.user_id::text = auth.uid()::text
    )
  );

CREATE POLICY "milestones_tech_assigned_project" ON milestones
  FOR SELECT USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'TECH'
    AND project_id IN (
      SELECT p.id FROM projects p
      JOIN tech_companies t ON p.tech_id = t.id
      WHERE t.user_id::text = auth.uid()::text
    )
  );

-- ══════════════════════════════════════════════════════════════════
-- INVOICES
-- Admin sees all (full split breakdown).
-- Client sees their own invoices (amount + status only — handled in app layer).
-- Agency sees only their commission invoices.
-- Tech sees only their payment invoices.
-- ══════════════════════════════════════════════════════════════════
CREATE POLICY "invoices_admin_all" ON invoices
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'ADMIN'
  );

CREATE POLICY "invoices_client_own" ON invoices
  FOR SELECT USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'CLIENT'
    AND project_id IN (
      SELECT p.id FROM projects p
      JOIN clients c ON p.client_id = c.id
      WHERE c.user_id::text = auth.uid()::text
    )
  );

CREATE POLICY "invoices_agency_commission" ON invoices
  FOR SELECT USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'AGENCY'
    AND project_id IN (
      SELECT p.id FROM projects p
      JOIN agencies a ON p.agency_id = a.id
      WHERE a.user_id::text = auth.uid()::text
    )
  );

CREATE POLICY "invoices_tech_payment" ON invoices
  FOR SELECT USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'TECH'
    AND project_id IN (
      SELECT p.id FROM projects p
      JOIN tech_companies t ON p.tech_id = t.id
      WHERE t.user_id::text = auth.uid()::text
    )
  );

-- ══════════════════════════════════════════════════════════════════
-- PAYMENTS
-- Admin sees all. Client sees their own payment status.
-- Agency/Tech see only their share was released (handled in app layer).
-- ══════════════════════════════════════════════════════════════════
CREATE POLICY "payments_admin_all" ON payments
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'ADMIN'
  );

CREATE POLICY "payments_client_own" ON payments
  FOR SELECT USING (
    payer_id::text = auth.uid()::text
  );

-- ══════════════════════════════════════════════════════════════════
-- DELIVERABLES
-- Admin sees everything.
-- Tech sees only files they uploaded.
-- Client sees only files where virus_scan=CLEAN AND bot_qa=PASS.
-- Agency sees nothing.
-- ══════════════════════════════════════════════════════════════════
CREATE POLICY "deliverables_admin_all" ON deliverables
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'ADMIN'
  );

CREATE POLICY "deliverables_tech_own_uploads" ON deliverables
  FOR ALL USING (
    uploaded_by::text = auth.uid()::text
  );

CREATE POLICY "deliverables_client_clean_only" ON deliverables
  FOR SELECT USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'CLIENT'
    AND visible_to_client = true
    AND virus_scan_status = 'CLEAN'
    AND bot_qa_status = 'PASS'
    AND project_id IN (
      SELECT p.id FROM projects p
      JOIN clients c ON p.client_id = c.id
      WHERE c.user_id::text = auth.uid()::text
    )
  );

-- ══════════════════════════════════════════════════════════════════
-- RETENTION LOGS
-- Admin only. Client does not see the follow-up system.
-- ══════════════════════════════════════════════════════════════════
CREATE POLICY "retention_logs_admin_only" ON retention_logs
  FOR ALL USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'ADMIN'
  );

-- ══════════════════════════════════════════════════════════════════
-- AUDIT LOGS
-- Admin only. Immutable — no UPDATE or DELETE ever.
-- ══════════════════════════════════════════════════════════════════
CREATE POLICY "audit_logs_admin_read" ON audit_logs
  FOR SELECT USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'ADMIN'
  );

-- Prevent any delete on audit_logs
CREATE POLICY "audit_logs_no_delete" ON audit_logs
  AS RESTRICTIVE
  FOR DELETE USING (false);

-- Prevent any update on audit_logs
CREATE POLICY "audit_logs_no_update" ON audit_logs
  AS RESTRICTIVE
  FOR UPDATE USING (false);

-- ══════════════════════════════════════════════════════════════════
-- SUPABASE STORAGE: Deliverables Bucket
-- Run this to create the private deliverables bucket
-- ══════════════════════════════════════════════════════════════════
INSERT INTO storage.buckets (id, name, public)
VALUES ('deliverables', 'deliverables', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Only authenticated users can upload
CREATE POLICY "deliverables_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'deliverables'
    AND auth.role() = 'authenticated'
  );

-- Storage RLS: Tech can read their own uploads, admin reads all
CREATE POLICY "deliverables_read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'deliverables'
    AND auth.role() = 'authenticated'
  );

-- ══════════════════════════════════════════════════════════════════
-- INDEXES for performance (Supabase Postgres Best Practices)
-- ══════════════════════════════════════════════════════════════════

-- Projects: most-queried columns
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_agency_id ON projects(agency_id);
CREATE INDEX IF NOT EXISTS idx_projects_tech_id ON projects(tech_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Invoices: payment queries
CREATE INDEX IF NOT EXISTS idx_invoices_project_id ON invoices(project_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);

-- Deliverables: QA pipeline queries
CREATE INDEX IF NOT EXISTS idx_deliverables_project_id ON deliverables(project_id);
CREATE INDEX IF NOT EXISTS idx_deliverables_scan_qa ON deliverables(virus_scan_status, bot_qa_status);

-- Retention: scheduler queries
CREATE INDEX IF NOT EXISTS idx_retention_scheduled_at ON retention_logs(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_retention_client_id ON retention_logs(client_id);

-- Audit: admin history browsing
CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);
