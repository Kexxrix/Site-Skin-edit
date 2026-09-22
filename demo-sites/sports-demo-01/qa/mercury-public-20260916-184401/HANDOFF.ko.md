# MERCURY 공개 배포 인계

- 완료 시각: 2026-09-16 KST
- 상태: 이름 변경 및 공개 배포 검증 완료. 다음 검수 지시 대기.
- 공개 URL: https://mercury.kexxadrix.chatgpt.site/
- 로컬 URL: http://127.0.0.1:5276/ (서버 유지, 최종 HTTP 200)
- 작업 범위: sports-demo-01/site/의 이름·M 심벌·파비콘·Sites 연결. QA는 이 새 폴더에만 추가.

## 최종 배포

| 항목 | 확인값 |
| --- | --- |
| Sites title / slug | MERCURY / mercury |
| project_id | appgprj_6aaa650f4aa4819189a2ee84f523fb9c |
| 최종 version | 2 |
| version_id | appgprj_6aaa650f4aa4819189a2ee84f523fb9c~appgver_20dc228457a08191a370c1fc8935557f |
| deployment_id | appgdep_6aaa675983a481919770a9094a9dad66 |
| get_deployment_status | succeeded |
| 상태 확인값 갱신 시각 | 2026-09-16T09:54:55.218303+00:00 |
| get_site | active, latest_version_number=2, access_mode=public, access_policy revision=2 |
| 최종 source commit SHA | 0170004ff426d7c67633b28e7aa7c5b5f5e3562e |

[sites-deployment-v2.json](./sites-deployment-v2.json)에 최종 응답의 필요한 필드만 기록했습니다. 최초 v1도 성공했으나 익명 HTTP 검사에서 HTML의 favicon 링크 누락을 발견했습니다. app/layout.tsx에 icons 한 줄을 추가하고 재빌드·타입검사 후 v2를 저장·공개했습니다. v2가 최종 판정 근거입니다.

기존 연결 Sites가 없어 mercury slug로 새 Sites를 만들었고 충돌은 없었습니다. 승인된 배포 절차에 필요한 Git은 site/ 내부에만 초기화했습니다. 기존 소스 85개 파일의 실제 바이트와 최종 커밋이 일치하며, 최종 푸시 뒤 rev-parse로 읽은 SHA를 version source에 사용했습니다. 전역 Git 설정은 변경하지 않았습니다.

- 런타임 아카이브: site/work/mercury-deployment-v2.tar.gz
- 로컬 압축 파일: 10,859,843 bytes
- 로컬 SHA-256: f722e82f951bf10ab8fd280471fe241bcf46bfc14cf0c1cb3000c0ef0ea0c33f
- 플랫폼 정규화 tar: 12,216,320 bytes / 65 files
- 플랫폼 hash: sha256:3b0c6f3598a1def4efafbf5c3ee0452e5d1913d06124a29b3a5efe4bea7ae509
- 위 두 해시는 압축 파일과 플랫폼 정규화 tar라는 서로 다른 대상입니다.
- dist 실행 산출물만 패키징했습니다. input, QA, .git, .env는 아카이브에 포함하지 않았습니다.
- 임시 인증값을 파일·Git 설정·원격 URL·인계 기록에 저장하지 않았습니다.

## 변경 파일

- site/app/page.tsx: 화면·ARIA·푸터의 COBALT → MERCURY, 헤더 C → M.
- site/app/layout.tsx: title/description의 MERCURY 표기, /favicon.svg 메타데이터 연결.
- site/public/favicon.svg: C → M. 기존 SVG 크기·도형·색 유지.
- site/.openai/hosting.json: project_id 연결. d1/r2는 기존 null 유지.
- 이 QA 폴더: 변경 전 사본, 최종 diff, 배포·HTTP·브라우저·파일 검증 자료 및 본 인계.

최종 차이는 [published-name-and-hosting.diff](./published-name-and-hosting.diff)에서 확인할 수 있습니다.

## 검증 및 결과

