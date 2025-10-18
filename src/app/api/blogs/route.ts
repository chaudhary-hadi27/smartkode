// src/app/api/blogs/route.ts - Enhanced with SEO
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import type { Blog, BlogContent, SEOMetadata } from '@/types/blog';
import { 
  generateSlug, 
  calculateReadingTime, 
  calculateWordCount,
  generateExcerpt,
  analyzeSEO,
  generateBlogSchema
} from '@/lib/blog/seo';

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

// GET - Fetch blogs with SEO data
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('blog_app');
    const { searchParams } = new URL(request.url);
    
    const published = searchParams.get('published');
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const search = searchParams.get('search');
    
    // Build filter
    const filter: any = {};
    if (published === 'true') filter.status = 'published';
    if (featured === 'true') filter.featured = true;
    if (category) filter.category = category;
    if (tag) filter.tags = { $in: [tag] };
    
    // Search functionality
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { 'seo.keywords': { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortBy] = sortOrder;
    
    const blogs = await db
      .collection<Blog>('blogs')
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection<Blog>('blogs').countDocuments(filter);

    // Get popular tags
    const popularTags = await db.collection<Blog>('blogs')
      .aggregate([
        { $match: { status: 'published' } },
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 }
      ])
      .toArray();

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: skip + blogs.length < total,
        hasPrev: page > 1
      },
      popularTags: popularTags.map(tag => ({ name: tag._id, count: tag.count }))
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
    const { title, description, content, author, tags, published, seo } = body;

    if (!title || !description || !content || !Array.isArray(content)) {
      return NextResponse.json(
        { error: 'Title, description, and content array are required' },
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
    const excerpt = seo?.metaDescription || generateExcerpt(content, 160);

    // Prepare SEO metadata
    const seoMetadata: SEOMetadata = {
      metaTitle: seo?.metaTitle || title.substring(0, 60),
      metaDescription: seo?.metaDescription || excerpt,
      focusKeyword: seo?.focusKeyword || '',
      keywords: seo?.keywords || [],
      canonicalUrl: seo?.canonicalUrl || `https://smartkode.io/blogs/${slug}`,
      noindex: seo?.noindex || false,
      nofollow: seo?.nofollow || false,
      ogImage: seo?.ogImage || '',
      ogTitle: seo?.ogTitle || title,
      ogDescription: seo?.ogDescription || excerpt,
      ogType: 'article',
      twitterCard: 'summary_large_image',
      twitterTitle: seo?.twitterTitle || title,
      twitterDescription: seo?.twitterDescription || excerpt,
      schemaType: 'BlogPosting'
    };

    // SEO analysis
    const seoScore = analyzeSEO({ 
      title, 
      content, 
      seo: seoMetadata 
    });

    const blog: Omit<Blog, '_id'> = {
      title: title.trim(),
      slug,
      excerpt,
      content: content.map((item: any, index: number) => ({
        ...item,
        order: index,
        content: item.content?.trim() || '',
        imageAlt: item.imageAlt || '',
        imageTitle: item.imageTitle || ''
      })),
      
      seo: seoMetadata,

      category: 'Uncategorized',
      tags: Array.isArray(tags) ? tags : [],
      author: author || 'Anonymous',
      
      status: published ? 'published' : 'draft',
      publishedDate: published ? new Date() : undefined,
      
      analytics: {
        views: 0,
        uniqueVisitors: 0,
        avgTimeOnPage: 0,
        bounceRate: 0,
        socialShares: {
          twitter: 0,
          linkedin: 0,
          facebook: 0,
          whatsapp: 0
        }
      },
      
      createdAt: new Date(),
      updatedAt: new Date(),
      readTime,
      wordCount,
      
      relatedPosts: [],
      featured: false,
      sticky: false,
      allowComments: true,
      
      seoScore: seoScore.percentage
    };

    const result = await db.collection<Blog>('blogs').insertOne(blog);
    
    return NextResponse.json({
      message: 'Blog created successfully',
      blogId: result.insertedId,
      slug,
      readTime,
      wordCount,
      seoScore: seoScore.percentage,
      seoGrade: seoScore.grade
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
    const { id, title, description, content, author, tags, published, seo } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Valid blog ID is required' },
        { status: 400 }
      );
    }

    const updateData: Partial<Blog> = {
      updatedAt: new Date()
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

    if (description) updateData.excerpt = description.trim();
    
    if (content && Array.isArray(content)) {
      updateData.content = content.map((item: any, index: number) => ({
        ...item,
        order: index,
        content: item.content?.trim() || '',
        imageAlt: item.imageAlt || '',
        imageTitle: item.imageTitle || ''
      }));
      
      updateData.readTime = calculateReadingTime(content);
      updateData.wordCount = calculateWordCount(content);
    }
    
    if (seo) {
      updateData.seo = {
        ...seo,
        metaTitle: seo.metaTitle || title,
        metaDescription: seo.metaDescription || description,
        canonicalUrl: seo.canonicalUrl || `https://smartkode.io/blogs/${updateData.slug || ''}`
      } as SEOMetadata;
      
      // Recalculate SEO score
      const seoScore = analyzeSEO({ 
        title: updateData.title || title, 
        content: updateData.content || content, 
        seo: updateData.seo 
      });
      updateData.seoScore = seoScore.percentage;
    }
    
    if (author !== undefined) updateData.author = author?.trim() || 'Anonymous';
    if (tags !== undefined) updateData.tags = Array.isArray(tags) ? tags : [];
    if (typeof published === 'boolean') {
      updateData.status = published ? 'published' : 'draft';
      if (published && !updateData.publishedDate) {
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
      seoScore: updateData.seoScore
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