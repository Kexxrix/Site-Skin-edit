"use client";

import type { ReactNode } from "react";

/** Layout only: tracker and detailed-market implementation must be supplied. */
export function AldebaranCenterR4({
  cards,
  moreControl,
  tracker,
  markets,
}: {
  cards: ReactNode;
  moreControl?: ReactNode;
  tracker: ReactNode;
  markets: ReactNode;
}) {
  return (
    <div className="ab-center4">
      <section className="ab-center4__list" aria-label="경기 목록">
        {cards}
        {moreControl}
      </section>
      <section className="ab-center4__detail" aria-label="선택 경기 상세">
        {tracker}
        {markets}
      </section>
    </div>
  );
}

export type AbTeam = { name: string; logoSrc: string };
export type AbOdd = {
  /** Use the existing app's stable selection ID, same on both sides. */
  id: string;
  label: string;
  /** Existing formatted value: preserve precision such as 2.125. */
  value: string;
  selected: boolean;
  disabled?: boolean;
  onToggle: () => void;
};

export function AbOddsButton({ odd }: { odd: AbOdd }) {
  return (
    <button
      type="button"
      className="ab-odd4"
      aria-pressed={odd.selected}
      disabled={odd.disabled}
      onClick={odd.onToggle}
      aria-label={`${odd.label}, 배당 ${odd.value}${odd.disabled ? ", 선택 불가" : ""}`}
    >
      <span className="ab-odd4__label">{odd.label}</span>
      <span className="ab-odd4__value">{odd.value}</span>
    </button>
  );
}

export type AbMatchCardProps = {
  id: string;
  leagueName: string;
  /** Pass the existing sport/league/flag images, not new placeholder assets. */
  leagueIcons?: ReactNode;
  timeText: string;
  statusText: string;
  status: "live" | "scheduled" | "finished";
  home: AbTeam;
  away: AbTeam;
  homeScore: number | null;
  awayScore: number | null;
  trackerSelected: boolean;
  onInspect: () => void;
  odds: readonly AbOdd[];
};

export function AbMatchCard({
  id, leagueName, leagueIcons, timeText, statusText, status,
  home, away, homeScore, awayScore, trackerSelected, onInspect, odds,
}: AbMatchCardProps) {
  const showScores = status !== "scheduled";
  return (
    <article className="ab-match4" data-match-id={id} data-tracker-selected={trackerSelected}>
      <button
        type="button"
        className="ab-match4__inspect"
        onClick={onInspect}
        aria-pressed={trackerSelected}
        aria-label={`${home.name} 대 ${away.name}, ${statusText}, 경기 상세 보기`}
      >
        <span className="ab-match4__meta">
          <span className="ab-match4__league">
            {leagueIcons}
            <span className="ab-match4__league-name" title={leagueName}>{leagueName}</span>
          </span>
          <span className="ab-match4__time">{timeText}</span>
          <span className="ab-match4__status" data-status={status}>{statusText}</span>
        </span>
        <span className="ab-match4__teams">
          <span className="ab-match4__team ab-match4__team--home">
            <img src={home.logoSrc} alt="" width={36} height={36} />
            <span className="ab-match4__name" title={home.name}>{home.name}</span>
          </span>
          <span className="ab-match4__center">
            <span className="ab-match4__vs">VS</span>
            {showScores ? (
              <span className="ab-match4__score" aria-label={`점수 ${homeScore ?? "미확인"} 대 ${awayScore ?? "미확인"}`}>
                <span>{homeScore ?? "–"}</span><span>:</span><span>{awayScore ?? "–"}</span>
              </span>
            ) : <span className="ab-match4__scheduled">예정</span>}
          </span>
          <span className="ab-match4__team ab-match4__team--away">
            <span className="ab-match4__name" title={away.name}>{away.name}</span>
            <img src={away.logoSrc} alt="" width={36} height={36} />
          </span>
        </span>
      </button>
      <div className="ab-match4__odds" role="group" aria-label={`${home.name} 대 ${away.name} 기본 배당`}>
        {odds.map(odd => <AbOddsButton key={odd.id} odd={odd} />)}
      </div>
    </article>
  );
}
