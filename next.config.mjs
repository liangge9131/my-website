/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for static export
  output: 'export',
  
  // Set the base path for GitHub Pages
  basePath: '/my-website',

  // Disable image optimization, as it requires a server
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig; 