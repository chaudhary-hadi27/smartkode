// lib/blog/seo.ts
import type { Blog, SEOScore, BlogContent } from '@/types/blog';

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function calculateReadingTime(content: BlogContent[]): number {
  const wordsPerMinute = 200;
  let totalWords = 0;

  content.forEach(block => {
    if (['text', 'heading', 'subheading', 'quote'].includes(block.type)) {
      totalWords += block.content.split(/\s+/).filter(word => word.length > 0).length;
    }
    if (block.question) {
      totalWords += block.question.split(/\s+/).length;
    }
    if (block.answer) {
      totalWords += block.answer.split(/\s+/).length;
    }
  });

  return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}

export function calculateWordCount(content: BlogContent[]): number {
  let totalWords = 0;

  content.forEach(block => {
    if (['text', 'heading', 'subheading', 'quote'].includes(block.type)) {
      totalWords += block.content.split(/\s+/).filter(word => word.length > 0).length;
    }
  });

  return totalWords;
}

export function extractPlainText(content: BlogContent[]): string {
  return content
    .filter(block => ['text', 'heading', 'subheading', 'quote'].includes(block.type))
    .map(block => block.content)
    .join(' ');
}

export function calculateKeywordDensity(text: string, keyword: string): number {
  const words = text.toLowerCase().split(/\s+/);
  const keywordWords = keyword.toLowerCase().split(/\s+/);
  let count = 0;

  for (let i = 0; i <= words.length - keywordWords.length; i++) {
    const segment = words.slice(i, i + keywordWords.length).join(' ');
    if (segment === keyword.toLowerCase()) {
      count++;
    }
  }

  return (count / words.length) * 100;
}

export function analyzeSEO(blog: Partial<Blog>): SEOScore {
  const checks = {
    metaTitle: analyzeMetaTitle(blog.seo?.metaTitle || '', blog.seo?.focusKeyword || ''),
    metaDescription: analyzeMetaDescription(blog.seo?.metaDescription || '', blog.seo?.focusKeyword || ''),
    focusKeyword: analyzeFocusKeyword(blog.content || [], blog.seo?.focusKeyword || ''),
    readability: analyzeReadability(blog.content || []),
    imageAlt: analyzeImageAlt(blog.content || []),
    internalLinks: analyzeInternalLinks(blog.content || []),
    headingStructure: analyzeHeadingStructure(blog.content || []),
    wordCount: analyzeWordCount(blog.content || []),
  };

  const totalScore = Object.values(checks).reduce((sum, check) => sum + check.score, 0);
  const maxScore = Object.keys(checks).length * 10;

  const suggestions = Object.values(checks)
    .filter(check => !check.passed)
    .map(check => check.message);

  return {
    score: totalScore,
    maxScore,
    checks,
    suggestions,
  };
}

function analyzeMetaTitle(title: string, keyword: string): { passed: boolean; message: string; score: number } {
  const length = title.length;
  const hasKeyword = keyword && title.toLowerCase().includes(keyword.toLowerCase());
  
  if (length === 0) {
    return { passed: false, message: 'Meta title is missing', score: 0 };
  }
  if (length < 30) {
    return { passed: false, message: 'Meta title is too short (min 30 chars)', score: 3 };
  }
  if (length > 60) {
    return { passed: false, message: 'Meta title is too long (max 60 chars)', score: 5 };
  }
  if (!hasKeyword) {
    return { passed: false, message: 'Meta title should contain focus keyword', score: 7 };
  }
  
  return { passed: true, message: 'Meta title is optimized', score: 10 };
}

function analyzeMetaDescription(desc: string, keyword: string): { passed: boolean; message: string; score: number } {
  const length = desc.length;
  const hasKeyword = keyword && desc.toLowerCase().includes(keyword.toLowerCase());
  
  if (length === 0) {
    return { passed: false, message: 'Meta description is missing', score: 0 };
  }
  if (length < 120) {
    return { passed: false, message: 'Meta description is too short (min 120 chars)', score: 3 };
  }
  if (length > 160) {
    return { passed: false, message: 'Meta description is too long (max 160 chars)', score: 5 };
  }
  if (!hasKeyword) {
    return { passed: false, message: 'Meta description should contain focus keyword', score: 7 };
  }
  
  return { passed: true, message: 'Meta description is optimized', score: 10 };
}

