import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold hover:text-blue-400 transition-colors">
            Zeng Liangliang
          </Link>
          <div className="space-x-6 text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 