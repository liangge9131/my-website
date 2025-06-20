import { getProjects } from '@/lib/notion';
import ProjectFilter from '@/components/ProjectFilter';

// Re-define the type here or move to a shared types file
interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  url: string;
  category: string;
}

// Server Component to fetch data
export default async function ProjectsPage() {
  const projects: Project[] = await getProjects();
  return <ProjectFilter initialProjects={projects} />;
} 