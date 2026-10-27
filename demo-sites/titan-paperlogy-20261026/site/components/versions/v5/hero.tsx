import styles from './hero.module.css'
export function Hero() {
 return <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
  <div className={styles.container}>
   <div className={styles.intro}>
    <div><p className="v5-kicker">B2B Betting Platform</p><h1 id="hero-heading">신규 출시, 교체, 확장까지<br/><span>즉시 운영 가능한 토지노, 카지노 솔루션</span></h1></div>
    <div className={styles.copy}><p>자체 개발 카지노·슬롯 벤더와 스포츠북, 통합머니·정산.<br/>사용자·파트너·백오피스까지 하나의 체계로 관리합니다.</p><div className={styles.actions}><a className="v5-link v5-primary" href="#portfolio">라이브 데모 보기 <span aria-hidden>↗</span></a><a className="v5-link" href="#contact">도입 상담하기 <span aria-hidden>↗</span></a></div></div>
   </div>
   <div className={styles.stage}><video src="/videos/TITAN-KO-5scene-19s-v003.mp4" aria-label="TITAN Solution 소개 영상" autoPlay muted loop playsInline preload="metadata"><a href="/videos/TITAN-KO-5scene-19s-v003.mp4">소개 영상 보기</a></video></div>
   <div className={styles.metrics}><dl><div><dt>누적 서비스 런칭 업체</dt><dd><strong>250</strong>개<span>+</span></dd></div><div><dt>베팅 서비스 개발·운영</dt><dd><strong>10</strong>년<span>+</span></dd></div><div><dt>운영·기술 지원</dt><dd><strong>24</strong>시간</dd></div></dl><p>실적·업력: 2026년 1월 기준</p></div>
  </div>
 </section>
}
