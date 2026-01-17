/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile react-email packages for compatibility
  transpilePackages: [
    "@react-email/components",
    "@react-email/render",
  ],
  // Prepared for i18n integration
  // i18n: {
  //   locales: ['en', 'it'],
  //   defaultLocale: 'en',
  // },
};

export default nextConfig;
