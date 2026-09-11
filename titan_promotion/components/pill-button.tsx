import { cn } from "@/lib/utils"

type Variant = "primary" | "secondary"

type PillButtonProps = {
  children: React.ReactNode
  variant?: Variant
  className?: string
  /** Renders an anchor. Omit to render a button instead. */
  href?: string
  type?: "button" | "submit"
  disabled?: boolean
  onClick?: () => void
}

const SHELL =
  "group/pill inline-flex min-h-[52px] items-center justify-between gap-5 rounded-[50px] py-[7px] pl-[25px] pr-2 text-base font-medium leading-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fa871f] motion-reduce:transition-none"

const SURFACE: Record<Variant, string> = {
  primary: "bg-[#fa871f] text-white hover:bg-[#e9740c]",
  secondary:
    "border border-white/30 bg-white/[0.06] text-white hover:border-white/60 hover:bg-white/[0.12]",
}

const BADGE: Record<Variant, string> = {
  primary: "bg-white text-[#fa871f]",
  secondary: "bg-[#fa871f] text-white",
}

/**
 * Dizora-style pill CTA, sized to the reference "Get In Touch" button:
 * 52px tall, 50px radius, 25px of lead-in padding and a 36px round badge
 * holding an up-right (1 o'clock) arrow that rotates on hover.
 */
export function PillButton({
  children,
  variant = "primary",
  className,
  href,
  type = "button",
  disabled,
  onClick,
}: PillButtonProps) {
  const shell = cn(
    SHELL,
    SURFACE[variant],
    "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#fa871f]",
    className,
  )

  const inner = (
    <>
      <span className="leading-none">{children}</span>
      <span
        aria-hidden
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover/pill:rotate-45 group-disabled/pill:rotate-0 motion-reduce:transition-none motion-reduce:transform-none",
          BADGE[variant],
        )}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7 17L17 7M17 7H8M17 7v9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  )

  if (href !== undefined) {
    return (
      <a href={href} className={shell}>
        {inner}
      </a>
    )
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={shell}>
      {inner}
    </button>
  )
}
