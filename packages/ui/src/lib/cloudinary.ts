/**
 * SmartKode — Cloudinary Utility
 *
 * USAGE BY IMAGE TYPE:
 * ─────────────────────────────────────────────────────────────────
 * Profile images (users, agencies, tech companies) → Cloudinary
 * Company logos                                    → Cloudinary
 * Marketing assets (website)                       → Cloudinary
 * Project deliverable files                        → Supabase Storage
 * Invoice PDFs                                     → Supabase Storage
 * ─────────────────────────────────────────────────────────────────
 *
 * Why the split?
 * Cloudinary = instant resize, CDN, format conversion (great for images)
 * Supabase Storage = private, scoped by RLS, no public URL (great for sensitive files)
 */

import { v2 as cloudinary } from "cloudinary";

// Configure once — used server-side only (API routes / Server Actions)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

// ── Folder structure in Cloudinary ──────────────────────────────
export const CLOUDINARY_FOLDERS = {
  profileImages: "smartkode/profiles",
  companyLogos: "smartkode/logos",
  marketingAssets: "smartkode/marketing",
  testimonials: "smartkode/testimonials",
} as const;

// ── Upload a base64 or buffer image to Cloudinary ───────────────
export async function uploadToCloudinary(
  file: string, // base64 or url
  folder: string,
  publicId?: string
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    public_id: publicId,
    overwrite: !!publicId,
    resource_type: "image",
    transformation: [
      { quality: "auto:good" },
      { fetch_format: "auto" },
    ],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

// ── Delete an image from Cloudinary ─────────────────────────────
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

// ── Generate a profile image upload URL (client-side signed upload) ──
export async function getSignedUploadUrl(folder: string): Promise<{
  signature: string;
  timestamp: number;
  cloudName: string;
  apiKey: string;
}> {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder, upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET },
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
  };
}
