import { getAboutInfo } from '@/lib/notion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about my background, skills, and experience.',
};

export default async function AboutPage() {
  const aboutInfo = await getAboutInfo();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">About Me</h1>
      <div className="space-y-8">
        {aboutInfo.map((section) => (
          <section key={section.id}>
            <h2 className="text-2xl font-semibold border-b-2 border-gray-700 pb-2 mb-4">
              {section.section}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
} 