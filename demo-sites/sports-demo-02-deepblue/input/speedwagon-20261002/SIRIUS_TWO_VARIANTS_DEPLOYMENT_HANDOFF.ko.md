# SIRIUS 두 버전 이관 및 배포 작업 인계

작성·현재 상태 확인: 2026-10-02 UTC. 파일 대조 시각은 `2026-10-02T06:39:38.752Z`다.

이 문서는 원래 Site-Skin-edit 프로젝트에서 작업을 이어받기 위한 인계 자료다. 이번 요청에서는 문서만 작성했으며 원본 복사·수정, 앱 코드 수정, 서버 중지, commit, push, 공개 배포를 수행하지 않았다. 공개 배포 명령이나 딥블루 목적지는 아직 확정하지 않았다.

## 1. 작업 위치와 자료의 역할

| 구분 | 정확한 로컬 경로 | 역할 |
| --- | --- | --- |
| 원본 작업 루트 | `E:/codexwork/Site-Skin-edit` | 다음 작업을 이어갈 기존 프로젝트. 이번 작업에서는 읽기만 했다. |
| 격리 작업 루트 | `E:/codexwork/Site-Skin-edit-Speedwagon` | 이번 두 SIRIUS 버전의 완성본이 있는 별도 사본. |
| 완성 화이트 앱 | `E:/codexwork/Site-Skin-edit-Speedwagon/demo-sites/sports-demo-02/site` | localhost 5292에서 검증한 실행 소스와 적용 자산. |
| 완성 딥블루 앱 | `E:/codexwork/Site-Skin-edit-Speedwagon/demo-sites/sports-demo-02-deepblue/site` | localhost 5293에서 검증한 독립 실행 소스와 적용 자산. |
| 원본 화이트 앱 | `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-02/site` | 기존 Git 저장소와 배포 설정을 가진 이관 대상 후보. 파일별 병합이 필요하다. |
| 원본의 딥블루 경로 | `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-02-deepblue/site` | 확인 시점에 존재하지 않는다. 다음 담당자가 이 경로의 사용 여부를 결정한다. |

두 앱의 프로젝트 문서는 각각 `site`의 한 단계 위에 있다. `AGENTS.md`, `STATE.md`, `DESIGN_SPEC.md`, `DECISIONS.md`의 최신 블록을 먼저 읽는다. 아래쪽의 오래된 140px 헤더·원본 경로·PUBLIC v8 배포 기록은 보존 이력이며 최신 실행 권한이나 현재 완성본 배포 완료를 뜻하지 않는다.

검수 기록도 앱의 한 단계 위에 있으며 실행 번들에는 넣지 않는다.

```text
E:/codexwork/Site-Skin-edit-Speedwagon/demo-sites/sports-demo-02/runs/
E:/codexwork/Site-Skin-edit-Speedwagon/demo-sites/sports-demo-02-deepblue/runs/
```

각 `runs/sirius-header110-20261002/`가 최종 기준이다. `completion.json`, `browser-verification.json`, `contrast.json`, `frozen-source-hashes.json`, `type.log`, `lint.log`, `build.log`, 최종 화면과 1366px 좌우 화면이 있다. 앞선 `runs/sirius-wordmark-profile-20261002/`는 심벌 제거·정보수정 버튼 검수, `runs/sirius-active-banners-20261002/`는 우측 배너 적용 검수다. 딥블루 최초 복제·색상 변형의 출처는 `runs/deepblue-20261002/`에서 확인한다.

생성 원본과 현재 적용 파일은 구분한다.

