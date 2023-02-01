import withNextIntl from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

export default withNextIntl(
  // This is the default, also the `src` folder is supported out of the box
  "./i18n.tsx"
)(nextConfig);
