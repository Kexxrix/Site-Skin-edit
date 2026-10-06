# ALDEBARAN White — ALDEBARAN-2 PUBLIC v1 / 2026-10-06

- 사용자 요청에 따라 현재 승인본을 별도 [ALDEBARAN-2](https://aldebaran-2.kexxadrix.chatgpt.site/)로 공개 배포했다. PUBLIC v1, `succeeded`, 2026-10-06 19:03:56 KST.
- 앱 소스 `5459f3425a1388c2d978747ff43a4364b16bfe94`. 설정 2개만 배포용으로 변경했고 승인된 화면·계산·자산은 유지했다.
- 공개 화면: 이미지 166개·v3 PNG 18종 정상, 콘솔 warning/error 0, 주황 보유머니·당첨금과 흑연 배당 확인. 배당 선택·계산·초기화·고객센터 검증 통과.
- 통합 GitHub 백업 명세는 `backup/site-snapshots/20261006-aldebaran-white-v1/`. 소스·문서·검수·관련 자산 이력을 포함하며 원격 검증 근거는 `E:/codexwork/Site-Skin-edit-backups/20261006-aldebaran-white-deploy/github-remote-verification.json`에 둔다.
- 현재 운영·배포·검증·보존 범위는 [RELEASE.ko.md](RELEASE.ko.md)를 따른다. 아래 미등록·미배포·로컬 전용·승인 대기 문단은 당시 이력이다.

---

# ALDEBARAN White — 두 번째 스킨 확정 / 추가 준비 완료 (배포 전 이력)

- 2026-10-06 사용자가 현재 화이트 화면을 ALDEBARAN의 두 번째 스킨으로 결정했다. 최신 금액 표시색은 보유머니·활성 당첨금 `#FF641F`, 배당은 `#41433F`다. v3 아이콘 18종과 현재 레이아웃을 유지한다.
- 이번 범위는 GitHub·로컬·Sites 현황 확인과 별도 페이지 추가 준비다. 앱 소스는 변경하지 않았고 신규 등록·commit/push·배포는 실행하지 않았다.
- 현재 소스의 타입 검사와 빌드가 exit 0이며, 인앱 화면에서 새 아이콘 18종·이미지 166개 정상 로딩·콘솔 warning/error 0을 확인했다. 원본 ALDEBARAN 기준 317개 파일과 Git 상태를 보존했다.
- 통합 GitHub `main`은 `05e24e2b3c4545c09649091021cccb62d85bab4f`이며 화이트 경로는 아직 포함되지 않았다. 화이트의 호스팅 설정에는 프로젝트 ID가 없고, 기존 ALDEBARAN 공개 사이트는 그대로다.
- 확정 범위·현재 해시 목록·소스 묶음·추가 절차는 [RELEASE-PREP.ko.md](RELEASE-PREP.ko.md)를 따른다. 아래 v1.4 이하 문단의 색상·승인 대기·진행 중 표기는 당시 기록이다.

---

# ALDEBARAN White — local v1.4 / graphite odds text

- 2026-10-06 사용자 실제화면 확인후아이콘18종최종사용승인. 아이콘/r5TSX/아이콘CSS블록은v1.3그대로유지하고배당텍스트색만정리했다.
- 기본배당#41433f(일반9.571538:1/hover7.628691:1),주황선택#2b2b27(일반4.801583:1/hover5.451083:1). 같은조건의흰색은2.959975/2.607292:1이라배경을보존하고짙은글자를채택했다.
- 변경앱파일은 `app/aldebaran-white.css`의배당색범위와 `app/page.tsx`의혼합문구배당inline span2개뿐이다. 계정잔액/당첨금/공지색·배경·치수·폰트·문자열·계산·핸들러는유지했다.
- 타입/build exit0. 변경page관련lint기존1진단동일·새0(전체lint PASS아님). 격리Chrome에서기본숫자566곳과상태/포털,원본보존검사통과;거래제출0. 독립QA는별도담당진행중이다.
- 주소 http://127.0.0.1:5384/ . [현재 텍스트색 인계](E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3/odds-text-20261006-v1/HANDOFF.ko.md)와같은폴더의고정해시/비교이미지/실측/QA를따른다. 공개배포·다크원본·머큐리·사용자브라우저/IAB변경없음.

아래 v1.3과v1.2는당시이력으로원문보존한다.

---

# ALDEBARAN White — local v1.3 / approved simple v3 icons

- 2026-10-06 사용자 “아이콘들 적용시켜” 승인에 따라 기존 화이트·흑연 작업본에 v3 PNG18종 적용 완료. 공개배포·remote push 없음.
- 적용 앱은 `site/`, 확인 주소 http://127.0.0.1:5384/ . Git없는 로컬복제본이며 참조 원본HEAD는 아래 v1.2 기준과 동일하다.
- 앱 변경2개: `app/aldebaran-wog-r5.tsx`의18역할 매핑, `app/aldebaran-white.css`의 주요아이콘24px/최신리스트아이콘열/원색보존. 새 자산은 `public/icons/aldebaran-simple-v3-20261006/`에 승인 aligned/256 PNG18개·646,302bytes. 기존23종과 다른원본·작업은 보존했다.
- 타입·build exit0. 관련TSX lint기존21→21동일, 새finding0(전체lint PASS아님). 격리Chrome 1920/1366/390의22개검사 통과. 새18PNG HTTP200·SHA동일, 본문/selectionID/eventhandler/주요외곽geometry동일. 거래제출0.
- 실행환경의 외부Adobe3요청은 변경 전과 동일한 `net::ERR_NETWORK_ACCESS_DENIED`. 기존빌드 advisory도 유지. 부모가 별도배정한 독립QA는 진행중으로 구현QA와 구분한다.
- [현재 인계](E:/codexwork/Site-Skin-edit/skin-image-candidates-20261006/aldebaran-simple-v3/application-20261006-v1/HANDOFF.ko.md), 같은 폴더 `application-manifest.json`·`APPLICATION-ROLE-MAP.ko.md`·사전소스/해시·QA를 따른다. 실제서버PID27700재사용(launcher35604는기존서버감지후종료), 최종HTTP200. 기존IAB/사용자브라우저/저장값·MERCURY서버 미사용.

아래 v1.2 문서는 당시 이력으로 원문을 보존한다.

---

# ALDEBARAN White — local v1.2 / graphite PNG icons

- 작업일: 2026-10-02
- 로컬 주소: http://127.0.0.1:5384/
- 기준: `sports-demo-03/site`, PUBLIC v23, source `6be8c176b374999501952d24520c8411b29b153f`
- 상태: 별도 화이트 스킨과 graphite PNG 아이콘의 로컬 통합 완료. 사용자 디자인 승인·공개 배포는 하지 않음.
- 원본 ALDEBARAN 및 다른 사이트는 변경하지 않음. 이 복제본은 Git 저장소를 새로 만들지 않았고, `.openai/hosting.json`은 project_id 없는 로컬 stub을 유지함.

## 구현

- `site/app/layout.tsx`: 기존 body에 `aldebaran-white` 테마 클래스와 별도 CSS import만 추가.
- `site/app/aldebaran-white.css`: 밝고 약한 회색 표면, 짙은 흑연 텍스트, 주황 브랜드 버튼과 짙은 주황 배당/수치. 노란 리그 제목은 흑연색, 칩은 주황과 흑연색으로 조정.
- 후속 사용자 요청에 따라 스포츠 10종과 주요 서비스·상태 13종을 새 독립 투명 graphite PNG로 교체. v1.1의 스포츠 CSS 색상 filter는 제거했으며 새 이미지에 filter를 사용하지 않음. 팀 로고·국기·사진은 보존.
- `site/app/aldebaran-wog-r5.tsx`, `site/app/page.tsx`, `site/app/wog-service-views.tsx`: 기존 노출 위치의 이미지 연결과 아이콘 import만 변경. 숨겨진 상단 메뉴 아이콘과 아이콘이 없던 메뉴의 노출 상태는 유지. 작은 검색·접기·닫기·삭제·초기화·잠금·맨위로 조작은 보존.
- 새 이미지 위치: `site/public/icons/graphite-20261002/`의 23개 PNG. 생성 실행의 선택본을 바이트 그대로 복사했고 전체 SHA-256 일치. resize/optimize/재색상 처리 없음. 총 25,332,254 bytes.
- 스포츠 슬롯 20/22/14 px, 서비스 슬롯 12/16/18/20 px, 빈상태·완료 슬롯 30/34/42/48 px 등 기존 치수를 보존. 로그아웃의 18 px 아이콘 슬롯에만 밝은 회색 배경 적용. 비활성 베팅 아이콘은 opacity .48로 상태를 유지.
- 기존 상단 영상·어두운 브랜드 영역·흰 워드마크·사진 배너를 보존. 사진 위 문구는 읽기 쉬운 밝은 주황과 밝은 회색을 사용.
- hover, selected, disabled, focus, portal dialog, 내역, 입력 placeholder도 밝은 스킨에 맞춰 조정.
- 기존 치수·배치·폰트·경기/배당 데이터·selection ID·계산과 서비스 로직은 그대로 유지.

## v1.1 기본 스킨 검증

- Browser plugin not available: 기존 Playwright 1.62.1 + Chrome을 사용. Node `C:/Program Files/nodejs/node.exe`, Playwright `C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`.
- 독립 `npm ci --no-audit --no-fund` 완료. node_modules는 일반 디렉터리이며 원본과 junction 공유하지 않음. package.json 및 lock 변경 없음.
- `npm run build`, `npx tsc --noEmit`, `npx oxlint app/layout.tsx`: 통과. build에는 500 kB chunk advisory, plugin timings 및 vinext route classification 메시지가 있음. 이를 해소하기 위한 구조 변경은 하지 않음.
- 변경 전 복제본 baseline과 v1의 1920×1080, 1366×900, 390×844 렌더: 주요 요소의 geometry·font·padding·gap, 화면 본문 텍스트, selection IDs 모두 동일.
- 고정 1920 px 화면과 좁은 뷰포트의 기존 가로 탐색 유지. 1366 px에서 554 px, 390 px에서 1530 px 오른쪽 이동 확인.
- v1 기본 화면 3뷰포트에서 runtime/console/request 실패 및 누락 이미지 0.
- 추가 portal 확인: 충전 → 계정 접속 → 배당 선택 → 5,000원 → 확인 → 내역 정상. `5,000 × 1.56 = 7,800` 표시. 하단 사진 배너와 내역 dialog를 직접 화면 확인.
- 독립 QA의 muted text 4.4798:1 지적에 따라 v1.1에서 `--ab-muted`를 `#646660` → `#63655f`로 한 단계 어둡게 수정하고 portal input/textarea placeholder를 같은 색으로 맞춤. 이 수정은 색상 2곳뿐이므로 변경 없는 geometry·흐름 검사 결과를 재사용.
- v1.1 최종 1920 렌더: muted `rgb(99,101,95)` 적용, 폰트 로드 완료, 누락 이미지 0, page error 0.
- 독립 QA 최종 통과: 초기 화면 텍스트 290개 측정 중 일반 텍스트 최소 대비 4.54785:1, 선택 배당 4.80158:1, support placeholder 5.31013:1. 노랑/cyan 잔여 텍스트 0, hover/active/focus 및 portal·카지노 상세 확인, 관련 console/page/request/HTTP 오류 0. 원본 추적 파일 317개·HEAD·status 재확인 통과.

## v1.2 아이콘 후속 검증

- 생성/선택 관리는 `generated-images/aldebaran-graphite-icons-20261002-191320/run.json` 및 연결된 검토 기록을 기준으로 하며, 생성 담당자의 로컬 선택 승인 이후 23개 PNG를 복사. 사용자 미감 승인은 별도 대기.
- `npm run build`, `npx tsc --noEmit --incremental false`: 통과. 기존 build advisory는 남아 있으며 구조/의존성/배포 설정 변경 없음.
- 변경 TSX 3개를 기존 oxlint 설정으로 검사: 기존 25개 진단이 남아 있으므로 전체 lint PASS로 기록하지 않음. 기존 source snapshot과 변경본에 동일 정적 규칙을 적용한 비교에서 25 → 25개, 파일별 진단문구 동일, 새 finding 0. 비교에서는 외부 snapshot의 타입 경로 문제를 제외하기 위해 typeAware/typeCheck만 끄고, 실제 앱은 별도 전체 TypeScript 검사에 통과함. 새 PNG 렌더 1곳의 `next/no-img-element`에는 선택 PNG 원본 보존을 설명하는 한 줄 범위 주석을 사용.
- 1920×1080 변경 전후 주요 geometry·font·padding·gap·본문·selection IDs 모두 동일. 새 기본 화면에서 page/console/request 오류 및 누락 이미지 0.
- 대표 smoke: 고객센터, 공지, 출석 체크, 빈 내역, 빈 종목, 로그인 후 로그아웃 아이콘, 5,000원 선택·베팅 완료 화면 정상. 해당 상태의 이전/이후 아이콘 개수와 슬롯 치수 유지. 고객센터·완료 화면을 직접 시각 확인.
- 독립 QA v1.2 PASS: 원본 317/317개·기존 자산 220/220개 보존, 새 23개 생성 원본/사이트 SHA 일치, 실제 23역할 렌더 확인. 1920/1366/390의 geometry·font·text·selection ID 동일, 아이콘 슬롯 61개 bounds/display 차이 0, JSX event handler 51/51 동일. 대표 동작 15 check 통과, 안정화 실행의 console/page/request/HTTP 오류 0. 초기 상태로 복귀 확인.

## 증거와 재개

- 현재 아이콘 구현 자료: `E:/codexwork/Site-Skin-edit-backups/20261002-aldebaran-graphite-icons/implementation/`
- 현재 최종 화면: 위 폴더의 `icons-v1-1920x1080.png`
- 현재 증거: `before-app-hashes.json`, `asset-copy-record.json`, `geometry-comparison.json`, `lint-comparison.json`, `rendered-icon-inventory-after.json`, `rendered-icon-size-comparison.json`, `after-support.png`, `after-receipt.png`
- 아이콘 독립 QA: `E:/codexwork/Site-Skin-edit-backups/20261002-aldebaran-white/independent-qa/icon-followup/`
- 독립 QA 최종 기록: 위 폴더의 `independent-qa-final-v1.2.json`
- 구현 검수 자료: `E:/codexwork/Site-Skin-edit-backups/20261002-aldebaran-white/implementation/`
- 이전 v1.1 스킨 화면: `white-v1.1-final-1920x1080.png`
- 비교 근거: `baseline.json`, `white-v1.json`, 각 뷰포트 PNG
- portal/배너 근거: `portal-check.json`, `white-v1-lower-banners.png`, `white-v1-charge-dialog.png`, `white-v1-confirm-dialog.png`, `white-v1-history-dialog.png`
- 독립 QA: `E:/codexwork/Site-Skin-edit-backups/20261002-aldebaran-white/independent-qa/`
- 로컬 서버 PID와 로그: 구현 검수 폴더 `dev-server.pid`, `dev-server.stdout.log`, `dev-server.stderr.log`
- 서버가 중지됐다면 이 복제본의 `site`에서 `node node_modules/vinext/dist/cli.js dev --hostname 127.0.0.1 --port 5384`로 실행. 먼저 포트 소유자를 확인하고 기존 실행 중 서버를 임의 종료하지 않음.

## 현재 파일 SHA-256

- `site/app/layout.tsx`: `953D13FC91B40E056F4A1AD5838E98BAD0CA1E3624FCE20A3596D273D665CE67`
- `site/app/aldebaran-white.css`: `DEF9EBA5D261DD8EF77602596BA5F56F66F8F2F04F342375BC1EDBD1799D5686`
- `site/app/aldebaran-wog-r5.tsx`: `1C4811DAED6DD20DD1C4BBC37619506C70DB112748819790776C755633483431`
- `site/app/wog-service-views.tsx`: `A35C876677311DDA030E9B5AD9FF8D8D29B673246F7804EA8ADFEF8DD5A03661`
- `site/app/page.tsx`: `5A58C842EFC156B7C9D8DC5B791F7FDF986BD5824F809E03883D6F709081730C`
- PNG별 해시: `asset-copy-record.json`

## 남은 범위

- 사용자 미감 승인과 공개 배포는 미실행.
- Chrome 로컬 검수 범위이며 다른 브라우저별 검증은 하지 않음.
- 기존 고정 가로 레이아웃과 외부 Adobe font 로딩 방식은 그대로 유지.
- 사용자 요청대로 생성 PNG 원본을 사용하므로 배포용 크기 최적화는 미실행. 기존 lint 진단 25개는 이번 아이콘 작업 범위 밖으로 보존.
