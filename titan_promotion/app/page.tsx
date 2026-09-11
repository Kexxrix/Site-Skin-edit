import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { WhyTitan } from "@/components/why-titan"
import { Solutions } from "@/components/solutions"
import { Platform } from "@/components/platform"
import { Support } from "@/components/support"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"
import { TelegramContact } from "@/components/telegram-contact"

export default function Page() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
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
