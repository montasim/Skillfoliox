import { BrandMark } from "@/components/brand-mark"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ReadmeSkeleton() {
  return (
    <div className="space-y-5 p-6 sm:p-10 lg:p-12" aria-label="Loading README">
      <div className="border-b-2 border-ink pb-4">
        <Skeleton className="h-10 w-3/4 sm:w-1/2" />
      </div>
      <div className="border-l-4 border-brand-soft bg-paper p-5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-3 h-4 w-4/5" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-28 w-full rounded-none bg-ink/15" />
      <div className="border-b border-ink/15 pt-8 pb-3">
        <Skeleton className="h-9 w-2/5" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

export function SkillPageSkeleton() {
  return (
    <main aria-label="Loading skill">
      <section className="border-b-2 border-ink bg-paper">
        <div className="mx-auto grid max-w-[1380px] items-end gap-10 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-16 lg:px-10 lg:py-14">
          <div>
            <Skeleton className="mb-8 h-4 w-28" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="mt-5 h-14 w-3/4" />
            <Skeleton className="mt-6 h-5 w-full max-w-2xl" />
            <Skeleton className="mt-3 h-5 w-4/5 max-w-xl" />
          </div>
          <Card className="gap-0 rounded-none border-2 border-ink bg-brand-soft py-0 shadow-[6px_6px_0_var(--color-ink)] ring-0">
            <CardHeader className="p-6 pb-0">
              <Skeleton className="h-4 w-36 bg-ink/15" />
            </CardHeader>
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full rounded-none bg-ink/20" />
              <Skeleton className="mt-4 h-12 w-full rounded-none bg-white" />
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1380px] items-start gap-8 px-5 py-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:py-16">
        <aside className="hidden space-y-4 lg:block">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-0.5 w-full bg-ink" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </aside>
        <article className="min-w-0 overflow-hidden rounded-2xl border border-ink/15 bg-white shadow-[0_18px_60px_rgba(32,36,44,.08)]">
          <header className="flex items-center gap-3 border-b border-ink/15 bg-paper px-5 py-4 sm:px-7">
            <BrandMark className="size-9 opacity-35 grayscale" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-2 w-36" />
            </div>
          </header>
          <ReadmeSkeleton />
        </article>
      </section>
    </main>
  )
}
