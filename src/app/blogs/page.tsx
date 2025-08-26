"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

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
  _id: string;
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

export default function BlogsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs?published=true');
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

    fetchBlogs();
  }, []);

  // Animated background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let nodes: { x: number; y: number; vx: number; vy: number; opacity: number }[] = [];
    let w: number, h: number, animationId: number;

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      nodes = Array.from({ length: 50 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: 0.2 + Math.random() * 0.3,
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
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Get heading component based on level
  const getHeadingComponent = (level: number, content: string, alignment: string) => {
    const alignmentClass = alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left';
    const commonClasses = `font-bold text-white mb-4 ${alignmentClass}`;
    
    switch (level) {
      case 1:
        return <h1 className={`text-4xl md:text-5xl ${commonClasses}`}>{content}</h1>;
      case 2:
        return <h2 className={`text-3xl md:text-4xl ${commonClasses}`}>{content}</h2>;
      case 3:
        return <h3 className={`text-2xl md:text-3xl ${commonClasses}`}>{content}</h3>;
      case 4:
        return <h4 className={`text-xl md:text-2xl ${commonClasses}`}>{content}</h4>;
      case 5:
        return <h5 className={`text-lg md:text-xl ${commonClasses}`}>{content}</h5>;
      case 6:
        return <h6 className={`text-base md:text-lg ${commonClasses}`}>{content}</h6>;
      default:
        return <h2 className={`text-2xl md:text-3xl ${commonClasses}`}>{content}</h2>;
    }
  };

  // Get separator component based on style
  const getSeparatorComponent = (style: string) => {
    const baseClasses = "w-full my-6 border-gray-600";
    
    switch (style) {
      case 'dashed':
        return <hr className={`${baseClasses} border-t border-dashed`} />;
      case 'dotted':
        return <hr className={`${baseClasses} border-t border-dotted`} />;
      case 'double':
        return <hr className={`${baseClasses} border-t-4 border-double`} />;
      case 'thick':
        return <hr className={`${baseClasses} border-t-2`} />;
      default:
        return <hr className={`${baseClasses} border-t`} />;
    }
  };

  // Get text size classes
  const getTextSizeClass = (size: string) => {
    const sizes = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
      xl: 'text-xl'
    };
    return sizes[size as keyof typeof sizes] || 'text-base';
  };

  // Render blog content
  const renderBlogContent = (content: BlogContent[]) => {
    return content
      .sort((a, b) => a.order - b.order)
      .map((block, index) => (
        <div key={index} className="mb-6">
          {/* Heading */}
          {block.type === 'heading' && (
            getHeadingComponent(
              block.headingLevel || 2, 
              block.content, 
              block.alignment || 'left'
            )
          )}
          
          {/* Subheading */}
          {block.type === 'subheading' && (
            <div className={`text-xl text-gray-300 font-semibold mb-4 ${
              block.alignment === 'center' ? 'text-center' : 
              block.alignment === 'right' ? 'text-right' : 'text-left'
            }`}>
              {block.content}
            </div>
          )}
          
          {/* Separator */}
          {block.type === 'separator' && (
            getSeparatorComponent(block.separatorStyle || 'line')
          )}
          
          {/* Text */}
          {block.type === 'text' && (
            <div className="prose prose-invert max-w-none">
              <p className={`text-gray-300 leading-relaxed whitespace-pre-wrap ${
                getTextSizeClass(block.textSize || 'medium')
              } ${
                block.textStyle === 'bold' ? 'font-bold' : 
                block.textStyle === 'italic' ? 'italic' : ''
              } ${
                block.alignment === 'center' ? 'text-center' : 
                block.alignment === 'right' ? 'text-right' : 'text-left'
              }`}>
                {block.content}
              </p>
            </div>
          )}
          
          {/* Image only */}
          {block.type === 'image' && (
            <div className="flex justify-center">
              <img
                src={block.content}
                alt={`Blog content ${index + 1}`}
                className={`h-auto rounded-lg border border-gray-700 shadow-lg ${
                  block.imageSize === 'small' ? 'max-w-xs' :
                  block.imageSize === 'medium' ? 'max-w-md' :
                  block.imageSize === 'large' ? 'max-w-2xl' :
                  'max-w-full'
                }`}
              />
            </div>
          )}
          
          {/* Text + Image combinations */}
          {(block.type === 'text-image' || block.type === 'image-text') && (
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className={block.type === 'image-text' ? 'order-2' : ''}>
                <p className={`text-gray-300 leading-relaxed whitespace-pre-wrap ${
                  getTextSizeClass(block.textSize || 'medium')
                } ${
                  block.textStyle === 'bold' ? 'font-bold' : 
                  block.textStyle === 'italic' ? 'italic' : ''
                } ${
                  block.alignment === 'center' ? 'text-center' : 
                  block.alignment === 'right' ? 'text-right' : 'text-left'
                }`}>
                  {block.content}
                </p>
              </div>
              <div className={block.type === 'text-image' ? 'order-2' : ''}>
                {block.imageContent && (
                  <img
                    src={block.imageContent}
                    alt={`Blog content ${index + 1}`}
                    className={`h-auto rounded-lg border border-gray-700 shadow-lg ${
                      block.imageSize === 'small' ? 'max-w-xs' :
                      block.imageSize === 'medium' ? 'max-w-md' :
                      block.imageSize === 'large' ? 'max-w-xl' :
                      'max-w-full'
                    }`}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ));
  };

  if (selectedBlog) {
    return (
      <div className="relative min-h-screen bg-black text-white">
        <canvas ref={canvasRef} className="absolute inset-0" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto px-4 py-12"
        >
          <button
            onClick={() => setSelectedBlog(null)}
            className="mb-8 flex items-center gap-2 text-gray-300 hover:text-white transition"
          >
            ← Back to Blogs
          </button>

          <article>
            <header className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                {selectedBlog.title}
              </h1>
              <p className="text-xl text-gray-300 mb-4">
                {selectedBlog.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span>By {selectedBlog.author || 'Anonymous'}</span>
                <span>•</span>
                <span>{new Date(selectedBlog.createdAt).toLocaleDateString()}</span>
                {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                  <>
                    <span>•</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedBlog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-800 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </header>

            <div className="border-t border-gray-700 pt-8">
              {renderBlogContent(selectedBlog.content)}
            </div>
          </article>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      <main className="min-h-screen bg-black overflow-x-hidden px-4 py-12 relative">
        {/* Animated background */}
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Blog Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-white mb-12">
            Blogs
          </h1>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <p className="text-gray-300 mt-4">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-300 text-xl">No blogs published yet.</p>
              <p className="text-gray-400 mt-2">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:shadow-gray-500/40 p-6 transition duration-300 backdrop-blur-md cursor-pointer"
                  onClick={() => setSelectedBlog(blog)}
                >
                  {/* Preview image if available */}
                  {blog.content.find(block => block.type === 'image' || block.imageContent) && (
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img
                        src={
                          blog.content.find(block => block.type === 'image')?.content ||
                          blog.content.find(block => block.imageContent)?.imageContent
                        }
                        alt={blog.title}
                        className="w-full h-48 object-cover hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-semibold text-gray-100 line-clamp-2">
                      {blog.title}
                    </h2>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 ml-2">
                        {blog.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700 text-xs rounded-full text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-3">{blog.description}</p>

                  <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                    <span>By {blog.author || 'Anonymous'}</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlog(blog);
                      }}
                      className="inline-block px-4 py-2 border border-gray-400 text-white rounded-lg hover:bg-gray-700 transition duration-300"
                    >
                      Read More →
                    </button>

                    {/* Content type indicators */}
                    <div className="flex gap-1">
                      {blog.content.some(block => block.type === 'text' || block.type === 'heading' || block.type === 'subheading') && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full" title="Contains text"></span>
                      )}
                      {blog.content.some(block => block.type === 'image' || block.imageContent) && (
                        <span className="w-2 h-2 bg-green-500 rounded-full" title="Contains images"></span>
                      )}
                      {blog.content.some(block => block.type === 'heading') && (
                        <span className="w-2 h-2 bg-purple-500 rounded-full" title="Contains headings"></span>
                      )}
                      {blog.content.some(block => block.type === 'separator') && (
                        <span className="w-2 h-2 bg-yellow-500 rounded-full" title="Contains separators"></span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}