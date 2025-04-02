/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['louap.webcraft-formation.fr']
    }
  },
  images: {
    domains: ['louap.webcraft-formation.fr'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  allowedDevOrigins: ['localhost:3000', 'localhost:3001']
}

module.exports = nextConfig 