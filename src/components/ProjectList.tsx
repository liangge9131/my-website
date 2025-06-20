import Link from 'next/link';

// Define the type for a single project
interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  url: string;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <Link href={project.url || '#'} key={project.id} passHref>
          <div className="group relative flex flex-col h-full bg-gray-800/50 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{project.name}</h3>
            <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
            <div className="mt-auto flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="bg-blue-900/50 text-blue-300 px-3 py-1 text-xs font-medium rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList; 