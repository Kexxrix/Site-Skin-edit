import { Users, Wallet, Activity, ArrowUpRight, Layers3, ShieldCheck } from 'lucide-react'
import styles from './platform.module.css'
export function Platform() {
 return <section id="platform" aria-labelledby="platform-heading" className={styles.platform}><div className="v5-wrap">
 <div className="v5-heading"><div><p className="v5-kicker">Platform</p><h2 id="platform-heading" className="v5-title">회원부터 정산까지, <span>운영을 한곳에서.</span></h2></div><p className="v5-desc">회원·파트너 관리와 통합머니, 운영 리포트를 하나의 백오피스로 연결합니다.</p></div>
 <div className={styles.workspace}>
  <div className={styles.diagram} role="img" aria-label="회원·파트너 관리, 통합머니·정산, 운영 리포트를 통합 백오피스로 연결하는 기능 구조도">
   <div className={styles.diagramHeading}><span>PLATFORM ARCHITECTURE</span><span>통합 운영 구조</span></div>
   <div className={styles.hub}><Layers3 size={32} strokeWidth={1.4}/><span>TITAN</span><strong>통합 백오피스</strong><small>관리 · 정산 · 모니터링</small></div>
   <div className={styles.nodes}><div><Users size={24}/><strong>회원·파트너</strong><span>계층 · 권한 관리</span></div><div><Wallet size={24}/><strong>통합머니</strong><span>지갑 · 입출금 · 정산</span></div><div><Activity size={24}/><strong>운영 리포트</strong><span>운영 현황 · 통계</span></div></div>
   <p className={styles.diagramNote}><ShieldCheck size={16}/> 사용자·파트너·관리자를 하나의 체계로 연결합니다.</p>
  </div>
  <div className={styles.features}><p className={styles.featureEyebrow}>핵심 운영 기능</p><h3>자동 정산부터<br/>실시간 모니터링까지.</h3><dl><div><dt><span>01</span>파트너 수익금 자동 정산</dt><dd>정산일에 파트너 수익금을 자동 계산하고, 분배할 금액을 백오피스에 기록합니다.</dd></div><div><dt><span>02</span>테더(USDT) 입출금</dt><dd>테더를 통한 입금과 출금을 모두 지원합니다.</dd></div><div><dt><span>03</span>운영 모니터링 <small>● 실시간</small></dt><dd>슬롯 고액 당첨, 스포츠 베팅 쏠림 등 주요 상황을 감지하고 알립니다.</dd></div></dl><a href="#contact" className="v5-link v5-primary">관리자·파트너 데모 상담 <ArrowUpRight size={18}/></a><p className={styles.note}>관리자·파트너 페이지는 도입 상담 과정에서 안내합니다.</p></div>
 </div>
 </div></section>
}
