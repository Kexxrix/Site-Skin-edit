import Link from "next/link"
import styles from "./version-switch.module.css"

export function VersionSwitch({ activeVersion }: { activeVersion: "v1" | "v2" | "v3" | "v4" | "v5" }) {
  return (
    <nav className={`${styles.versionSwitch} ${activeVersion === "v4" || activeVersion === "v5" ? styles.light : ""}`} aria-label="디자인 버전 비교">
      {(["v1", "v2", "v3", "v4", "v5"] as const).map((version) => (
        <Link
          key={version}
          href={`/?version=${version}#top`}
          aria-current={activeVersion === version ? "page" : undefined}
        >
          {version.toUpperCase()}
        </Link>
      ))}
    </nav>
  )
}
