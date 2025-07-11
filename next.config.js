const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    NEXT_G_MAPS_KEY: process.env.NEXT_G_MAPS_KEY,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;