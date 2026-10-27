import type { Metadata } from "next"
import { VersionSwitch } from "@/components/version-switch"
import Version1Page from "@/components/versions/v1/page"
import Version2Page from "@/components/versions/v2/page"
import Version4Page from "@/components/versions/v4/page"
import Version5Page from "@/components/versions/v5/page"
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

type PageProps = {
  searchParams: Promise<{ version?: string | string[] }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { version } = await searchParams
  return version === "v2"
    ? {
        title: "Titan Solution — V2 · B2B 베팅 플랫폼",
        description: "자체 개발 스포츠북, 카지노·슬롯, 통합머니·정산, 백오피스를 하나의 체계로 제공하는 B2B 베팅 플랫폼.",
      }
    : { title: `Titan Solution — ${version === "v1" ? "V1" : version === "v4" ? "V4" : version === "v5" ? "V5" : "V3"} · B2B 베팅 플랫폼` }
}

export default async function Page({ searchParams }: PageProps) {
  const { version: requestedVersion } = await searchParams
  const version = requestedVersion === "v1" || requestedVersion === "v2" || requestedVersion === "v4" || requestedVersion === "v5" ? requestedVersion : "v3"

  return (
    <>
      <VersionSwitch activeVersion={version} />
      {version === "v1" ? <Version1Page /> : version === "v2" ? <Version2Page /> : version === "v4" ? <Version4Page /> : version === "v5" ? <Version5Page /> : (
        <div className="min-h-dvh bg-background text-foreground">
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
      )}
    </>
  )
}