- npm run build: v1/v2 성공. [build-v2.log](./build-v2.log)
- TypeScript 검사: v1/v2 종료 코드 0. [typecheck-v2.log](./typecheck-v2.log)
- 작성 파일 대상 lint: 종료 코드 0. [checks.json](./checks.json), [lint-authored.log](./lint-authored.log)
- 공개 GET /, /favicon.svg: Cookie와 Authorization 없이 각각 HTTP 200. 리다이렉트를 따르지 않는 클라이언트에서 Location 없음, 최종 URL 일치. MERCURY title/본문, COBALT 없음, /favicon.svg 링크와 M SVG 확인. [anonymous-http-v2.json](./anonymous-http-v2.json)
- CUA 공개 Chrome 검수: 1920×940. MERCURY/M이 기존 헤더 공간 안에 표시됨. 초기 실시간 스포츠 선택. 서울 홈 1.84 선택 → 슬립 1개 → 개별 제거 → 빈 슬립. 금액·실제 베팅은 비활성 유지.
- 3개 열 외곽 너비: 272 / 1280 / 320px. 클라이언트 너비는 각 10px 스크롤바를 제외한 262 / 1270 / 310px.
- 좌측 scrollTop 379, 중앙 1044, 우측 403을 각각 확인했고 나머지 열은 0 유지. 헤더 y=0. 최종 세 열 모두 0·선택 0개로 복원.
- 중앙·우측의 좌표 기반 휠 입력은 이동이 관측되지 않아 해당 영역의 포커스 가능한 버튼에서 End/Home 키로 검증했습니다. 소스 수정은 없었습니다.
- 브라우저 자동화가 탭 아이콘에 배지를 덧씌워 href를 data URL로 표시했습니다. 원래 /favicon.svg는 data-codex-original-favicon-href로 확인했고 실제 서버 링크·파일은 별도 익명 HTTP로 검증했습니다.
- 공개 탭 error/warn 로그: 0개. [live-browser.json](./live-browser.json)
- 스크린샷 4개: 모두 읽을 수 있는 JPEG. 공개 기본/선택 화면은 1920×940.
- 최종 Git 소스 manifest 85개와 현재 파일 해시·바이트 일치. CSS/motion/data/package/lock은 변경 전과 동일. [final-file-verification.json](./final-file-verification.json), [published-source-manifest.json](./published-source-manifest.json)
- 원본 input SHA-256 유지: e76a946e8b895b4aa32862399e746ee8a57003fba95df8a6de6b8ef16dce9ea5
- 최종 git status: 추적 파일 변경 없음. 검사 생성물 tsconfig.tsbuildinfo는 미추적 상태로 남기고 배포 소스에는 포함하지 않았습니다.

## 유지한 항목

디자인·CSS·레이아웃·모션·경기/배당 데이터·선택 로직·패키지·잠금 파일·원본 input·기존 QA/소스 스냅샷을 유지했습니다. 이미지 생성과 기능 추가는 하지 않았습니다. 상위 INDEX·README는 수정하지 않았고 조정 담당자가 관리합니다.

로컬 서버 및 기존 로컬 탭을 종료하거나 공개 URL로 바꾸지 않았습니다. 이번 공개 QA의 임시 Chrome 탭은 1821400457이며 추가 유지 표시를 하지 않았습니다. 임시 viewport를 복원하고 CUA 세션을 reset했습니다. 조정 담당자가 자신의 공개 IAB tab 3와 기존 로컬 tab 4를 유지한다고 별도로 알려왔습니다.

## 남은 위험 및 경계

- 기존 전체 lint 오류 19개는 이번 이름 변경 범위 밖이며 수정하지 않았습니다.
- 이전 npm audit 결과 11개(high 8 / moderate 2 / low 1)는 미해결입니다. 의존성·잠금 파일이 동일함을 확인했지만 이번 작업에서 재감사·강제 업그레이드를 하지 않았습니다. 안전성이 해결됐다는 의미가 아닙니다.
- 기존 고정 데스크톱 레이아웃을 유지했습니다. 모바일 대응, 실제 계정·금전·베팅 기능은 추가하지 않았습니다.
- 배포·기술·화면 스모크 검증의 통과이며 사용자 최종 디자인 승인과는 구분합니다.
- 추가 QA 범위 확장 없이 다음 검수 지시를 기다립니다.

## 화면 자료

- [공개 기본 화면](./screenshots/live-mercury-desktop.jpg)
- [공개 선택 화면](./screenshots/live-mercury-selected.jpg)
- [로컬 기본 화면](./screenshots/local-mercury-desktop.jpg)
