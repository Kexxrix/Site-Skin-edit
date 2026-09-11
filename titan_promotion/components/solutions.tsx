"use client"

import { Reveal } from "@/components/reveal"
import styles from "./solutions.module.css"

const SOLUTIONS = [
  {
    name: "카지노 솔루션",
    type: "casino",
    scope: "카지노·슬롯",
    description: "카지노·슬롯 운영에 필요한 구성입니다.",
    feature: "게임사·게임·회원별 베팅 한도 설정",
    cta: "카지노 솔루션 상담",
  },
  {
    name: "토지노 솔루션",
    type: "tojino",
    scope: "스포츠·카지노·슬롯",
    description: "스포츠북과 카지노·슬롯을 함께 운영하는 구성입니다.",
    feature: "백오피스에서 스포츠 마켓·배당·매치 관리",
    cta: "토지노 솔루션 상담",
  },
] as const

function SolutionIcon({ type }: { type: "casino" | "tojino" }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {type === "casino" ? (
        <>
          <path d="M7 17H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v2" />
          <rect x="7" y="6" width="14" height="16" rx="2" />
          <path d="m14 10 3 4-3 4-3-4 3-4Z" />
        </>
      ) : (
        <>
          <path d="M8 3h8v6a4 4 0 0 1-8 0V3Z" />
          <path d="M8 5H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M12 13v5m-4 3h8m-7-3h6l1 3H8l1-3Z" />
        </>
      )}
    </svg>
  )
}

function selectSolution(solution: (typeof SOLUTIONS)[number]["name"]) {
  window.dispatchEvent(new CustomEvent("titan:select-solution", { detail: { solution } }))
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  document.getElementById("contact")?.scrollIntoView({
    behavior: reducedMotion ? "instant" : "smooth",
  })
}

export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-heading" className={styles.solutions}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.headingRow}>
            <div>
              <p className={styles.eyebrow}><span aria-hidden />Solutions</p>
              <h2 id="solutions-heading" className={styles.title}>
                운영 범위에 맞는 <span>솔루션.</span>
              </h2>
            </div>
            <p className={styles.description}>
              <span>카지노·슬롯부터 스포츠북까지,</span>{" "}
              <span>필요한 운영 범위에 맞춰 선택하세요.</span>
            </p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {SOLUTIONS.map((solution, index) => (
            <Reveal key={solution.name} delay={index * 100} className={styles.cardReveal}>
              <article className={styles.card}>
                <div className={styles.cardLead}>
                  <span className={styles.icon}><SolutionIcon type={solution.type} /></span>
                  <div className={styles.cardCopy}>
                    <h3>{solution.name}</h3>
                    <p className={styles.scope}>{solution.scope}</p>
                    <p className={styles.cardDescription}>{solution.description}</p>
                  </div>
                </div>
                <dl className={styles.feature}>
                  <dt>대표 관리 기능</dt>
                  <dd>{solution.feature}</dd>
                </dl>
                <button
                  type="button"
                  onClick={() => selectSolution(solution.name)}
                  className={styles.consultButton}
                >
                  {solution.cta}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M7 17L17 7M17 7H8M17 7v9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className={styles.adoptionNote}>
            카지노·토지노 솔루션 모두 <strong>임대와 분양</strong>을 지원합니다.{" "}
            임대로 시작한 뒤 분양으로 전환하는 방식도 가능합니다.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
