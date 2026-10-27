"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { DEMOS, type Demo, type DemoCategory } from "@/lib/demos"
import { Reveal } from "@/components/reveal"
import styles from "./portfolio.module.css"

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17L17 7M17 7H8M17 7v9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DemoCard({ demo }: { demo: Demo }) {
  const [errored, setErrored] = useState(false)

  function addToConsultation() {
    window.dispatchEvent(
      new CustomEvent("titan:select-demo", {
        detail: { demo: demo.name, solution: demo.solution },
      }),
    )
    document.getElementById("contact")?.scrollIntoView({
      behavior: "instant",
    })
  }

  return (
    <article className={styles.card}>
      <div className={styles.imageFrame}>
        {errored ? (
          <div className={styles.imageFallback}>
            <p>이미지를 불러오지 못했습니다.</p>
            <button type="button" onClick={() => setErrored(false)}>
              다시 시도
            </button>
            <a href={demo.href} target="_blank" rel="noopener noreferrer">
              라이브 데모 열기<span className="sr-only"> (새 창)</span>
            </a>
          </div>
        ) : (
          <a
            href={demo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${demo.name} 라이브 데모 보기, 새 창 열림`}
            className={styles.previewLink}
          >
            <img
              src={demo.image}
              alt={`${demo.name} 공개 데모 화면`}
              width={1000}
              height={563}
              loading="lazy"
              decoding="async"
              onError={() => setErrored(true)}
              className={styles.previewImage}
            />
            <span className={styles.previewLabel} aria-hidden>라이브 데모 보기</span>
            <span className={styles.arrowCutout} aria-hidden>
              <span className={styles.demoArrow}><ArrowIcon /></span>
            </span>
          </a>
        )}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardCopy}>
          <h3>{demo.name}</h3>
          <p>{demo.categoryLabel}</p>
        </div>
        <button
          type="button"
          onClick={addToConsultation}
          aria-label={`${demo.name} 상담에 추가`}
          className={styles.consultButton}
        >
          상담에 추가
        </button>
      </div>
    </article>
  )
}

export function Portfolio() {
  const [filter, setFilter] = useState<"all" | DemoCategory>("all")
  const [page, setPage] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollToList = useRef(false)

  function changePage(nextPage: number) {
    if (nextPage === page) return
    scrollToList.current = window.matchMedia("(max-width: 767px)").matches
    setPage(nextPage)
  }

  useLayoutEffect(() => {
    if (!scrollToList.current) return
    scrollToList.current = false
    sectionRef.current?.scrollIntoView({ behavior: "instant", block: "start" })
  }, [page])
  const demos = [
    ...DEMOS.filter((demo) => demo.category === "casino"),
    ...DEMOS.filter((demo) => demo.category === "tojino"),
  ].filter((demo) => filter === "all" || demo.category === filter)
  const pageCount = Math.ceil(demos.length / 6)
  const visibleDemos = demos.slice(page * 6, (page + 1) * 6)

  return (
    <section ref={sectionRef} id="portfolio" aria-labelledby="portfolio-heading" className={styles.portfolio}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.headingRow}>
            <div>
              <p className={styles.eyebrow}>
                <span aria-hidden />Projects
              </p>
              <h2 id="portfolio-heading" className={styles.title}>
                실제 화면으로 <span>확인하세요.</span>
              </h2>
            </div>
            <p className={styles.description}>
              <span>공개 데모를 기반으로 브랜드, 콘텐츠, 운영 방식에 맞춰 수정·구축합니다.</span>{" "}
              <span>관리자, 파트너 페이지 데모는 도입 상담 과정에서 안내 드리겠습니다.</span>
            </p>
            <div className={styles.filters} role="group" aria-label="데모 분류 필터">
              {([
                { value: "all", label: "전체" },
                { value: "casino", label: "카지노" },
                { value: "tojino", label: "토지노" },
              ] as const).map((item) => (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={filter === item.value}
                  onClick={() => {
                    setFilter(item.value)
                    setPage(0)
                  }}
                  className={styles.filterButton}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {visibleDemos.map((demo, index) => (
            <Reveal key={`${filter}-${demo.name}`} delay={(index % 3) * 90} className={styles.cardReveal}>
              <DemoCard demo={demo} />
            </Reveal>
          ))}
          {Array.from({ length: 6 - visibleDemos.length }, (_, index) => (
            <div key={`empty-${index}`} className={styles.pagePlaceholder} aria-hidden="true" />
          ))}
        </div>
        <nav className={styles.pagination} aria-label="데모 페이지">
          <button
            type="button"
            className={styles.pageArrow}
            aria-label="이전 페이지"
            disabled={page === 0}
            onClick={() => changePage(page - 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="m14 5-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className={styles.pageBars}>
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`${index + 1}페이지`}
                aria-current={page === index ? "page" : undefined}
                className={styles.pageBar}
                onClick={() => changePage(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.pageArrow}
            aria-label="다음 페이지"
            disabled={page === pageCount - 1}
            onClick={() => changePage(page + 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="m10 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className={styles.pageCount} aria-live="polite" aria-atomic="true">
            {String(page + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
          </span>
        </nav>
      </div>
    </section>
  )
}
