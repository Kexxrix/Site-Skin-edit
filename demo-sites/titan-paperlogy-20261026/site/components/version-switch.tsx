import Link from "next/link"
import styles from "./version-switch.module.css"

export function VersionSwitch({ activeVersion }: { activeVersion: "v1" | "v2" | "v3" }) {
  return (
    <nav className={styles.versionSwitch} aria-label="디자인 버전 비교">
      {(["v1", "v2", "v3"] as const).map((version) => (
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
