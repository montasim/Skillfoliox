import { useMemo, useState } from "react"
import { Link, createFileRoute } from "@tanstack/react-router"
import {
  ArrowDown,
  ArrowRight,
  Command,
  FileText,
  Layers3,
  Search,
  SearchX,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"

import { AutoScrollStrip } from "@/components/auto-scroll-strip"
import { CopyButton } from "@/components/copy-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { categories, skills } from "@/lib/skills"
import { absoluteUrl, seoMeta, site } from "@/lib/site"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seoMeta({ title: site.title, description: site.description }),
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: site.name,
          headline: "Small files. Serious leverage.",
          description: site.description,
          url: absoluteUrl("/"),
          author: { "@type": "Person", name: site.author },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: skills.length,
            itemListElement: skills.map((skill, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: skill.name,
              url: absoluteUrl(`/skills/${skill.slug}`),
            })),
          },
        }),
      },
    ],
  }),
  component: App,
})

function App() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")

  const visibleSkills = useMemo(() => {
    const term = query.trim().toLowerCase()
    return skills.filter((skill) => {
      const matchesCategory = category === "All" || skill.category === category
      const matchesQuery =
        !term ||
        [skill.name, skill.summary, skill.category, skill.description]
          .join(" ")
          .toLowerCase()
          .includes(term)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const featuredSkill = skills.find((skill) => skill.featured) ?? skills[0]
  const stableCount = skills.filter((skill) => skill.status === "Stable").length

  return (
    <main>
      <section className="border-b-2 border-[#20242C]/10 bg-[#FAFAF8]">
        <div className="mx-auto grid max-w-[1440px] items-stretch gap-12 px-5 py-12 sm:py-16 lg:grid-cols-[1.12fr_.88fr] lg:gap-16 lg:px-10 lg:py-20 xl:gap-24">
          <div className="flex animate-in flex-col justify-center duration-700 fade-in slide-in-from-bottom-3 motion-reduce:animate-none">
            <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-[#C04A16] uppercase">
              Montasim&apos;s agent skill library / 2026
            </p>
            <h1 className="max-w-[850px] font-heading text-[clamp(4rem,7.5vw,7.5rem)] leading-[0.82] font-semibold tracking-[-0.07em]">
              Small files.
              <br />
              <span className="text-[#C04A16]">Serious leverage.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed lg:text-xl">
              A field-tested collection of skills that teach AI agents how to do
              one job exceptionally well.
            </p>
            <Button
              asChild
              variant="ghost"
              className="mt-7 h-auto w-fit gap-4 p-0 font-heading text-sm font-bold tracking-wider hover:bg-transparent"
            >
              <a href="#library">
                EXPLORE THE SHELF
                <span className="grid size-11 place-items-center rounded-full bg-[#E76F2E] text-white transition-transform group-hover/button:translate-y-1">
                  <ArrowDown className="size-4" />
                </span>
              </a>
            </Button>
          </div>

          <Card className="animate-in gap-0 rounded-2xl border border-[#20242C]/15 bg-white py-0 shadow-[0_2px_0_rgba(32,36,44,.08),0_18px_50px_rgba(32,36,44,.07)] ring-0 duration-700 [animation-delay:140ms] [animation-fill-mode:both] fade-in slide-in-from-bottom-3 motion-reduce:animate-none">
            <CardHeader className="p-6 sm:p-8">
              <div>
                <Badge
                  variant="outline"
                  className="gap-2 rounded-full border-[#E76F2E]/30 bg-[#E76F2E]/5 px-4 py-2 font-mono text-[10px] font-normal tracking-[0.18em] text-[#E76F2E]"
                >
                  <span className="size-2 rounded-full bg-[#E76F2E]" /> QUICK
                  STATS
                </Badge>
                <CardTitle className="mt-4 text-2xl">
                  Library snapshot
                </CardTitle>
              </div>
              <CardAction>
                <Badge className="rounded-full bg-[#20242C] px-4 py-2 font-mono text-[10px] tracking-widest text-white">
                  2026
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col px-6 pb-6 sm:px-8 sm:pb-8">
              <dl className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Skills published",
                    value: String(skills.length).padStart(2, "0"),
                    Icon: FileText,
                  },
                  {
                    label: "Disciplines",
                    value: String(categories.length).padStart(2, "0"),
                    Icon: Layers3,
                  },
                  {
                    label: "Stable releases",
                    value: String(stableCount).padStart(2, "0"),
                    Icon: ShieldCheck,
                  },
                  { label: "Status", value: "Growing", Icon: TrendingUp },
                ].map(({ label, value, Icon }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[#20242C]/10 bg-[#F7F7F5]/60 p-4 sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <dt className="font-mono text-[9px] tracking-[0.17em] text-[#20242C]/50 uppercase">
                        {label}
                      </dt>
                      <Icon
                        className="size-4 text-[#C04A16]"
                        aria-hidden="true"
                      />
                    </div>
                    <dd className="mt-2 font-heading text-3xl font-semibold">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                to="/skills/$slug"
                params={{ slug: featuredSkill.slug }}
                className="group mt-6 flex items-center justify-between gap-4 rounded-xl border border-[#20242C]/10 p-4 transition-colors hover:border-[#C04A16] hover:bg-[#FDE8D7]/30"
              >
                <span>
                  <span className="block font-mono text-[9px] tracking-[0.16em] text-[#C04A16] uppercase">
                    Featured now
                  </span>
                  <span className="mt-1 block font-semibold">
                    {featuredSkill.name}
                  </span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#20242C] bg-[#FDE8D7] transition-transform group-hover:translate-x-1">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <AutoScrollStrip />

      <section
        id="library"
        className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-16 lg:px-10 lg:py-24"
      >
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.18em] text-[#C04A16] uppercase">
              The working shelf
            </p>
            <h2 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              Choose a capability.
            </h2>
          </div>
          <label className="relative block w-full lg:w-80">
            <span className="sr-only">Search skills</span>
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the shelf..."
              className="h-12 rounded-none border-2 border-[#20242C] bg-white pr-11 font-mono shadow-none focus-visible:border-[#C04A16] focus-visible:ring-[#FDE8D7]"
            />
            <Search className="absolute top-1/2 right-4 size-4 -translate-y-1/2" />
          </label>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" aria-label="Filter skills">
          {["All", ...categories].map((item) => (
            <Button
              key={item}
              type="button"
              variant={category === item ? "default" : "outline"}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={
                category === item
                  ? "rounded-none border-2 border-[#20242C] bg-[#20242C] px-4 text-white"
                  : "rounded-none border-2 border-[#20242C] bg-white px-4 hover:bg-[#FDE8D7]"
              }
            >
              {item}
            </Button>
          ))}
        </div>

        {visibleSkills.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleSkills.map((skill) => (
              <Card
                key={skill.slug}
                className="min-h-[350px] gap-0 rounded-none border-2 border-[#20242C] bg-white py-0 shadow-[6px_6px_0_#20242C] ring-0 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_#20242C]"
              >
                <CardHeader className="border-b-2 border-[#20242C] p-6">
                  <div className="grid size-14 place-items-center border-2 border-[#20242C] bg-[#C04A16] font-heading text-lg font-bold text-white">
                    {skill.mark}
                  </div>
                  <CardAction>
                    <Badge
                      variant="outline"
                      className="rounded-none border-[#20242C] font-mono text-[10px] font-normal tracking-wider uppercase"
                    >
                      {skill.status} · v{skill.version}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[11px] tracking-widest text-[#C04A16] uppercase">
                    {skill.category}
                  </p>
                  <CardTitle className="mt-2 text-2xl tracking-tight">
                    {skill.name}
                  </CardTitle>
                  <CardDescription className="mt-3 leading-relaxed text-[#20242C]/65">
                    {skill.summary}
                  </CardDescription>
                  <div className="mt-auto flex items-center justify-between pt-8">
                    <Button asChild variant="link" className="h-auto p-0">
                      <Link to="/skills/$slug" params={{ slug: skill.slug }}>
                        View skill <ArrowRight />
                      </Link>
                    </Button>
                    <CopyButton
                      value={skill.installCommand}
                      label="Copy install command"
                      variant="outline"
                      size="icon-lg"
                      className="rounded-full border-2 border-[#20242C] hover:bg-[#FDE8D7]"
                    >
                      <Command />
                    </CopyButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mt-10 border-2 border-dashed border-[#20242C] bg-white py-12 text-center ring-0">
            <CardContent>
              <SearchX className="mx-auto mb-4 size-9 text-[#E76F2E]" />
              <h3 className="font-heading text-2xl font-semibold">
                Nothing on this shelf yet.
              </h3>
              <p className="mt-2 text-[#20242C]/60">
                Try another keyword or clear the filters.
              </p>
              <Button
                variant="link"
                className="mt-4"
                onClick={() => {
                  setQuery("")
                  setCategory("All")
                }}
              >
                Clear filters
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      <section
        id="principles"
        className="scroll-mt-16 border-y-2 border-[#20242C] bg-[#20242C] text-[#F7F7F5]"
      >
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.75fr_1.25fr]">
          <div className="border-b-2 border-[#F7F7F5]/20 p-8 lg:border-r-2 lg:border-b-0 lg:p-14">
            <p className="font-mono text-xs tracking-[0.18em] text-[#FDE8D7] uppercase">
              What makes the cut
            </p>
            <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              Built from work,
              <br />
              not theory.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3">
            {[
              [
                "01",
                "Specific",
                "One clear job, with boundaries that keep the agent focused.",
              ],
              [
                "02",
                "Tested",
                "Shaped by real repositories, edge cases, and revision.",
              ],
              [
                "03",
                "Portable",
                "Useful across projects without losing its point of view.",
              ],
            ].map(([number, title, description]) => (
              <article
                key={title}
                className="border-b border-[#F7F7F5]/20 p-8 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0 lg:p-10"
              >
                <span className="font-mono text-[#E76F2E]">{number}</span>
                <h3 className="mt-8 font-heading text-xl font-semibold">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#F7F7F5]/65">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
