// types/blog.ts
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
  | 'toc'
  | 'faq';

export interface BlogContent {
  type: BlockType;
  content: string;
  imageContent?: string;
  order: number;
  
  // Text styling
  textSize?: 'small' | 'medium' | 'large' | 'xl';
  textStyle?: 'normal' | 'bold' | 'italic';
  alignment?: 'left' | 'center' | 'right';
  
  // Image properties
  imageSize?: 'small' | 'medium' | 'large' | 'full';
  imageAlt?: string;
  imageCaption?: string;
  
  // Heading properties
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  
  // Code block properties
  language?: string;
  
  // Quote properties
  author?: string;
  
  // CTA properties
  ctaText?: string;
  ctaLink?: string;
  
  // FAQ properties
  question?: string;
  answer?: string;
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  keywords: string[];
  canonicalUrl?: string;
  noindex: boolean;
  nofollow: boolean;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
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
  };
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
  altText: string;
  caption?: string;
  title: string;
  fileSize: number;
  dimensions: {
    width: number;
    height: number;
  };
  mimeType: string;
  optimized: boolean;
  tags: string[];
  uploadedBy: string;
  createdAt: Date;
}

export interface BlogRevision {
  _id?: ObjectId;
  blogId: string;
  content: BlogContent[];
  title: string;
  modifiedBy: string;
  createdAt: Date;
  changeDescription?: string;
}

export interface Blog {
  _id?: ObjectId;
  
  // Core Content
  title: string;
  slug: string;
  excerpt: string;
  content: BlogContent[];
  
  // SEO
  seo: SEOMetadata;
  
  // Organization
  category: string;
  tags: string[];
  author: string | Author;
  
  // Media
  featuredImage?: {
    url: string;
    altText: string;
    caption?: string;
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
  readTime: number;
  wordCount: number;
  
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
  customCSS?: string;
  customJS?: string;
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
}

export interface SEOScore {
  score: number;
  maxScore: number;
  checks: {
    metaTitle: { passed: boolean; message: string; score: number };
    metaDescription: { passed: boolean; message: string; score: number };
    focusKeyword: { passed: boolean; message: string; score: number };
    readability: { passed: boolean; message: string; score: number };
    imageAlt: { passed: boolean; message: string; score: number };
    internalLinks: { passed: boolean; message: string; score: number };
    headingStructure: { passed: boolean; message: string; score: number };
    wordCount: { passed: boolean; message: string; score: number };
  };
  suggestions: string[];
}