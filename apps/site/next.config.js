/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}`,
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    config.module.rules.push({
      test: /\.(gltf)$/,
      use: [
        {
          loader: "gltf-webpack-loader"
        }
      ]
    })
    return config
  },  
  experimental: {
    webpackBuildWorker: true,
  },
  transpilePackages: ['scrypt'],
}
