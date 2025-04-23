/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: { // Temporarily remove i18n block
  //   locales: ["en", "ro"],
  //   defaultLocale: "en",
  // },
  images: {
    domains: ["cdn.sanity.io"],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
