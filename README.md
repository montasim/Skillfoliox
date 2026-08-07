# Skillfolio

A frontend-only portfolio of reusable agent skills built with TanStack Start, shadcn/ui, and Tailwind CSS.

## Development

To add components to your app, run the following command:

```bash
pnpm install
pnpm dev
```

Skill metadata—including repository and raw README links—lives in `src/data/skills.json`. The browser fetches README content directly from GitHub; there is no database, API route, server function, or application backend.

## Production URL and sharing

Set `VITE_SITE_URL` to the deployed origin before building so canonical links, Open Graph images, `robots.txt`, and `sitemap.xml` use the correct absolute URL:

```bash
VITE_SITE_URL=https://skills.example.com pnpm build
```

The favicon, install icons, and 1200×630 social card live in `public/`.
