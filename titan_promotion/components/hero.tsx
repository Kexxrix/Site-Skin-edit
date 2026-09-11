import { Reveal } from "@/components/reveal"
import { PillButton } from "@/components/pill-button"
import { Counter } from "@/components/counter"
import styles from "./hero.module.css"

const STATS = [
  { to: 250, suffix: "+", unit: "개", label: "누적 서비스 런칭 업체", featured: true, animate: true },
  { to: 10, suffix: "+", unit: "년", label: "베팅 서비스 개발·운영", featured: false, animate: true },
  { to: 24, suffix: "", unit: "시간", label: "운영·기술 지원", featured: false, animate: false },
]

// Temporary preview video from Dizora; replace with the Titan introduction video.
const REFERENCE_VIDEO_ID = "-jokuknAtu8"
const REFERENCE_VIDEO_URL = `https://www.youtube-nocookie.com/embed/${REFERENCE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${REFERENCE_VIDEO_ID}&controls=0&rel=0&playsinline=1`

const TEAM_PHOTOS = [
  { src: "/assets/hero-team-generated-20260910/01-development-planning.png", width: 1122, height: 1402, position: "20% 50%" },
  { src: "/assets/hero-team-generated-20260910/02-customer-support.png", width: 1122, height: 1402, position: "50% 50%" },
  { src: "/assets/hero-team-generated-20260910/03-technical-meeting.png", width: 1122, height: 1402, position: "70% 50%" },
  { src: "/assets/hero-team-generated-20260910/04-idea-meeting.png", width: 1122, height: 1402, position: "50% 50%" },
]

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={styles.container}>
        <Reveal>
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

          <Reveal delay={160}>
            <div className={styles.actions}>
              <PillButton href="#portfolio">라이브 데모 보기</PillButton>
              <PillButton href="#contact" variant="secondary">
                도입 상담하기
              </PillButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <div className={styles.statsRow}>
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

            <p className={styles.subtitle}>
              <span>자체 개발 카지노·슬롯 벤더와 스포츠북, 통합머니·정산.</span>
              <span>사용자·파트너·백오피스까지 하나의 체계로 관리합니다.</span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className={styles.media}>
            <div className={styles.videoBox}>
              <iframe
                src={REFERENCE_VIDEO_URL}
                title="Dizora 레퍼런스 임시 소개 영상"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className={styles.videoFrame}
              />
            </div>

            <div
              className={styles.sideImage}
              role="img"
              aria-label="개발·기획 협업, 고객 상담, 기술 회의와 아이디어 회의를 보여주는 연출 사진"
            >
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
