import { useEffect, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import { AlertCircle, RefreshCw } from "lucide-react"

import { ReadmeSkeleton } from "@/components/skill-page-skeleton"
import { Button } from "@/components/ui/button"
import type { Skill } from "@/lib/skills"

type SkillReadmeProps = { skill: Skill }

function resolveUrl(value: string | undefined, skill: Skill, image = false) {
  if (
    !value ||
    /^(https?:|mailto:|data:)/i.test(value) ||
    value.startsWith("#")
  )
    return value
  const path = value.replace(/^\.\//, "")
  if (image) {
    return `${skill.repository.replace("github.com", "raw.githubusercontent.com")}/${skill.branch}/${path}`
  }
  return `${skill.repository}/blob/${skill.branch}/${path}`
}

function markdownComponents(skill: Skill): Components {
  return {
    h1: ({ children }) => (
      <h1 className="mt-0 mb-6 border-b-2 border-[#20242C] pb-4 font-heading text-4xl leading-tight font-semibold tracking-[-0.03em] text-[#20242C] sm:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-14 mb-4 border-b border-[#20242C]/15 pb-3 font-heading text-3xl leading-tight font-semibold tracking-[-0.025em] text-[#20242C]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 mb-3 font-heading text-2xl leading-tight font-semibold text-[#20242C]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-7 mb-2 font-heading text-lg font-semibold text-[#20242C]">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="my-4 leading-7 text-[#3D424B]">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={resolveUrl(href, skill)}
        target={href?.startsWith("#") ? undefined : "_blank"}
        rel={href?.startsWith("#") ? undefined : "noreferrer"}
        className="font-medium text-[#C04A16] underline decoration-1 underline-offset-4 hover:text-[#E76F2E]"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-5 border-l-4 border-[#FDE8D7] bg-[#F7F7F5] px-5 py-3 text-[#20242C]/70 [&>p]:my-0">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="my-4 list-disc space-y-1 pl-6 text-[#3D424B] marker:text-[#E76F2E]">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 list-decimal space-y-1 pl-6 text-[#3D424B] marker:font-mono marker:text-[#C04A16]">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-bold text-[#20242C]">{children}</strong>
    ),
    code: ({ className, children }) => (
      <code
        className={`rounded bg-[#F0F0ED] px-1.5 py-0.5 font-mono text-[0.86em] text-[#20242C] ${className ?? ""}`}
      >
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-5 overflow-x-auto border-2 border-[#20242C] bg-[#20242C] p-5 font-mono text-sm leading-7 text-[#F7F7F5] shadow-[4px_4px_0_#FDE8D7] [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-[#20242C] text-white">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-[#20242C]/15">{children}</tbody>
    ),
    tr: ({ children }) => <tr className="even:bg-[#F7F7F5]">{children}</tr>,
    th: ({ children }) => (
      <th className="border border-[#20242C]/20 p-3 align-top font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-[#20242C]/20 p-3 align-top leading-6">
        {children}
      </td>
    ),
    img: ({ src, alt }) => (
      <img
        src={resolveUrl(src, skill, true)}
        alt={alt ?? ""}
        loading="lazy"
        className="my-1 inline-block h-auto max-w-full"
      />
    ),
    hr: () => <hr className="my-12 border-0 border-t-2 border-[#20242C]" />,
  }
}

export function SkillReadme({ skill }: SkillReadmeProps) {
  const [markdown, setMarkdown] = useState("")
  const [error, setError] = useState("")
  const [attempt, setAttempt] = useState(0)
  const components = useMemo(() => markdownComponents(skill), [skill])

  useEffect(() => {
    const controller = new AbortController()
    setMarkdown("")
    setError("")
    fetch(skill.readme, {
      headers: { Accept: "text/plain" },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub returned ${response.status}`)
        return response.text()
      })
      .then(setMarkdown)
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError")
          return
        setError(
          reason instanceof Error
            ? reason.message
            : "The README could not be loaded"
        )
      })
    return () => controller.abort()
  }, [attempt, skill.readme])

  if (error) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-[#E76F2E] text-white">
          <AlertCircle />
        </span>
        <h2 className="mt-5 font-heading text-3xl font-semibold">
          README unavailable.
        </h2>
        <p className="mt-3 max-w-lg text-[#20242C]/60">
          {error}. Check the connection or open the source directly on GitHub.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => setAttempt((value) => value + 1)}
          >
            <RefreshCw /> Retry
          </Button>
          <Button asChild>
            <a href={skill.repository} target="_blank" rel="noreferrer">
              Open GitHub
            </a>
          </Button>
        </div>
      </div>
    )
  }

  if (!markdown) {
    return <ReadmeSkeleton />
  }

  return (
    <div className="min-w-0 p-6 sm:p-10 lg:p-12">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
        skipHtml
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
