# ALDEBARAN White · 배당 텍스트 후속 독립 QA

최종 판정: **검사 범위 통과, 새 제품 결함 0건**. 기본 배당은 `#41433f`, 선택 배당과 팀명은 `#2b2b27`입니다. 현재 주황 배경을 유지할 때 어두운 선택 글자가 흰색보다 잘 읽힙니다. 배경·폰트·치수·아이콘·데이터·계산 변경은 발견하지 못했습니다.

대상은 `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-03-white/site`, `http://127.0.0.1:5384/`입니다. 현재 title/body도 ALDEBARAN 화이트를 확인했습니다. 새 비영구 headless Chrome/Playwright 컨텍스트만 사용했고 모든 검수 Chrome을 닫았습니다. 앱, 사용자 브라우저/저장값/GUI, IAB, 서버, 다크 스킨, MERCURY, Git, 배포는 조작하지 않았습니다. 새 기록은 본 `.qa/independent-odds-20261006-182056/`뿐입니다.

## 실제 색과 대비

중앙 목록과 상세 마켓에서 각각 아래 7상태를 확인했습니다. 숫자 14px, 팀명 12px이며 두 요소의 글자색은 모두 일치합니다. focus-visible은 기존 `rgb(154,67,31) solid 2px` outline으로 표시됩니다.

| 상태 | 글자 | 배경 | 실제 대비 | 같은 배경의 흰색 대비 |
| --- | --- | --- | --- | --- |
| 기본 / 기본+focus | #41433f | #fafaf8 | 9.571538:1 | 1.045062:1 |
| 일반 hover | #41433f | #e1e1dd | 7.628691:1 | 1.311214:1 |
| 선택 / 선택+focus | #2b2b27 | #ff641f | 4.801583:1 | 2.959975:1 |
| 선택+hover / 선택+focus+hover | #2b2b27 | #ff793d | 5.451083:1 | 2.607292:1 |

현재 기본/선택 배경과 focus 표시를 보존하면서 배당을 읽을 수 있습니다. 흰색은 선택 주황 위에서 대비가 약해 작은 숫자와 팀명에 적합하지 않습니다. 실제 픽셀에서는 기본 숫자의 황토색 인상이 없어지고, 선택 주황은 기존처럼 충분히 구분됩니다.

## 변경 부위 검사

- 중앙 목록·상세의 활성 기본 배당 **566개 모두 `rgb(65,67,63)`**이며 황토색 잔여 배당은 0개입니다.
- 목록·상세 각각 기본, hover, focus, 선택, 선택+hover, 선택+focus, 선택+focus+hover의 정착 색을 직접 측정했습니다. 선택 숫자와 팀명의 색은 동일합니다.
- 슬립 개별 배당과 총 배당은 #41433f입니다. 잔액·예상 당첨금은 기존 #a3441e를 유지했습니다. 방문자 상태에서 `1.56 × 5,000 = 7,800`이고 제출 버튼은 비활성입니다.
- 확인창 `.confirm-picks b`와 `.ab5-summary-odds`만 #41433f입니다. 5,000원과 예상 7,800원, 부모 금액 강조색 #a3441e를 보존했습니다.
- 내역 `.history-pick b`와 `.ab5-summary-odds`는 #41433f입니다. `₩ 5,000 ×`는 기존 muted #63655f, 예상 7,800원은 기존 #a3441e입니다.
- 공지 링크·사진 배너 문구·계정 잔액의 실제 색은 변경 전 CSS 참조 페이지와 동일합니다.
- 1920 초기 화면의 geometry·폰트·배경·본문·selection ID와 아이콘 표시가 baseline CSS 참조 페이지와 같았습니다. 1366 정착 비교도 1,775개 요소의 geometry/font/background 차이 0, 본문/selection ID 동일, 기존 전체 가로 폭 1920px입니다.
- 확인·내역의 두 inline span은 부모 및 대표 요소 geometry/font/background와 본문 문자열을 바꾸지 않았습니다. 격리 참조 페이지에서 before CSS 적용 후 해당 span을 풀어 기존 DOM을 복원해 비교했습니다. 앱·서버는 변경하지 않았습니다.

## 원시 측정과 재검증 구분

`browser-odds.json`의 최초 15조건 중 13개는 즉시 PASS였고, 선택 상태/1366 비교 2개는 기존 CSS 색·배경 전환 도중 측정돼 raw FAIL로 기록됐습니다. 이 로그를 지우거나 덮어쓰지 않았습니다.

