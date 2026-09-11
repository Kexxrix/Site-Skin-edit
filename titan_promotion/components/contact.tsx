"use client"

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react"
import { PillButton } from "@/components/pill-button"
import { DEMOS } from "@/lib/demos"
import styles from "./contact.module.css"

export function Contact() {
  const [company, setCompany] = useState("")
  const [person, setPerson] = useState("")
  const [contactMethod, setContactMethod] = useState("")
  const [projectType, setProjectType] = useState("")
  const [solution, setSolution] = useState("")
  const [selectedDemo, setSelectedDemo] = useState("")
  const [consultationMessage, setConsultationMessage] = useState("")
  const [consent, setConsent] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const solutionRef = useRef<HTMLSelectElement>(null)
  const pendingSolutionFocus = useRef(false)

  const selectDemo = useCallback((demoName: string) => {
    const demo = DEMOS.find((item) => item.name === demoName)
    setSelectedDemo(demo?.name ?? "")
    if (demo) setSolution(demo.solution)
  }, [])

  const selectSolution = useCallback((nextSolution: string) => {
    setSolution(nextSolution)
    setSelectedDemo((currentDemo) => {
      const demo = DEMOS.find((item) => item.name === currentDemo)
      return demo?.solution === nextSolution ? currentDemo : ""
    })
  }, [])

  useEffect(() => {
    function onSelect(e: Event) {
      const detail = (e as CustomEvent<{ demo: string; solution: string }>).detail
      if (!detail) return
      selectDemo(detail.demo)
      setSubmitted(false)
    }

    function onSelectSolution(e: Event) {
      const detail = (e as CustomEvent<{ solution: string }>).detail
      if (detail?.solution !== "카지노 솔루션" && detail?.solution !== "토지노 솔루션") return

      selectSolution(detail.solution)
      setSubmitted(false)
      if (solutionRef.current) {
        solutionRef.current.focus({ preventScroll: true })
      } else {
        pendingSolutionFocus.current = true
      }
    }

    window.addEventListener("titan:select-demo", onSelect as EventListener)
    window.addEventListener("titan:select-solution", onSelectSolution as EventListener)
    return () => {
      window.removeEventListener("titan:select-demo", onSelect as EventListener)
      window.removeEventListener("titan:select-solution", onSelectSolution as EventListener)
    }
  }, [selectDemo, selectSolution])

  useEffect(() => {
    if (submitted || !pendingSolutionFocus.current) return
    solutionRef.current?.focus({ preventScroll: true })
    pendingSolutionFocus.current = false
  }, [submitted])

  const consented = consent === "on"
  const valid =
    person.trim() && contactMethod.trim() && projectType && solution && consented

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!valid) return
    setSubmitted(true)
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <div aria-hidden className={`${styles.glow} animate-glow`} />
            <p className={styles.eyebrow}>
              <span aria-hidden />
              Contact
            </p>
            <h2 id="contact-heading" className={styles.title}>
              도입 <span>상담</span>
            </h2>
            <p className={styles.description}>
              신규 구축이나 기존 서비스 전환을 검토하고 있다면, 현재 상황과 필요한 내용을 알려주세요.
              관심 솔루션과 선호하는 화면을 바탕으로 도입 방향을 함께 확인합니다.
            </p>
          </div>

          <div className={styles.card}>
            {submitted ? (
              <div className={styles.success}>
                <span aria-hidden className={styles.successIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className={styles.successTitle}>입력이 확인되었습니다.</p>
                <p className={styles.successNote}>
                  현재 페이지는 검토용으로, 상담 요청이 실제로 전송되지 않습니다.
                </p>
                <PillButton
                  variant="secondary"
                  className={styles.reset}
                  onClick={() => setSubmitted(false)}
                >
                  다시 입력하기
                </PillButton>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className={styles.grid}>
                  <div className={styles.field}>
                    <label htmlFor="company" className={styles.label}>
                      회사·팀명 (선택)
                    </label>
                    <input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      autoComplete="organization"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="person" className={styles.label}>
                      담당자명 *
                    </label>
                    <input
                      id="person"
                      value={person}
                      onChange={(e) => setPerson(e.target.value)}
                      autoComplete="name"
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className={`${styles.field} ${styles.fieldWide}`}>
                    <label htmlFor="contact-method" className={styles.label}>
                      회신 연락처 *
                    </label>
                    <input
                      id="contact-method"
                      value={contactMethod}
                      onChange={(e) => setContactMethod(e.target.value)}
                      placeholder="예: @telegram_id"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      aria-describedby="contact-method-hint"
                      required
                      className={styles.input}
                    />
                    <p id="contact-method-hint" className={styles.fieldHint}>
                      텔레그램 ID, 전화번호 또는 이메일 중 회신받을 연락처를 하나만 남겨주세요.
                    </p>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="project-type" className={styles.label}>
                      도입 유형 *
                    </label>
                    <select
                      id="project-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      required
                      className={styles.input}
                    >
                      <option value="">선택하세요</option>
                      <option>신규 론칭</option>
                      <option>기존 서비스 전환</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="solution" className={styles.label}>
                      관심 솔루션 *
                    </label>
                    <select
                      id="solution"
                      ref={solutionRef}
                      value={solution}
                      onChange={(e) => selectSolution(e.target.value)}
                      required
                      className={styles.input}
                    >
                      <option value="">선택하세요</option>
                      <option>토지노 솔루션</option>
                      <option>카지노 솔루션</option>
                      <option>상담 후 결정</option>
                    </select>
                  </div>
                  <div className={`${styles.field} ${styles.fieldWide}`}>
                    <label htmlFor="selected-demo" className={styles.label}>
                      선택한 데모 (선택)
                    </label>
                    <select
                      id="selected-demo"
                      value={selectedDemo}
                      onChange={(e) => selectDemo(e.target.value)}
                      aria-describedby="selected-demo-hint"
                      className={styles.input}
                    >
                      <option value="">선택하세요</option>
                      {DEMOS.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    <p id="selected-demo-hint" className={styles.fieldHint}>
                      포트폴리오에서 &ldquo;상담에 추가&rdquo;를 누르면 선택한 데모가 자동으로 채워집니다.
                    </p>
                  </div>
                  <div className={`${styles.field} ${styles.fieldWide}`}>
                    <label htmlFor="consultation-message" className={styles.label}>
                      상담 내용 (선택)
                    </label>
                    <textarea
                      id="consultation-message"
                      value={consultationMessage}
                      onChange={(e) => setConsultationMessage(e.target.value)}
                      placeholder="현재 운영 상황, 변경하고 싶은 부분이나 궁금한 내용을 알려주세요."
                      rows={5}
                      className={`${styles.input} ${styles.textarea}`}
                    />
                  </div>
                </div>

                <label className={styles.consent}>
                  <input
                    type="checkbox"
                    checked={consented}
                    onChange={(e) => setConsent(e.target.checked ? "on" : "")}
                    required
                    className={styles.checkbox}
                  />
                  <span>[필수] 개인정보 수집·이용에 동의합니다.</span>
                </label>

                <PillButton type="submit" disabled={!valid} className={styles.submit}>
                  상담 요청하기
                </PillButton>

                <p className={styles.note}>
                  현재 페이지는 검토용으로, 상담 요청이 전송되지 않습니다.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
