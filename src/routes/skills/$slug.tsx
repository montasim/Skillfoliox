import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowLeft, ExternalLink, FileText, PackageCheck } from "lucide-react"

import { GitHubIcon } from "@/components/brand-mark"
import { CopyButton } from "@/components/copy-button"
import { SkillPageSkeleton } from "@/components/skill-page-skeleton"
import { SkillReadme } from "@/components/skill-readme"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getSkill } from "@/lib/skills"
import { absoluteUrl, seoMeta, site } from "@/lib/site"

export const Route = createFileRoute("/skills/$slug")({
  head: ({ params }) => {
    const skill = getSkill(params.slug)
    if (!skill) return { meta: [{ title: `Skill not found — ${site.name}` }] }
    const path = `/skills/${skill.slug}`
    const title = `${skill.name} — ${site.name}`
    return {
      meta: seoMeta({
        title,
        description: skill.description,
        path,
        type: "article",
      }),
      links: [{ rel: "canonical", href: absoluteUrl(path) }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: skill.name,
            description: skill.description,
            codeRepository: skill.repository,
            version: skill.version,
            programmingLanguage: "Markdown",
            author: { "@type": "Person", name: site.author },
            url: absoluteUrl(path),
          }),
        },
      ],
    }
  },
  pendingComponent: SkillPageSkeleton,
  pendingMs: 100,
  pendingMinMs: 300,
  component: SkillPage,
})

function SkillPage() {
  const { slug } = Route.useParams()
  const skill = getSkill(slug)

  if (!skill) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-5 py-20 lg:px-10">
        <p className="font-mono text-eyebrow tracking-[0.18em] text-brand uppercase">
          Skill not found
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-[0.96] font-semibold tracking-[-0.04em] sm:text-5xl lg:text-page-title">
          Nothing lives at this slug.
        </h1>
        <Button asChild variant="link" className="mt-6 h-auto p-0">
          <Link to="/">
            <ArrowLeft /> Back to the library
          </Link>
        </Button>
      </main>
    )
  }

  const repositoryOwner = new URL(skill.repository).pathname.split("/")[1]

  return (
    <main>
      <section className="border-b-2 border-ink bg-paper [background-image:linear-gradient(rgba(192,74,22,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(192,74,22,.055)_1px,transparent_1px)] [background-size:24px_24px]">
        <div className="mx-auto grid max-w-[1380px] items-end gap-10 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-16 lg:px-10 lg:py-14">
          <div>
            <Button
              asChild
              variant="link"
              className="mb-8 h-auto p-0 font-mono text-meta tracking-wider uppercase"
            >
              <Link to="/" hash="library">
                <ArrowLeft /> Back to library
              </Link>
            </Button>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-eyebrow tracking-wider text-brand uppercase">
                {skill.category}
              </span>
              <span className="size-1 rounded-full bg-brand-bright" />
              <span className="font-mono text-eyebrow">v{skill.version}</span>
              <Badge
                variant="outline"
                className="rounded-none border-ink bg-white font-mono text-meta tracking-wider uppercase"
              >
                {skill.status}
              </Badge>
            </div>
            <h1 className="mt-5 max-w-3xl font-heading text-4xl leading-[0.96] font-semibold tracking-[-0.04em] sm:text-5xl lg:text-page-title">
              {skill.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/70 lg:text-xl">
              {skill.summary}
            </p>
          </div>

          <Card className="animate-in gap-0 rounded-none border-2 border-ink bg-brand-soft py-0 shadow-[6px_6px_0_var(--color-ink)] ring-0 duration-500 fade-in slide-in-from-right-3 motion-reduce:animate-none">
            <CardHeader className="p-6 pb-0">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2 font-mono text-meta tracking-widest uppercase">
                  <PackageCheck className="size-4" /> Install from GitHub
                </CardTitle>
                <Badge
                  variant="outline"
                  className="rounded-none border-ink bg-white font-mono text-meta"
                >
                  v{skill.version}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <code className="block bg-ink p-4 font-mono text-xs leading-relaxed break-all text-white">
                {skill.installCommand}
              </code>
              <CopyButton
                value={skill.installCommand}
                className="mt-4 h-12 w-full rounded-none border-2 border-ink bg-white text-ink hover:bg-ink hover:text-white"
              >
                Copy install command
              </CopyButton>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1380px] items-start gap-8 px-5 py-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:py-16">
        <aside className="lg:sticky lg:top-24">
          <p className="font-mono text-meta tracking-[0.18em] text-ink/45 uppercase">
            Repository
          </p>
          <Separator className="mt-4 h-0.5 bg-ink" />
          <dl className="divide-y divide-ink/15 text-sm">
            <div className="flex justify-between gap-4 py-4">
              <dt className="text-ink/55">Owner</dt>
              <dd className="font-semibold">{repositoryOwner}</dd>
            </div>
            <div className="flex justify-between gap-4 py-4">
              <dt className="text-ink/55">Branch</dt>
              <dd className="font-mono text-xs">{skill.branch}</dd>
            </div>
            <div className="flex justify-between gap-4 py-4">
              <dt className="text-ink/55">Document</dt>
              <dd className="font-mono text-xs">README.md</dd>
            </div>
          </dl>
          <Button
            asChild
            variant="outline"
            className="mt-5 h-11 w-full justify-between rounded-none border-2 border-ink bg-white hover:bg-ink hover:text-white"
          >
            <a href={skill.repository} target="_blank" rel="noreferrer">
              <GitHubIcon /> View on GitHub <ExternalLink />
            </a>
          </Button>
          <div className="mt-8 hidden lg:block">
            <p className="font-mono text-meta tracking-[0.18em] text-ink/45 uppercase">
              Good for
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink/70">
              {skill.uses.map((use) => (
                <li key={use} className="flex gap-2">
                  <span className="text-brand-bright">◆</span> {use}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <article className="min-w-0 overflow-hidden rounded-2xl border border-ink/15 bg-white shadow-[0_18px_60px_rgba(32,36,44,.08)]">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 bg-paper px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-brand text-white">
                <FileText className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">README.md</p>
                <p className="font-mono text-meta tracking-wider text-ink/45 uppercase">
                  GitHub source · {skill.branch}
                </p>
              </div>
            </div>
            <Button
              asChild
              variant="link"
              className="h-auto p-0 font-mono text-meta tracking-wider uppercase"
            >
              <a
                href={`${skill.repository}/blob/${skill.branch}/README.md`}
                target="_blank"
                rel="noreferrer"
              >
                View source <ExternalLink />
              </a>
            </Button>
          </header>
          <SkillReadme skill={skill} />
        </article>
      </section>
    </main>
  )
}
