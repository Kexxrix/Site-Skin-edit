# MERCURY 공개 배포 · 조정 QA

2026-09-16, 대상 https://mercury.kexxadrix.chatgpt.site/.

- Sites 최종 기록: 이름 MERCURY, slug mercury, public, 배포 succeeded. 연결 식별자는 상위 INDEX와 site/.openai/hosting.json에 보존했습니다.
- 독립 HTTP 요청: 쿠키·인증 헤더 없이 리다이렉트 0회, 200, MERCURY 탭 제목과 /favicon.svg 링크 확인, COBALT 없음.
- 실제 IAB tab 3: 1920×940 임시 검수 화면에서 MERCURY/M 로고와 기존 화면 확인. 좌측 272px / 중앙 1280px / 우측 320px, x=12/296/1588 유지.
- 공개 페이지에서 서울 홈 1.84 선택 → 버튼 선택과 슬립 1개·총 배당 1.840 → 개별 제거 → 선택 0·빈 슬립 복원 확인. 기본 실시간 스포츠 활성, console error/warn 0건.
- title, description, icon 링크의 MERCURY 명칭/연결을 DOM에서 확인했습니다. 실제 M 파비콘 파일의 익명 200은 제작 담당자의 anonymous-http-v2.json 근거로 확인했습니다.
- 이전과 비교: globals.css, motion.css, demo-data.ts, package.json, package-lock.json SHA-256 동일. page.tsx는 줄끝 정규화 후 COBALT→MERCURY와 C→M 치환만 변경됐습니다. 메타데이터의 파비콘 연결 한 줄이 추가됐습니다.
- 조정 탭 3은 공개 URL을 유지하고 로컬 탭 4는 보존했습니다. 선택을 비우고 임시 viewport를 복원한 뒤 CUA reset을 완료했습니다. open_in_codex는 queued 응답이므로 전면 표시 완료로 단정하지 않습니다.

기존 스타터 lint 오류 19건·의존성 취약점 11건은 해결된 것으로 처리하지 않습니다. 모바일·다른 브라우저 전체 검수, WOG 직접 비교, 실거래 기능은 검증하지 않았습니다. 이번 작업은 명칭 변경·공개 배포까지이며 다음 검수 지시를 기다립니다.
