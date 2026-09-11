"use client"

import { useState } from "react"
import { DEMOS, type Demo } from "@/lib/demos"
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    document.getElementById("contact")?.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
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
  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className={styles.portfolio}>
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
            <button
              type="button"
              disabled
              aria-label="전체 포트폴리오 보기 (준비 중)"
              title="전체 포트폴리오 준비 중"
              className={styles.viewAll}
            >
              View All
              <span aria-hidden><ArrowIcon /></span>
            </button>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {DEMOS.map((demo, index) => (
            <Reveal key={demo.name} delay={(index % 3) * 90} className={styles.cardReveal}>
              <DemoCard demo={demo} />
            </Reveal>
          ))}
          <Reveal delay={180} className={styles.comingSoonReveal}>
            <article className={`${styles.card} ${styles.comingSoonCard}`}>
              <h3>Coming Soon</h3>
              <p>새로운 프로젝트를 준비 중입니다.</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
