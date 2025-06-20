import { getBlogPosts } from '@/lib/notion';
import BlogFilter from '@/components/BlogFilter';

// Define the type for a single post
interface Post {
  id: string;
  title: string;
  summary: string;
  publishedDate: string;
  category: string;
  tags: string[];
}

// Server Component to fetch data
export default async function BlogPage() {
  const posts: Post[] = await getBlogPosts();
  return <BlogFilter initialPosts={posts} />;
} 