| 생성·참조 자료 | 역할 |
| --- | --- |
| `E:/codexwork/Site-Skin-edit-Speedwagon/generated-images/sirius-speedwagon-20261001/` | 초기 SIRIUS 이미지 제작 기록. 실제 적용 목록은 화이트의 초기 이미지 채택 기록을 따른다. |
| `E:/codexwork/Site-Skin-edit-Speedwagon/generated-images/sirius-deepblue-20261002-032651/results/` | 금색 로고·딥블루 헤더의 생성 원본과 웹용 결과. |
| `E:/codexwork/Site-Skin-edit-Speedwagon/generated-images/sirius-right-rail-20261002-045326/` | 우측 6개 배너의 오브젝트·테마 배경, 프롬프트·합성 검수 기록. |
| 각 앱의 `site/public/` | 실제 실행에 필요한 적용 사본. 생성 폴더만 복사하고 이 폴더를 누락하면 안 된다. |
| `E:/codexwork/Site-Skin-edit-Speedwagon/TEMP/sirius-deepblue-20261002/reference/user-reference.png` | 최초 딥블루 사용자 배색 참조. |
| `E:/codexwork/Site-Skin-edit-Speedwagon/TEMP/sirius-active-banner-20261002/reference/` | 활성 메뉴·SIRIUS/ALDEBARAN/MERCURY 배너 참조 5장. |
| `E:/codexwork/Site-Skin-edit-Speedwagon/TEMP/sirius-wordmark-only-20261002/reference/` | 심벌 제거·정보수정 호버 참조 3장. |
| `E:/codexwork/Site-Skin-edit-Speedwagon/TEMP/sirius-header-tabs-summary-20261002/reference/` | 최종 헤더·탭·슬립 참조 3장. |

마지막 참조의 정확한 파일명은 `image(20261002-054755).png`, `image(20261002-054756).png`, `image(20261002-054757).png`다. 모두 현재 Windows 실행기에서 실제 픽셀을 확인했다. `TEMP` 및 생성 원본은 디자인 출처 자료이며 배포 런타임 입력이 아니다.

## 2. 사용자가 확인한 최종 화면과 기능

2026-10-02의 최신 사용자 확인은 “오케이 확인함”이며, 이어 원본 프로젝트에서 두 버전 배포 작업을 인계받을 문서를 요청했다. 따라서 로컬 최종 화면은 사용자 확인을 받은 상태다. 이 확인은 공개 배포가 실행됐다는 뜻이 아니다.

- 화이트는 아이스블루·코발트 계열, 딥블루는 미드나이트·화이트·샴페인 골드 계열이다. 기능·데이터·기본 골격을 공유한다.
- 헤더는 110px다. 본문은 y110, 좌·중·우 패널은 기존 7px 여백을 포함해 y117에서 시작한다. 셸 폭 1920px, 중앙 1244px, 좌우 레일 320px를 유지한다.
- 헤더에는 독립 48px 심벌 없이 기존 SIRIUS 텍스트 로고만 표시한다. 브랜드 영역 280×96px, 로고 폭 218px·표시 케이스 218×90px를 유지한다. 화이트·금색 로고의 디자인과 색은 그대로다.
- 주 메뉴의 활성 표시는 박스 배경 없이 텍스트색과 하단 2px 선이다. 메뉴 17px/800, 버튼 44px, 유틸 30px, 로그인 버튼 38px는 유지한다. 유틸은 top 5px로 재배치해 겹침을 피했다.
- 종목 탭은 외곽 케이스 안의 **세로 중심**을 맞췄다. 높이 42px 영역의 하단 8px 패딩 때문에 생긴 4px 위쪽 오차를 제거했다. 버튼·아이콘·라벨·수량 배지의 크기는 유지한다.
- 탭의 **가로 배치는 기존 왼쪽 정렬을 보존**했다. 버튼군 중심 x916, 외곽 케이스 중심 x960, 오른쪽 남는 공간 88px다. 사용자 첨부의 붉은 가로선과 부모의 후속 범위 지시에 따라 수평 44px 측정만으로 의도된 여백을 제거하지 않았다. 가로 중앙 정렬까지 완료했다고 보고하지 않는다.
- 슬립의 총배당·총 당첨금 두 행은 최소배당·최대배당 등 인접 행과 같은 면·경계·글자색·13px/16px/700 값 표현으로 통합했다. 케이스 302×223px, 행 29px, 라벨·정확한 값·단위·계산은 유지한다.
- 정보수정 버튼은 72×28px다. 화이트의 밝은 호버 배경과 흰 글자가 충돌하던 문제를 해당 버튼의 어두운 호버 배경으로 수정했다. 일반/호버/포커스 대비는 화이트 5.67/8.48/5.67:1, 딥블루 8.59/9.94/8.59:1이었다. 최종 헤더 변경에서도 해당 스타일을 유지했다.
- 좌측 사진 아코디언 6개, 현재 해외형의 기본 펼침, 카지노 등의 추가 호버 미리보기 +72px 및 복귀 동작을 유지한다.
- 우측 6개 배너는 고객센터, 공식채널, SIRIUS 이용안내, 중계 안내, 스포츠 라인업, 미성년자 이용불가다. 306×60.625px·간격 4px, 오른쪽 90×53px `contain` 오브젝트와 HTML 문구를 사용한다. `만 19세 이상 이용` 문구와 기존 안내 클릭 연결을 유지한다.

