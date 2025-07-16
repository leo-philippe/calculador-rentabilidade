/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["jsx", "js"],
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.infrastructureLogging = {
      level: "error", // Oculta warnings como os do PackFileCacheStrategy
    };
    return config;
  },
};

export default nextConfig;
