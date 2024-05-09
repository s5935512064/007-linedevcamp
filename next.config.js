/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
    env: {
        CHANNEL_ACCESS_TOKEN: process.env.CHANNEL_ACCESS_TOKEN,
        CHANNEL_SECRET: process.env.CHANNEL_SECRET,
        NEXT_PUBLIC_LIFF_ID: process.env.NEXT_PUBLIC_LIFF_ID,
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'profile.line-scdn.net',
                pathname: '**',
            },

        ],

        minimumCacheTTL: 600,
        unoptimized: true,
    },


};

module.exports = nextConfig
