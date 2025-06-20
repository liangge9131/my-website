'use client';

import { useState, useEffect } from 'react';
import { getProjects } from '@/lib/notion';
import ProjectList from '@/components/ProjectList';

// Define the type for a single project
interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  url: string;
  category: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    document.title = 'Projects | Zeng Liangliang';
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getProjects();
      setProjects(allProjects);
      setFilteredProjects(allProjects);
      
      const uniqueCategories = ['All', ...Array.from(new Set(allProjects.map(p => p.category).filter(Boolean)))];
      setCategories(uniqueCategories);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12">Projects</h1>
      
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

      <ProjectList projects={filteredProjects} />
    </div>
  );
} 