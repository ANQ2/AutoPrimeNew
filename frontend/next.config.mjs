/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    },
};

export default nextConfig;
