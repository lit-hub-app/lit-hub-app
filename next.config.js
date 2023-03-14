/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iili.io',
        port: ''
      }
    ]
  },
  // sassOptions: {

  // }
}

module.exports = nextConfig
