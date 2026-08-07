import { BrandMark } from "@/components/brand-mark"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ReadmeSkeleton() {
  return (
    <div className="space-y-5 p-6 sm:p-10 lg:p-12" aria-label="Loading README">
      <div className="border-b-2 border-[#20242C] pb-4">
        <Skeleton className="h-12 w-3/4 sm:w-1/2" />
      </div>
      <div className="border-l-4 border-[#FDE8D7] bg-[#F7F7F5] p-5">
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
      <Skeleton className="h-28 w-full rounded-none bg-[#20242C]/15" />
      <div className="border-b border-[#20242C]/15 pt-8 pb-3">
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
      <section className="border-b-2 border-[#20242C] bg-[#F7F7F5]">
        <div className="mx-auto grid max-w-[1380px] items-end gap-10 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-16 lg:px-10 lg:py-16">
          <div>
            <Skeleton className="mb-8 h-4 w-28" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="mt-7 h-24 w-3/4 sm:h-32" />
            <Skeleton className="mt-7 h-5 w-full max-w-2xl" />
            <Skeleton className="mt-3 h-5 w-4/5 max-w-xl" />
          </div>
          <Card className="gap-0 rounded-none border-2 border-[#20242C] bg-[#FDE8D7] py-0 shadow-[6px_6px_0_#20242C] ring-0">
            <CardHeader className="p-6 pb-0">
              <Skeleton className="h-4 w-36 bg-[#20242C]/15" />
            </CardHeader>
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full rounded-none bg-[#20242C]/20" />
              <Skeleton className="mt-4 h-12 w-full rounded-none bg-white" />
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1380px] items-start gap-8 px-5 py-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:py-16">
        <aside className="hidden space-y-4 lg:block">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-0.5 w-full bg-[#20242C]" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </aside>
        <article className="min-w-0 overflow-hidden rounded-2xl border border-[#20242C]/15 bg-white shadow-[0_18px_60px_rgba(32,36,44,.08)]">
          <header className="flex items-center gap-3 border-b border-[#20242C]/15 bg-[#F7F7F5] px-5 py-4 sm:px-7">
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
