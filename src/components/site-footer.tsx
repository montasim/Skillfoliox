import { BrandMark } from "@/components/brand-mark"

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-[#20242C] bg-[#F7F7F5]">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 px-5 py-9 text-sm sm:flex-row lg:px-10">
        <p className="flex items-center gap-2 font-heading font-bold">
          <BrandMark className="size-7" /> FIELDWORK © 2026
        </p>
        <p className="text-[#20242C]/60">Made in Dhaka · Kept in plain text</p>
      </div>
    </footer>
  )
}
