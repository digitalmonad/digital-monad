import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const basePath = process.env.BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
