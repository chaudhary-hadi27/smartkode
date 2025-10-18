// src/types/blog.ts - Enhanced with SEO fields
import { ObjectId } from 'mongodb';

export type BlogStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export type BlockType = 
  | 'text' 
  | 'image' 
  | 'heading' 
  | 'subheading'
  | 'quote'
  | 'code'
  | 'embed'
  | 'separator'
  | 'cta'
  | 'list'
  | 'table'
  | 'video'
  | 'gallery';

export interface BlogContent {
  type: BlockType;
  content: string;
  imageContent?: string;
  order: number;
  
  // Text styling
  textSize?: 'small' | 'medium' | 'large' | 'xl';
  textStyle?: 'normal' | 'bold' | 'italic';
  alignment?: 'left' | 'center' | 'right';
  
  // Image properties (SEO CRITICAL)
  imageSize?: 'small' | 'medium' | 'large' | 'full';
  imageAlt?: string; // SEO: Alt text for images
  imageCaption?: string;
  imageTitle?: string; // SEO: Image title attribute
  
  // Heading properties
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  headingId?: string; // For anchor links
  
  // Code block properties
  language?: string;
  
  // Quote properties
  author?: string;
  
  // CTA properties
  ctaText?: string;
  ctaLink?: string;
  ctaStyle?: 'primary' | 'secondary' | 'outline';
  
  // List properties
  listItems?: string[];
  listType?: 'ordered' | 'unordered';
  
  // Video properties
  videoUrl?: string;
  videoProvider?: 'youtube' | 'vimeo' | 'custom';
}

// SEO Metadata (CRITICAL FOR SEO)
export interface SEOMetadata {
  metaTitle: string; // 50-60 chars
  metaDescription: string; // 150-160 chars
  focusKeyword: string;
  keywords: string[]; // 5-10 keywords
  canonicalUrl?: string;
  noindex: boolean;
  nofollow: boolean;
  
  // Open Graph (Social Media SEO)
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: 'article' | 'website';
  
  // Twitter Card
  twitterCard?: 'summary' | 'summary_large_image';
  twitterImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  
  // Structured Data
  schemaType?: 'Article' | 'BlogPosting' | 'NewsArticle';
}

export interface BlogAnalytics {
  views: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  bounceRate: number;
  lastViewed?: Date;
  socialShares: {
    twitter: number;
    linkedin: number;
    facebook: number;
    whatsapp: number;
  };
  topReferrers?: string[];
  deviceStats?: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
}

export interface Author {
  _id?: ObjectId;
  name: string;
  slug: string;
  email: string;
  bio?: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  verified?: boolean;
}

export interface Category {
  _id?: ObjectId;
  name: string;
  slug: string;
  description: string;
  parent?: string;
  metaDescription?: string;
  featured: boolean;
  color?: string;
  icon?: string;
  blogCount?: number;
}

export interface Tag {
  _id?: ObjectId;
  name: string;
  slug: string;
  count?: number;
}

export interface MediaAsset {
  _id?: ObjectId;
  url: string;
  altText: string; // SEO: Required
  caption?: string;
  title: string;
  fileSize: number;
  dimensions: {
    width: number;
    height: number;
  };
  mimeType: string;
  optimized: boolean;
  webpUrl?: string; // SEO: WebP version for performance
  thumbnailUrl?: string;
  tags: string[];
  uploadedBy: string;
  createdAt: Date;
}

export interface Blog {
  _id?: ObjectId;
  
  // Core Content
  title: string;
  slug: string;
  excerpt: string;
  content: BlogContent[];
  
  // SEO (CRITICAL)
  seo: SEOMetadata;
  
  // Organization
  category: string | Category;
  tags: string[];
  author: string | Author;
  
  // Media (SEO: Featured image important for social sharing)
  featuredImage?: {
    url: string;
    altText: string; // SEO: Required
    caption?: string;
    title?: string;
  };
  
  // Publishing
  status: BlogStatus;
  publishedDate?: Date;
  scheduledDate?: Date;
  
  // Analytics
  analytics: BlogAnalytics;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  readTime: number; // Calculated
  wordCount: number; // Calculated
  
  // Relations
  relatedPosts: string[];
  series?: {
    name: string;
    order: number;
  };
  
  // Advanced
  featured: boolean;
  sticky: boolean;
  allowComments: boolean;
  commentsCount?: number;
  customCSS?: string;
  customJS?: string;
  
  // SEO Score (calculated)
  seoScore?: number;
  readabilityScore?: number;
}

export interface BlogFilters {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  author?: string;
  status?: BlogStatus;
  search?: string;
  sortBy?: 'date' | 'views' | 'title' | 'readTime';
  sortOrder?: 'asc' | 'desc';
  featured?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface PaginatedBlogs {
  blogs: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: BlogFilters;
  popularTags?: Tag[];
  categories?: Category[];
}

export interface SEOScore {
  score: number;
  maxScore: number;
  percentage: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  checks: {
    metaTitle: SEOCheck;
    metaDescription: SEOCheck;
    focusKeyword: SEOCheck;
    readability: SEOCheck;
    imageAlt: SEOCheck;
    internalLinks: SEOCheck;
    externalLinks: SEOCheck;
    headingStructure: SEOCheck;
    wordCount: SEOCheck;
    urlStructure: SEOCheck;
  };
  suggestions: string[];
  criticalIssues: string[];
}

export interface SEOCheck {
  passed: boolean;
  message: string;
  score: number;
  maxScore: number;
  priority: 'high' | 'medium' | 'low';
}