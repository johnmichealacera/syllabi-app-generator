/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    dirs: ['src'],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  // Optimize for production
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
}

export default nextConfig
