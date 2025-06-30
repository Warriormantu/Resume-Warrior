import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // This is to fix a warning from opentelemetry-js that tries to import
    // packages that are not dependencies.
    config.externals.push(
      '@opentelemetry/exporter-jaeger',
      '@opentelemetry/exporter-zipkin'
    );
    return config;
  },
};

export default nextConfig;
