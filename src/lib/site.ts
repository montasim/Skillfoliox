const configuredUrl = import.meta.env.VITE_SITE_URL as string | undefined

export const site = {
  name: "Fieldwork",
  title: "Fieldwork — Agent skill library",
  description:
    "A field-tested collection of reusable skills that teach AI coding agents how to do one job exceptionally well.",
  author: "Montasim",
  url: (configuredUrl || "http://localhost:3000").replace(/\/$/, ""),
  image: "/og-image.png",
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
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    {
      property: "og:image:alt",
      content: "Fieldwork — small files, serious leverage.",
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ]
}
