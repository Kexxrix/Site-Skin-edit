import { PillButton } from "@/components/pill-button"
import { Reveal } from "@/components/reveal"
import styles from "./platform.module.css"

function PlatformIcon({ type }: { type: "settlement" | "wallet" | "alert" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {type === "settlement" ? (
        <>
          <path d="M20 7a9 9 0 0 0-15-2L2 8m0-5v5h5M4 17a9 9 0 0 0 15 2l3-3m0 5v-5h-5" />
          <path d="m8 12 3 3 5-6" />
        </>
      ) : type === "wallet" ? (
        <>
          <path d="M20 8V5H5a3 3 0 0 0 0 6h17v8H5a3 3 0 0 1-3-3V8" />
          <path d="M22 11h-5a2 2 0 0 0 0 4h5M18 13h.01" />
        </>
      ) : (
        <>
          <path d="m12 3 9 16H3L12 3Z" />
          <path d="M12 9v4m0 3h.01" />
        </>
      )}
    </svg>
  )
}

export function Platform() {
  return (
    <section id="platform" aria-labelledby="platform-heading" className={styles.platform}>
      <div className={styles.container}>
        <Reveal className={styles.copy}>
          <p className={styles.eyebrow}><span aria-hidden />Platform</p>
          <h2 id="platform-heading" className={styles.title}>
            회원부터 정산까지,<br /><span>운영을 한곳에서.</span>
          </h2>
          <p className={styles.description}>
            회원·파트너 관리와 통합머니, 운영 리포트를 하나의 백오피스로 연결합니다.
          </p>
          <dl className={styles.operations}>
            <div>
              <dt>회원·파트너 관리</dt>
              <dd>회원과 파트너의 계층·권한을 관리합니다.</dd>
            </div>
            <div>
              <dt>통합머니·운영 리포트</dt>
              <dd>지갑·정산과 운영 현황·통계를 함께 확인합니다.</dd>
            </div>
          </dl>
          <PillButton href="#contact" className={styles.consultButton}>
            관리자·파트너 데모 상담
          </PillButton>
          <p className={styles.consultNote}>관리자·파트너 페이지는 도입 상담 과정에서 안내합니다.</p>
        </Reveal>

        <Reveal delay={120} className={styles.showcase}>
          <div className={styles.photoFrame}>
            {/* Photo from the primary Dizora reference's Why Choose Us section.
                Source: https://kits.roxthemes.com/dizora/wp-content/uploads/2025/08/Accelerating-AI-Skills-9_small.webp */}
            <img
              src="/assets/platform-team.webp"
              alt="사무실에서 모니터와 자료를 확인하며 업무를 수행하는 팀"
              width={2500}
              height={2932}
              loading="lazy"
              decoding="async"
              className={styles.photo}
            />
          </div>
          <div className={styles.featurePanel}>
            <p className={styles.panelEyebrow}>운영의 핵심까지</p>
            <h3>자동 정산부터<br />실시간 모니터링까지.</h3>
            <dl className={styles.features}>
              <div>
                <dt>
                  <span className={styles.featureIcon}><PlatformIcon type="settlement" /></span>
                  파트너 수익금 자동 정산
                </dt>
                <dd>정산일에 파트너 수익금을 자동 계산하고, 분배할 금액을 백오피스에 기록합니다.</dd>
              </div>
              <div>
                <dt>
                  <span className={styles.featureIcon}><PlatformIcon type="wallet" /></span>
                  테더(USDT) 입출금
                </dt>
                <dd>테더를 통한 입금과 출금을 모두 지원합니다.</dd>
              </div>
              <div>
                <dt>
                  <span className={styles.featureIcon}><PlatformIcon type="alert" /></span>
                  <span className={styles.monitorLabel}>
                    운영 모니터링
                    <span className={styles.liveBadge}><span aria-hidden />실시간</span>
                  </span>
                </dt>
                <dd>슬롯 고액 당첨, 스포츠 베팅 쏠림 등 주요 상황을 감지하고 알립니다.</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
