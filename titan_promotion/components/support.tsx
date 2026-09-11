import { Reveal } from "@/components/reveal"
import styles from "./support.module.css"

// Photos from the primary Dizora reference's Blog and Projects sections.
// Source base: https://kits.roxthemes.com/dizora/wp-content/uploads/2025/07/
// discovery: Rectangle-161124231-3.png.jpeg
// design: Photo-Retouching-Agency-2048x1365-1.jpg
// testing: multiethnic-women-game-designer-looking-at-compute.jpg
// operations: an-in-depth-look-at-zoom-sdk-features-for-windows-developers-unlocking.jpeg
const STEPS = [
  {
    step: "01",
    title: "도입 범위 협의",
    desc: "관심 솔루션, 임대·분양 방식, 선호 샘플이나 레퍼런스를 확인합니다.",
    image: "/assets/support-discovery.jpg",
    alt: "회의실에서 자료와 요구사항을 검토하는 팀",
  },
  {
    step: "02",
    title: "브랜드·화면 구성",
    desc: "로고 교체부터 테마 변경, 새로운 화면 제작까지 요청 범위에 맞춰 구성합니다.",
    image: "/assets/support-design.jpg",
    alt: "모니터로 디자인과 콘텐츠를 편집하는 작업자",
  },
  {
    step: "03",
    title: "연동·운영 확인",
    desc: "게임·입출금 등 주요 동작과 운영 설정을 확인하고 백오피스 사용을 준비합니다.",
    image: "/assets/support-testing.jpg",
    alt: "작업 화면을 함께 확인하며 검토하는 개발팀",
  },
  {
    step: "04",
    title: "오픈·운영 지원",
    desc: "서비스 오픈과 고객사의 운영·기술 문의를 지원합니다.",
    image: "/assets/support-operations.jpg",
    alt: "화면의 콘텐츠를 함께 확인하고 의견을 나누는 팀",
  },
]

const FAQS = [
  {
    question: "임대와 분양 모두 가능한가요?",
    answers: [
      "임대와 분양 모두 가능합니다. 임대로 서비스를 시작한 뒤 분양으로 전환하는 방식도 지원합니다.",
    ],
  },
  {
    question: "기본 제공 범위는 어디까지인가요?",
    answers: [
      "선택한 솔루션에 맞는 사용자·관리자·파트너 페이지와 서비스 배포, 평생주소(한글 도메인) 사이트의 구축·운영까지 제공합니다. 필요에 따라 USDT 입출금과 자동 입금 감지 기능도 지원합니다.",
    ],
  },
  {
    question: "기존 서비스를 운영하면서 전환할 수 있나요?",
    answers: [
      "새 서비스를 준비한 뒤 기존 서비스를 운영하면서 회원을 순차적으로 유도하는 방식으로 전환할 수 있습니다. 회원 안내와 전환 운영은 고객사 운영팀이 진행하며, Titan은 신규 서비스 구축과 관련 운영·기술 지원을 제공합니다.",
      "다수의 사이트를 운영하는 대형 운영사 두 곳의 서비스 전환을 지원한 경험이 있습니다.",
    ],
  },
  {
    question: "도입까지 얼마나 걸리나요?",
    answers: [
      "기존 샘플에 로고를 교체하는 기본 구성은 빠르면 하루 안에 구축할 수 있습니다. 일반 신규 구축은 토지노 기준 최대 2주이며, 전면 디자인 변경·신규 페이지 제작·추가 기능 요청은 별도 일정으로 협의합니다. 토지노는 백오피스 기능을 익히는 시간도 함께 고려합니다.",
    ],
  },
  {
    question: "화면을 원하는 형태로 변경할 수 있나요?",
    answers: [
      "로고 교체와 컬러 테마 변경부터 전면 개편, 새로운 사용자 페이지 제작까지 의뢰할 수 있습니다. 변경 범위에 따라 제작 일정이 달라집니다.",
    ],
  },
  {
    question: "상담 전에 무엇을 준비하면 되나요?",
    answers: [
      "카지노 또는 토지노 중 관심 있는 솔루션과 선호하는 샘플을 알려주세요. 원하는 샘플이 없다면 참고할 사이트를 전달해주셔도 됩니다. 브랜드가 준비돼 있다면 관련 자료를 함께 전달해주세요.",
    ],
  },
  {
    question: "오픈 이후에는 어떤 지원을 받을 수 있나요?",
    answers: [
      "운영·기술 문의, 오류와 장애 대응, 운영 설정 등 서비스 운영에 필요한 지원을 제공합니다. 기능 변경과 추가 요청은 내용을 검토해 대응 가능 여부를 안내합니다. 회원·영업파트너 응대와 실제 운영 업무는 고객사가 담당하며, 이를 위한 문의·공지 기능이 시스템에 마련돼 있습니다.",
    ],
  },
]

export function Support() {
  return (
    <section id="support" aria-labelledby="support-heading" className={styles.support}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.headingRow}>
            <div>
              <p className={styles.eyebrow}><span aria-hidden />Build &amp; Support</p>
              <h2 id="support-heading" className={styles.title}>
                도입부터 운영까지,{" "}<span>함께합니다.</span>
              </h2>
            </div>
            <p className={styles.description}>
              신규 구축부터 기존 서비스의 전환까지, 현재 환경에 맞춰 도입 범위를 협의합니다.
            </p>
          </div>
        </Reveal>

        <ol className={styles.steps} aria-label="도입 진행 과정">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.step}
              delay={i * 90}
              as="li"
              className={styles.step}
            >
              <article className={styles.card}>
                <div className={styles.photoFrame}>
                  <img
                    src={s.image}
                    alt={s.alt}
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className={styles.photo}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>
                    <span className={styles.stepNumber} aria-hidden>{s.step}</span>
                    <h3>{s.title}</h3>
                  </div>
                  <p>{s.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>

        <section id="adoption-guide" aria-labelledby="adoption-guide-heading" className={styles.faq}>
          <Reveal>
            <p className={styles.eyebrow}><span aria-hidden />FAQ</p>
            <h2 id="adoption-guide-heading" className={styles.faqTitle}>
              도입 전,<br /><span>확인하세요.</span>
            </h2>
            <p className={styles.faqDescription}>
              임대·분양부터 서비스 전환과 운영 지원까지, 도입에 필요한 내용을 안내합니다.
            </p>
          </Reveal>
          <Reveal>
            <div className={styles.faqList}>
              {FAQS.map((faq, index) => (
                <details key={faq.question} name="adoption-faq" open={index === 0} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>
                    <span>{faq.question}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className={styles.faqAnswer}>
                    {faq.answers.map((answer) => <p key={answer}>{answer}</p>)}
                  </div>
                </details>
              ))}
            </div>
          </Reveal>
        </section>
      </div>
    </section>
  )
}
