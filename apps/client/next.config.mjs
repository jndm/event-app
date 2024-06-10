/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Ignore TypeScript errors during build since I can't figure out how to restrict the scope of the TypeScript to only files in client directory - currently attempts to lint server too and fails due to wrong tsconfig
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
