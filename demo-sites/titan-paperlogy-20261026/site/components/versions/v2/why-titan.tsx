import { Reveal } from "@/components/reveal"
import styles from "./why-titan.module.css"

const STRENGTHS = [
  {
    icon: "development",
    title: "핵심 시스템을 직접 개발합니다.",
    description:
      "스포츠북부터 사용자·파트너·백오피스, 정산·입출금까지 직접 개발했습니다. 게임제공사와 직접 계약한 자체 벤더를 5년 이상 운영해 왔습니다.",
  },
  {
    icon: "operations",
    title: "실전의 요구를 기능으로 만듭니다.",
    description:
      "7년 이상의 프리매치·인플레이 운영 경험을 바탕으로 배당 급변 시 베팅 차단과 다음 라운드부터 적용되는 한도 조정 등을 반영했습니다. 파트너 수익금은 정산일에 자동 계산해 백오피스에 기록합니다.",
  },
  {
    icon: "support",
    title: "운영과 개발팀을 연결합니다.",
    description:
      "운영 CS와 기술 CS가 고객사 문의에 대응하고, 필요한 사안은 내부 개발팀과 연계합니다. 효율적인 대응을 위해 기술 CS가 고객사와 직접 소통하기도 합니다.",
  },
] as const

function StrengthIcon({ type }: { type: (typeof STRENGTHS)[number]["icon"] }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {type === "development" ? (
        <>
          <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18" />
        </>
      ) : type === "operations" ? (
        <>
          <path d="M4 5h16M4 12h16M4 19h16" />
          <path d="M8 3v4m8 3v4m-6 3v4" strokeWidth="3" />
        </>
      ) : (
        <>
          <path d="M4 13V10a8 8 0 0 1 16 0v3m0 4v1a3 3 0 0 1-3 3h-4" />
          <rect x="3" y="11" width="4" height="7" rx="2" />
          <rect x="17" y="11" width="4" height="7" rx="2" />
        </>
      )}
    </svg>
  )
}

export function WhyTitan() {
  return (
    <section id="why-titan" aria-labelledby="why-titan-heading" className={styles.whyTitan}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.headingRow}>
            <div>
              <p className={styles.eyebrow}><span aria-hidden />Why Titan</p>
              <h2 id="why-titan-heading" className={styles.title}>
                실전에서 증명한 <span>기술력.</span>
              </h2>
            </div>
            <p className={styles.introduction}>
              20년간 온라인게임과 대규모 웹서비스를 함께 개발해 온 팀이,
              오랜 운영 경험과 새로운 기술을 담아 Titan을 만들었습니다.
            </p>
          </div>
        </Reveal>

        <ul className={styles.strengthList}>
          {STRENGTHS.map((strength, index) => (
            <Reveal key={strength.icon} as="li" delay={index * 100} className={styles.strength}>
              <span className={styles.icon}><StrengthIcon type={strength.icon} /></span>
              <div>
                <h3>{strength.title}</h3>
                <p>{strength.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