이 앱은 기존 스포츠 프런트엔드 데모다. 실거래·실시간 운영 백엔드 완성본으로 해석하지 않는다. 로그인/계정 변경/거래 제출은 최종 검수에서 실행하지 않았다.

## 3. 현재 실행 상태와 확인된 명령

2026-10-02 06:38:35 UTC에 서버를 변경하지 않고 확인한 결과:

| 버전 | 로컬 주소 | HTTP | 당시 Node PID |
| --- | --- | --- | --- |
| 화이트 | http://localhost:5292/ | 200 | 18548 |
| 딥블루 | http://localhost:5293/ | 200 | 57840 |

두 서버는 숨김 백그라운드 PowerShell 실행으로 유지되고 있다. 프로세스 종료, Windows 로그아웃·재부팅 후에는 사라지며 자동 시작 서비스나 예약 작업은 등록하지 않았다. PID는 당시 관측값이며 고정 식별자가 아니다. 다시 실행하기 전 기존 포트와 프로세스의 작업 경로를 확인해 중복 서버를 만들지 않는다. 이번 문서 작성에서는 서버를 중지·재실행하지 않았다.

실제 실행 기록과 프로세스 인수에서 확인한 프리뷰 명령은 다음과 같다. 이미 서버가 살아 있으면 실행하지 않는다.

```powershell
Set-Location -LiteralPath 'E:/codexwork/Site-Skin-edit-Speedwagon/demo-sites/sports-demo-02/site'
& 'C:/Program Files/nodejs/npm.cmd' run dev -- --host 127.0.0.1 --port 5292
```

```powershell
Set-Location -LiteralPath 'E:/codexwork/Site-Skin-edit-Speedwagon/demo-sites/sports-demo-02-deepblue/site'
& 'C:/Program Files/nodejs/npm.cmd' run dev -- --host 127.0.0.1 --port 5293
```

화이트 실행 근거는 `sports-demo-02/runs/sirius-preview-recovery-20261002-121609/launch.json`, 딥블루는 `sports-demo-02-deepblue/runs/deepblue-20261002/launch-r02.json`이다. 위 명령은 포그라운드 실행이다. 백그라운드 재개가 필요하면 다음 담당자가 정확한 cwd·로그 경로를 지정한 숨김 실행으로 구성해야 한다.

두 앱은 현재 `package.json`과 `package-lock.json`이 같고 원본 화이트의 파일과도 해시가 일치한다. 엔진 조건은 Node >=22.13.0이며 이번 확인 환경은 Node v24.14.0, npm 11.9.0이다.

| package script | 실제 내용 | 의미 |
| --- | --- | --- |
| `dev` | `vinext dev` | 로컬 개발 프리뷰 |
| `build` | `vinext build` | 실행 결과물 빌드 |
| `start` | `wrangler dev --config dist/server/wrangler.json` | 빌드 결과의 로컬 실행. 공개 배포 명령이 아니다. |
| `lint` | `oxlint` | 전체 검색 범위 lint. 기존 오류가 남아 있다. |
| `format` | `oxfmt` | 포맷 도구. 이번 작업에서 전역 포맷을 실행하지 않았다. |

`deploy` script는 없다. 빌드 로그의 `vinext start` 안내나 `npm run start`를 공개 배포 완료 명령으로 해석하면 안 된다.

최종 통과한 관련 검사 명령은 아래와 같다. 먼저 위의 정확한 앱 cwd를 선택하고 두 앱 각각에서 실행했다.

