'use client';

import { useState, useEffect, useMemo } from 'react';
import BlogPostList from '@/components/BlogPostList';

// Define the type for a single post
interface Post {
  id: string;
  title: string;
  summary: string;
  publishedDate: string;
  category: string;
  tags: string[];
}

export default function BlogFilter({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    document.title = 'Blog | Zeng Liangliang';
  }, []);
  
  useEffect(() => {
    // @ts-ignore
    const uniqueCategories = ['All', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))];
    setCategories(uniqueCategories);
  }, [posts]);

  const filteredBySearchAndCategory = useMemo(() => {
    let result = posts;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.summary && p.summary.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return result;
  }, [searchTerm, selectedCategory, posts]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="flex justify-center mb-8 flex-wrap gap-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <BlogPostList posts={filteredBySearchAndCategory} />
    </div>
  );
} 