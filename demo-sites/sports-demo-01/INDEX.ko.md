# MERCURY · 스포츠 데모 01

- 신규 독립 데모 ID: `sports-demo-01`
- 정식 명칭: **MERCURY** (2026-09-16 사용자 확정). 이전 검수의 COBALT는 임시 명칭이며 원본 지시서·과거 검수 이력에는 그대로 보존합니다.
- 지시서: [SPORTS_DEMO_CYCLE_01.md](input/SPORTS_DEMO_CYCLE_01.md), R2 · 2026-09-16
- 원본: `D:/WebDL/SPORTS_DEMO_CYCLE_01.md`
- 원본·보관본 SHA-256: `E76A946E8B895B4AA32862399E746EE8A57003FBA95DF8A6DE6B8EF16DCE9EA5`
- 제작 작업 ID: `01a0a97b-1268-7cf3-8aad-ba460ecf4f98` (local)
- 구현 위치: `E:/codexwork/Site-Skin-edit/demo-sites/sports-demo-01/site/`
- 검수 위치: `qa/`

## 이번 범위와 상태

이미지 없는 대표 UI, 배당 선택·슬립 반영·제거, 독립 스크롤, 소스 수정 통제 테스트 A/B/C의 제작·검증을 마쳤습니다. 조정 대화에서도 실제 페이지와 전후 캡처를 확인했으며 **사용자 1차 시각 검수 대기** 상태입니다.

최신 요청 완료: 명칭을 MERCURY로 통일하고 Sites에 로그인 없이 접속 가능한 **공개 상태로 배포·검증했습니다**. slug는 우선 요청한 `mercury`를 사용합니다. 현재 **다음 검수 지시 대기** 상태입니다. 전체 페이지 확장·타이탄 링크 변경은 수행하지 않았습니다.

- 공개 URL: **https://mercury.kexxadrix.chatgpt.site/**
- 연결된 Sites 프로젝트: `appgprj_6aaa650f4aa4819189a2ee84f523fb9c`. 후속 작업에서 `.openai/hosting.json`의 같은 프로젝트를 재사용합니다.
- 최종 확인: Sites 이름 MERCURY, access_mode public, 배포 succeeded. [공개 배포 근거](qa/mercury-public-20260916-184401/sites-deployment-v2.json), [로그인 없는 HTTP 확인](qa/mercury-public-20260916-184401/anonymous-http-v2.json), [조정 대화의 공개 페이지 QA](qa/mercury-public-20260916-184401/COORDINATOR-QA.ko.md).

Sites 설치 확인: 이 환경의 `sites-building` / `sites-hosting` 0.1.57 및 Codex 환경 지침. 문서 작성 환경의 0.1.62 / managed-linux 설명과 구분합니다. 최초 로컬 전용 조건은 최신 사용자의 공개 배포 요청으로 해제됐습니다.

미제공 자료: WOG 운영 화면, 별도 완성 데모 상세 이미지, 후속 카지노 이미지. 제공된 URL과 고정 조건으로 진행하며 누락 자료와의 시각 비교는 미확인으로 남깁니다.

미리보기: **http://127.0.0.1:5276/**. `site/`에서 `npm run dev -- --hostname 127.0.0.1 --port 5276`으로 실행합니다. 서버가 실행 중이면 중복 시작하지 않습니다. 기존 타이탄 `127.0.0.1:3000` 서버는 새 데모 서버로 사용하지 않습니다.

검수: [제작 인계와 캡처](qa/HANDOFF.ko.md), [조정 대화의 최종 QA](qa/COORDINATOR-QA.ko.md). 빌드·타입 검사·작성 파일 lint 통과. 전체 lint는 스타터 오류 19건으로 실패했고 의존성 취약점 11건이 남아 있습니다. 검수 화면은 1920×940 콘텐츠 영역이며, 좁은 브라우저 패널을 위한 반응형은 이번 범위 밖입니다.
