/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/wor.cards/CARDS_WEBSITE/**',
      },
    ],
  },
  webpack: function (config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
};

module.exports = nextConfig;
