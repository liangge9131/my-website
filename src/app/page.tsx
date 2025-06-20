import { getProjects, getBlogPosts } from '@/lib/notion';
import ProjectList from '@/components/ProjectList';
import BlogPostList from '@/components/BlogPostList';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const projects = await getProjects();
  const blogPosts = await getBlogPosts();

  const recentProjects = projects.slice(0, 3);
  const recentBlogPosts = blogPosts.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section - Option B */}
      <section className="pt-16 sm:pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:col-span-2 xl:col-auto">
                    Zeng Liangliang: <br />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Full-Stack Developer
                    </span>
                </h1>
                <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                    <p className="text-lg leading-8 text-gray-300">
                        A seasoned developer with extensive practical experience, I architect and develop intelligent agents for enterprise applications. I transform complex business logic into powerful, AI-driven tools that enhance productivity and drive growth.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <Link href="/projects" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            View My Work
                        </Link>
                        <Link href="/contact" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
                            Get in touch <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
                <div className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36">
                    <Image
                        src="https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070&auto=format&fit=crop"
                        alt="A focused development environment with code on a screen."
                        width={800}
                        height={600}
                        className="w-full h-full object-cover rounded-2xl"
                        priority
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section>
        <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center">
                <span className="bg-gray-900 px-4 text-2xl font-semibold text-white">Recent Projects</span>
            </div>
        </div>
        <ProjectList projects={recentProjects} />
      </section>

      {/* Latest Blog Posts Section */}
      <section>
        <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center">
                <span className="bg-gray-900 px-4 text-2xl font-semibold text-white">Latest Blog Posts</span>
            </div>
        </div>
        <BlogPostList posts={recentBlogPosts} />
      </section>
    </div>
  );
}
