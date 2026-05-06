const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 30,  // 30 seconds cache
      static: 180,  // 3 minutes cache
    },
  },
}

export default nextConfig