```powershell
& 'C:/Program Files/nodejs/node.exe' 'node_modules/typescript/bin/tsc' --noEmit --incremental false
& 'C:/Program Files/nodejs/node.exe' 'node_modules/oxlint/bin/oxlint' 'app/sirius-sports.tsx' 'app/layout.tsx'
& 'C:/Program Files/nodejs/npm.cmd' run build
```

전체 lint가 통과했다는 주장은 하지 않는다. 새 원본 이관 환경의 의존성 복원은 다음 작업의 승인 범위와 기존 lockfile을 기준으로 진행한다. 이번 문서 작성에서는 설치하지 않았으며 딥블루 실행은 기존 의존성의 독립 파일 복사로 준비했던 상태다.

## 4. 실제 변경 파일과 이관할 입력

원본과 사본은 Git worktree나 GitHub clone 관계가 아니라 별도 파일 사본이다. 원본 루트와 Speedwagon 루트 자체에는 `.git`이 없다. 최초 복제 기록은 `SPEEDWAGON_HANDOFF.ko.md`와 `speedwagon-clone-record/`에 있다.

현재 읽기 전용 Git 확인 결과:

| 항목 | 현재 확인된 상태 |
| --- | --- |
| 원본 화이트 `site/.git` | 있음. `main`, HEAD `9c424b8e4e8c480848f1ec47bf5139c6d5987738`. 추적 파일 변경은 없고 `.agents/`, `.impeccable/`, `DESIGN.md`, `PRODUCT.md`가 미추적이다. |
| 사본 화이트 `site/.git` | 독립 `.git` 있음. 같은 `main`/HEAD지만 추적 소스 4개 수정과 여러 신규 소스·자산이 미커밋 상태다. |
| 딥블루 사본 `site/.git` | 없음. 화이트의 실행 소스·자산에서 만든 독립 디렉터리이며 Git 이력을 복사하지 않았다. |
| Git remote | 원본·사본 화이트 모두 현재 `git remote` 목록이 비어 있다. push 완료나 연결된 Git 원격을 가정하지 않는다. |

현재 원본이 추적 파일 기준으로 깨끗하더라도 미추적 작업을 포함한 기존 dirty 상태는 보호한다. 문서 작성 이후 원본이 바뀔 수 있으므로 다음 이관 직전에 상태를 다시 기록해야 한다. 같은 HEAD는 같은 작업 파일 상태를 뜻하지 않는다. 이번 두 버전 작업은 commit·push되지 않았다.

현재 원본 화이트와 실제 파일을 대조한 결과, 아래 4개 기존 소스가 두 완성본에서 다르다. 이 파일들은 일괄 덮어쓰기보다 내용 비교·병합 대상으로 취급한다.

```text
app/demo-data.ts
app/layout.tsx
app/page.tsx
app/sirius-left-banners.tsx
```

현재 원본에 없는 공통 신규 앱 소스는 다음 11개다.

```text
app/prematch-r15.json
app/sirius-market-view.ts
app/sirius-sports.tsx
app/sirius-sports.css
app/sirius-header-revision.css
app/sirius-white-skin.css
app/sirius-left-menu.tsx
app/sirius-left-menu.css
app/sirius-left-refinement.css
app/sirius-visual-depth.css
app/sirius-right-banners.css
```

딥블루에는 `app/sirius-deepblue-skin.css`가 추가된다. 딥블루 `app/layout.tsx`는 visual-depth 다음, right-banners 이전에 이 스킨을 import한다. `sirius-sports.tsx`의 텍스트 로고 경로도 금색 파일이다. CSS import 순서를 유지해야 한다.

최종 헤더110 라운드에서 변경한 파일은 각 앱의 `sirius-header-revision.css`, `sirius-sports.css`, 그리고 화이트의 `sirius-visual-depth.css` / 딥블루의 `sirius-deepblue-skin.css`뿐이다. 이 최신 3개 CSS만 원본으로 옮기면 앞선 기능·자산 작업이 빠지므로 전체 인계 목록을 사용한다.

필수 적용 자산은 각 앱의 다음 경로다.

