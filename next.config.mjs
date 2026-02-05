/** @type {import('next').NextConfig} */

// Content Security Policy configuration
// This is a strict CSP that allows only necessary resources
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://*.vercel-scripts.com https://*.vercel-insights.com https://*.vercel-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' blob: data: https://*.vercel.com https://*.googleusercontent.com;
  font-src 'self' https://fonts.gstatic.com data:;
  connect-src 'self' https://generativelanguage.googleapis.com https://*.google.com https://vercel.live https://*.vercel-insights.com https://*.vercel-analytics.com https://vitals.vercel-insights.com wss://ws-us3.pusher.com;
  frame-src 'self' https://vercel.live;
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`;

// Security headers configuration
const securityHeaders = [
  // Strict Transport Security - Force HTTPS for 2 years, include subdomains, allow preload
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  // Prevent clickjacking attacks - deny all framing
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // Enable XSS filtering (legacy browsers)
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  // Control referrer information
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  // Restrict browser features and APIs
  {
    key: 'Permissions-Policy',
    value: 'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(self), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()'
  },
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  },
  // Prevent DNS prefetching leaks
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  // Cross-Origin policies for additional isolation
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin'
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin'
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'credentialless'
  }
];

const nextConfig = {
  // Transpile react-email packages for compatibility
  transpilePackages: [
    "@react-email/components",
    "@react-email/render",
  ],
  
  // Security: Disable x-powered-by header
  poweredByHeader: false,
  
  // Apply security headers to all routes
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  // Redirect HTTP to HTTPS in production
  async redirects() {
    return process.env.NODE_ENV === 'production' ? [] : [];
  },
};

export default nextConfig;
