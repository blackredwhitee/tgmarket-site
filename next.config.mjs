
// На GitHub Pages project-сайт отдаётся по под-пути /<repo>/, поэтому при сборке
// для Pages выставляем basePath/assetPrefix. Локально — корень.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "tgmarket-site";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  outputFileTracingRoot: import.meta.dirname,
  basePath: isPages ? `/${repo}` : undefined,
  assetPrefix: isPages ? `/${repo}/` : undefined,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: isPages ? `/${repo}` : "" },
};

export default nextConfig;
