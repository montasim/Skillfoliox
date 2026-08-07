import type { ReactNode } from "react"

type SkillDetailLayoutProps = {
  label?: string
  hero: ReactNode
  install: ReactNode
  sidebar: ReactNode
  document: ReactNode
  patterned?: boolean
}

export function SkillDetailLayout({
  label,
  hero,
  install,
  sidebar,
  document,
  patterned = false,
}: SkillDetailLayoutProps) {
  return (
    <main aria-label={label}>
      <section
        className={
          patterned
            ? "border-b-2 border-ink bg-paper [background-image:linear-gradient(rgba(192,74,22,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(192,74,22,.055)_1px,transparent_1px)] [background-size:24px_24px]"
            : "border-b-2 border-ink bg-paper"
        }
      >
        <div className="mx-auto grid max-w-[1380px] items-end gap-10 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-16 lg:px-10 lg:py-14">
          {hero}
          {install}
        </div>
      </section>
      <section className="mx-auto grid max-w-[1380px] items-start gap-8 px-5 py-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:py-16">
        {sidebar}
        {document}
      </section>
    </main>
  )
}
