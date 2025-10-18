// lib/blog/utils.ts
import type { Blog, BlogFilters, Tag } from '@/types/blog';

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

export function buildQueryString(filters: BlogFilters): string {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });
  
  return params.toString();
}

export function parseQueryString(queryString: string): BlogFilters {
  const params = new URLSearchParams(queryString);
  const filters: BlogFilters = {};
  
  params.forEach((value, key) => {
    if (key === 'page' || key === 'limit') {
      filters[key] = parseInt(value, 10);
    } else if (key === 'featured') {
      filters[key] = value === 'true';
    } else {
      // @ts-ignore
      filters[key] = value;
    }
  });
  
  return filters;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function sanitizeHTML(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
    .trim();
}

export function extractHeadings(content: Blog['content']) {
  return content
    .filter(block => block.type === 'heading' || block.type === 'subheading')
    .map((block, index) => ({
      id: `heading-${index}`,
      level: block.headingLevel || 2,
      text: block.content,
    }));
}

export function generateTableOfContents(content: Blog['content']) {
  const headings = extractHeadings(content);
  
  return headings.map((heading, index) => ({
    ...heading,
    id: `heading-${index}`,
    children: headings
      .slice(index + 1)
      .filter(h => h.level > heading.level)
      .filter((_, i, arr) => {
        // Only direct children
        return i === 0 || arr[i - 1].level >= heading.level;
      }),
  }));
}

export function estimateReadingProgress(
  currentScrollTop: number,
  totalHeight: number
): number {
  if (totalHeight === 0) return 0;
  const progress = (currentScrollTop / totalHeight) * 100;
  return Math.min(Math.max(progress, 0), 100);
}

export function sortBlogs(
  blogs: Blog[],
  sortBy: BlogFilters['sortBy'] = 'date',
  sortOrder: BlogFilters['sortOrder'] = 'desc'
): Blog[] {
  const sorted = [...blogs].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'date':
        comparison = new Date(b.publishedDate || b.createdAt).getTime() - 
                     new Date(a.publishedDate || a.createdAt).getTime();
        break;
      case 'views':
        comparison = (b.analytics?.views || 0) - (a.analytics?.views || 0);
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'readTime':
        comparison = (a.readTime || 0) - (b.readTime || 0);
        break;
      default:
        comparison = 0;
    }

    return sortOrder === 'asc' ? -comparison : comparison;
  });

  return sorted;
}

export function filterBlogs(blogs: Blog[], filters: BlogFilters): Blog[] {
  let filtered = [...blogs];

  if (filters.category) {
    filtered = filtered.filter(blog => blog.category === filters.category);
  }

  if (filters.tag) {
    filtered = filtered.filter(blog => blog.tags.includes(filters.tag!));
  }

  if (filters.author) {
    filtered = filtered.filter(blog => {
      const authorId = typeof blog.author === 'string' ? blog.author : blog.author._id?.toString();
      return authorId === filters.author;
    });
  }

  if (filters.status) {
    filtered = filtered.filter(blog => blog.status === filters.status);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(blog =>
      blog.title.toLowerCase().includes(searchLower) ||
      blog.excerpt.toLowerCase().includes(searchLower)
    );
  }

  if (filters.featured !== undefined) {
    filtered = filtered.filter(blog => blog.featured === filters.featured);
  }

  if (filters.dateFrom) {
    filtered = filtered.filter(blog => 
      new Date(blog.publishedDate || blog.createdAt) >= new Date(filters.dateFrom!)
    );
  }

  if (filters.dateTo) {
    filtered = filtered.filter(blog =>
      new Date(blog.publishedDate || blog.createdAt) <= new Date(filters.dateTo!)
    );
  }

  return filtered;
}

export function paginateBlogs(
  blogs: Blog[],
  page: number = 1,
  limit: number = 10
) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBlogs = blogs.slice(startIndex, endIndex);

  return {
    blogs: paginatedBlogs,
    pagination: {
      page,
      limit,
      total: blogs.length,
      pages: Math.ceil(blogs.length / limit),
      hasNext: endIndex < blogs.length,
      hasPrev: page > 1,
    },
  };
}

