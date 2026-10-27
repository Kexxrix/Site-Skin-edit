import { Outfit, Poppins, Geist_Mono } from "next/font/google"
import styles from "./page.module.css"
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

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export default function Version1Page() {
  return (
    <div lang="ko" className={`min-h-dvh bg-background text-foreground ${outfit.variable} ${poppins.variable} ${geistMono.variable} ${styles.page}`}>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        본문으로 이동
      </a>

      <SiteHeader />

      <main>
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
