/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'fastidious-ibex-667.convex.cloud' },
            { hostname: "oaidalleapiprodscus.blob.core.windows.net" }
        ]
    }
};

export default nextConfig;