해당 부위만 `recheck-stable.json`에서 동작 후 250ms 정착시키고 재측정했습니다. 목록·상세의 14상태, 정확한 선택/hover 배경, 1366 geometry/font/background, 로컬 상태 등 **재검증 6/6 PASS**입니다. 첫 측정의 중간 프레임은 제품 결함으로 재현되지 않았고, 앱 소스 수정 없이 해소됐습니다. 최종 미해결 FAIL은 0개입니다.

## 소스·자산 보존

독립 소스 검수 UTC: `2026-10-06T09:22:51.817448+00:00` → `2026-10-06T09:28:09.721316+00:00`.

| 고정 파일 | 최종 bytes | 최종 SHA-256 | 시작/종료 일치 |
| --- | --- | --- | --- |
| app/aldebaran-white.css | 8062 | fe1d52fa8eecba060ccf3ad50ec8b7ed29795b97e7236bebfab56067a2940c1f | PASS |
| app/page.tsx | 10379 | a3b76f3c0a5acee702f08f1beb11217ec19bbb147482a5c9a2ebce9702c0ff15 | PASS |
| app/aldebaran-wog-r5.tsx | 29631 | 5a3c1b4d65f6455831b70aa7945bdcc9dbf6b147c7b405d0911af2e04d9e655e | PASS |

- 적용 전 `baseline-files.json`의 393개 중 변경은 CSS/page 두 파일뿐이고 나머지 391개는 원래 해시를 보존했습니다. 검수 시작→종료 **393/393 동일**입니다.
- 보호 다크 원본 **320/320**은 baseline 및 시작→종료 모두 동일합니다.
- 승인 PNG **18/18**은 앞선 독립 QA의 `static-end.json`과 모두 일치합니다. 승인 아이콘 CSS 블록도 exact bytes로 같았습니다.
- CSS diff의 모든 비색상 선언은 동일합니다. page에서 두 `ab5-summary-odds` inline span만 제거하면 before-app/page.tsx와 byte-identical입니다. 따라서 다른 문자열·계산·handlers는 보존됐습니다.
- 근거: `source-start.json`, `source-end.json`, `aldebaran-white.css.diff`, `page.tsx.diff`.

## 타입·lint·환경

- 독립 `tsc --noEmit --incremental false`: **exit 0**.
- 관련 page full lint: **exit 1**, 기존 진단 **1→1**, 독립 before/current 정적 비교에서 새 진단 **0**. 전체 lint PASS로 기록하지 않습니다.
- 관련 page error, 로컬 요청 실패/HTTP 오류, 초기 누락 이미지: **0**.
- 외부 `use.typekit.net/aqm4sxy.css`는 현재와 baseline 참조 모두 HTTP412/ERR_ABORTED입니다. 구현자가 전달한 sandbox Adobe 차단과 구분해 실제 관측값을 기록했으며, 이번 배당 변경 결함으로 분류하지 않습니다.
- 독립 build는 재실행하지 않았습니다. 구현자의 build/type 성공은 전달받은 별도 결과입니다.

## 미실행 및 제한

확인/내역 검수에는 **QA-FIXTURE-NO-TRANSACTION**이라는 가짜 격리 localStorage만 사용했습니다. 로그인 버튼·계정 수정·충전·환전·베팅 확정은 실행하지 않았고, 제출 버튼 차단 기록과 GET/HEAD 외 요청 모두 0건입니다. 가짜 balance=1,000,000 및 단일 history fixture가 검사 후 그대로였습니다.

실제 사용자 계정·거래, 완료/정산 화면, 다른 브라우저/운영체제, 새 전체 접근성 감사, 390px 후속 재검사는 미실행입니다. 390px 기존 레이아웃 검증은 앞선 아이콘 독립 QA 결과가 있으며 이번 CSS에는 geometry 변경이 없습니다. 변경 부위 필수 검수는 완료했고 남은 수정 요청/차단 이슈는 없습니다.

실제 화면 3장: [선택 목록·상세·슬립](01-selected-list-detail-slip.png), [확인창—제출 없음](02-confirmation-no-submit.png), [내역—가짜 fixture](03-history-synthetic-fixture.png). 상태·대비는 `recheck-stable.json`, 팝업/금액·기본 전체 색은 `browser-odds.json`, 타입/lint는 `code-checks.json`에 기록했습니다.
