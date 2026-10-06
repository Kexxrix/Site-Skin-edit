# TITAN 신규 데모 제작 공간

## ALDEBARAN 두 번째 스킨 공개 — 2026-10-06

사용자가 승인한 화이트 스킨을 별도 [ALDEBARAN-2](https://aldebaran-2.kexxadrix.chatgpt.site/)로 공개했다. PUBLIC v1, `succeeded`, 2026-10-06 19:03:56 KST. 소스는 [sports-demo-03-white/site](sports-demo-03-white/site/), 앱 소스 SHA는 `5459f3425a1388c2d978747ff43a4364b16bfe94`이며 [배포 기록](sports-demo-03-white/RELEASE.ko.md)과 [최신 STATE](sports-demo-03-white/STATE.md)를 따른다.

원본 [ALDEBARAN](https://aldebaran.kexxadrix.chatgpt.site)은 v23을 유지한다. 화이트 공개 화면에서 이미지 166개·v3 아이콘 18종·주황 금액·흑연 배당과 대표 동작을 확인했다. 통합 GitHub 보관 명세는 `backup/site-snapshots/20261006-aldebaran-white-v1/`이며 이전 기준 `05e24e2b3c4545c09649091021cccb62d85bab4f`와 다른 사이트의 파일은 보존한다.

## 현재 사이트 목록과 인계 현황 — 2026-10-02

이 현황은 담당 구현 스레드의 인계, 각 사이트 STATE, 저장된 완료·배포·보존 증거를 대조한 문서다. 2026-10-02 사용자 지시에 따라 세 앱과 관련 자료를 통합 GitHub 백업에 반영한다. 공개 배포와 GitHub 백업, 기술 검증과 사용자 최종 미감 승인은 각각 구분한다. 앱·서버 수정, 반복 빌드·브라우저 QA·재배포는 수행하지 않는다.

| 사이트 | 공개 완료 기준 / KST | 앱 경로 | 운영 기준 |
| --- | --- | --- | --- |
| [MERCURY](https://mercury.kexxadrix.chatgpt.site/) | PUBLIC v25 · 2026-10-01 17:13:35 · succeeded | [sports-demo-01/site](sports-demo-01/site/) | [STATE](sports-demo-01/STATE.md) · `mercury-variation` |
| [SIRIUS · 화이트](https://sirius.kexxadrix.chatgpt.site/) | PUBLIC v9 · 2026-10-02 16:37:30 · succeeded | [sports-demo-02/site](sports-demo-02/site/) | [STATE](sports-demo-02/STATE.md) · `main` |
| [SIRIUS-2 · 딥블루](https://sirius-2.kexxadrix.chatgpt.site/) | PUBLIC v1 · 2026-10-02 16:38:36 · succeeded | [sports-demo-02-deepblue/site](sports-demo-02-deepblue/site/) | [STATE](sports-demo-02-deepblue/STATE.md) · `main` |
| ALDEBARAN | 이번 인계에서 변경 없음 | [sports-demo-03/site](sports-demo-03/site/) | [기존 STATE](sports-demo-03/STATE.md) 유지 |

### 소스와 공개 사이트 연결

- MERCURY: source `ef1becb38bbba0ae8803f7c84155bcbeeb57004e`, project `appgprj_6aaa650f4aa4819189a2ee84f523fb9c`, deployment `appgdep_6abe161b21c08191b221826346369158`.
- SIRIUS 화이트: source `ace1c86197e3ea4f33e2da895ce66aa332a23523`, project `appgprj_6aacb6c2a38881918bd8a324fa9c5b54`, deployment `appgdep_6abf5f21c3c48191a1e9d0e10886217c`.
- SIRIUS-2 딥블루: source `661434a56cd624f5abc75df00ca8716e8731ea65`, project `appgprj_6abf5bb41da081918c72164663b7ff62`, deployment `appgdep_6abf5f5ca628819185e645ea7eb14cfc`.
- SIRIUS 두 앱의 `.openai/hosting.json`은 서로 다른 프로젝트를 가리킨다. 원본 사본의 공통 ID를 다시 복사하거나 두 공개 사이트를 같은 앱으로 취급하지 않는다.
- 화이트 `http://127.0.0.1:5392/`, 딥블루 `http://127.0.0.1:5393/`는 이관 세션의 로컬 미리보기 기록이다. 현재도 실행 중이거나 영구 제공된다는 의미는 아니다. Speedwagon 원본 앱·자산·5292/5293 서버는 이관 작업에서 보존했다.

### 완료 내용과 확인한 범위

- MERCURY v25: 제공 스포츠·기능 PNG 20종을 적용하고, 금색 빠른 메뉴의 충전·환전·고객센터 3개만 기존 검정 마스크 아이콘으로 복원했다. 사용자 로컬 확인·배포 승인 후 공개 반영했으며 로고 v3·배경 v2·좌측 배너·배치·경기 데이터는 유지했다.
- MERCURY 공개 검증 당시 1920×1080, PNG 20개 HTTP 200·원본 SHA-256 일치, 종목 10개·61경기, 고객센터 열기/닫기, 이미지 누락·콘솔 오류/경고·실패 응답 0을 확인했다. v23의 사전로딩 404는 **v25 공개 진입 검증 당시 재현되지 않음**으로 기록하며, 영구 해결이나 이번 문서 작업의 재검증으로 표현하지 않는다.
- SIRIUS 두 앱: 승인된 Speedwagon 화이트·딥블루를 원본 디자인·기능 그대로 이관했다. 동결 목록 화이트 343개·딥블루 347개의 원본/이관본 해시와 보호 파일 62개 보존을 확인했고, 딥블루에 필요한 `hooks/use-mobile.ts`도 원본 그대로 보충했다. 화이트 이전 v8 복원 기준은 `publication.json`의 `rollback`과 로컬 백업에 남아 있다.
- 두 앱의 타입 검사·빌드와 `npx oxlint app/sirius-sports.tsx app/layout.tsx`는 통과했다. **전체 프로젝트 lint 통과를 의미하지 않는다.** 로컬·공개 1920×1080 및 1366×900에서 헤더 110px·고정 1920px 가로 탐색, 61경기, 이미지·폰트, 배당 선택·전체삭제·고객센터 및 GUEST 제출 비활성을 확인했다. 상세 치수·계산·호버는 각 STATE와 검증 JSON을 따른다.
- 초기 배포 포장 2회는 배포 전 archive validation에서 거절됐으며 최종 v3 포장으로 수정했다. 실제 두 최종 공개 배포는 모두 succeeded다. 이관·배포 확인은 사용자의 최종 미감 승인과 별도이며, 실제 로그인·금융 거래·실제 베팅은 검증하지 않았다.

### 근거와 남은 항목

- MERCURY: [배포 기록](E:/codexwork/Site-Skin-edit-backups/20261001-mercury-v25-deploy/deployment.json), [당시 공개 검증](E:/codexwork/Site-Skin-edit-backups/20261001-mercury-v25-deploy/public-verification.json), [공개 화면](E:/codexwork/Site-Skin-edit-backups/20261001-mercury-v25-deploy/public-v25.png).
- SIRIUS 두 앱: [완료 기록](E:/codexwork/Site-Skin-edit-backups/20261002-sirius-two-variants/completion.json), [공개 배포·복원 기준](E:/codexwork/Site-Skin-edit-backups/20261002-sirius-two-variants/publication.json), [보존 확인](E:/codexwork/Site-Skin-edit-backups/20261002-sirius-two-variants/final-preservation-check.json), [화이트 검증](E:/codexwork/Site-Skin-edit-backups/20261002-sirius-two-variants/public-white-verification.json), [딥블루 검증](E:/codexwork/Site-Skin-edit-backups/20261002-sirius-two-variants/public-deepblue-verification.json).
- 각 SIRIUS 부모의 `input/speedwagon-20261002/`는 수신 문서, `runs/speedwagon-source-header110-20261002/`는 승인 당시 원본 QA다. 현재 이관본의 공개 검증과 혼동하지 않는다. 기존 운영 문서 총 8개와 과거 이력은 재작성하지 않았다.
- 통합 GitHub 현재 스냅샷: **2026-10-02 / MERCURY v25·SIRIUS v9·SIRIUS-2 v1**. [파일별 수집 명세](https://github.com/Kexxrix/Site-Skin-edit/blob/main/backup/site-snapshots/20261002-mercury-sirius-variants/source-files.json)와 [검증·제외·증거 모음](https://github.com/Kexxrix/Site-Skin-edit/tree/main/backup/site-snapshots/20261002-mercury-sirius-variants)을 따른다. 이전 v24 / `573c2367112bc11dd476faee25b64d806247f379` 명세와 날짜별 이력은 그대로 보존한다. 통합 백업 커밋 SHA는 GitHub 파일 이력에서 확인하며 앱 소스 SHA와 혼동하지 않는다.
- 기존 큰 청크·vinext 정적 경로 분류 경고는 남아 있다. ALDEBARAN·TITAN 등 다른 사이트, MERCURY 기준 태그·복원 ZIP, Speedwagon 원본은 보존한다. 새 구현·반복 전수 QA·재배포·push·새 스레드/에이전트 작업을 이 인계만으로 시작하지 않는다.

## 이전 MERCURY 기준 기록 — PUBLIC v24 / 2026-10-01

- [MERCURY 인덱스](sports-demo-01/INDEX.ko.md) / [최신 STATE](sports-demo-01/STATE.md) / [실행 앱](sports-demo-01/site/).
- 정적 헤더 배경·금색 종목 아이콘 10개 PUBLIC v23 및 워드마크 v3 PUBLIC v24 반영 완료. 공개 주소는 [MERCURY](https://mercury.kexxadrix.chatgpt.site/)다.
- 현재 소스 `8385d4bbc74394006db637e87466f4a171f6e02d`, 작업 브랜치 `mercury-variation`. 로컬 `main`은 이전 baseline이므로 최신 소스 기준으로 사용하지 않는다.
- 통합 백업 `573c2367112bc11dd476faee25b64d806247f379` / `backup/site-snapshots/20261001-mercury-v24/` / [수집 명세](https://github.com/Kexxrix/Site-Skin-edit/blob/573c2367112bc11dd476faee25b64d806247f379/backup/site-snapshots/20261001-mercury-v24/source-files.json). 323개 파일 검증은 수집 당시 기록이며 이번 문서 수정은 그 이후 변경이다.
- 배포·기술 확인과 사용자 최종 디자인 수용을 구분한다. 후속 범위와 잔여 문제는 STATE를 따른다.

## 초기 제작 공간 안내 — 2026-09-16

아래 내용은 초기 제작 당시 기록이다. MERCURY의 현재 상태는 위 기준과 STATE를 따른다.

기준일: 2026-09-16. 새 데모사이트를 제작하고 이 조정 대화에서 QA·보완을 거친 뒤 타이탄 페이지에 적용합니다.

기존 네 사이트의 이름이나 분류로 작업 대상을 고정하지 않습니다. 신규 데모의 이름·식별자·기획·디자인·기술 설정은 외부 작업공간에서 가져오는 지시서와 자료를 기준으로 정합니다.

신규 데모가 정해지면 `demo-sites/<새 데모 식별자>/` 아래에 각자의 `input/`(지시서·원본 자료), `site/`(구현), `qa/`(검수·보완 기록)를 둡니다. 서로 다른 데모의 자료와 작업 결과를 섞지 않습니다.

자료 수신 후 이곳에서 범위를 확인하고, 해당 신규 데모의 별도 제작 작업을 생성합니다. 작업지시에는 이름·절대 작업 경로·자료 버전·완료 조건을 명시합니다. 실행한 미리보기 URL과 포트도 데모별로 구분해 기록합니다.

제작 결과는 여기서 실제 페이지로 QA하고 보완합니다. 적용할 신규 결과물과 연결 대상을 확정한 뒤 타이탄 페이지에 반영합니다. 제작·검수·승인·적용 상태를 구분합니다.

현재 신규 작업은 [MERCURY · 스포츠 데모 01](sports-demo-01/INDEX.ko.md)입니다. `SPORTS_DEMO_CYCLE_01.md` R2에 따른 대표 UI와 수정 통제 테스트 A/B/C를 제작·검증한 뒤, 최신 사용자 요청에 따라 MERCURY로 명칭을 확정하고 https://mercury.kexxadrix.chatgpt.site/ 에 공개 배포했습니다. 로컬 미리보기는 `http://127.0.0.1:5276/`이며 다음 검수 지시를 기다립니다. 전체 페이지 확장은 진행하지 않았고, 기존 사이트 파일과 타이탄 페이지의 현재 링크는 변경하지 않았습니다.
