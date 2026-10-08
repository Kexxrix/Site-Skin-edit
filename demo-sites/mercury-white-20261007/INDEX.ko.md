# MERCURY White — PUBLIC v1

로컬 등록일: 2026-10-07. 공개 배포일: 2026-10-08. 사용자의 후속 배포 지시에 따라 현재 승인 상태를 **MERCURY White PUBLIC v1**으로 공개했다. [공개 화면](https://mercury-white.kexxadrix.chatgpt.site/)과 [배포 기록](RELEASE.ko.md)을 따른다.

최신 상태: 2026-10-08 종목 선택 아이콘 색상과 앞선 메뉴 가독성·최신 인기 게임 아이콘 수정까지 배포했다. 로컬 5418/PID41768과 원본 미커밋 변경은 유지한다. 배포 사본 `publish/site/`의 소스 SHA는 `694efe89b8f230030c21f554d674ab71617a60bc`이며 통합 GitHub 수집 기준은 `backup/site-snapshots/20261008-mercury-white-public-v1/`이다. [최신 STATE](STATE.md)와 [RELEASE](RELEASE.ko.md)를 우선한다. 아래 최초 등록 검증은 당시 기록이다.

| 항목 | 현재 기준 |
| --- | --- |
| 관리명 | MERCURY White / 머큐리 화이트 |
| 로컬 화면 | http://127.0.0.1:5418/ |
| 브라우저 제목 | MERCURY · 화이트 |
| 앱 경로 | `E:/codexwork/Site-Skin-edit/demo-sites/mercury-white-20261007/site` |
| 앱 소스 커밋 | `b425507730a4f39dd393645ef4273653a7c13176` |
| 앱 브랜치 | `mercury-white-20261007` |
| 공개 상태 | PUBLIC v1 · https://mercury-white.kexxadrix.chatgpt.site/ |
| 배포 사본 | `publish/site/` · `694efe89b8f230030c21f554d674ab71617a60bc` |
| GitHub 보관 | 기존 `Kexxrix/Site-Skin-edit`, `demo-sites/mercury-white-20261007/` |

## 최초 등록한 화면 기준 — 2026-10-07 이력

승인 v6 팔레트와 파생된 버튼 가독성 보완, 선택 컨트롤 복원, 경기 카드 전체 외곽선·서비스 버튼의 헤더 그라데이션 적용까지 포함한다. 등록 작업에서 앱 코드·디자인·자산·입력 JSON·폴더명은 바꾸지 않았다. 기존 MERCURY와 두 편집기 및 다른 사이트는 별개다.

## 최초 등록 검증과 기록 — 2026-10-07 이력

- 최신 고정 명세와 현재 소스 343개·빌드 파일 292개의 SHA-256이 일치한다. 로컬 HTTP 200, 최신 CSS `index.CIlfXfuu.css` 응답 200 및 SHA-256 일치를 확인했다.
- 소스 작업 트리는 깨끗하며 앱 저장소에 remote는 없다. 실행 중인 5418/PID23780과 기존 5417/PID35992는 재시작하지 않았다.
- [최신 독립 QA](qa-results/card-service-independent-20261007-0911/QA-REPORT.ko.md)의 31 PASS / 0 FAIL 결과를 동일한 입력의 검증 근거로 재사용한다. 새 전체 빌드·브라우저 전수 검사를 반복한 것은 아니다.
- 승인 v6 입력과 사이트 사본은 SHA-256 `f8387c05ce6298592b1eca859f41dd1d4069a4a95ab9d7631fac9b4badc81ae5`로 보존했다.
- GitHub 수집 명세: `backup/site-snapshots/20261007-mercury-white-local/source-files.json`. 소스·자산·입력·운영 문서·QA를 보관하며 의존성·캐시·빌드 및 퇴역 실행 사본·중복 ZIP·비밀값·원시 세션 로그는 제외한다. 제외된 원본은 로컬에서 보존한다.
- 등록 및 원격 확인 근거: `E:/codexwork/Site-Skin-edit-backups/20261007-mercury-white-register/`. 최종 원격 검증은 `github-remote-verification.json`을 따른다. 앱 소스 SHA와 통합 GitHub 백업 커밋은 서로 다르다.

기존 QA의 외부 Typekit 폰트 차단·첨부 참조 이미지 픽셀 확인 제한은 유지한다. 이번 작업에서는 실패한 전송이나 외부 요청을 재시도하지 않았고, 실제 거래·로그인·문의 제출은 수행하지 않았다.
