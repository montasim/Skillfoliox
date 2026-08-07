const configuredUrl = import.meta.env.VITE_SITE_URL as string | undefined

export const site = {
  name: "Skillfolio",
  title: "Skillfolio - Reusable AI Agent Skills for Codex and Claude Code",
  description:
    "Explore field-tested skills for Codex, Claude Code, and other AI coding agents. Install focused workflows for documentation and more.",
  author: "Montasim",
  url: (configuredUrl || "https://skillfoliox.netlify.app").replace(/\/$/, ""),
  image: "/skillfolio-preview-square-v3.png",
  locale: "en_US",
}

export function absoluteUrl(path: string) {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`
}

export function seoMeta({
  title,
  description,
  path = "/",
  type = "website",
}: {
  title: string
  description: string
  path?: string
  type?: "website" | "article"
}) {
  const url = absoluteUrl(path)
  const image = absoluteUrl(site.image)
  return [
    { title },
    { name: "description", content: description },
    { name: "author", content: site.author },
    { name: "application-name", content: site.name },
    {
      name: "robots",
      content:
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    { property: "og:type", content: type },
    { property: "og:site_name", content: site.name },
    { property: "og:locale", content: site.locale },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:url", content: image },
    { property: "og:image:secure_url", content: image },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "1200" },
    {
      property: "og:image:alt",
      content: "Skillfolio - small files, serious leverage.",
    },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    {
      name: "twitter:image:alt",
      content: "Skillfolio - small files, serious leverage.",
    },
  ]
}
