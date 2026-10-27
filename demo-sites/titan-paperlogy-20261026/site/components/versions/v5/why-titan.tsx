import { Reveal } from "./reveal"
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

export function WhyTitan() {
 return <section id="why-titan" aria-labelledby="why-titan-heading" className={styles.whyTitan}><div className="v5-wrap">
 <div className="v5-heading"><div><p className="v5-kicker">Why Titan</p><h2 id="why-titan-heading" className="v5-title">실전에서 증명한 <span>기술력.</span></h2></div><p className="v5-desc">20년간 온라인게임과 대규모 웹서비스를 함께 개발해 온 팀이, 오랜 운영 경험과 새로운 기술을 담아 Titan을 만들었습니다.</p></div>
 <ul className={styles.strengthList}>{STRENGTHS.map((s,i)=><Reveal as="li" key={s.icon} className={styles.strength}><span className={styles.number} aria-hidden>0{i+1}</span><h3>{s.title}</h3><p>{s.description}</p></Reveal>)}</ul>
 </div></section>
}