export function getCategoryColor(categoryName: string): string {
  const colors: Record<string, string> = {
    'AI Development': 'blue',
    'Web Development': 'green',
    'Mobile Development': 'purple',
    'DevOps': 'orange',
    'Data Science': 'cyan',
    'Machine Learning': 'indigo',
    'Automation': 'yellow',
    'Cloud Computing': 'pink',
  };

  return colors[categoryName] || 'gray';
}

export function getTagCloud(tags: Tag[], maxTags: number = 20): Tag[] {
  return tags
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, maxTags);
}

export function findRelatedPosts(
  currentBlog: Blog,
  allBlogs: Blog[],
  maxResults: number = 3
): Blog[] {
  const related = allBlogs
    .filter(blog => 
      blog._id?.toString() !== currentBlog._id?.toString() &&
      blog.status === 'published'
    )
    .map(blog => {
      let score = 0;

      // Same category
      if (blog.category === currentBlog.category) score += 3;

      // Shared tags
      const sharedTags = blog.tags.filter(tag => currentBlog.tags.includes(tag));
      score += sharedTags.length * 2;

      // Same series
      if (blog.series?.name === currentBlog.series?.name) score += 5;

      return { blog, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.blog);

  return related;
}

export function generateSitemap(blogs: Blog[], baseUrl: string): string {
  const urls = blogs
    .filter(blog => blog.status === 'published')
    .map(blog => {
      const url = `${baseUrl}/blogs/${blog.slug}`;
      const lastmod = blog.updatedAt.toISOString().split('T')[0];
      const image = blog.featuredImage?.url || '';
      
      return `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
      ${image ? `
      <image:image>
        <image:loc>${image}</image:loc>
        <image:title>${blog.featuredImage?.altText || blog.title}</image:title>
      </image:image>` : ''}
    </url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${urls}
</urlset>`;
}

export function calculateSEOScore(blog: Partial<Blog>): number {
  let score = 0;
  const maxScore = 100;

  // Title (10 points)
  if (blog.title && blog.title.length >= 30 && blog.title.length <= 60) {
    score += 10;
  } else if (blog.title) {
    score += 5;
  }

  // Meta description (10 points)
  if (blog.seo?.metaDescription && 
      blog.seo.metaDescription.length >= 120 && 
      blog.seo.metaDescription.length <= 160) {
    score += 10;
  } else if (blog.seo?.metaDescription) {
    score += 5;
  }

  // Featured image (10 points)
  if (blog.featuredImage?.url && blog.featuredImage?.altText) {
    score += 10;
  } else if (blog.featuredImage?.url) {
    score += 5;
  }

  // Keywords (10 points)
  if (blog.seo?.keywords && blog.seo.keywords.length >= 3) {
    score += 10;
  } else if (blog.seo?.keywords && blog.seo.keywords.length > 0) {
    score += 5;
  }

  // Focus keyword (10 points)
  if (blog.seo?.focusKeyword) {
    score += 10;
  }

  // Word count (15 points)
  if (blog.wordCount && blog.wordCount >= 1000) {
    score += 15;
  } else if (blog.wordCount && blog.wordCount >= 600) {
    score += 10;
  } else if (blog.wordCount && blog.wordCount >= 300) {
    score += 5;
  }

  // Headings (10 points)
  const headings = blog.content?.filter(b => b.type === 'heading' || b.type === 'subheading') || [];
  if (headings.length >= 3) {
    score += 10;
  } else if (headings.length > 0) {
    score += 5;
  }

  // Images (10 points)
  const images = blog.content?.filter(b => b.type === 'image' || b.imageContent) || [];
  if (images.length >= 2) {
    score += 10;
  } else if (images.length > 0) {
    score += 5;
  }

  // Category (5 points)
  if (blog.category) {
    score += 5;
  }

  // Tags (10 points)
  if (blog.tags && blog.tags.length >= 3) {
    score += 10;
  } else if (blog.tags && blog.tags.length > 0) {
    score += 5;
  }

  return Math.min(score, maxScore);
}