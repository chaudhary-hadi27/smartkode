import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

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

interface BlogContent {
  type: 'text' | 'image' | 'text-image' | 'image-text' | 'heading' | 'subheading' | 'separator';
  content: string;
  imageContent?: string;
  order: number;
  textSize?: 'small' | 'medium' | 'large' | 'xl';
  textStyle?: 'normal' | 'bold' | 'italic';
  alignment?: 'left' | 'center' | 'right';
  imageSize?: 'small' | 'medium' | 'large' | 'full';
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  separatorStyle?: 'line' | 'dashed' | 'dotted' | 'double' | 'thick';
}

interface Blog {
  _id?: ObjectId;
  title: string;
  description: string;
  content: BlogContent[];
  author?: string;
  tags?: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  readTime?: number; // Estimated reading time in minutes
  featured?: boolean; // For featured blogs
}

// Helper function to calculate reading time
function calculateReadingTime(content: BlogContent[]): number {
  const wordsPerMinute = 200;
  let totalWords = 0;

  content.forEach(block => {
    if (block.type === 'text' || block.type === 'heading' || block.type === 'subheading' || 
        block.type === 'text-image' || block.type === 'image-text') {
      totalWords += block.content.split(/\s+/).filter(word => word.length > 0).length;
    }
  });

  return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}

// Helper function to validate blog content
function validateBlogContent(content: BlogContent[]): string | null {
  for (const block of content) {
    if (!block.type) {
      return 'Content block is missing type';
    }

    if (!['text', 'image', 'text-image', 'image-text', 'heading', 'subheading', 'separator'].includes(block.type)) {
      return `Invalid content type: ${block.type}`;
    }

    if (block.type === 'heading' && (!block.headingLevel || block.headingLevel < 1 || block.headingLevel > 6)) {
      return 'Heading level must be between 1 and 6';
    }

    if (block.type === 'separator' && block.separatorStyle && 
        !['line', 'dashed', 'dotted', 'double', 'thick'].includes(block.separatorStyle)) {
      return `Invalid separator style: ${block.separatorStyle}`;
    }

    if ((block.type === 'text' || block.type === 'heading' || block.type === 'subheading' || 
         block.type === 'text-image' || block.type === 'image-text') && !block.content.trim()) {
      return `Content is required for ${block.type} blocks`;
    }

    if ((block.type === 'image') && !block.content.trim()) {
      return 'Image content is required for image blocks';
    }

    if ((block.type === 'text-image' || block.type === 'image-text') && !block.imageContent?.trim()) {
      return 'Image content is required for text-image and image-text blocks';
    }
  }

  return null;
}

// GET - Fetch all blogs
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('blog_app');
    const { searchParams } = new URL(request.url);
    
    const published = searchParams.get('published');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');
    
    // Build filter
    const filter: any = {};
    if (published === 'true') filter.published = true;
    if (featured === 'true') filter.featured = true;
    
    // Add search functionality
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Add tag filter
    if (tag) {
      filter.tags = { $in: [tag] };
    }
    
    const skip = (page - 1) * limit;
    
    // Build sort object
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

    // Get all unique tags for filter options
    const allTags = await db.collection<Blog>('blogs')
      .aggregate([
        { $match: { published: true } },
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
        pages: Math.ceil(total / limit)
      },
      availableTags: allTags.map(tag => ({ name: tag._id, count: tag.count }))
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST - Create new blog
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('blog_app');
    
    const body = await request.json();
    const { title, description, content, author, tags, published, featured } = body;

    if (!title || !description || !content || !Array.isArray(content)) {
      return NextResponse.json(
        { error: 'Title, description, and content array are required' },
        { status: 400 }
      );
    }

    // Validate content blocks
    const contentValidationError = validateBlogContent(content);
    if (contentValidationError) {
      return NextResponse.json(
        { error: contentValidationError },
        { status: 400 }
      );
    }

    // Generate slug from title
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Ensure slug is unique
    let slug = baseSlug;
    let counter = 1;
    while (await db.collection<Blog>('blogs').findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Calculate reading time
    const readTime = calculateReadingTime(content);

    const blog: Omit<Blog, '_id'> = {
      title: title.trim(),
      description: description.trim(),
      content: content.map((item: any, index: number) => ({
        ...item,
        order: index,
        content: item.content?.trim() || '',
        imageContent: item.imageContent?.trim() || undefined
      })),
      author: author?.trim() || 'Anonymous',
      tags: Array.isArray(tags) ? tags.filter(tag => tag?.trim()).map(tag => tag.trim()) : [],
      published: Boolean(published),
      featured: Boolean(featured),
      slug,
      readTime,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection<Blog>('blogs').insertOne(blog);
    
    return NextResponse.json({
      message: 'Blog created successfully',
      blogId: result.insertedId,
      slug,
      readTime
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
    const { id, title, description, content, author, tags, published, featured } = body;

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
      updatedAt: new Date()
    };

    if (title) {
      updateData.title = title.trim();
      // Update slug if title changed
      let baseSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      // Ensure slug is unique (excluding current blog)
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

    if (description) updateData.description = description.trim();
    
    if (content && Array.isArray(content)) {
      // Validate content blocks
      const contentValidationError = validateBlogContent(content);
      if (contentValidationError) {
        return NextResponse.json(
          { error: contentValidationError },
          { status: 400 }
        );
      }

      updateData.content = content.map((item: any, index: number) => ({
        ...item,
        order: index,
        content: item.content?.trim() || '',
        imageContent: item.imageContent?.trim() || undefined
      }));
      
      // Recalculate reading time
      updateData.readTime = calculateReadingTime(updateData.content);
    }
    
    if (author !== undefined) updateData.author = author?.trim() || 'Anonymous';
    if (tags !== undefined) updateData.tags = Array.isArray(tags) ? 
      tags.filter(tag => tag?.trim()).map(tag => tag.trim()) : [];
    if (typeof published === 'boolean') updateData.published = published;
    if (typeof featured === 'boolean') updateData.featured = featured;

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
      readTime: updateData.readTime
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

// PATCH - Toggle blog status (publish/unpublish, feature/unfeature)
export async function PATCH(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('blog_app');
    
    const body = await request.json();
    const { id, action } = body;

    if (!id || !action) {
      return NextResponse.json(
        { error: 'Blog ID and action are required' },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    const updateData: any = { updatedAt: new Date() };

    switch (action) {
      case 'toggle-publish':
        const currentBlog = await db.collection<Blog>('blogs').findOne({ _id: new ObjectId(id) });
        if (!currentBlog) {
          return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        updateData.published = !currentBlog.published;
        break;
      
      case 'toggle-feature':
        const currentBlogFeature = await db.collection<Blog>('blogs').findOne({ _id: new ObjectId(id) });
        if (!currentBlogFeature) {
          return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        updateData.featured = !currentBlogFeature.featured;
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use toggle-publish or toggle-feature' },
          { status: 400 }
        );
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
      message: `Blog ${action} successful`,
      [action.split('-')[1]]: updateData[action.split('-')[1]] 
    });
  } catch (error) {
    console.error('Error updating blog status:', error);
    return NextResponse.json(
      { error: 'Failed to update blog status' },
      { status: 500 }
    );
  }
}