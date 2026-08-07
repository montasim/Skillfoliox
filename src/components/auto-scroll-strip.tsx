import type { RefObject } from "react"
import { useEffect, useRef } from "react"

const messages = [
  "Plan deliberately",
  "Verify the evidence",
  "Ship reusable judgment",
]

function MessageSet() {
  return (
    <div className="flex shrink-0 items-center">
      {messages.map((message) => (
        <span key={message} className="flex items-center">
          <span className="px-5">{message}</span>
          <span aria-hidden="true">◆</span>
        </span>
      ))}
    </div>
  )
}

function MessageGroup({
  groupRef,
}: {
  groupRef?: RefObject<HTMLDivElement | null>
}) {
  return (
    <div ref={groupRef} className="flex shrink-0 items-center">
      <MessageSet />
      <MessageSet />
      <MessageSet />
      <MessageSet />
    </div>
  )
}

export function AutoScrollStrip() {
  const trackRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const group = groupRef.current
    if (!track || !group) return

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    )
    let animation: Animation | undefined
    const start = () => {
      animation?.cancel()

      const distance = group.getBoundingClientRect().width
      if (!distance) return

      animation = track.animate(
        [
          { transform: "translate3d(0, 0, 0)" },
          { transform: `translate3d(-${distance}px, 0, 0)` },
        ],
        {
          duration: distance / (motionPreference.matches ? 0.018 : 0.05),
          iterations: Number.POSITIVE_INFINITY,
          easing: "linear",
        },
      )
    }

    start()
    const resizeObserver = new ResizeObserver(start)
    resizeObserver.observe(group)
    motionPreference.addEventListener("change", start)

    return () => {
      resizeObserver.disconnect()
      motionPreference.removeEventListener("change", start)
      animation?.cancel()
    }
  }, [])

  return (
    <div
      data-auto-scroll="evidence-strip"
      className="overflow-hidden border-b-2 border-[#20242C] bg-[#FDE8D7] py-3 font-mono text-xs font-medium tracking-widest whitespace-nowrap uppercase"
      aria-label={messages.join(". ")}
    >
      <div
        ref={trackRef}
        data-auto-scroll-track="evidence-strip"
        className="flex w-max will-change-transform"
        aria-hidden="true"
      >
        <MessageGroup groupRef={groupRef} />
        <MessageGroup />
      </div>
    </div>
  )
}
