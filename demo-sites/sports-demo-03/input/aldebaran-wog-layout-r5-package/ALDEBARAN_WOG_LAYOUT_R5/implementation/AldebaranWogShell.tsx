import type { ReactNode, Ref } from "react";

/** Integration scaffold, not a complete app. Keep this mounted across match changes.
 * Use the existing ALDEBARAN state/handlers to fill the slots.
 * gnb uses .ab5-gnb with brand / menus / spacer / account children.
 * notice contains .ab5-marquee and .ab5-notice-links siblings.
 */
export interface AldebaranWogShellProps {
  gnb: ReactNode;
  notice: ReactNode;
  leftRail: ReactNode;
  sportTabs: ReactNode;
  leagueList: ReactNode;
  matchHeading: ReactNode;
  marketTabs: ReactNode;
  markets: ReactNode;
  rightRail: ReactNode;
  listRef?: Ref<HTMLDivElement>;
  marketsRef?: Ref<HTMLDivElement>;
}
export function AldebaranWogShell(props: AldebaranWogShellProps) {
  return (
    <div className="ab5-shell">
      <header className="ab5-header">
        <div className="ab5-header-main">{props.gnb}</div>
        <div className="ab5-notice">{props.notice}</div>
      </header>
      <div className="ab5-body">
        <aside className="ab5-rail ab5-scroll" aria-label="좌측 사이드바" tabIndex={0}>
          <div className="ab5-left-stack">{props.leftRail}</div>
        </aside>
        <main className="ab5-center" aria-label="해외형 스포츠">
          <div className="ab5-center-surface">
            <div className="ab5-center-grid">
              <section className="ab5-pane" aria-label="경기 목록">
                <div className="ab5-sportbar">{props.sportTabs}</div>
                <div ref={props.listRef} className="ab5-list-scroll ab5-scroll"
                  role="region" aria-label="리그별 경기 목록" tabIndex={0}>
                  {props.leagueList}
                </div>
              </section>
              <section className="ab5-pane" aria-label="선택 경기 세부 베팅">
                <div className="ab5-match-heading">{props.matchHeading}</div>
                <div className="ab5-detail-panel">
                  <div className="ab5-market-tabs" role="group" aria-label="마켓 종류">
                    {props.marketTabs}
                  </div>
                  <div ref={props.marketsRef} className="ab5-market-scroll ab5-scroll"
                    role="region" aria-label="세부 마켓 목록" tabIndex={0}>
                    {props.markets}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        <aside className="ab5-rail ab5-scroll" aria-label="계정과 베팅슬립" tabIndex={0}>
          <div className="ab5-right-stack">{props.rightRail}</div>
        </aside>
      </div>
    </div>
  );
}
