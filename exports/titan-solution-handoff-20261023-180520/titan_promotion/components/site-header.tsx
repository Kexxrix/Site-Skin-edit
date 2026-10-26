"use client"

import { useEffect, useState } from "react"
import styles from "./site-header.module.css"

const NAV = [
  { href: "#portfolio", label: "포트폴리오" },
  { href: "#solutions", label: "솔루션" },
  { href: "#platform", label: "플랫폼" },
  { href: "#support", label: "구축·지원" },
  { href: "#contact", label: "문의" },
]

const WORDMARK = "TITAN SOLUTION"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.row}>
        <a href="#top" className={styles.logo} aria-label="Titan Solution 홈">
          <span>
            {WORDMARK.split("").map((ch, i) => (
              <span key={i} className={ch === "T" ? styles.logoAccent : undefined}>
                {ch}
              </span>
            ))}
          </span>
        </a>

        <nav aria-label="주요 메뉴" className={styles.nav}>
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.navLink}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.desktopCta}>
          <a
            href="#contact"
            className={styles.cta}
          >
            도입 상담
            <span
              aria-hidden
              className={styles.ctaArrow}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className={styles.menuToggle}
        >
          <span className="sr-only">{open ? "메뉴 닫기" : "메뉴 열기"}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="모바일 메뉴"
          className={styles.mobileNav}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false)
          }}
        >
          <div className={styles.mobileLinks}>
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.mobileLink}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className={styles.mobileCta}
            >
              도입 상담
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
