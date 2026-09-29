import { cp, mkdir, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await Promise.all([
  cp("index.html", "dist/index.html"),
  cp("styles.css", "dist/styles.css"),
  cp("articles", "dist/articles", { recursive: true }),
  cp("feed.xml", "dist/feed.xml"),
  cp("robots.txt", "dist/robots.txt"),
  cp("sitemap.xml", "dist/sitemap.xml"),
]);
