import type { SVGProps } from "react"

import { cn } from "@/lib/utils"

type BrandMarkProps = SVGProps<SVGSVGElement> & {
  className?: string
}

export function BrandMark({ className, ...props }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-label="Fieldwork"
      className={cn("size-9", className)}
      {...props}
    >
      <rect width="40" height="40" rx="11" fill="#C04A16" />
      <path d="M11 8h14l5 5v19H11z" fill="#F7F7F5" />
      <path d="M25 8v6h5" fill="#FDE8D7" />
      <path
        d="M15 18h11M15 23h9M15 28h6"
        stroke="#C04A16"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="30.5"
        cy="29.5"
        r="4.5"
        fill="#E76F2E"
        stroke="#20242C"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function GitHubIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-4 fill-current", className)}
      {...props}
    >
      <path d="M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.1 1.2a10.7 10.7 0 0 1 5.7 0C14 4.7 15 5 15 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.4 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.4 11.4 0 0 0 12 .8Z" />
    </svg>
  )
}
