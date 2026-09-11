import styles from "./telegram-contact.module.css"

export function TelegramContact() {
  return (
    <div className={styles.contact}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        focusable="false"
        className={styles.icon}
      >
        <path d="m9.78 18.65.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.28-.89-.89.2-1.33L19.81 4.5c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.06-1.99 1.93c-.23.23-.42.42-.83.42Z" />
      </svg>
      <span className="sr-only">Telegram </span>
      <span>즉시상담</span>
      <span className="sr-only"> (연결 준비 중)</span>
    </div>
  )
}
