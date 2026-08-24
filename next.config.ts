/** @type {import('next').NextConfig} */

function buildRemotePatterns() {
  const patterns = [];

  const publicUrl = process.env.S3_PUBLIC_URL;
  if (publicUrl) {
    try {
      const url = new URL(publicUrl);
      patterns.push({
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        pathname: "/**",
      });
    } catch {
      // ignore invalid S3_PUBLIC_URL
    }
  }

  const endpoint = process.env.S3_ENDPOINT;
  if (endpoint) {
    try {
      const url = new URL(endpoint);
      patterns.push({
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        pathname: "/**",
      });
    } catch {
      // ignore invalid S3_ENDPOINT
    }
  }

  return patterns;
}

const nextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: buildRemotePatterns(),
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
