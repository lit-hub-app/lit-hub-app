/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iili.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'www.gutenberg.org',
        port: ''
      }
    ]
  },
  // sassOptions: {

  // }
}

module.exports = nextConfig