function analyzeFocusKeyword(content: BlogContent[], keyword: string): { passed: boolean; message: string; score: number } {
  if (!keyword) {
    return { passed: false, message: 'Focus keyword is missing', score: 0 };
  }

  const plainText = extractPlainText(content);
  const density = calculateKeywordDensity(plainText, keyword);

  if (density === 0) {
    return { passed: false, message: 'Focus keyword not found in content', score: 0 };
  }
  if (density < 0.5) {
    return { passed: false, message: 'Focus keyword density too low (aim for 0.5-2.5%)', score: 5 };
  }
  if (density > 2.5) {
    return { passed: false, message: 'Focus keyword density too high (keyword stuffing)', score: 5 };
  }

  return { passed: true, message: `Focus keyword density is optimal (${density.toFixed(2)}%)`, score: 10 };
}

function analyzeReadability(content: BlogContent[]): { passed: boolean; message: string; score: number } {
  const plainText = extractPlainText(content);
  const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = plainText.split(/\s+/).filter(w => w.length > 0);
  
  if (sentences.length === 0) {
    return { passed: false, message: 'No content to analyze', score: 0 };
  }

  const avgWordsPerSentence = words.length / sentences.length;

  if (avgWordsPerSentence > 25) {
    return { passed: false, message: 'Sentences are too long (avg > 25 words)', score: 5 };
  }

  return { passed: true, message: 'Content readability is good', score: 10 };
}

function analyzeImageAlt(content: BlogContent[]): { passed: boolean; message: string; score: number } {
  const images = content.filter(block => block.type === 'image' || block.imageContent);
  
  if (images.length === 0) {
    return { passed: true, message: 'No images to check', score: 10 };
  }

  const imagesWithoutAlt = images.filter(block => !block.imageAlt || block.imageAlt.trim() === '');
  
  if (imagesWithoutAlt.length > 0) {
    return { 
      passed: false, 
      message: `${imagesWithoutAlt.length} image(s) missing alt text`, 
      score: 5 
    };
  }

  return { passed: true, message: 'All images have alt text', score: 10 };
}

function analyzeInternalLinks(content: BlogContent[]): { passed: boolean; message: string; score: number } {
  const plainText = extractPlainText(content);
  const internalLinks = (plainText.match(/href=["']\/[^"']*["']/g) || []).length;

  if (internalLinks === 0) {
    return { passed: false, message: 'No internal links found (add 2-5)', score: 5 };
  }
  if (internalLinks >= 2) {
    return { passed: true, message: `Good internal linking (${internalLinks} links)`, score: 10 };
  }

  return { passed: false, message: 'Add more internal links (min 2)', score: 7 };
}

function analyzeHeadingStructure(content: BlogContent[]): { passed: boolean; message: string; score: number } {
  const headings = content.filter(block => block.type === 'heading');
  
  if (headings.length === 0) {
    return { passed: false, message: 'No headings found (use H2-H3)', score: 0 };
  }

  const h1Count = headings.filter(h => h.headingLevel === 1).length;
  
  if (h1Count > 1) {
    return { passed: false, message: 'Multiple H1 tags found (use only one)', score: 5 };
  }

  return { passed: true, message: 'Heading structure is correct', score: 10 };
}

function analyzeWordCount(content: BlogContent[]): { passed: boolean; message: string; score: number } {
  const wordCount = calculateWordCount(content);

  if (wordCount < 300) {
    return { passed: false, message: 'Content too short (min 300 words)', score: 0 };
  }
  if (wordCount < 600) {
    return { passed: false, message: 'Content is short (aim for 1000+ words)', score: 5 };
  }
  if (wordCount >= 1000) {
    return { passed: true, message: `Excellent word count (${wordCount} words)`, score: 10 };
  }

  return { passed: true, message: `Good word count (${wordCount} words)`, score: 8 };
}

export function generateExcerpt(content: BlogContent[], maxLength: number = 160): string {
  const plainText = extractPlainText(content);
  
  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + '...';
}

export function generateBlogSchema(blog: Blog, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featuredImage?.url || `${baseUrl}/default-blog-image.jpg`,
    datePublished: blog.publishedDate?.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: typeof blog.author === 'string' ? blog.author : blog.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SmartKode',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blogs/${blog.slug}`,
    },
    keywords: blog.seo.keywords.join(', '),
  };
}