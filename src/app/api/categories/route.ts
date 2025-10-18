// app/api/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import type { Category } from '@/types/blog';
import { generateSlug } from '@/lib/blog/seo';

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

// GET - Fetch all categories
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('blog_app');
    const { searchParams } = new URL(request.url);
    
    const featured = searchParams.get('featured');
    const parent = searchParams.get('parent');
    
    const query: any = {};
    if (featured === 'true') query.featured = true;
    if (parent) query.parent = parent;
    
    const categories = await db
      .collection<Category>('categories')
      .find(query)
      .sort({ name: 1 })
      .toArray();

    // Get blog count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await db.collection('blogs').countDocuments({
          category: category._id?.toString(),
          status: 'published',
        });
        return { ...category, blogCount: count };
      })
    );

    return NextResponse.json({ categories: categoriesWithCount });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - Create new category
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('blog_app');
    
    const body = await request.json();
    const { name, description, parent, featured, color, icon } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Generate slug
    let baseSlug = generateSlug(name);
    let slug = baseSlug;
    let counter = 1;
    while (await db.collection<Category>('categories').findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const category: Omit<Category, '_id'> = {
      name: name.trim(),
      slug,
      description: description || '',
      parent: parent || undefined,
      featured: featured || false,
      color: color || 'gray',
      icon: icon || undefined,
    };

    const result = await db.collection<Category>('categories').insertOne(category);
    
    return NextResponse.json({
      message: 'Category created successfully',
      categoryId: result.insertedId,
      slug,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

// PUT - Update category
export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('blog_app');
    
    const body = await request.json();
    const { id, name, description, parent, featured, color, icon } = body;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Valid category ID is required' },
        { status: 400 }
      );
    }

    const updateData: Partial<Category> = {};
    
    if (name) {
      updateData.name = name.trim();
      let baseSlug = generateSlug(name);
      let slug = baseSlug;
      let counter = 1;
      while (true) {
        const existing = await db.collection<Category>('categories').findOne({ 
          slug, 
          _id: { $ne: new ObjectId(id) } 
        });
        if (!existing) break;
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      updateData.slug = slug;
    }

    if (description !== undefined) updateData.description = description;
    if (parent !== undefined) updateData.parent = parent;
    if (featured !== undefined) updateData.featured = featured;
    if (color !== undefined) updateData.color = color;
    if (icon !== undefined) updateData.icon = icon;

    const result = await db.collection<Category>('categories').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE - Delete category
export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('blog_app');
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Valid category ID is required' },
        { status: 400 }
      );
    }

    // Check if category has blogs
    const blogCount = await db.collection('blogs').countDocuments({
      category: id,
    });

    if (blogCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete category with ${blogCount} blog(s). Reassign blogs first.` },
        { status: 400 }
      );
    }

    const result = await db.collection<Category>('categories').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}