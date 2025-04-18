import {withSentryConfig} from '@sentry/nextjs';
import type { NextConfig } from "next";



const nextConfig: NextConfig = {

  typescript:{
    ignoreBuildErrors: true,
  },
  eslint:{
    ignoreDuringBuilds: true,
  }
  /* config options here */
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
    domains: [
      "imgs.search.brave.com", 
      "cdn.sanity.io", 
      "lh3.googleusercontent.com" // <-- Add other domains you expect to use
    ],
  },
  experimental:{
    ppr:'incremental',
  },
  devIndicators:{
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  }
};

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://www.npmjs.com/package/@sentry/webpack-plugin#options

org: "varenya-19",
project: "javascript-nextjs",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "/monitoring",

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});