import { Reveal } from "./reveal"
import { PillButton } from "./pill-button"
import { Counter } from "./counter"
import styles from "./hero.module.css"

const STATS = [
  { to: 250, suffix: "+", unit: "개", label: "누적 서비스 런칭 업체", featured: true, animate: true },
  { to: 10, suffix: "+", unit: "년", label: "베팅 서비스 개발·운영", featured: false, animate: true },
  { to: 24, suffix: "", unit: "시간", label: "운영·기술 지원", featured: false, animate: false },
]

const TITAN_VIDEO_URL = "/videos/TITAN-KO-5scene-19s-v003.mp4"

const TEAM_PHOTOS = [
  { src: "/assets/hero-team-user-20260915/디지털 아트에 몰입한 크리에이티브 디자이너04.png", width: 1086, height: 1448, position: "50% 50%" },
  { src: "/assets/hero-team-user-20260915/탁월한 기술력_03.png", width: 1086, height: 1448, position: "50% 50%" },
  { src: "/assets/hero-team-user-20260915/파트너의 경제적 성공02.png", width: 1086, height: 1448, position: "50% 50%" },
  { src: "/assets/hero-team-user-20260915/역동적인 개발팀_02.png", width: 1086, height: 1448, position: "50% 50%" },
]

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={styles.container}>
        <Reveal className={styles.eyebrowReveal}>
          <p className={styles.eyebrow}>
            <span aria-hidden className={styles.eyebrowDot} />
            B2B Betting Platform
          </p>
        </Reveal>

        <div className={styles.headRow}>
          <Reveal delay={80}>
            <h1 id="hero-heading" className={styles.title}>
              신규 출시, 교체, 확장까지{" "}
              <span className={styles.titleAccent}>즉시 운영 가능한 토지노, 카지노 솔루션</span>
            </h1>
          </Reveal>

        </div>

        <Reveal className={styles.introReveal} delay={160}>
            <div className={styles.intro}>
              <p className={styles.subtitle}>
                <span>자체 개발 카지노·슬롯 벤더와 스포츠북, 통합머니·정산.</span>
                <span>사용자·파트너·백오피스까지 하나의 체계로 관리합니다.</span>
              </p>
              <div className={styles.actions}>
                <PillButton href="#portfolio">라이브 데모 보기</PillButton>
                <PillButton href="#contact" variant="secondary">
                  도입 상담하기
                </PillButton>
              </div>
            </div>
        </Reveal>

        <Reveal className={styles.statsReveal} delay={320}>
            <div className={styles.statsGroup}>
              <dl className={styles.stats} aria-label="도입 실적과 운영·지원 경험" aria-describedby="hero-stats-note">
                {STATS.map((stat) => (
                  <div key={stat.label} className={`${styles.stat} ${stat.featured ? styles.featuredStat : ""}`}>
                    <dt className={styles.statLabel}>{stat.label}</dt>
                    <dd className={styles.statValue}>
                      <span>{stat.animate ? <Counter to={stat.to} /> : stat.to}</span>
                      <span className={styles.statUnit}>{stat.unit}</span>
                      {stat.suffix && <span className={styles.statSuffix}>{stat.suffix}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
              <p id="hero-stats-note" className={styles.statsNote}>실적·업력: 2026년 1월 기준</p>
            </div>

        </Reveal>
        <Reveal className={styles.mediaReveal} delay={240}>
          <div className={styles.media}>
            <div className={styles.videoBox}>
              <video
                src={TITAN_VIDEO_URL}
                aria-label="TITAN Solution 소개 영상"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className={styles.videoFrame}
              >
                <a href={TITAN_VIDEO_URL}>TITAN 소개 영상 보기</a>
              </video>
            </div>

            <div className={styles.sideImage} role="img" aria-label="디자인 작업, 기술 운영, 파트너십과 개발팀 협업을 보여주는 연출 사진">
              {TEAM_PHOTOS.map((photo, index) => (
                <img
                  key={photo.src}
                  src={photo.src}
                  alt=""
                  width={photo.width}
                  height={photo.height}
                  className={styles.sideImg}
                  style={{ objectPosition: photo.position, animationDelay: `${-20 + index * 5}s` }}
                />
              ))}
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  )
}
