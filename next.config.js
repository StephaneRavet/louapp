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
}

module.exports = nextConfig 