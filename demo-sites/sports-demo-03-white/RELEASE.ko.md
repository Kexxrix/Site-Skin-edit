# ALDEBARAN-2 — 화이트 스킨 PUBLIC v1

- 공개 주소: https://aldebaran-2.kexxadrix.chatgpt.site/
- 배포 완료: 2026-10-06 19:03:56 KST, `succeeded`, 공개 범위 `public`.
- 프로젝트: `appgprj_6ac4c6462e4c81919e10f7f4f91adacf`.
- 저장 버전: `appgprj_6ac4c6462e4c81919e10f7f4f91adacf~appgver_0d7a7e3eb49c8191bd285ab7daa5e6fa`.
- 배포: `appgdep_6ac4c76e0ca081919a530c41682edf0d`.
- 앱 소스: `5459f3425a1388c2d978747ff43a4364b16bfe94`, `main`, `site/`의 추적 파일 359개.
- 사용자 승인본과 앱 코드·스타일·자산은 동일하다. 배포를 위해 `.openai/hosting.json`에 별도 프로젝트 ID를 연결하고 `.gitignore`에 로컬 검수 폴더 `/.qa/` 제외만 추가했다. QA 자료는 통합 GitHub 백업에 별도로 포함한다.

## 검증

- 등록 전 준비 명세의 파일 359개 모두 SHA-256 일치. 등록 후 변경 허용 파일은 위 설정 2개뿐이며 원본 ALDEBARAN 보존 검사는 `preservation.json`을 따른다.
- 현재 배포 소스의 `npm run build` exit 0. 앱·의존성·타입 설정이 동일하므로 직전 `tsc --noEmit --incremental false` 통과 결과를 재사용했다. 전체 lint 통과를 뜻하지 않는다.
- 기본 1280×720 및 1920×1080 인앱 공개 화면에서 승인된 밝은 회색·v3 아이콘·흑연 배당·주황 금액을 확인했다. 이미지 166개 정상 로딩, v3 고유 PNG 18종, console warning/error 0. 배경 영상 readyState 4 및 재생 상태 확인.
- 보유머니와 활성 당첨금은 `#FF641F`, 기본 배당은 `#41433F`. 배당 선택 후 `100,000 × 1.56 = 156,000` 표시, 전체삭제·금액 초기화·고객센터 열기/닫기 통과. 실제 거래·로그인·문의 제출은 하지 않았다.
- 공개 화면과 준비 단계 스크린샷을 직접 비교했다. 기본 입력 상태·뷰포트 크기·동영상 시점은 다르며 픽셀 단위 동일성을 주장하지 않는다.

## GitHub 보관 기준

- 기존 통합 저장소 `Kexxrix/Site-Skin-edit`의 `main`에 백업한다. 앱 소스 SHA와 통합 백업 커밋은 서로 다른 값이다.
- 앱·운영 문서·입력·QA와 관련 v3 및 graphite 생성 원본·프롬프트·선택/적용 이력을 수집한다. 명세: `backup/site-snapshots/20261006-aldebaran-white-v1/source-files.json`.
- 의존성, Git 내부 파일, 캐시, 빌드 결과, 중복 ZIP/배포 TAR, 비밀값·원시 세션 로그는 제외한다. 이전 커밋의 관련 없는 파일은 삭제하지 않는다.
- 명세별 원본/사본 SHA-256, Git blob, 기존 전체 트리 보존, 원격 main 및 GitHub 전체 트리 비교를 수행한다. 최종 원격 결과는 아래 근거 폴더의 `github-remote-verification.json`에 기록한다.

## 근거와 제한

- 근거: `E:/codexwork/Site-Skin-edit-backups/20261006-aldebaran-white-deploy/`.
- `publication.json`: 소스·저장 버전·공개 배포를 구분한 도구 결과. `public-verification.json`, `public-1920.png`, `public-active.png`: 공개 화면과 UI 검증. `build.log`: 빌드 결과.
- Windows 배포 도구의 Git 소유권·npm shim·Bash·TAR 경로 오류는 현재 실행 프로세스 설정과 절대 npm CLI 경로로 해결했다. OS 설정이나 앱 의존성은 변경하지 않았다.
- 기존 큰 chunk 안내, vinext 경로 분류 안내, 전체 lint의 기존 진단과 1920px 고정 레이아웃은 유지한다.
- 원본 ALDEBARAN v23, SIRIUS·SIRIUS-2, MERCURY, TITAN 및 다른 작업의 앱 코드·배포는 변경하지 않았다.
