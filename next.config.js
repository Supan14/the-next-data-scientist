/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/Supan14/the-next-data-scientist-posts/main/images/**',
            },
        ],
    },
}

module.exports = nextConfig