```text
public/assets/header/sirius-20261001/header-grid-center-v01-1920x140.webp  # 화이트
public/assets/header/sirius-deepblue-20261002/header-gold-1920x140.webp   # 딥블루
public/branding/sirius-header-blue-20261001/wordmark.png                # 화이트
public/branding/sirius-header-gold-20261002/wordmark.png                 # 딥블루
public/assets/right-banners/sirius-20261002/
public/banners/sirius-left-accordion-20261001/
public/sports/sirius-20261001/
public/ui/sirius-20261001/
public/ui/sirius-header-blue-20261001/
public/fonts/pretendard-jp/  # 400/500/700/800/900 woff2 및 LICENSE.txt
```

우측 배너 폴더에는 `support`, `notice`, `rules`, `live-guide`, `lineups`, `age-policy`의 `-v01-object.png` 6개와 해당 테마의 `background-white-v01-1224x244.webp` 또는 `background-deepblue-v01-1224x244.webp`가 필요하다. 생성 폴더의 초기 `support/notice-v01-1224x244.png` 후보는 잘림 때문에 적용하지 않았다.

좌측에서 실제 사용하는 사진은 `domestic-compact-native-v01.webp`, `european-compact-native-v01.webp`, `esports-compact-native-v02-clean.webp`, `inplay-compact-native-v01.webp`, `casino-compact-native-v01.webp`, `slots-room-native-v03-small.webp`다.

기존 팀·국기·종목·일반 UI·파비콘 자산도 필요하다. 로고 심벌을 DOM에서 제거했지만 파일 자체는 지우지 않았다. `public/`의 기존 파일이나 prototype를 이번 인계에서 임의로 정리하지 말고 최종 manifest와 실제 참조를 대조한다.

최종 `app/components/lib/public` manifest 기준으로 화이트는 343개, 딥블루는 347개다. 현재 원본과 비교하면 공통으로 278개가 같고 기존 소스 4개가 다르며, 화이트는 61개·딥블루는 65개 파일이 원본에 없다. 상세 대조 자료는 `E:/codexwork/Site-Skin-edit-Speedwagon/TEMP/sirius-deployment-handoff-20261002/inspection.json`에 있고, 이관할 전체 파일·SHA-256 기준은 각 최종 `frozen-source-hashes.json`이다.

다음 설정과 입력도 함께 확인한다.

