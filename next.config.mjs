/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // Permitir o build mesmo com erros de ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorar erros de tipo durante o build
    ignoreBuildErrors: true,
  },
};

export default nextConfig; 