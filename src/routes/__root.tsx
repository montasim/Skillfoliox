import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { seoMeta, site } from "@/lib/site"
import appCss from "../styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { name: "theme-color", content: "#C04A16" },
      { name: "color-scheme", content: "light" },
      {
        name: "keywords",
        content:
          "AI agent skills, Codex skills, Claude Code skills, developer tools, agent workflows",
      },
      ...seoMeta({ title: site.title, description: site.description }),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/favicon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "180x180",
      },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "preconnect", href: "https://raw.githubusercontent.com" },
    ],
  }),
  notFoundComponent: () => (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-5 py-20 lg:px-10">
      <p className="font-mono text-xs tracking-[0.2em] text-[#C04A16] uppercase">
        404 / shelf miss
      </p>
      <h1 className="mt-5 max-w-2xl font-heading text-6xl leading-[0.9] font-semibold tracking-[-0.06em] text-[#20242C] sm:text-8xl">
        That skill is not on the shelf.
      </h1>
      <a
        href="/"
        className="mt-8 font-semibold text-[#20242C] underline decoration-2 underline-offset-4 hover:text-[#C04A16]"
      >
        Return to the library
      </a>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-svh bg-[#F7F7F5] text-[#20242C] antialiased selection:bg-[#FDE8D7] selection:text-[#20242C]">
        <SiteHeader />
        {children}
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}
