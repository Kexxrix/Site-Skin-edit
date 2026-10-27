"use client"

import { Reveal } from "./reveal"
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

function selectSolution(solution: (typeof SOLUTIONS)[number]["name"]) {
  window.dispatchEvent(new CustomEvent("titan:select-solution", { detail: { solution } }))
  document.getElementById("contact")?.scrollIntoView({
    behavior: "instant",
  })
}

export function Solutions() {
 return <section id="solutions" aria-labelledby="solutions-heading" className="v5-section"><div className="v5-wrap">
 <div className="v5-heading"><div><p className="v5-kicker">Solutions</p><h2 id="solutions-heading" className="v5-title">운영 범위에 맞는 <span>솔루션.</span></h2></div><p className="v5-desc">카지노·슬롯부터 스포츠북까지, 필요한 운영 범위에 맞춰 선택하세요.</p></div>
 <div className={styles.split}>{SOLUTIONS.map((s,i)=><Reveal key={s.type} className={styles.solution}><div className={styles.topline}><span>0{i+1}</span><span>{s.type==='casino'?'CASINO & SLOT':'SPORTS & CASINO'}</span></div><h3>{s.name}</h3><p className={styles.scope}>{s.scope}</p><p className={styles.description}>{s.description}</p><dl><div><dt>대표 관리 기능</dt><dd>{s.feature}</dd></div><div><dt>도입 방식</dt><dd>임대 · 분양</dd></div></dl><button onClick={()=>selectSolution(s.name)} className={styles.cta}>{s.cta}<span aria-hidden>↗</span></button></Reveal>)}</div>
 <p className={styles.note}>카지노·토지노 솔루션 모두 <strong>임대와 분양</strong>을 지원합니다. 임대로 시작한 뒤 분양으로 전환하는 방식도 가능합니다.</p>
 </div></section>
}
