import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16 border-t border-gray-800">
      <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p>&copy; {new Date().getFullYear()} John Doe. All Rights Reserved.</p>
        </div>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <a href="mailto:your.email@example.com" className="hover:text-white transition-colors">
            Email
          </a>
          <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 