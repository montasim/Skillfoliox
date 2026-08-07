import { Link } from "@tanstack/react-router"
import { LibraryBig, Menu, ShieldCheck } from "lucide-react"

import { BrandMark, GitHubIcon } from "@/components/brand-mark"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const nav = [
  { label: "Library", href: "/#library", icon: LibraryBig },
  { label: "Principles", href: "/#principles", icon: ShieldCheck },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#20242C] bg-[#F7F7F5]/95 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-10"
        aria-label="Primary navigation"
      >
        <Link
          to="/"
          className="group flex items-center gap-3 font-heading text-lg font-bold"
        >
          <BrandMark className="size-9 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-4deg]" />
          FIELDWORK
        </Link>

        <div className="hidden items-center gap-7 text-sm font-semibold sm:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-[#C04A16]"
            >
              {item.label}
            </a>
          ))}
          <Button
            asChild
            variant="outline"
            className="rounded-none border-2 border-[#20242C] bg-transparent hover:bg-[#20242C] hover:text-white"
          >
            <a
              href="https://github.com/montasim/write-project-readme"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon /> GitHub
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon-lg"
              className="rounded-none border-2 border-[#20242C] sm:hidden"
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-l-2 border-[#20242C] bg-[#F7F7F5]">
            <SheetHeader className="border-b-2 border-[#20242C] p-6">
              <SheetTitle className="font-heading text-2xl">
                Fieldwork
              </SheetTitle>
              <SheetDescription>
                Reusable judgment for AI agents.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col p-6">
              {nav.map(({ label, href, icon: Icon }) => (
                <SheetClose key={label} asChild>
                  <a
                    href={href}
                    className="border-b border-[#20242C]/15 py-5 font-heading text-2xl font-semibold"
                  >
                    <Icon className="mr-3 inline size-5" /> {label}
                  </a>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
