import { readFileSync, writeFileSync } from "node:fs"

const rootUrl = (process.env.VITE_SITE_URL || "http://localhost:3000").replace(/\/$/, "")
const skills = JSON.parse(readFileSync(new URL("../src/data/skills.json", import.meta.url), "utf8"))
const urls = ["/", ...skills.map((skill) => `/skills/${skill.slug}`)]
const today = new Date().toISOString().slice(0, 10)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${rootUrl}${path}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), sitemap)
writeFileSync(
  new URL("../public/robots.txt", import.meta.url),
  `User-agent: *\nAllow: /\n\nSitemap: ${rootUrl}/sitemap.xml\n`
)
