/** @type {import('next').NextConfig} */

const nextConfig = {
  publicRuntimeConfig: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,//"m0ezdokr",
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,//"production",
    NEXT_PUBLIC_SERVER_HOST: process.env.NEXT_PUBLIC_SERVER_HOST,//"52.90.83.228:8800",
  },
  // other configurations...
};

export default nextConfig;