import Link from 'next/link';

// Define the type for a single blog post
interface BlogPost {
  id: string;
  title: string;
  summary: string;
  publishedDate: string;
}

interface BlogPostListProps {
  posts: BlogPost[];
}

const BlogPostList = ({ posts }: BlogPostListProps) => {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Link href={`/blog/${post.id}`} key={post.id}>
          <div className="group block p-6 bg-gray-800/50 rounded-lg border border-gray-700 transition-all duration-300 hover:bg-gray-800 hover:border-blue-500">
            <p className="text-sm text-gray-500 mb-2">{new Date(post.publishedDate).toLocaleDateString()}</p>
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{post.title}</h3>
            <p className="text-gray-400 mb-4">{post.summary}</p>
            <span className="font-semibold text-blue-400 group-hover:text-white transition-colors">Read more →</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogPostList; 