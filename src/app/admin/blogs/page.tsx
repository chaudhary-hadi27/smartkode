"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  _id?: string;
  title: string;
  description: string;
  content: BlogContent[];
  author?: string;
  tags?: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: [] as BlogContent[],
    author: '',
    tags: '',
    published: false
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let nodes: { x: number; y: number; vx: number; vy: number; opacity: number }[] = [];
    let w: number, h: number, animationId: number;

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      nodes = Array.from({ length: 30 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        opacity: 0.1 + Math.random() * 0.2,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));

        ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = '/api/blogs';
      const method = editingBlog ? 'PUT' : 'POST';
      
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        ...(editingBlog && { id: editingBlog._id })
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        resetForm();
        fetchBlogs();
        alert(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to save blog:', error);
      alert('Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: [],
      author: '',
      tags: '',
      published: false
    });
    setIsCreating(false);
    setEditingBlog(null);
  };

  // Add content block
  const addContentBlock = (type: BlogContent['type']) => {
    const newBlock: BlogContent = {
      type,
      content: '',
      imageContent: type.includes('image') ? '' : undefined,
      order: formData.content.length,
      textSize: 'medium',
      textStyle: 'normal',
      alignment: 'left',
      imageSize: 'medium',
      headingLevel: type === 'heading' ? 2 : undefined,
      separatorStyle: type === 'separator' ? 'line' : undefined
    };
    setFormData(prev => ({
      ...prev,
      content: [...prev.content, newBlock]
    }));
  };

  // Update content block
  const updateContentBlock = (index: number, updates: Partial<BlogContent>) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content.map((block, i) => 
        i === index ? { ...block, ...updates } : block
      )
    }));
  };

  // Remove content block
  const removeContentBlock = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index)
    }));
  };

  // Move content block
  const moveContentBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.content.length) return;

    setFormData(prev => {
      const newContent = [...prev.content];
      [newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]];
      return { ...prev, content: newContent };
    });
  };

  // Edit blog
  const editBlog = (blog: Blog) => {
    setFormData({
      title: blog.title,
      description: blog.description,
      content: blog.content,
      author: blog.author || '',
      tags: blog.tags?.join(', ') || '',
      published: blog.published
    });
    setEditingBlog(blog);
    setIsCreating(true);
  };

  // Delete blog
  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchBlogs();
        alert('Blog deleted successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Failed to delete blog');
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (index: number, file: File, isSecondary = false) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const property = isSecondary ? 'imageContent' : 'content';
      updateContentBlock(index, { [property]: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  // Get preview component for content blocks
  const getPreviewComponent = (block: BlogContent, index: number) => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = `h${block.headingLevel || 2}` as keyof JSX.IntrinsicElements;
        const headingSize = {
          1: 'text-3xl md:text-4xl',
          2: 'text-2xl md:text-3xl',
          3: 'text-xl md:text-2xl',
          4: 'text-lg md:text-xl',
          5: 'text-base md:text-lg',
          6: 'text-sm md:text-base'
        }[block.headingLevel || 2];
        return (
          <HeadingTag className={`font-bold text-white mb-2 ${headingSize} text-${block.alignment}`}>
            {block.content || 'Heading will appear here...'}
          </HeadingTag>
        );

      case 'subheading':
        return (
          <h3 className={`text-lg text-gray-300 font-semibold mb-2 text-${block.alignment}`}>
            {block.content || 'Subheading will appear here...'}
          </h3>
        );

      case 'separator':
        const separatorStyles = {
          line: 'border-t border-gray-600',
          dashed: 'border-t border-dashed border-gray-600',
          dotted: 'border-t border-dotted border-gray-600',
          double: 'border-t-4 border-double border-gray-600',
          thick: 'border-t-2 border-gray-600'
        };
        return <hr className={`w-full my-2 ${separatorStyles[block.separatorStyle || 'line']}`} />;

      case 'text':
        return (
          <div className={`text-gray-200 whitespace-pre-wrap text-${block.alignment} ${
            block.textSize === 'small' ? 'text-sm' :
            block.textSize === 'large' ? 'text-lg' :
            block.textSize === 'xl' ? 'text-xl' : 'text-base'
          } ${
            block.textStyle === 'bold' ? 'font-bold' : 
            block.textStyle === 'italic' ? 'italic' : ''
          }`}>
            {block.content || 'Text will appear here...'}
          </div>
        );

      case 'image':
        return block.content ? (
          <img
            src={block.content}
            alt="Preview"
            className={`object-cover rounded mx-auto ${
              block.imageSize === 'small' ? 'w-32 h-32' :
              block.imageSize === 'medium' ? 'w-48 h-48' :
              block.imageSize === 'large' ? 'w-64 h-64' :
              'w-full h-auto max-w-md'
            }`}
          />
        ) : (
          <div className="bg-gray-700 rounded flex items-center justify-center text-gray-400 text-sm w-48 h-48 mx-auto">
            Image preview
          </div>
        );

      case 'text-image':
      case 'image-text':
        return (
          <div className="flex items-start gap-4">
            <div className={`flex-1 ${block.type === 'image-text' ? 'order-2' : ''}`}>
              <div className={`text-gray-200 whitespace-pre-wrap text-${block.alignment} ${
                block.textSize === 'small' ? 'text-sm' :
                block.textSize === 'large' ? 'text-lg' :
                block.textSize === 'xl' ? 'text-xl' : 'text-base'
              } ${
                block.textStyle === 'bold' ? 'font-bold' : 
                block.textStyle === 'italic' ? 'italic' : ''
              }`}>
                {block.content || 'Text will appear here...'}
              </div>
            </div>
            <div className={`flex-shrink-0 ${block.type === 'text-image' ? 'order-2' : ''}`}>
              {block.imageContent ? (
                <img
                  src={block.imageContent}
                  alt="Preview"
                  className={`object-cover rounded ${
                    block.imageSize === 'small' ? 'w-24 h-24' :
                    block.imageSize === 'medium' ? 'w-32 h-32' :
                    block.imageSize === 'large' ? 'w-40 h-40' :
                    'w-48 h-32'
                  }`}
                />
              ) : (
                <div className="bg-gray-700 rounded flex items-center justify-center text-gray-400 text-xs w-32 h-32">
                  Image preview
                </div>
              )}
            </div>
          </div>
        );

      default:
        return <div className="text-gray-400 text-sm">Unknown content type</div>;
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Professional Blog Management</h1>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            {isCreating ? 'Cancel' : 'Create New Blog'}
          </button>
        </motion.div>

        <AnimatePresence>
          {isCreating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-gray-900 rounded-lg p-6 border border-gray-700"
            >
              <h2 className="text-2xl font-semibold mb-6">
                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Author</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-white h-24"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-white"
                    placeholder="technology, tutorial, guide"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium">Content Blocks</label>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => addContentBlock('heading')}
                        className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
                      >
                        Heading
                      </button>
                      <button
                        type="button"
                        onClick={() => addContentBlock('subheading')}
                        className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
                      >
                        Subheading
                      </button>
                      <button
                        type="button"
                        onClick={() => addContentBlock('text')}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        Text
                      </button>
                      <button
                        type="button"
                        onClick={() => addContentBlock('image')}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      >
                        Image
                      </button>
                      <button
                        type="button"
                        onClick={() => addContentBlock('text-image')}
                        className="px-3 py-1 bg-cyan-600 text-white rounded text-sm hover:bg-cyan-700"
                      >
                        Text + Image
                      </button>
                      <button
                        type="button"
                        onClick={() => addContentBlock('image-text')}
                        className="px-3 py-1 bg-teal-600 text-white rounded text-sm hover:bg-teal-700"
                      >
                        Image + Text
                      </button>
                      <button
                        type="button"
                        onClick={() => addContentBlock('separator')}
                        className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
                      >
                        Separator
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {formData.content.map((block, index) => (
                      <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-800">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-300 capitalize font-medium">
                              {block.type.replace('-', ' + ')} Block
                            </span>
                            <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                              #{index + 1}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => moveContentBlock(index, 'up')}
                              disabled={index === 0}
                              className="px-2 py-1 text-xs bg-gray-600 rounded disabled:opacity-50 hover:bg-gray-500"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={() => moveContentBlock(index, 'down')}
                              disabled={index === formData.content.length - 1}
                              className="px-2 py-1 text-xs bg-gray-600 rounded disabled:opacity-50 hover:bg-gray-500"
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              onClick={() => removeContentBlock(index)}
                              className="px-2 py-1 text-xs bg-red-600 rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Content inputs based on block type */}
                        <div className="space-y-4">
                          {/* Heading Block */}
                          {block.type === 'heading' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium mb-2">Heading Text</label>
                                <input
                                  type="text"
                                  value={block.content}
                                  onChange={(e) => updateContentBlock(index, { content: e.target.value })}
                                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-white"
                                  placeholder="Enter heading text..."
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs text-gray-400 mb-1">Heading Level</label>
                                  <select
                                    value={block.headingLevel}
                                    onChange={(e) => updateContentBlock(index, { headingLevel: parseInt(e.target.value) as any })}
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm"
                                  >
                                    <option value={1}>H1 (Largest)</option>
                                    <option value={2}>H2</option>
                                    <option value={3}>H3</option>
                                    <option value={4}>H4</option>
                                    <option value={5}>H5</option>
                                    <option value={6}>H6 (Smallest)</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-400 mb-1">Alignment</label>
                                  <select
                                    value={block.alignment}
                                    onChange={(e) => updateContentBlock(index, { alignment: e.target.value as any })}
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm"
                                  >
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                  </select>
                                </div>
                              </div>
                            </>
                          )}

                          {/* Subheading Block */}
                          {block.type === 'subheading' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium mb-2">Subheading Text</label>
                                <input
                                  type="text"
                                  value={block.content}
                                  onChange={(e) => updateContentBlock(index, { content: e.target.value })}
                                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-white"
                                  placeholder="Enter subheading text..."
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-400 mb-1">Alignment</label>
                                <select
                                  value={block.alignment}
                                  onChange={(e) => updateContentBlock(index, { alignment: e.target.value as any })}
                                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm max-w-xs"
                                >
                                  <option value="left">Left</option>
                                  <option value="center">Center</option>
                                  <option value="right">Right</option>
                                </select>
                              </div>
                            </>
                          )}

                          {/* Separator Block */}
                          {block.type === 'separator' && (
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Separator Style</label>
                              <select
                                value={block.separatorStyle}
                                onChange={(e) => updateContentBlock(index, { separatorStyle: e.target.value as any })}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm max-w-xs"
                              >
                                <option value="line">Solid Line</option>
                                <option value="dashed">Dashed Line</option>
                                <option value="dotted">Dotted Line</option>
                                <option value="double">Double Line</option>
                                <option value="thick">Thick Line</option>
                              </select>
                            </div>
                          )}

                          {/* Text Block */}
                          {block.type === 'text' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium mb-2">Text Content</label>
                                <textarea
                                  value={block.content}
                                  onChange={(e) => updateContentBlock(index, { content: e.target.value })}
                                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-white h-32"
                                  placeholder="Enter your text content..."
                                />
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div>
                                  <label className="block text-xs text-gray-400 mb-1">Size</label>
                                  <select
                                    value={block.textSize}
                                    onChange={(e) => updateContentBlock(index, { textSize: e.target.value as any })}
                                    className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-sm"
                                  >
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                    <option value="xl">Extra Large</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-400 mb-1">Style</label>
                                  <select
                                    value={block.textStyle}
                                    onChange={(e) => updateContentBlock(index, { textStyle: e.target.value as any })}
                                    className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-sm"
                                  >
                                    <option value="normal">Normal</option>
                                    <option value="bold">Bold</option>
                                    <option value="italic">Italic</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-400 mb-1">Align</label>
                                  <select
                                    value={block.alignment}
                                    onChange={(e) => updateContentBlock(index, { alignment: e.target.value as any })}
                                    className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-sm"
                                  >
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                  </select>
                                </div>
                              </div>
                            </>
                          )}

                          {/* Image Block */}
                          {block.type === 'image' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium mb-2">Image Upload</label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload(index, file);
                                  }}
                                  className="mb-3 text-sm text-gray-400"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-400 mb-1">Image Size</label>
                                <select
                                  value={block.imageSize}
                                  onChange={(e) => updateContentBlock(index, { imageSize: e.target.value as any })}
                                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm max-w-xs"
                                >
                                  <option value="small">Small</option>
                                  <option value="medium">Medium</option>
                                  <option value="large">Large</option>
                                  <option value="full">Full Width</option>
                                </select>
                              </div>
                            </>
                          )}

                          {/* Text + Image / Image + Text Blocks */}
                          {(block.type === 'text-image' || block.type === 'image-text') && (
                            <>
                              <div>
                                <label className="block text-sm font-medium mb-2">Text Content</label>
                                <textarea
                                  value={block.content}
                                  onChange={(e) => updateContentBlock(index, { content: e.target.value })}
                                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-white h-32"
                                  placeholder="Enter your text content..."
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Image Upload</label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload(index, file, true);
                                  }}
                                  className="mb-3 text-sm text-gray-400"
                                />
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                <div>
                                  <label className="block text-xs text-gray-400 mb-1">Text Size</label>
                                  <select
                                    value={block.textSize}
                                    onChange={(e) => updateContentBlock(index, { textSize: e.target.value as any })}
                                    className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-sm"
                                  >
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                    <option value="xl">Extra Large</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-400 mb-1">Text Style</label>
                                  <select
                                    value={block.textStyle}
                                    onChange={(e) => updateContentBlock(index, { textStyle: e.target.value as any })}
                                    className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-sm"
                                  >
                                    <option value="normal">Normal</option>
                                    <option value="bold">Bold</option>
                                    <option value="italic">Italic</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-400 mb-1">Text Align</label>
                                  <select
                                    value={block.alignment}
                                    onChange={(e) => updateContentBlock(index, { alignment: e.target.value as any })}
                                    className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-sm"
                                  >
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-400 mb-1">Image Size</label>
                                  <select
                                    value={block.imageSize}
                                    onChange={(e) => updateContentBlock(index, { imageSize: e.target.value as any })}
                                    className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-sm"
                                  >
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                    <option value="full">Full Width</option>
                                  </select>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Preview */}
                        <div className="mt-4 p-4 bg-gray-900 rounded border border-gray-700">
                          <div className="text-xs text-gray-400 mb-2">Preview:</div>
                          {getPreviewComponent(block, index)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                      className="w-4 h-4"
                    />
                    <span>Published</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Create Blog')}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {loading && blogs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400">Loading blogs...</div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400">No blogs found. Create your first professional blog!</div>
            </div>
          ) : (
            blogs.map((blog) => (
              <motion.div
                key={blog._id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-500 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold line-clamp-2">{blog.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    blog.published ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{blog.description}</p>
                
                <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                  <span>By {blog.author || 'Anonymous'}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Content type indicators */}
                <div className="flex gap-1 mb-4">
                  {blog.content.some(block => block.type === 'heading') && (
                    <span className="w-2 h-2 bg-purple-500 rounded-full" title="Has headings"></span>
                  )}
                  {blog.content.some(block => block.type === 'subheading') && (
                    <span className="w-2 h-2 bg-indigo-500 rounded-full" title="Has subheadings"></span>
                  )}
                  {blog.content.some(block => block.type === 'text') && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full" title="Has text"></span>
                  )}
                  {blog.content.some(block => block.type === 'image' || block.imageContent) && (
                    <span className="w-2 h-2 bg-green-500 rounded-full" title="Has images"></span>
                  )}
                  {blog.content.some(block => block.type === 'separator') && (
                    <span className="w-2 h-2 bg-yellow-500 rounded-full" title="Has separators"></span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => editBlog(blog)}
                    className="flex-1 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(blog._id!)}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
 