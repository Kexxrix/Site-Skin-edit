"use client"

import { useEffect, useRef, useState } from "react"

type CounterProps = {
  to: number
  duration?: number
  className?: string
}

/**
 * WordPress-style count-up: animates from 0 to `to` the first time it scrolls
 * into view. Respects prefers-reduced-motion by rendering the final value.
 */
export function Counter({ to, duration = 1800, className }: CounterProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setValue(to)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - p, 3)
              setValue(Math.round(to * eased))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("en-US")}
    </span>
  )
}
