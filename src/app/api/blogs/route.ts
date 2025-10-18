// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import type { Blog, BlogFilters, PaginatedBlogs } from '@/types/blog';
import { 
  generateSlug, 
  calculateReadingTime, 
  calculateWordCount,
  generateExcerpt,
  analyzeSEO 
} from '@/lib/blog/seo';
import { filterBlogs, sortBlogs, paginateBlogs } from '@/lib/blog/utils';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = client.connect();
}

// GET - Fetch blogs with advanced filtering
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('blog_app');
    const { searchParams } = new URL(request.url);
    
    // Parse filters
    const filters: BlogFilters = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      category: searchParams.get('category') || undefined,
      tag: searchParams.get('tag') || undefined,
      author: searchParams.get('author') || undefined,
      status: searchParams.get('status') as any || undefined,
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') as any || 'date',
      sortOrder: searchParams.get('sortOrder') as any || 'desc',
      featured: searchParams.get('featured') === 'true' ? true : undefined,
    };

    // Build MongoDB query
    const query: any = {};
    
    if (filters.category) query.category = filters.category;
    if (filters.tag) query.tags = { $in: [filters.tag] };
    if (filters.author) query.author = filters.author;
    if (filters.status) query.status = filters.status;
    if (filters.featured !== undefined) query.featured = filters.featured;
    
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { excerpt: { $regex: filters.search, $options: 'i' } },
        { 'seo.keywords': { $in: [new RegExp(filters.search, 'i')] } },
      ];
    }

    // Sorting
    const sortField = filters.sortBy === 'views' ? 'analytics.views' : 
                      filters.sortBy === 'date' ? 'publishedDate' :
                      filters.sortBy === 'title' ? 'title' : 'readTime';
    const sortDirection = filters.sortOrder === 'asc' ? 1 : -1;

    const skip = ((filters.page || 1) - 1) * (filters.limit || 10);

    // Fetch blogs
    const blogs = await db
      .collection<Blog>('blogs')
      .find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(filters.limit || 10)
      .toArray();

    const total = await db.collection<Blog>('blogs').countDocuments(query);

    // Get popular tags
    const popularTags = await db.collection<Blog>('blogs')
      .aggregate([
        { $match: { status: 'published' } },
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 },
      ])
      .toArray();

    // Get categories
    const categories = await db.collection('categories')
      .find({ featured: true })
      .limit(10)
      .toArray();

    const result: PaginatedBlogs = {
      blogs,
      pagination: {
        page: filters.page || 1,
        limit: filters.limit || 10,
        total,
        pages: Math.ceil(total / (filters.limit || 10)),
        hasNext: skip + blogs.length < total,
        hasPrev: (filters.page || 1) > 1,
      },
      filters,
    };

    return NextResponse.json({
      ...result,
      popularTags,
      categories,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST - Create new blog with SEO analysis
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('blog_app');
    
    const body = await request.json();
    const { title, content, category, tags, author, seo, featuredImage, status, scheduledDate } = body;

    if (!title || !content || !Array.isArray(content)) {
      return NextResponse.json(
        { error: 'Title and content array are required' },
        { status: 400 }
      );
    }

    // Generate slug
    let baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;
    while (await db.collection<Blog>('blogs').findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Calculate metrics
    const readTime = calculateReadingTime(content);
    const wordCount = calculateWordCount(content);
    const excerpt = generateExcerpt(content, 160);

    // SEO analysis
    const seoScore = analyzeSEO({ 
      title, 
      content, 
      seo: seo || { keywords: [], focusKeyword: '' } 
    });

    const blog: Omit<Blog, '_id'> = {
      title: title.trim(),
      slug,
      excerpt,
      content: content.map((item: any, index: number) => ({
        ...item,
        order: index,
        content: item.content?.trim() || '',
      })),
      
      seo: {
        metaTitle: seo?.metaTitle || title,
        metaDescription: seo?.metaDescription || excerpt,
        focusKeyword: seo?.focusKeyword || '',
        keywords: seo?.keywords || [],
        canonicalUrl: seo?.canonicalUrl,
        noindex: seo?.noindex || false,
        nofollow: seo?.nofollow || false,
        ogImage: seo?.ogImage || featuredImage?.url,
        ogTitle: seo?.ogTitle || title,
        ogDescription: seo?.ogDescription || excerpt,
      },

      category: category || 'Uncategorized',
      tags: Array.isArray(tags) ? tags : [],
      author: author || 'Anonymous',
      
      featuredImage: featuredImage || undefined,
      
      status: status || 'draft',
      publishedDate: status === 'published' ? new Date() : undefined,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : undefined,
      
      analytics: {
        views: 0,
        uniqueVisitors: 0,
        avgTimeOnPage: 0,
        bounceRate: 0,
        socialShares: {
          twitter: 0,
          linkedin: 0,
          facebook: 0,
        },
      },
      
      createdAt: new Date(),
      updatedAt: new Date(),
      readTime,
      wordCount,
      
      relatedPosts: [],
      featured: false,
      sticky: false,
      allowComments: true,
    };

    const result = await db.collection<Blog>('blogs').insertOne(blog);
    
    return NextResponse.json({
      message: 'Blog created successfully',
      blogId: result.insertedId,
      slug,
      readTime,
      wordCount,
      seoScore,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}

// PUT - Update blog
export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('blog_app');
    
    const body = await request.json();
    const { id, title, content, category, tags, seo, featuredImage, status } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    const updateData: Partial<Blog> = {
      updatedAt: new Date(),
    };

    if (title) {
      updateData.title = title.trim();
      
      // Update slug if title changed
      let baseSlug = generateSlug(title);
      let slug = baseSlug;
      let counter = 1;
      while (true) {
        const existingBlog = await db.collection<Blog>('blogs').findOne({ 
          slug, 
          _id: { $ne: new ObjectId(id) } 
        });
        if (!existingBlog) break;
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      updateData.slug = slug;
    }

    if (content && Array.isArray(content)) {
      updateData.content = content.map((item: any, index: number) => ({
        ...item,
        order: index,
      }));
      
      updateData.readTime = calculateReadingTime(content);
      updateData.wordCount = calculateWordCount(content);
      updateData.excerpt = generateExcerpt(content);
    }

    if (category) updateData.category = category;
    if (tags) updateData.tags = tags;
    if (seo) updateData.seo = seo as any;
    if (featuredImage) updateData.featuredImage = featuredImage;
    
    if (status) {
      updateData.status = status;
      if (status === 'published' && !updateData.publishedDate) {
        updateData.publishedDate = new Date();
      }
    }

    const result = await db.collection<Blog>('blogs').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Blog updated successfully',
      readTime: updateData.readTime,
      wordCount: updateData.wordCount,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog
export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('blog_app');
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Valid blog ID is required' },
        { status: 400 }
      );
    }

    const result = await db.collection<Blog>('blogs').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}