- `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `next.config.ts`, `next-env.d.ts`, `.gitignore`, `.oxlintrc.json`, `.oxfmtrc.json`, `components.json`은 현재 원본 화이트와 두 사본 모두 해시가 같다.
- `vite.config.ts`는 `@openai/sites-vite-plugin`, `vinext`, Cloudflare 플러그인을 사용하고 `.openai/hosting.json`을 import한다. 로컬 D1/R2 바인딩 및 Wrangler/Miniflare 경로 설정을 유지한다. `.openai/hosting.json`도 세 위치에서 현재 같은 파일이지만 목적지 결정 없이 그대로 이관·배포하지 않는다.
- lockfile SHA-256은 `5f8432502c671cadd84edb7f89d5d5477d695171a556b91c2b550e6a2de8d49b`다. package.json SHA-256은 `4995cbbd54b3038468bb9393a0413ffcd6927ce1a040c53e23544c7ec71f68dd`다.
- 화이트 `site/DESIGN.md`와 `PRODUCT.md`는 원본의 파일과 같다. 딥블루 `site/DESIGN.md` 및 `.impeccable/design.json`은 변형 작업의 별도 디자인 기록이다. 원본의 문서·스킬 설정을 무단 덮어쓰지 않는다.
- `.env*` 및 인증 값은 별도로 승인된 안전한 방식으로 처리한다. 문서나 Library에 자격증명·민감한 환경변수 값을 담지 않는다. `.gitignore`를 안전한 이관의 유일한 근거로 삼지 않는다.

이관·배포 번들에서 제외할 항목은 `node_modules/`, `.next/`, `.vinext/`, `.wrangler/`, `dist/`, `out/`, `.sites-runtime/`, `tsconfig.tsbuildinfo`, 로그·임시 파일, `TEMP/`, 상위 `runs/`, 생성 원본/검수 자료다. `runs/`·생성 기록은 감사 자료로 별도 보관하되 실행 자산은 `public/`에서 이관한다. 사본의 `.git`을 원본의 `.git` 위로 복사하지 않는다. `.agents/`와 `.impeccable/`도 런타임 필수 입력이 아닌 도구 기록이며 파일별 비교가 필요하다.

## 5. 검수 증거와 남은 제약

최종 구현 기록 시각은 화이트 `2026-10-02T06:09:14.551Z`, 딥블루 `2026-10-02T06:09:14.664Z`다. 이번 문서 작성에서 해당 manifest를 다시 읽어 전 파일 SHA-256 불일치 0을 확인했다. 앱 코드와 자산은 그대로다.

| 검사 | 확인 결과 |
| --- | --- |
| 1920×1080 / 1366×900 | 헤더110, 본문110, 패널117, UI 크기 유지, 헤더 제어 영역 겹침 0. 좁은 화면은 기존 1920 고정 셸과 가로 스크롤이다. |
| 종목 탭 | 10개와 개별 치수·간격·선택 동작 유지. 세로 중심 오차 0, 자식 중심 허용 오차 0.5px. 가로는 원래 왼쪽 정렬 유지. |
| 슬립 정보층 | 빈 상태, 선택/미입력, 단일, 두 폴더 상태에서 첫 두 행의 면·경계·색·값 글자층 통일. |
| 계산 | 10,000원: 단일 1.56배/15,600원, 두 폴더 2.36배/23,556원. 원제품 2.3556을 유지하며 반올림 표시 2.36으로 지급액을 계산하지 않는다. |
| 상호작용·보존 | 종목/국내·해외 전환, 초기화, guest 제출 비활성, 배너 안내 클릭, 좌측 카지노 hover +72/복귀, 우측 스크롤과 배너6개/만19세, 정보수정 hover 스타일 유지. |
| 관련 검사 | 변경 앱 소스 lint, TypeScript, 최종 build, CSS parse 통과. 런타임/로컬 요청 오류 0. |
| 실제 픽셀 대비 | 헤더 최소 화이트5.63/딥블루5.90:1. 슬립 최소 화이트6.88/딥블루10.18:1. 전체 사이트 접근성 인증을 뜻하지 않는다. |

이전에 나온 독립 QA의 수평44px 관찰은 최신 부모 지시에 따라 세로 정렬 의도와 구분했다. 최종 기록에 가로 왼쪽 정렬 보존 사유가 있다. 최신 사용자 확인은 이 문서의 첫 부분을 따르며, 과거 `completion.json`의 `userVisualApproval: pending` 및 `independentFinalQa: pending_parent`는 그 기록 작성 시점의 상태다. 독립 최종 QA 전체 통과 보고서를 새로 만들어 주장하지 않는다.

실제로 남은 제약:

- 전체 `npm run lint`는 보존된 스킬 번들·기존 UI 템플릿·공통 코드 등의 오류 이력이 있다. 최종 통과는 지정된 앱 소스 lint이며 전체 저장소 lint 통과를 뜻하지 않는다.
- 빌드의 기존 대형 청크 경고와 정적 route classification의 `Unknown` 안내가 남는다. 이 안내가 있어도 최종 빌드는 exit 0이었다. 원본 환경에서 다시 빌드하고 필요한 런타임 경로를 확인한다.
- `PRODUCT.md`는 과거 product-schema 1 맥락을 보존했다. 오래된 색상·배포·검수 운영 설명을 최신 구현의 권한이나 완성 상태로 사용하지 않는다. 딥블루의 `design.json`은 schemaVersion 2지만 이전 생성 시점 기록이며 최신110px 레이아웃의 단일 권위 문서가 아니다.
- 로컬 Pretendard 폰트 400/500/700/800/900은 검증했다. 상속된 Adobe kit와 DIN 활성화를 현재 외부 서비스 전체에서 보증하지 않는다. Adobe 바이너리를 추가 배포하지 않는다.
- 이전 Windows Library 메타데이터 실패는 과거 기록이다. 최신 화면은 공식 저장 경로로 성공했고 현재 로컬 식별자도 보존했다. 이를 앱 실행 결함으로 취급하지 않는다.

최신 전체 화면은 다음 Library 파일의 버전1이다.

- 화이트: `libfile_b02ebbeb19a88191948044cb8bd8592e` — https://chatgpt.com/api/library/files/libfile_b02ebbeb19a88191948044cb8bd8592e/download
- 딥블루: `libfile_d6aee8abe67c8191957b5b5d45c0c0db` — https://chatgpt.com/api/library/files/libfile_d6aee8abe67c8191957b5b5d45c0c0db/download

## 6. 원본에 안전하게 이관하는 순서

다음 순서는 후속 작업 지침이며 이번 문서 작성에서 수행하지 않았다.

1. 원본의 현재 `AGENTS.md`와 사용자 승인 범위를 다시 확인한다. 화이트 Git HEAD/branch/status와 미추적 파일, 원본·사본의 현재 파일 목록/해시를 시각과 함께 기록한다. 기존 dirty 작업을 포함한 원본 백업을 별도 안전한 위치에 만든다. 백업 파일에 비밀 값이 섞여 있으면 공개 자료와 분리한다.
2. 두 최종 manifest를 읽고 사본 불일치가 없는지 확인한다. 스테이징 위치를 별도로 정해 실행 입력만 준비한다. 현재 원본과의 4개 변경·11개 공통 신규 소스 및 자산 목록을 다시 비교한다. 일괄 mirror/delete 방식으로 원본을 덮어쓰지 않는다.
3. 화이트 기존 4개 소스는 원본의 최신 내용과 병합한다. 신규 소스·자산은 경로 충돌과 참조를 확인해 추가한다. 원본 `.git`, 기존 `.agents/.impeccable`, 미추적 문서, 환경 파일을 보존한다.
4. 딥블루는 화이트 파일에 섞지 않고 독립 경로로 준비한다. 위에 제시한 원본 내 후보 경로는 아직 생성되지 않았다. 별도 Git 관리 여부와 실제 배포 목적지를 다음 담당자가 확인한다.
5. CSS import 순서, JSON 데이터, 이미지 URL, 로컬 폰트/라이선스, lockfile/config를 검증한다. 배포 설정과 환경 값은 대상에 맞게 별도 확인한다. 기존 node_modules나 빌드 캐시를 전송해 재현성 검증을 생략하지 않는다.
6. 승인된 범위에서 기존 lockfile로 의존성을 준비하고 이관된 두 cwd에서 관련 lint/type/build를 실행한다. 통과했던 사본과 비교해 헤더110·세로 탭 중심·가로 여백·슬립 값/정보층·배너/아코디언/정보수정이 유지되는지 1920/1366에서 확인한다. 계산 기준은 위 표를 사용한다.
7. 원본의 변경 목록과 검증 결과를 리뷰 가능한 상태로 정리한 뒤 실제 배포 대상을 확정한다. commit/push가 필요하면 대상 Git 저장소·원격·사용자 승인 범위를 확인한다. Git commit이 배포 승인이나 배포 완료를 대신하지 않는다.

## 7. 확인된 배포 설정과 다음 담당자의 결정

원본 화이트, 사본 화이트, 사본 딥블루의 `.openai/hosting.json`은 현재 모두 다음 기존 프로젝트를 가리킨다.

```text
project_id: appgprj_6aacb6c2a38881918bd8a324fa9c5b54
기존 문서의 공개 참조 URL: https://sirius.kexxadrix.chatgpt.site/
```

위 URL은 기존 문서의 PUBLIC v8(2026-09-21) 이력에서 확인한 참조다. 이번 두 완성본이 그 공개 URL에 반영됐다고 확인하지 않았고, 이번 요청에서 공개 사이트나 배포 원격 상태를 새로 조회하지 않았다.

**두 사본을 현재 설정 그대로 각각 배포하면 같은 project_id를 대상으로 덮어쓸 수 있다. 로컬 디렉터리명이나 포트를 바꿨다고 독립 배포 목적지가 생긴 것이 아니다.**

다음 담당자가 원래 프로젝트에서 확인·결정할 항목:

- 기존 SIRIUS 공개 프로젝트를 화이트로 갱신할지, 다른 버전을 대표로 사용할지.
- 딥블루를 별도 Site project/domain으로 배포할지, 하나의 Site 안에서 두 경로로 제공할지. 별도 프로젝트·URL은 아직 없다. 한 Site의 두 경로 제공을 선택하면 현재 두 독립 앱을 그대로 두 번 올리는 방식과 다르므로 별도 구현 범위가 필요하다.
- 각 테마의 확정 project_id·URL·공개 범위·배포 계정 권한. 현재 연결된 공식 Sites 배포 기능과 실제 소스 연결을 확인한다.
- `.openai/hosting.json`의 D1/R2 바인딩과 Vite 설정의 로컬 placeholder가 실제 배포에서 어떻게 치환되는지. 원격 리소스의 공유 여부·대상은 확인되지 않았다.
- 각 배포의 되돌릴 이전 revision과 필요한 백업. 과거 hosting/remote 설정은 이번 배포 권한이 아니다.

확인된 `deploy` script가 없으므로 추정한 `wrangler deploy`/Sites 명령을 여기서 실행 지시로 제시하지 않는다. 다음 담당자는 현재 제공되는 공식 Sites 워크플로와 실제 대상 정보를 확인한 뒤 배포 절차를 선택해야 한다.

### 최종 검증 후 배포 체크리스트

- [ ] 원본 dirty 작업 백업과 파일별 병합이 끝났고 `.git`·환경 값·기존 작업이 보존됐다.
- [ ] 화이트/딥블루 실행 소스·자산·lockfile/config가 확인된 각각의 cwd에 준비됐다.
- [ ] 두 버전의 목적지와 project_id 충돌 방지 방안이 명확하다.
- [ ] 이관 환경의 관련 lint/type/build와 실제 화면·계산·주요 동작 검증이 통과했다. 기존 전체 lint/문서 경고의 범위도 기록했다.
- [ ] 사용자에게 확인받은 로컬 최종 화면과 배포 후보를 대조했고 원치 않는 기존 작업 덮어쓰기가 없다.
- [ ] 공개 대상·범위·승인과 되돌릴 revision을 확인한 후 배포한다.
- [ ] 배포 도구의 성공 결과와 실제 공개 URL을 확인하고 두 테마의 이미지/폰트/동작·캐시 최신성을 점검한다.
- [ ] project/version/deployment 식별자, 최종 URL, 배포한 소스 상태와 검증 결과를 남긴다. 단순 build 성공을 배포 성공으로 기록하지 않는다.

## 8. 다음 Codex 작업에 붙여넣을 짧은 인계 지시문

```text
E:/codexwork/Site-Skin-edit-Speedwagon/SIRIUS_TWO_VARIANTS_DEPLOYMENT_HANDOFF.ko.md를 먼저 읽고, 원래 E:/codexwork/Site-Skin-edit 프로젝트에서 SIRIUS 화이트·딥블루의 이관 및 배포 작업을 이어가세요. 완성본은 사본의 demo-sites/sports-demo-02/site와 demo-sites/sports-demo-02-deepblue/site에 있습니다.

