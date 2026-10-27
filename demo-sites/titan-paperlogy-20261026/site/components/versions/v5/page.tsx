import styles from "./theme.module.css"
import { SiteHeader } from "./site-header"
import { Hero } from "./hero"
import { Portfolio } from "./portfolio"
import { WhyTitan } from "./why-titan"
import { Solutions } from "./solutions"
import { Platform } from "./platform"
import { Support } from "./support"
import { Contact } from "./contact"
import { SiteFooter } from "./site-footer"
import { TelegramContact } from "./telegram-contact"

export default function Version5Page() {
  return (
    <div data-titan-version="v5" className={`light min-h-dvh bg-background text-foreground ${styles.page}`}>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        본문으로 이동
      </a>

      <SiteHeader />

      <main className="titan-page">
        <Hero />
        <Portfolio />
        <WhyTitan />
        <Solutions />
        <Platform />
        <Support />
        <Contact />
      </main>

      <SiteFooter />
      <TelegramContact />
    </div>
  )
}
