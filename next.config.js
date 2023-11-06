const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/products/vermicelli-noodles",
  //       destination: "/products/vermicelli-noodles22",
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
