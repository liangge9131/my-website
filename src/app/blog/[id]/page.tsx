import { getBlogPost } from '@/lib/notion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import GiscusComments from '@/components/GiscusComments';
import type { Metadata } from 'next';
// import './markdown.css'; // No longer needed

interface PostPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { title, content } = await getBlogPost(params.id);
  const description = content.substring(0, 150) + '...'; // Simple summary

  return {
    title: title,
    description: description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { title, content } = await getBlogPost(params.id);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">{title}</h1>
      <article className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </article>

      <hr className="my-12 border-gray-700" />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <GiscusComments />
      </section>
    </div>
  );
} 