원본의 현재 Git/dirty 작업과 사본 최종 manifest를 먼저 대조하고, 원본을 백업한 뒤 기존 소스는 파일별로 병합하세요. 사본의 .git·캐시·node_modules·환경 값을 원본에 일괄 덮어쓰지 마세요. 두 hosting.json은 현재 같은 project_id이므로, 각 버전의 실제 배포 목적지를 먼저 확인해 충돌을 막으세요.

사용자가 새 작업에서 승인한 범위 안에서 이관·검증·배포를 진행하세요. 110px 헤더, 심벌 없는 텍스트 로고, 활성 하단선, 종목 탭 세로 정렬과 원래 가로 여백, 통일된 슬립 정보층, 정보수정 가독성, 사진 아코디언과 6개 배너, 1.56/15,600 및 2.36/23,556 계산을 유지하세요. 이관 환경에서 관련 lint/type/build와 1920/1366 화면을 확인하고, 확정된 대상에 배포한 뒤 실제 URL과 배포 식별자를 보고하세요. 이 인계 문서는 과거 commit/push/공개 배포 완료나 현재 배포 목적지 확정을 뜻하지 않습니다.
```

현재 원본 변경·공개 배포는 미실행이다. 이 문서와 로컬 완성본을 출발점으로 다음 작업에서 실제 이관·목적지 확인·배포를 수행한다.
