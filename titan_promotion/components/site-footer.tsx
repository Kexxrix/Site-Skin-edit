export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex w-[calc(100%-48px)] max-w-[1280px] flex-col gap-6 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-block h-4 w-4 rounded-[4px] bg-primary shadow-[0_0_18px_-2px_var(--color-primary)]"
            />
            <span className="font-heading text-lg font-bold tracking-[-0.03em]">
              Titan Solution
            </span>
          </div>
          <p className="mt-3 text-sm text-[#d3cccc]">B2B 베팅 플랫폼 구축 및 운영 솔루션</p>
        </div>
        <p className="text-sm text-white/45">© {new Date().getFullYear()} Titan Solution</p>
      </div>
    </footer>
  )
}
