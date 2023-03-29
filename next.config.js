/** @type {import('next').NextConfig} */

const path = require('path');

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
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: ''
      }
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "@/styles/variables.scss";`
  }
}

module.exports = nextConfig
