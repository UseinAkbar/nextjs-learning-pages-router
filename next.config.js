/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.nike.com',
        port: '',
        pathname: '/**' // apapun yg dibelakang static.nike.com bisa digunakan
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**' // apapun yg dibelakang lh3.googleusercontent.com bisa digunakan
      }
    ]
  }
}

module.exports = nextConfig
